"use client";

import { useEffect, useRef } from "react";

interface CursorState {
  x: number;
  y: number;
  hovering: boolean;
  label: string;
  visible: boolean;
}

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const state = useRef<CursorState>({
    x: 0, y: 0, hovering: false, label: "", visible: false,
  });
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      state.current.x = e.clientX;
      state.current.y = e.clientY;
      state.current.visible = true;
    };

    const onEnter = (e: Event) => {
      const customEvent = e as CustomEvent;
      state.current.hovering = true;
      state.current.label = customEvent.detail?.label || "";
    };

    const onLeave = () => {
      state.current.hovering = false;
      state.current.label = "";
    };

    const onLeaveWindow = () => {
      state.current.visible = false;
    };

    const onEnterWindow = () => {
      state.current.visible = true;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("cursor:enter", onEnter as EventListener);
    window.addEventListener("cursor:leave", onLeave);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    // Spring constants
    const DOT_STIFFNESS = 0.25;
    const RING_STIFFNESS = 0.12;
    const DAMPING = 0.8;

    let raf: number;
    const tick = () => {
      const { x: tx, y: ty, hovering, visible } = state.current;

      // Dot spring (faster)
      pos.current.x += (tx - pos.current.x) * DOT_STIFFNESS;
      pos.current.y += (ty - pos.current.y) * DOT_STIFFNESS;

      // Ring spring (slower, lags behind)
      ringPos.current.x += (tx - ringPos.current.x) * RING_STIFFNESS;
      ringPos.current.y += (ty - ringPos.current.y) * RING_STIFFNESS;

      const opacity = visible ? 1 : 0;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
        ringRef.current.style.opacity = String(opacity);
        ringRef.current.classList.toggle("is-hovering", hovering);
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
        dotRef.current.style.opacity = String(opacity);
        dotRef.current.classList.toggle("is-hovering", hovering);
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y - 48}px) translate(-50%, -50%)`;
        labelRef.current.classList.toggle("is-visible", hovering && !!state.current.label);
        labelRef.current.textContent = state.current.label;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("cursor:enter", onEnter as EventListener);
      window.removeEventListener("cursor:leave", onLeave);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
      <div ref={labelRef} className="cursor-label" />
    </>
  );
}
