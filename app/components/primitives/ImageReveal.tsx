"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "motion/react";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export function ImageReveal({
  children,
  className = "",
  style,
  delay = 0,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className={className}
      style={{ overflow: "hidden", ...style }}
    >
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={
          isInView
            ? { scale: 1, opacity: 1 }
            : { scale: 1.2, opacity: 0 }
        }
        transition={{
          duration: 1,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
