import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';
import { useIsTouchDevice } from './useIsTouchDevice';
import { useScrollStore } from '@/store/useScrollStore';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollEngineOptions {
  mainRef: React.RefObject<HTMLElement | null>;
  trackRef: React.RefObject<HTMLElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  slideCount: number;
}

const LERP_FACTOR = 0.08;

export function useScrollEngine({
  mainRef,
  trackRef,
  videoRef,
  slideCount,
}: UseScrollEngineOptions): void {
  const prefersReduced = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const setProgress = useScrollStore((state) => state.setProgress);
  const setActiveSlideIndex = useScrollStore((state) => state.setActiveSlideIndex);
  const setTotalSlides = useScrollStore((state) => state.setTotalSlides);

  const onLoadedMetadataRef = useRef(false);
  const lastVideoWriteRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const smoothedProgressRef = useRef(0);
  const trackWidthRef = useRef(0);
  const triggerRef = useRef<ScrollTrigger | null>(null);

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

  useEffect(() => {
    if (isTouch) return;

    const main = mainRef.current;
    const track = trackRef.current;
    if (!main || !track) return;

    const updateScrollDistance = (): number => {
      return -(track.scrollWidth - window.innerWidth);
    };

    trackWidthRef.current = updateScrollDistance();

    const observer = new ResizeObserver(() => {
      trackWidthRef.current = updateScrollDistance();
      ScrollTrigger.refresh();
    });
    observer.observe(track);

    const trigger = ScrollTrigger.create({
      trigger: main,
      start: 'top top',
      end: () => `+=${Math.abs(trackWidthRef.current).toString()}`,
      pin: !prefersReduced,
      scrub: prefersReduced ? false : 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        targetProgressRef.current = self.progress;
      },
    });
    triggerRef.current = trigger;

    const animate = (): void => {
      const track = trackRef.current;
      const video = videoRef.current;
      if (!track) return;

      const diff = targetProgressRef.current - smoothedProgressRef.current;
      smoothedProgressRef.current += diff * LERP_FACTOR;

      if (Math.abs(diff) < 0.0001) {
        smoothedProgressRef.current = targetProgressRef.current;
      }

      const trackWidth = track.scrollWidth - window.innerWidth;
      const x = -smoothedProgressRef.current * trackWidth;
      gsap.set(track, { x });

      if (
        video &&
        onLoadedMetadataRef.current &&
        Number.isFinite(video.duration) &&
        video.duration > 0
      ) {
        const now = performance.now();
        const targetTime = smoothedProgressRef.current * video.duration;
        if (now - lastVideoWriteRef.current >= 1000 / 30) {
          video.currentTime = targetTime;
          lastVideoWriteRef.current = now;
        }
      }

      setProgress(smoothedProgressRef.current);
      setActiveSlideIndex(
        Math.min(
          Math.floor(smoothedProgressRef.current * slideCount),
          slideCount - 1
        )
      );

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      trigger.kill();
      ScrollTrigger.getAll().forEach((t) => {
        t.kill();
      });
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [
    mainRef,
    trackRef,
    videoRef,
    isTouch,
    prefersReduced,
    slideCount,
    setProgress,
    setActiveSlideIndex,
  ]);

  useEffect(() => {
    if (!isTouch) return;

    const main = mainRef.current;
    if (!main) return;

    main.style.overflowY = 'auto';
    main.style.height = 'auto';

    const video = videoRef.current;
    if (video) {
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      void video.play();
    }

    const onScroll = (): void => {
      const scrollTop = main.scrollTop;
      const maxScroll = main.scrollHeight - main.clientHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setProgress(progress);
      setActiveSlideIndex(
        Math.min(Math.floor(progress * slideCount), slideCount - 1)
      );
    };

    main.addEventListener('scroll', onScroll);
    onScroll();

    return () => {
      main.removeEventListener('scroll', onScroll);
    };
  }, [isTouch, mainRef, videoRef, setProgress, setActiveSlideIndex, slideCount]);
}
