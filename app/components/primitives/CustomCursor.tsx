"use client";

import { useEffect, useRef } from "react";

interface CursorState {
  x: number;
  y: number;
  hovering: boolean;
  label: string;
  mode: "default" | "hover" | "wheel" | "project";
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const state = useRef<CursorState>({
    x: 0, y: 0, hovering: false, label: "", mode: "default",
  });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const onMove = (e: MouseEvent) => {
      state.current.x = e.clientX;
      state.current.y = e.clientY;
    };

    const onCursorEnter = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      state.current.hovering = true;
      state.current.label = detail?.label || "";
      state.current.mode = detail?.mode || "hover";
    };

    const onCursorLeave = () => {
      state.current.hovering = false;
      state.current.label = "";
      state.current.mode = "default";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("cursor:enter", onCursorEnter as EventListener);
    window.addEventListener("cursor:leave", onCursorLeave);

    let raf: number;
    const tick = () => {
      const lerp = 0.12;
      pos.current.x += (state.current.x - pos.current.x) * lerp;
      pos.current.y += (state.current.y - pos.current.y) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
        ringRef.current.classList.toggle("is-hovering", state.current.mode === "hover");
        ringRef.current.classList.toggle("is-wheel-hover", state.current.mode === "wheel");
        ringRef.current.classList.toggle("is-project-hover", state.current.mode === "project");
      }
      if (labelRef.current) {
        labelRef.current.textContent = state.current.label;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("cursor:enter", onCursorEnter as EventListener);
      window.removeEventListener("cursor:leave", onCursorLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}
