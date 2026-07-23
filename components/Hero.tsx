"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const overlayY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <Image
          src="/hero-attached.jpg"
          alt="Abstract 3D Chrome and Glass shapes"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      <motion.div style={{ y: overlayY }} className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/10" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xs uppercase tracking-[0.25em] text-muted mb-6"
        >
          Est. 2022 • Dar es Salaam
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[14vw] md:text-[8vw] leading-[0.9]"
        >
          LEGIONS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="max-w-xl mt-6 text-muted"
        >
          Youth-led action. Real community change. The new standard for student-led impact in Tanzania.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex gap-4 mt-10"
        >
          <Link href="/projects" className="px-6 py-3 rounded-full bg-fg text-bg text-sm tracking-wide hover:opacity-90 transition">
            Explore Our Work
          </Link>
          <Link href="/volunteer" className="px-6 py-3 rounded-full border border-line text-sm tracking-wide hover:border-accent hover:text-accent transition">
            Join the Movement
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 inset-x-0 text-center text-xs tracking-[0.2em] text-muted"
      >
        Scroll
      </motion.div>
    </div>
  );
}
