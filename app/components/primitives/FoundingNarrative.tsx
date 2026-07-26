"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

const PARAGRAPHS = [
  "In 2022, a group of students at IST asked a simple question: what if we used our skills to fix the things around us?",
  "Not in five years. Not when someone else decides it is time. Right now, with whatever we have.",
  "We started with one beach cleanup. Forty students. Thirty bags of waste. One afternoon that changed how we saw our own potential.",
  "The word spread. More students joined. More projects took shape. We organized tree plantings, renovated classrooms, fed families.",
  "We have raised over TZS 12 million, mobilized more than 500 students across Dar es Salaam, and delivered five flagship projects that prove what student-driven action can accomplish.",
  "We have been building ever since.",
];

function ScrollParagraph({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOpacity(entry.isIntersecting ? 1 : 0);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <p
      ref={ref}
      className="founding-paragraph"
      style={{
        opacity,
        transition: `opacity 0.6s ease ${index * 0.05}s`,
      }}
    >
      {text}
    </p>
  );
}

export function FoundingNarrative() {
  return (
    <div className="founding-narrative">
      <div className="founding-left">
        <div className="founding-sticky">
          <p className="founding-label">THE ORIGIN</p>
          <h2 className="founding-headline">How it began</h2>
        </div>
      </div>
      <div className="founding-right">
        {PARAGRAPHS.map((text, i) => (
          <ScrollParagraph key={i} text={text} index={i} />
        ))}
      </div>
    </div>
  );
}
