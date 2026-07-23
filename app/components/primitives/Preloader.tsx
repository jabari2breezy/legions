"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 2200;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(progress * 100));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 600);
        }, 300);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="preloader"
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="preloader-wordmark">LEGIONS</div>
          <div className="preloader-counter">{String(count).padStart(3, "0")}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
