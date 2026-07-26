"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 2400;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * 100));

      if (lineRef.current) {
        lineRef.current.style.width = `${eased * 100}%`;
      }

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 700);
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
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="preloader-counter">
            {String(count).padStart(2, "0")}
            <span style={{ fontSize: "0.4em", color: "var(--ink-dim)", marginLeft: 4 }}>%</span>
          </div>
          <div className="preloader-line">
            <div className="preloader-line-fill" ref={lineRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
