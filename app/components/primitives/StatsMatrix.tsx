"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface Stat {
  value: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "12M+", numericValue: 12, prefix: "TZS ", suffix: "M+", label: "Total Funds Raised" },
  { value: "500+", numericValue: 500, suffix: "+", label: "Students Mobilized" },
  { value: "5", numericValue: 5, label: "Flagship Projects" },
  { value: "150+", numericValue: 150, suffix: "+", label: "Trees Planted" },
];

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function useCountUp(target: number, duration: number, shouldStart: boolean, delay: number) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!shouldStart) return;

    const timeout = setTimeout(() => {
      const animate = (ts: number) => {
        if (!startTime.current) startTime.current = ts;
        const elapsed = ts - startTime.current;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        setCount(Math.round(easedProgress * target));

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [shouldStart, target, duration, delay]);

  return count;
}

function StatCell({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(stat.numericValue, 2500, isInView, index * 150);

  return (
    <motion.div
      className="stat-cell"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="stat-value">
        {stat.prefix || ""}{count}{stat.suffix || ""}
      </span>
      <span className="stat-label">{stat.label}</span>
    </motion.div>
  );
}

export function StatsMatrix() {
  return (
    <div className="stats-matrix">
      {STATS.map((stat, i) => (
        <StatCell key={stat.label} stat={stat} index={i} />
      ))}
    </div>
  );
}
