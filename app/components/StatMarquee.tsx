"use client";

import { motion } from "motion/react";

interface Stat { value: string; label: string; }

export function StatMarquee({ stats }: { stats: Stat[] }) {
  return (
    <section className="stat-marquee">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="stat-marquee-item"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="stat-value">{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </motion.div>
      ))}
    </section>
  );
}
