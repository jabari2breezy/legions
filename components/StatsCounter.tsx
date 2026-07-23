"use client";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

type Stat = { value: number; prefix?: string; suffix?: string; label: string };

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <span ref={ref}>
      {stat.prefix ?? ""}{count.toLocaleString()}{stat.suffix ?? ""}
    </span>
  );
}

const stats: Stat[] = [
  { value: 12, prefix: "TZS ", suffix: "M+", label: "Funds Raised" },
  { value: 500, suffix: "+", label: "Trees Planted" },
  { value: 5, label: "Major Initiatives" },
  { value: 150, suffix: "+", label: "Active Volunteers" },
];

export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-line">
      {stats.map((s, i) => (
        <div key={i} className="text-center">
          <p className="font-serif text-4xl md:text-5xl tracking-tight">
            <Counter stat={s} />
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted mt-3">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
