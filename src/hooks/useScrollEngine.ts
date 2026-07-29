import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLerp } from './useLerp';
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

  const [rawProgress, setRawProgress] = useState(0);
  const onLoadedMetadataRef = useRef(false);
  const lastVideoWriteRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const videoRefLocal = useRef<HTMLVideoElement | null>(null);

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

  const lerpProgress = useLerp(rawProgress, 0.08);

  useEffect(() => {
    videoRefLocal.current = videoRef.current;
  }, [videoRef]);

  const animate = useCallback(() => {
    const video = videoRefLocal.current;
    const track = trackRef.current;
    if (!track) return;

    const trackWidth = track.scrollWidth - window.innerWidth;
    const x = -lerpProgress * trackWidth;
    gsap.set(track, { x });

    if (
      video &&
      onLoadedMetadataRef.current &&
      Number.isFinite(video.duration) &&
      video.duration > 0
    ) {
      const now = performance.now();
      const targetTime = lerpProgress * video.duration;
      if (now - lastVideoWriteRef.current >= 1000 / 30) {
        video.currentTime = targetTime;
        lastVideoWriteRef.current = now;
      }
    }

    setProgress(lerpProgress);
    setActiveSlideIndex(Math.min(Math.floor(lerpProgress * slideCount), slideCount - 1));

    rafIdRef.current = requestAnimationFrame(animate);
  }, [lerpProgress, trackRef, slideCount, setProgress, setActiveSlideIndex]);

  useEffect(() => {
    if (isTouch) return;

    const main = mainRef.current;
    const track = trackRef.current;
    if (!main || !track) return;

    const updateScrollDistance = (): number => {
      return -(track.scrollWidth - window.innerWidth);
    };

    let trackWidth = updateScrollDistance();

    const observer = new ResizeObserver(() => {
      trackWidth = updateScrollDistance();
      ScrollTrigger.refresh();
    });
    observer.observe(track);

    const trigger = ScrollTrigger.create({
      trigger: main,
      start: 'top top',
      end: () => `+=${Math.abs(trackWidth).toString()}`,
      pin: !prefersReduced,
      scrub: prefersReduced ? false : 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setRawProgress(self.progress);
      },
    });
    triggerRef.current = trigger;

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      trigger.kill();
      ScrollTrigger.getAll().forEach((t) => { t.kill(); });
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [mainRef, trackRef, isTouch, prefersReduced, animate]);

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
      setActiveSlideIndex(Math.min(Math.floor(progress * slideCount), slideCount - 1));
    };

    main.addEventListener('scroll', onScroll);
    onScroll();

    return () => {
      main.removeEventListener('scroll', onScroll);
    };
  }, [isTouch, mainRef, videoRef, setProgress, setActiveSlideIndex, slideCount]);
}
