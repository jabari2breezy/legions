"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function LoadingFrame({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-[#050507] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(63,224,197,0.08),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_42%)]" />
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.16] [background-image:radial-gradient(rgba(255,255,255,0.45)_0.5px,transparent_0.5px)] [background-size:4px_4px]" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <p className="mb-4 text-[0.72rem] uppercase tracking-[0.42em] text-white/45">
          Legions Club
        </p>
        <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-semibold tracking-[-0.04em] text-white">
          Loading
        </h1>
        <p className="mt-4 max-w-xl text-sm uppercase tracking-[0.3em] text-white/40">
          Preparing a more refined experience
        </p>

        <div className="mt-12 w-full max-w-xl">
          <div className="mb-3 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.28em] text-white/35">
            <span>In progress</span>
            <span>{String(progress).padStart(2, "0")}%</span>
          </div>
          <div className="h-px w-full overflow-hidden bg-white/10">
            <motion.div
              animate={{ scaleX: progress / 100 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.25 }}
              className="h-full origin-left bg-[var(--color-cyan)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageLoadScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    let finished = false;
    const started = performance.now();

    const tick = () => {
      if (finished) return;
      const elapsed = performance.now() - started;
      const next = Math.min(95, Math.floor(elapsed / 16));
      setProgress((current) => (current < next ? next : current));
      raf = requestAnimationFrame(tick);
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      setProgress(100);
      window.setTimeout(() => setVisible(false), 320);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      raf = requestAnimationFrame(tick);
    }

    return () => {
      finished = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("load", finish);
    };
  }, []);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = visible ? "hidden" : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingFrame progress={progress} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function RouteLoadScreen() {
  return <LoadingFrame progress={100} />;
}
