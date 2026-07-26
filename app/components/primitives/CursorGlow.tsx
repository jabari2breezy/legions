"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.setProperty("--mx", `${e.clientX}px`);
      glowRef.current.style.setProperty("--my", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        background:
          "radial-gradient(circle 400px at var(--mx, 50%) var(--my, 50%), rgba(77, 232, 212, 0.06), transparent)",
      }}
    />
  );
}
