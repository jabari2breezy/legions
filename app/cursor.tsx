"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseEnterLink = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const text = target.getAttribute("data-cursor");
      if (cursorTextRef.current && text) {
        cursorTextRef.current.textContent = text;
        gsap.to(cursorRef.current, { scale: 2.5, duration: 0.4, ease: "power3.out" });
        gsap.to(cursorDotRef.current, { scale: 0, duration: 0.3 });
      } else {
        gsap.to(cursorRef.current, { scale: 1.8, duration: 0.4, ease: "power3.out" });
        gsap.to(cursorDotRef.current, { scale: 0, duration: 0.3 });
      }
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.4, ease: "power3.out" });
      gsap.to(cursorDotRef.current, { scale: 1, duration: 0.3 });
      if (cursorTextRef.current) cursorTextRef.current.textContent = "";
    };

    document.addEventListener("mousemove", onMouseMove);

    const links = document.querySelectorAll("a, button, [data-cursor]");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    const raf = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(raf);
    };
    const animId = requestAnimationFrame(raf);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
        style={{ willChange: "transform" }}
      >
        <div className="w-12 h-12 rounded-full border flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          style={{ borderColor: "var(--color-strong-cyan)", opacity: 0.4 }}
        >
          <div ref={cursorTextRef} className="font-mono text-[9px] tracking-[0.15em] uppercase whitespace-nowrap"
            style={{ color: "var(--color-strong-cyan)" }}
          />
        </div>
      </div>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
      >
        <div className="w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ background: "var(--color-strong-cyan)" }}
        />
      </div>
    </>
  );
}
