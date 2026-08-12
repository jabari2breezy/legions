/**
 * Apple-style scroll-driven canvas hero.
 *
 * Configurable values at the top:
 *   - FRAME_COUNT: total number of frames
 *   - FRAME_PATH: folder path (relative to the HTML file)
 *   - FRAME_PREFIX / FRAME_SUFFIX: naming around the zero-padded index
 *   - FRAME_PADDING: number of digits (e.g. 3 -> 001, 002...)
 */
(function () {
  'use strict';

  // ===================== CONFIG =====================
  var FRAME_COUNT = 114;
  var FRAME_PATH = 'hero';
  var FRAME_PREFIX = 'ezgif-frame-';
  var FRAME_SUFFIX = '.jpg';
  var FRAME_PADDING = 3;
  // ==================================================

  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var wrapper = document.getElementById('hero-scroll');
  var heroText = document.getElementById('hero-text');
  var scrollCue = document.getElementById('scroll-cue');
  var loader = document.getElementById('loader');
  var loaderPct = document.getElementById('loader-pct');

  var images = [];
  var loaded = 0;
  var currentIndex = -1;
  var rafPending = false;

  function frameUrl(i) {
    var n = String(i + 1);
    while (n.length < FRAME_PADDING) n = '0' + n;
    return FRAME_PATH + '/' + FRAME_PREFIX + n + FRAME_SUFFIX;
  }

  // Preload every frame into memory
  for (var i = 0; i < FRAME_COUNT; i++) {
    (function (idx) {
      var img = new Image();
      img.onload = img.onerror = function () {
        loaded++;
        if (loaderPct) loaderPct.textContent = Math.round((loaded / FRAME_COUNT) * 100) + '%';
        if (loaded >= FRAME_COUNT && loader) {
          setTimeout(function () { loader.classList.add('loader-done'); }, 350);
          scheduleDraw();
        }
      };
      img.src = frameUrl(idx);
      images[idx] = img;
    })(i);
  }

  function resizeCanvas() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Mimic CSS object-fit: cover inside the canvas
  function drawCover(img) {
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    var iw = img.naturalWidth || 1280;
    var ih = img.naturalHeight || 720;
    var scale = Math.max(w / iw, h / ih);
    var dw = iw * scale;
    var dh = ih * scale;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }

  function drawFrame(idx) {
    if (idx < 0 || idx >= FRAME_COUNT) return;
    var img = images[idx];
    if (img && img.complete && img.naturalWidth) drawCover(img);
  }

  function scheduleDraw() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(function () {
      rafPending = false;
      drawFrame(currentIndex);
    });
  }

  function onScroll() {
    var total = wrapper.offsetHeight - window.innerHeight;
    var scrolled = Math.max(0, Math.min(total, -wrapper.getBoundingClientRect().top));
    var progress = total > 0 ? scrolled / total : 0;

    var idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(progress * (FRAME_COUNT - 1))));
    if (idx !== currentIndex) {
      currentIndex = idx;
      scheduleDraw();
    }

    // Fade / drift the title as the reel plays out
    var t = 1 - Math.min(1, progress * 1.1);
    if (heroText) {
      heroText.style.opacity = Math.max(0, t).toFixed(3);
      heroText.style.transform = 'translateY(' + (progress * 60) + 'px) scale(' + (1 - progress * 0.08) + ')';
    }
    if (scrollCue) {
      scrollCue.style.opacity = Math.max(0, 1 - progress * 2.5).toFixed(3);
    }
  }

  resizeCanvas();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    resizeCanvas();
    drawFrame(currentIndex);
  });

  drawFrame(0);
  onScroll();
})();
