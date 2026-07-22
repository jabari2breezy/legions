'use client'

import { createContext, useContext, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE_VAL = [0.16, 1, 0.3, 1] as const;

interface FlipTransitionContextValue {
  navigateWithFlip: (href: string, flipId: string, sourceEl: HTMLElement) => void;
}

const FlipTransitionContext = createContext<FlipTransitionContextValue | null>(null);

export function useFlipTransition() {
  const ctx = useContext(FlipTransitionContext);
  if (!ctx) throw new Error("useFlipTransition must be used within provider");
  return ctx;
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  function navigateWithFlip(href: string, _flipId: string, sourceEl: HTMLElement) {
    const rect = sourceEl.getBoundingClientRect();
    const imgEl = sourceEl.querySelector("img");
    const src = imgEl?.currentSrc || imgEl?.src;
    if (!src) {
      router.push(href);
      return;
    }

    const clone = document.createElement("img");
    clone.src = src;
    clone.style.position = "fixed";
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.objectFit = "cover";
    clone.style.zIndex = "9998";
    clone.style.borderRadius = getComputedStyle(sourceEl).borderRadius;
    clone.style.transition = `all 0.9s ${EASE_VAL.join(" ")}`;
    document.body.appendChild(clone);

    gsap.to("[data-page-content]", {
      opacity: 0,
      duration: 0.4,
      ease: EASE_VAL as unknown as string,
    });

    requestAnimationFrame(() => {
      clone.style.top = "0";
      clone.style.left = "0";
      clone.style.width = "100vw";
      clone.style.height = "100vh";
      clone.style.borderRadius = "0";
    });

    setTimeout(() => {
      router.push(href);
      setTimeout(() => {
        clone.remove();
        gsap.set("[data-page-content]", { opacity: 1 });
      }, 250);
    }, 900);
  }

  return (
    <FlipTransitionContext.Provider value={{ navigateWithFlip }}>
      {children}
    </FlipTransitionContext.Provider>
  );
}
