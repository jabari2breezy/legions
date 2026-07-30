import { useEffect, useRef } from 'react';
import {
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
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

  const x = useTransform(smoothProgress, (latest) => {
    if (isMobile) return 0;
    return -latest * trackWidth.get();
  });

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    setProgress(latest);
    setActiveSlideIndex(
      Math.min(Math.floor(latest * slideCount), slideCount - 1)
    );
  });

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const video = videoRef.current;
    if (!video) return;
    if (isMobile) return;

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
  });

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
    const spacer = spacerRef.current;
    if (!track || !spacer) return;

    const update = (): void => {
      const width = track.scrollWidth - window.innerWidth;
      trackWidth.set(Math.max(0, width));
      spacer.style.height = `${Math.max(0, width).toString()}px`;
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
  }, [isMobile, trackRef, spacerRef, trackWidth, videoRef]);

  return x;
}
