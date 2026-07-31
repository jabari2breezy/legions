import { useEffect, useRef } from 'react';
import {
  useScroll,
  useSpring,
  useMotionValue,
  type MotionValue,
} from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';
import { useIsTouchDevice } from './useIsTouchDevice';
import { useScrollStore } from '@/store/useScrollStore';

interface UseScrollEngineOptions {
  mainRef: React.RefObject<HTMLElement | null>;
  trackRef: React.RefObject<HTMLElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  spacerRef: React.RefObject<HTMLDivElement | null>;
  slideCount: number;
}

const FRICTION = 1.35;
const WHEEL_SCALE = 1 / 1500;
const MAX_VELOCITY = 2.4;
const SNAP_VELOCITY_THRESHOLD = 0.06;
const SNAP_STIFFNESS = 26;
const SNAP_DAMPING = 7;
const SNAP_EPSILON = 0.0015;

export function useScrollEngine({
  mainRef,
  trackRef,
  videoRef,
  spacerRef,
  slideCount,
}: UseScrollEngineOptions): MotionValue<number> {
  const prefersReduced = useReducedMotion();
  const { isMobile } = useIsTouchDevice();
  const setProgress = useScrollStore((state) => state.setProgress);
  const setActiveSlideIndex = useScrollStore((state) => state.setActiveSlideIndex);
  const setTotalSlides = useScrollStore((state) => state.setTotalSlides);
  const setIsVirtualScroll = useScrollStore((state) => state.setIsVirtualScroll);

  const trackWidth = useMotionValue(0);
  const onLoadedMetadataRef = useRef(false);
  const lastVideoWriteRef = useRef(0);

  useEffect(() => {
    setTotalSlides(slideCount);
  }, [slideCount, setTotalSlides]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = (): void => {
      onLoadedMetadataRef.current = true;
    };

    video.addEventListener('loadedmetadata', onLoaded);
    if (video.readyState >= 1) {
      onLoadedMetadataRef.current = true;
    }

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded);
    };
  }, [videoRef]);

  const desktopScroll = useScroll();
  const mobileScroll = useScroll({
    container: isMobile ? mainRef : undefined,
  });

  const scrollProgress = isMobile ? mobileScroll.scrollYProgress : desktopScroll.scrollYProgress;

  const springProgress = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0005,
  });

  const smoothProgress = prefersReduced ? scrollProgress : springProgress;

  const x = useMotionValue(0);

  const writeFrame = (latest: number): void => {
    setProgress(latest);
    setActiveSlideIndex(
      Math.min(Math.floor(latest * slideCount), slideCount - 1)
    );

    const video = videoRef.current;
    if (!video || isMobile) return;
    if (
      onLoadedMetadataRef.current &&
      Number.isFinite(video.duration) &&
      video.duration > 0
    ) {
      const now = performance.now();
      if (now - lastVideoWriteRef.current >= 1000 / 30) {
        video.currentTime = latest * video.duration;
        lastVideoWriteRef.current = now;
      }
    }
  };

  useEffect(() => {
    if (isMobile) {
      const video = videoRef.current;
      if (video) {
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        void video.play();
      }
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    const update = (): void => {
      const width = track.scrollWidth - window.innerWidth;
      trackWidth.set(Math.max(0, width));
      const spacer = spacerRef.current;
      if (spacer) {
        spacer.style.height = `${Math.max(0, width).toString()}px`;
      }
    };

    update();

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(update);
    });
    observer.observe(track);

    const onResize = (): void => {
      requestAnimationFrame(update);
    };
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [isMobile, trackRef, spacerRef, trackWidth]);

  useEffect(() => {
    if (!isMobile && !prefersReduced) return;

    return smoothProgress.on('change', (latest) => {
      x.set(isMobile ? 0 : -latest * trackWidth.get());
      writeFrame(latest);
    });
  }, [isMobile, prefersReduced, smoothProgress, trackWidth, x]);

  useEffect(() => {
    if (isMobile || prefersReduced) return;

    setIsVirtualScroll(true);
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    let current = 0;
    let velocity = 0;
    let rafId = 0;
    let last = performance.now();

    const tick = (): void => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const store = useScrollStore.getState();
      if (store.scrollTargetIndex !== null) {
        const target = store.scrollTargetIndex / slideCount;
        store.setScrollTargetIndex(null);
        const diff = target - current;
        if (Math.abs(diff) < SNAP_EPSILON) {
          current = target;
          velocity = 0;
        } else {
          velocity = diff * 7;
        }
      }

      if (Math.abs(velocity) > SNAP_VELOCITY_THRESHOLD) {
        velocity *= Math.exp(-FRICTION * dt);
      } else {
        const nearest = Math.round(current * slideCount) / slideCount;
        const diff = nearest - current;
        if (Math.abs(diff) < SNAP_EPSILON && Math.abs(velocity) < 0.01) {
          current = nearest;
          velocity = 0;
        } else {
          velocity += diff * SNAP_STIFFNESS * dt;
          velocity *= Math.max(0, 1 - SNAP_DAMPING * dt);
        }
      }

      current = Math.min(1, Math.max(0, current + velocity * dt));
      if ((current <= 0 && velocity < 0) || (current >= 1 && velocity > 0)) {
        velocity = 0;
      }

      x.set(-current * trackWidth.get());
      writeFrame(current);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onWheel = (e: WheelEvent): void => {
      e.preventDefault();
      velocity += e.deltaY * WHEEL_SCALE;
      velocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velocity));
    };
    window.addEventListener('wheel', onWheel, { passive: false });

    const nextKeys = new Set(['ArrowDown', 'ArrowRight', 'PageDown', ' ']);
    const prevKeys = new Set(['ArrowUp', 'ArrowLeft', 'PageUp']);
    const onKeyDown = (e: KeyboardEvent): void => {
      if (nextKeys.has(e.key)) {
        e.preventDefault();
        velocity += 0.4;
      } else if (prevKeys.has(e.key)) {
        e.preventDefault();
        velocity -= 0.4;
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      setIsVirtualScroll(false);
    };
  }, [isMobile, prefersReduced, slideCount, trackWidth, x]);

  return x;
}
