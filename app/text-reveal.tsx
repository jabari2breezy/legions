"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  style?: React.CSSProperties;
  delay?: number;
  splitBy?: "chars" | "words" | "lines";
}

export function TextReveal({
  children,
  className = "",
  as: Tag = "h2",
  style,
  delay = 0,
  splitBy = "words",
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const units = el.querySelectorAll(`.reveal-${splitBy}`);

    gsap.fromTo(
      units,
      { yPercent: 110, rotateX: -20 },
      {
        yPercent: 0,
        rotateX: 0,
        duration: 1,
        ease: "power4.out",
        stagger: splitBy === "words" ? 0.06 : 0.015,
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [delay, splitBy]);

  const splitText = (text: string) => {
    if (splitBy === "words") {
      return text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className={`reveal-${splitBy} inline-block`}>
            {word}
            {i < text.split(" ").length - 1 && "\u00A0"}
          </span>
        </span>
      ));
    }
    return text.split("").map((char, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <span className={`reveal-${splitBy} inline-block`}>
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  };

  return (
    <Tag
      ref={containerRef as React.Ref<HTMLElement>}
      className={className}
      style={{ perspective: "600px", ...style }}
    >
      {splitText(children)}
    </Tag>
  );
}

interface LineRevealProps {
  className?: string;
  delay?: number;
}

export function LineReveal({ className = "", delay = 0 }: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 1.4,
        ease: "power4.inOut",
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`h-px ${className}`}
      style={{
        background: "linear-gradient(90deg, var(--color-strong-cyan), transparent)",
        ...({ transformOrigin: "left center" } as React.CSSProperties),
      }}
    />
  );
}

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}

export function FadeUp({
  children,
  className = "",
  delay = 0,
  duration = 1,
  y = 50,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [delay, duration, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
