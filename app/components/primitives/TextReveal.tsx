"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  italic?: boolean;
}

export function TextReveal({
  children,
  as: Tag = "p",
  className = "",
  style,
  delay = 0,
  italic = false,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const words = children.split(" ");

  return (
    <Tag className={className} style={style} ref={ref}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            marginRight: "0.3em",
          }}
        >
          <motion.span
            style={{
              display: "inline-block",
              fontStyle: italic ? "italic" : "normal",
            }}
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
