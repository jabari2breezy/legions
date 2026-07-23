import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export const EASE = {
  awwwards: CustomEase.create("awwwards", "M0,0 C0.19,1 0.22,1 1,1"),
  magnetic: CustomEase.create("magnetic", "M0,0 C0.25,0.1 0.25,1 1,1"),
  settle: CustomEase.create("settle", "M0,0 C0.16,1 0.3,1 1,1"),
} as const;

export const DURATION = {
  micro: 0.2,
  fast: 0.3,
  base: 0.5,
  slow: 0.8,
  reveal: 1.2,
} as const;
