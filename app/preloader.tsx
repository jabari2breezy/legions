"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 6) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);

        const tl = gsap.timeline({ onComplete });

        tl.to(numberRef.current, {
          yPercent: -120,
          opacity: 0,
          duration: 0.6,
          ease: "power3.in",
          delay: 0.3,
        })
          .to(
            containerRef.current,
            {
              clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
              duration: 1.2,
              ease: "power4.inOut",
            },
            "-=0.2"
          );
      }
      if (numberRef.current) {
        numberRef.current.textContent = String(current).padStart(3, "0");
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "var(--color-yale-blue)",
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      }}
    >
      <div
        ref={numberRef}
        className="font-serif text-[clamp(5rem,15vw,12rem)] font-light leading-none tracking-tighter"
        style={{ color: "var(--color-strong-cyan)" }}
      >
        000
      </div>
      <div className="w-24 h-px mt-8 opacity-30" style={{ background: "var(--color-strong-cyan)" }} />
      <div
        className="font-mono text-[10px] tracking-[0.4em] uppercase mt-4"
        style={{ color: "var(--color-steel-blue)" }}
      >
        Loading
      </div>
    </div>
  );
}
