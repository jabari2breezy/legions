"use client";

import { useState, useCallback, useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";

/* ─── Shared animation helpers ─── */

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.06, ease },
  }),
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease },
  }),
};

function Reveal({
  children,
  className = "",
  variants = fadeUp,
  index = 0,
  once = true,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  index?: number;
  once?: boolean;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      custom={index}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({
  children,
  className = "",
  href,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? "a" : "button";

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-block">
      <Tag
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={className}
      >
        {children}
      </Tag>
    </motion.div>
  );
}

/* ─── Preloader ─── */

function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    let current = 0;
    const id = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(id);
        setCount(100);
        setTimeout(() => setExit(true), 400);
      } else {
        setCount(current);
      }
    }, 50);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (exit) {
      const t = setTimeout(onComplete, 900);
      return () => clearTimeout(t);
    }
  }, [exit, onComplete]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "var(--navy)" }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            className="text-center"
          >
            <div
              className="font-serif text-[clamp(4rem,14vw,12rem)] font-light leading-none tabular-nums"
              style={{ color: "var(--cyan)" }}
            >
              {count}
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ duration: 1.5, ease }}
              className="h-px mx-auto mt-8 mb-4"
              style={{ background: "var(--cyan)", opacity: 0.3 }}
            />
            <div
              className="font-mono text-[10px] tracking-[0.5em] uppercase"
              style={{ color: "var(--steel)" }}
            >
              Legions Club
            </div>
          </motion.div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-24 h-px overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
            <motion.div
              className="h-full"
              style={{ background: "var(--cyan)" }}
              initial={{ x: "-100%" }}
              animate={{ x: `${count - 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Navbar ─── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        background: scrolled ? "rgba(6,10,20,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center font-serif text-sm font-bold"
            style={{
              background: "linear-gradient(135deg, var(--cyan), #068896)",
              color: "var(--yale)",
            }}
          >
            L
          </motion.div>
          <span
            className="font-serif text-lg font-medium hidden sm:block"
            style={{ color: "var(--foreground)" }}
          >
            Legions Club
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {["About", "Programs", "Work", "Impact"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300"
              style={{ color: "rgba(213,237,245,0.45)" }}
              whileHover={{ color: "rgba(17,199,202,1)" }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        <MagneticButton href="#join">
          <motion.span
            className="inline-flex items-center px-6 py-2.5 text-[11px] font-mono font-medium tracking-[0.15em] uppercase rounded-full"
            style={{ background: "var(--cyan)", color: "var(--yale)" }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(17,199,202,0.25)" }}
            whileTap={{ scale: 0.97 }}
          >
            Join Now
          </motion.span>
        </MagneticButton>
      </div>
    </motion.nav>
  );
}

/* ─── Hero ─── */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* ambient glow */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(17,199,202,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          y: useTransform(scrollYProgress, [0, 1], [0, 80]),
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(62,93,224,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
          y: useTransform(scrollYProgress, [0, 1], [0, -60]),
        }}
      />

      <motion.div
        style={{ y: yText, opacity: yOpacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-32 w-full"
      >
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-12 h-px" style={{ background: "var(--cyan)" }} />
            <span
              className="font-mono text-[11px] tracking-[0.4em] uppercase"
              style={{ color: "var(--cyan)" }}
            >
              Est. 2024
            </span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif text-[clamp(3.5rem,9vw,9rem)] leading-[0.88] font-light tracking-[-0.02em]"
              style={{ color: "var(--foreground)" }}
            >
              Building
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.62, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif text-[clamp(3.5rem,9vw,9rem)] leading-[0.88] font-light tracking-[-0.02em]"
              style={{ color: "var(--foreground)" }}
            >
              <span className="gradient-text font-semibold italic">Tomorrow&apos;s</span>
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.74, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif text-[clamp(3.5rem,9vw,9rem)] leading-[0.88] font-light tracking-[-0.02em]"
              style={{ color: "var(--foreground)" }}
            >
              Leaders
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease }}
            className="text-lg sm:text-xl max-w-lg leading-relaxed mb-14"
            style={{ color: "var(--steel)" }}
          >
            Empowering the next generation through mentorship, community, and the relentless pursuit of excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15, ease }}
            className="flex flex-wrap gap-5"
          >
            <MagneticButton href="#join">
              <motion.span
                className="inline-flex items-center gap-3 px-9 py-4.5 text-sm font-medium tracking-wide uppercase rounded-full"
                style={{ background: "var(--cyan)", color: "var(--yale)" }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(17,199,202,0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                Join the Movement
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </MagneticButton>

            <MagneticButton href="#glimpse">
              <motion.span
                className="glass inline-flex items-center gap-3 px-9 py-4.5 text-sm font-medium tracking-wide uppercase rounded-full"
                style={{ color: "var(--cyan)" }}
                whileHover={{ scale: 1.03, borderColor: "var(--border-hover)" }}
                whileTap={{ scale: 0.97 }}
              >
                See Our Work
              </motion.span>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: "var(--cyan)" }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-14"
          style={{ background: "var(--cyan)" }}
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

/* ─── About ─── */

function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-32 sm:py-44"
      style={{ background: "var(--yale-dark)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-px" style={{ background: "var(--cyan)" }} />
                <span
                  className="font-mono text-[11px] tracking-[0.4em] uppercase"
                  style={{ color: "var(--cyan)" }}
                >
                  About
                </span>
              </div>
            </Reveal>
            <Reveal index={1}>
              <h2
                className="font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[0.92] font-light"
                style={{ color: "var(--foreground)" }}
              >
                Our
                <br />
                <span className="italic font-semibold" style={{ color: "var(--cyan)" }}>
                  Mission
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <Reveal index={2}>
              <p
                className="text-lg sm:text-xl leading-[1.7]"
                style={{ color: "var(--mist)" }}
              >
                Legions Club exists to cultivate extraordinary young individuals
                who will shape the future. We believe every young person carries
                the potential for greatness — our role is to ignite that spark.
              </p>
            </Reveal>
            <Reveal index={3}>
              <p
                className="text-base leading-[1.8] opacity-70"
                style={{ color: "var(--mist)" }}
              >
                Through carefully designed programs, world-class mentorship, and a
                community that champions ambition, we create environments where
                young leaders don&apos;t just learn — they transform.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-3 gap-10 pt-10">
              {[
                { num: "500+", label: "Youth Impacted" },
                { num: "50+", label: "Mentors" },
                { num: "12", label: "Programs" },
              ].map((stat, i) => (
                <Reveal key={stat.label} index={4 + i}>
                  <div>
                    <div
                      className="font-serif text-4xl sm:text-5xl font-light mb-2"
                      style={{ color: "var(--cyan)" }}
                    >
                      {stat.num}
                    </div>
                    <div
                      className="font-mono text-[10px] tracking-[0.25em] uppercase"
                      style={{ color: "var(--steel)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Programs ─── */

function ProgramsSection() {
  const programs = [
    {
      tag: "01",
      title: "Leadership Academy",
      desc: "Intensive leadership development through real-world challenges, public speaking, and strategic thinking workshops.",
      accent: "var(--cyan)",
    },
    {
      tag: "02",
      title: "Mentorship Circle",
      desc: "One-on-one pairing with industry professionals who guide, inspire, and open doors for the next generation.",
      accent: "var(--turquoise)",
    },
    {
      tag: "03",
      title: "Community Impact",
      desc: "Hands-on projects that create measurable change in local communities while building character and purpose.",
      accent: "var(--neon)",
    },
    {
      tag: "04",
      title: "Creative Lab",
      desc: "A space for young innovators to explore technology, art, and design thinking through collaborative projects.",
      accent: "var(--indigo)",
    },
  ];

  return (
    <section
      id="programs"
      className="relative py-32 sm:py-44"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-24">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-px" style={{ background: "var(--cyan)" }} />
              <span
                className="font-mono text-[11px] tracking-[0.4em] uppercase"
                style={{ color: "var(--cyan)" }}
              >
                Programs
              </span>
            </div>
          </Reveal>
          <Reveal index={1}>
            <h2
              className="font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[0.92] font-light max-w-2xl"
              style={{ color: "var(--foreground)" }}
            >
              Where Ambition
              <br />
              Meets{" "}
              <span className="italic font-semibold" style={{ color: "var(--cyan)" }}>
                Opportunity
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {programs.map((p, i) => (
            <Reveal key={p.tag} variants={scaleUp} index={i}>
              <motion.div
                className="glass shimmer-border rounded-2xl p-8 sm:p-10 group cursor-pointer relative overflow-hidden"
                whileHover={{ y: -6, transition: { duration: 0.35, ease } }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at 30% 50%, ${p.accent}08 0%, transparent 60%)`,
                  }}
                />
                <div className="relative">
                  <div
                    className="font-mono text-[10px] tracking-[0.35em] uppercase mb-6"
                    style={{ color: p.accent }}
                  >
                    {p.tag}
                  </div>
                  <h3
                    className="font-serif text-2xl sm:text-3xl font-medium mb-4"
                    style={{ color: "var(--foreground)" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="leading-relaxed text-[15px] opacity-60"
                    style={{ color: "var(--mist)" }}
                  >
                    {p.desc}
                  </p>
                  <motion.div
                    className="mt-8 flex items-center gap-2 text-sm font-medium"
                    style={{ color: p.accent }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    Learn more
                    <motion.svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      whileHover={{ x: 4 }}
                    >
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </motion.div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── A Glimpse ─── */

function GlimpseSection() {
  const projects = [
    {
      num: "01",
      title: "Leadership Summit 2024",
      category: "Leadership",
      desc: "50 young leaders gathered for a weekend of transformation.",
      accent: "var(--cyan)",
    },
    {
      num: "02",
      title: "Community Garden Build",
      category: "Community Impact",
      desc: "Built 3 urban gardens serving 200+ families in need.",
      accent: "var(--turquoise)",
    },
    {
      num: "03",
      title: "Tech Innovation Lab",
      category: "Creative",
      desc: "Students built and shipped their first apps in 8 weeks.",
      accent: "var(--indigo)",
    },
    {
      num: "04",
      title: "Mentor Matching Gala",
      category: "Mentorship",
      desc: "Paired 120 youth with industry professionals.",
      accent: "var(--neon)",
    },
  ];

  return (
    <section
      id="glimpse"
      className="relative py-32 sm:py-44 overflow-hidden"
      style={{ background: "var(--yale-dark)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-20">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-px" style={{ background: "var(--cyan)" }} />
              <span
                className="font-mono text-[11px] tracking-[0.4em] uppercase"
                style={{ color: "var(--cyan)" }}
              >
                A Glimpse
              </span>
            </div>
          </Reveal>
          <Reveal index={1}>
            <h2
              className="font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[0.92] font-light max-w-2xl"
              style={{ color: "var(--foreground)" }}
            >
              Our Work in
              <br />
              <span className="italic font-semibold" style={{ color: "var(--cyan)" }}>
                Action
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.num} variants={scaleUp} index={i}>
              <motion.div
                className="glass shimmer-border rounded-2xl p-8 sm:p-10 group cursor-pointer relative overflow-hidden"
                whileHover={{ y: -6, transition: { duration: 0.35, ease } }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at 70% 30%, ${p.accent}10 0%, transparent 60%)`,
                  }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="font-mono text-[10px] tracking-[0.35em] uppercase"
                      style={{ color: p.accent }}
                    >
                      {p.category}
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-[0.2em] opacity-30"
                      style={{ color: "var(--mist)" }}
                    >
                      {p.num}
                    </span>
                  </div>

                  <h3
                    className="font-serif text-2xl sm:text-3xl font-medium mb-3"
                    style={{ color: "var(--foreground)" }}
                  >
                    {p.title}
                  </h3>

                  <p
                    className="leading-relaxed text-[15px] opacity-60 mb-8"
                    style={{ color: "var(--mist)" }}
                  >
                    {p.desc}
                  </p>

                  <motion.div
                    className="flex items-center gap-2 text-sm font-medium"
                    style={{ color: p.accent }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    View Project
                    <motion.svg width="14" height="14" viewBox="0 0 16 16" fill="none" whileHover={{ x: 4 }}>
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </motion.div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Impact ─── */

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {val}{suffix}
    </span>
  );
}

function ImpactSection() {
  return (
    <section
      id="impact"
      className="relative py-32 sm:py-44 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--background) 0%, var(--yale-dark) 100%)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-10 h-px" style={{ background: "var(--cyan)" }} />
            <span
              className="font-mono text-[11px] tracking-[0.4em] uppercase"
              style={{ color: "var(--cyan)" }}
            >
              Our Impact
            </span>
            <div className="w-10 h-px" style={{ background: "var(--cyan)" }} />
          </div>
        </Reveal>

        <Reveal index={1}>
          <h2
            className="font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[0.9] font-light mb-20"
            style={{ color: "var(--foreground)" }}
          >
            Numbers That
            <br />
            <span className="italic font-semibold gradient-text">Speak</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-14">
          {[
            { value: 98, suffix: "%", label: "Completion Rate", accent: "var(--cyan)" },
            { value: 49, suffix: "", label: "Mentor Rating", accent: "var(--turquoise)" },
            { value: 85, suffix: "%", label: "College Acceptance", accent: "var(--neon)" },
            { value: 3, suffix: "x", label: "Leadership Growth", accent: "var(--indigo)" },
          ].map((stat, i) => (
            <Reveal key={stat.label} index={i}>
              <div className="text-center">
                <div
                  className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light mb-4 glow"
                  style={{ color: stat.accent }}
                >
                  {stat.value === 49 ? (
                    <span>4.9</span>
                  ) : (
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div
                  className="font-mono text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: "var(--steel)" }}
                >
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */

function CTASection() {
  return (
    <section
      id="join"
      className="relative py-32 sm:py-44"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-10 h-px" style={{ background: "var(--cyan)" }} />
            <span
              className="font-mono text-[11px] tracking-[0.4em] uppercase"
              style={{ color: "var(--cyan)" }}
            >
              Get Involved
            </span>
            <div className="w-10 h-px" style={{ background: "var(--cyan)" }} />
          </div>
        </Reveal>

        <Reveal index={1}>
          <h2
            className="font-serif text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.9] font-light mb-8"
            style={{ color: "var(--foreground)" }}
          >
            Ready to
            <br />
            <span className="italic font-semibold" style={{ color: "var(--cyan)" }}>
              Lead?
            </span>
          </h2>
        </Reveal>

        <Reveal index={2}>
          <p
            className="text-lg max-w-xl mx-auto mb-14 leading-relaxed"
            style={{ color: "var(--steel)" }}
          >
            Whether you&apos;re a young leader seeking growth or a mentor ready
            to make a difference, there&apos;s a place for you in the Legions.
          </p>
        </Reveal>

        <Reveal index={3}>
          <div className="flex flex-wrap justify-center gap-5">
            <MagneticButton href="#">
              <motion.span
                className="inline-flex items-center gap-3 px-10 py-5 text-sm font-medium tracking-wide uppercase rounded-full"
                style={{ background: "var(--cyan)", color: "var(--yale)" }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 50px rgba(17,199,202,0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                Apply Now
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </MagneticButton>

            <MagneticButton href="#">
              <motion.span
                className="glass inline-flex items-center gap-3 px-10 py-5 text-sm font-medium tracking-wide uppercase rounded-full"
                style={{ color: "var(--cyan)" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Become a Mentor
              </motion.span>
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ─── */

function Footer() {
  const cols = [
    {
      heading: "Organization",
      links: ["About", "Mission", "Team", "Careers"],
    },
    {
      heading: "Programs",
      links: ["Leadership Academy", "Mentorship Circle", "Community Impact", "Creative Lab"],
    },
    {
      heading: "Connect",
      links: ["Instagram", "Twitter / X", "LinkedIn", "YouTube"],
    },
    {
      heading: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
  ];

  return (
    <footer
      className="relative pt-24 pb-8"
      style={{ background: "var(--yale-dark)" }}
    >
      <div className="divider max-w-[1400px] mx-auto mb-20" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-14 mb-20">
          {cols.map((col, ci) => (
            <Reveal key={col.heading} index={ci}>
              <div>
                <div
                  className="font-mono text-[9px] tracking-[0.35em] uppercase mb-6"
                  style={{ color: "var(--cyan)" }}
                >
                  {col.heading}
                </div>
                <ul className="space-y-3.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        className="text-[13px] block"
                        style={{ color: "rgba(213,237,245,0.45)" }}
                        whileHover={{ color: "rgba(213,237,245,1)", x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Reveal>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-serif text-sm font-bold"
                style={{
                  background: "linear-gradient(135deg, var(--cyan), #068896)",
                  color: "var(--yale)",
                }}
              >
                L
              </div>
              <span className="font-serif text-base font-medium" style={{ color: "var(--foreground)" }}>
                Legions Club
              </span>
            </div>
          </Reveal>

          <div
            className="font-mono text-[9px] tracking-[0.2em] uppercase opacity-30"
            style={{ color: "var(--mist)" }}
          >
            &copy; {new Date().getFullYear()} Legions Club. All rights reserved.
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-[0.025] pointer-events-none select-none">
        <span
          className="font-serif text-[clamp(4rem,12vw,10rem)] font-bold whitespace-nowrap"
          style={{ color: "var(--foreground)" }}
        >
          LEGIONS
        </span>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const onPreloaderDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Preloader onComplete={onPreloaderDone} />

      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            <main>
              <HeroSection />
              <AboutSection />
              <ProgramsSection />
              <GlimpseSection />
              <ImpactSection />
              <CTASection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
