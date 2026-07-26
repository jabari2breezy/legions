"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    let frame: number;
    const duration = 2000;

    const tick = (ts: number) => {
      if (!startTime.current) startTime.current = ts;
      const elapsed = ts - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(progress * 100));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDone(true);
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 800);
        }, 400);
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
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="preloader-inner">
            <div className="preloader-counter">
              {String(count).padStart(2, "0")}
            </div>
            <div className="preloader-progress">
              <motion.div
                className="preloader-progress-line"
                initial={{ width: "0%" }}
                animate={{ width: done ? "100%" : `${count}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
