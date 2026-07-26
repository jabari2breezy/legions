"use client";

import { useEffect, useRef, useState } from "react";

interface CursorState {
  x: number;
  y: number;
  hovering: boolean;
  label: string;
  visible: boolean;
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const state = useRef<CursorState>({
    x: 0, y: 0, hovering: false, label: "", visible: false,
  });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if touch device
    if ("ontouchstart" in window) return;

    const onMove = (e: MouseEvent) => {
      state.current.x = e.clientX;
      state.current.y = e.clientY;
      state.current.visible = true;
    };

    const onEnterProject = (e: Event) => {
      const customEvent = e as CustomEvent;
      state.current.hovering = true;
      state.current.label = customEvent.detail?.label || "";
    };

    const onLeaveProject = () => {
      state.current.hovering = false;
      state.current.label = "";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("cursor:enter", onEnterProject as EventListener);
    window.addEventListener("cursor:leave", onLeaveProject);

    let raf: number;
    const tick = () => {
      pos.current.x += (state.current.x - pos.current.x) * 0.15;
      pos.current.y += (state.current.y - pos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
        dotRef.current.classList.toggle("is-hovering", state.current.hovering);
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${state.current.x}px, ${state.current.y - 24}px)`;
        labelRef.current.classList.toggle("is-visible", state.current.hovering && !!state.current.label);
        labelRef.current.textContent = state.current.label;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("cursor:enter", onEnterProject as EventListener);
      window.removeEventListener("cursor:leave", onLeaveProject);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={labelRef} className="cursor-label" />
    </>
  );
}
