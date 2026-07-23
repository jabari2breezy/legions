"use client";

import { createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import Flip from "gsap/Flip";
import { EASE } from "@/utils/easing";

gsap.registerPlugin(Flip);

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

  function navigateWithFlip(href: string, flipId: string, sourceEl: HTMLElement) {
    const rect = sourceEl.getBoundingClientRect();
    const imgEl = sourceEl.querySelector("img");
    const src = imgEl?.currentSrc || imgEl?.src;
    if (!src) {
      router.push(href);
      return;
    }

    const clone = document.createElement("img");
    clone.src = src;
    clone.id = flipId;
    clone.style.position = "fixed";
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.objectFit = "cover";
    clone.style.zIndex = "9998";
    clone.style.borderRadius = getComputedStyle(sourceEl).borderRadius;
    document.body.appendChild(clone);

    const state = Flip.getState(clone);

    gsap.to("[data-page-content]", {
      opacity: 0,
      duration: 0.4,
      ease: EASE.awwwards,
    });

    gsap.set(clone, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    Flip.from(state, {
      duration: 0.9,
      ease: EASE.awwwards,
      onComplete: () => {
        router.push(href);
        setTimeout(() => {
          clone.remove();
          gsap.set("[data-page-content]", { opacity: 1 });
        }, 250);
      },
    });
  }

  return (
    <FlipTransitionContext.Provider value={{ navigateWithFlip }}>
      {children}
    </FlipTransitionContext.Provider>
  );
}
