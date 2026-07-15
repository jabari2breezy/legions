"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3;
      if (current >= 100) {
        current = 100;
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => {
          if (!containerRef.current) return;
          const tl = gsap.timeline({
            onComplete,
          });
          tl.to(containerRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
          });
        }, 300);
      }
      setCount(current);
    }, 60);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "var(--color-yale-blue)" }}
    >
      <div className="text-center">
        <div
          ref={counterRef}
          className="font-serif text-[clamp(4rem,12vw,10rem)] font-light leading-none"
          style={{ color: "var(--color-strong-cyan)" }}
        >
          {count}
        </div>
        <div
          className="font-mono text-xs tracking-[0.4em] uppercase mt-4"
          style={{ color: "var(--color-steel-blue)" }}
        >
          Loading Experience
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-32 h-px bg-white/10 overflow-hidden">
          <div
            className="h-full transition-all duration-200"
            style={{
              width: `${count}%`,
              background: "var(--color-strong-cyan)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
