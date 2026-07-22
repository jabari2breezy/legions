import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const EASE = {
  standard: "power3.out",
  smooth: "power2.inOut",
  snap: "power4.out",
  magnetic: "elastic.out(1, 0.5)",
  reveal: [0.16, 1, 0.3, 1] as const,
} as const;

export const DURATION = {
  micro: 0.2,
  fast: 0.3,
  base: 0.5,
  slow: 0.8,
  reveal: 1.2,
} as const;

export function connectLenisToScrollTrigger() {
  const lenis = (window as any).__lenis;
  if (!lenis) return;

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}
