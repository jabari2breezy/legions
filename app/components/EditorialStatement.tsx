"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

export function EditorialStatement({ children }: { children: ReactNode }) {
  return (
    <section className="editorial-statement">
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.p>
    </section>
  );
}
