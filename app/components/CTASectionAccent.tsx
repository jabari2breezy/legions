"use client";

import Link from "next/link";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const GlassBlobBackground = dynamic(
  () => import("./WebGL/GlassBlobBackground").then((m) => m.GlassBlobBackground),
  { ssr: false }
);

export function CTASectionAccent() {
  return (
    <section className="cta-accent">
      <GlassBlobBackground />
      <div className="cta-accent-content">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Ready to serve?
        </motion.h2>
        <div className="cta-accent-buttons">
          <Link href="/volunteer" className="btn-primary">Become a Volunteer</Link>
          <Link href="/partner" className="btn-secondary cta-accent-secondary">Partner With Us</Link>
        </div>
      </div>
    </section>
  );
}
