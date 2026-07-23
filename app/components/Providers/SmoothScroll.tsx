"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import Lenis from "lenis";
import { connectLenisToScrollTrigger } from "@/utils/scrollTriggerProxy";

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  velocity: number;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  velocity: 0,
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [velocity, setVelocity] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      setVelocity(velocity);
    });

    function raf(time: number) {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    }
    rafId.current = requestAnimationFrame(raf);

    (window as any).__lenis = lenis;
    connectLenisToScrollTrigger();

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      lenis.destroy();
      (window as any).__lenis = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, velocity }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
