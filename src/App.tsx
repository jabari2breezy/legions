import { useRef, useEffect } from 'react';
import type { JSX } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollTrack } from '@/components/layout/ScrollTrack';
import { CursorCanvas } from '@/gl/CursorCanvas';
import { useScrollEngine } from '@/hooks/useScrollEngine';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { useScrollStore } from '@/store/useScrollStore';
import { projects } from '@/data/projects';

const TOTAL_SLIDES = 4 + projects.length;

export default function App(): JSX.Element {
  const mainRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const setCursor = useScrollStore((state) => state.setCursor);

  const x = useScrollEngine({
    mainRef,
    trackRef,
    videoRef,
    spacerRef,
    slideCount: TOTAL_SLIDES,
  });

  useEffect(() => {
    if (isTouch) return;

    let rafId: number;
    const onPointerMove = (e: PointerEvent): void => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setCursor(e.clientX, e.clientY);
      });
    };

    document.addEventListener('pointermove', onPointerMove);
    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, [isTouch, setCursor]);

  return (
    <>
      <video
        ref={videoRef}
        src="/3D_fluid_background_animation_202607282348.mp4"
        poster="/3D_fluid_background_animation_202607282348-poster.jpg"
        playsInline
        muted
        preload="auto"
        className="fixed inset-0 -z-50 h-screen w-screen object-cover pointer-events-none"
      />

      <CursorCanvas />

      <Header />

      <main
        ref={mainRef}
        className={
          isTouch
            ? 'relative min-h-screen overflow-y-auto'
            : 'relative w-full'
        }
      >
        <ScrollTrack ref={trackRef} x={x} />
        {!isTouch && (
          <div
            ref={spacerRef}
            className="pointer-events-none w-full"
            aria-hidden="true"
          />
        )}
      </main>

      <Footer />
    </>
  );
}
