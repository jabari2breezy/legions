import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function connectLenisToScrollTrigger() {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = (window as any).__lenis;
  if (!lenis) return;

  lenis.on("scroll", ScrollTrigger.update);
}
