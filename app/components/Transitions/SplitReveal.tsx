'use client'

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE_VAL = [0.16, 1, 0.3, 1] as const;

interface SplitRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  splitBy?: "chars" | "words" | "lines";
  trigger?: "load" | "scroll";
}

function splitText(el: HTMLElement, mode: "chars" | "words" | "lines") {
  const text = el.textContent || "";
  el.textContent = "";

  if (mode === "chars") {
    const units = text.split("");
    return units.map((char) => {
      const mask = document.createElement("span");
      mask.style.display = "inline-block";
      mask.style.overflow = "hidden";
      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.textContent = char === " " ? "\u00A0" : char;
      mask.appendChild(inner);
      el.appendChild(mask);
      return inner;
    });
  }

  if (mode === "words") {
    const units = text.split(" ");
    return units.map((word) => {
      const mask = document.createElement("span");
      mask.style.display = "inline-block";
      mask.style.overflow = "hidden";
      mask.style.marginRight = "0.25em";
      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.textContent = word;
      mask.appendChild(inner);
      el.appendChild(mask);
      return inner;
    });
  }

  const units = text.split("\n");
  return units.map((line) => {
    const mask = document.createElement("span");
    mask.style.display = "block";
    mask.style.overflow = "hidden";
    const inner = document.createElement("span");
    inner.style.display = "block";
    inner.textContent = line;
    mask.appendChild(inner);
    el.appendChild(mask);
    return inner;
  });
}

export function SplitReveal({
  children,
  as = "h2",
  className,
  delay = 0,
  splitBy = "words",
  trigger = "scroll",
}: SplitRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const Tag = as;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const target = container.querySelector<HTMLElement>("[data-split-target]");
    if (!target) return;

    const units = splitText(target, splitBy);

    gsap.set(units, {
      yPercent: 100,
      rotationX: -90,
      transformOrigin: "0% 100%",
      opacity: 0,
    });

    const tween = gsap.to(units, {
      yPercent: 0,
      rotationX: 0,
      opacity: 1,
      duration: 1,
      ease: EASE_VAL as unknown as string,
      stagger: 0.035,
      delay,
      scrollTrigger:
        trigger === "scroll"
          ? { trigger: container, start: "top 80%", once: true }
          : undefined,
    });

    return () => {
      tween.kill();
    };
  }, [children, splitBy, delay, trigger]);

  return (
    <div ref={containerRef} className={className} style={{ perspective: 800 }}>
      <Tag data-split-target style={{ margin: 0 }}>
        {children}
      </Tag>
    </div>
  );
}
