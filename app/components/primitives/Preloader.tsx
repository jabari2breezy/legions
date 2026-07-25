"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const handleSkip = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(onComplete, 500);
  }, [exiting, onComplete]);

  useEffect(() => {
    if (prefersReduced.current) {
      setCount(100);
      setTimeout(onComplete, 200);
      return;
    }

    let frame: number;
    let start: number | null = null;
    const duration = 2000;

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
          setTimeout(onComplete, 500);
        }, 200);
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
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
          onClick={handleSkip}
          style={{ cursor: "pointer" }}
        >
          <div className="preloader-counter">{String(count).padStart(3, "0")}</div>
          <div className="preloader-line">
            <div
              className="preloader-line-fill"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
