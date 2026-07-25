"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, useMotionValue } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { AsteriskSvg } from "@/app/components/primitives/AsteriskSvg";
import { TextReveal } from "@/app/components/primitives/TextReveal";
import { SectionReveal } from "@/app/components/primitives/SectionReveal";
import { cursorEnter, cursorLeave } from "@/app/utils/cursor";
import projectsIndex from "@/data/projects-index.json";

export default function HomePage() {
  return (
    <>
      <Nav />
      <HeroSection />
      <StatsStrip />
      <FoundingStatement />
      <ProjectIndexSection />
      <PlaybookSection />
      <CommunityVoices />
      <FinalCta />
      <SiteFooter />
    </>
  );
}

/* ========================================
   Hero — Stanza headline with word reveal
   ======================================== */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const ribbonY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <div className="hero" ref={ref}>
      <div className="hero-bg" />

      <motion.div
        className="hero-ribbon"
        style={{ y: ribbonY }}
      >
        <RibbonSvg />
      </motion.div>

      <motion.div
        className="hero-content container"
        style={{ y: textY, opacity: textOpacity }}
      >
        <p className="hero-eyebrow">
          <AsteriskSvg className="asterisk-motif" size={14} />
          Youth-Led Community Action
        </p>

        <h1 className="hero-stanza">
          <span className="hero-stanza-line">
            <TextReveal as="span" className="hero-stanza-word" delay={0.3}>
              We build what
            </TextReveal>
          </span>
          <span className="hero-stanza-line">
            <TextReveal as="span" className="hero-stanza-word" delay={0.5}>
              communities need.
            </TextReveal>
          </span>
          <span className="hero-stanza-line">
            <TextReveal as="span" className="hero-stanza-word" delay={0.7}>
              Student energy,{' '}
              <em className="t-emphasis">real impact.</em>
            </TextReveal>
          </span>
        </h1>

        <p className="hero-subtext">
          A student-led organization in Dar es Salaam turning volunteer energy
          into documented community outcomes.
        </p>

        <div className="hero-ctas">
          <Link href="/projects" className="btn btn-primary">
            Explore Our Work
          </Link>
          <Link href="/volunteer" className="btn btn-outline">
            Get Involved
          </Link>
        </div>
      </motion.div>

      <div className="hero-scroll">
        <div className="hero-scroll-line" />
      </div>
    </div>
  );
}

/* ========================================
   Stats Strip — animated countup
   ======================================== */

function StatsStrip() {
  return (
    <div className="section-dark" style={{ borderTop: "1px solid var(--border-hairline)", borderBottom: "1px solid var(--border-hairline)" }}>
      <div className="stat-strip container">
        {STATS.map((s, i) => (
          <StatItem key={i} value={s.value} label={s.label} suffix={s.suffix} delay={i * 0.1} />
        ))}
      </div>
    </div>
  );
}

function StatItem({ value, label, suffix, delay }: { value: number; label: string; suffix: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    const duration = 1800;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const timeout = setTimeout(() => requestAnimationFrame(tick), delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-value">
        {suffix === "TZS " ? `${suffix}${display.toLocaleString()}` : `${display.toLocaleString()}${suffix}`}
      </div>
      <div className="stat-label-text">{label}</div>
    </div>
  );
}

const STATS = [
  { value: 12000000, label: "Funds Raised (TZS)", suffix: "TZS " },
  { value: 500, label: "Volunteers", suffix: "+" },
  { value: 5, label: "Major Projects", suffix: "" },
  { value: 150, label: "Active Volunteers", suffix: "+" },
];

/* ========================================
   Founding Statement — word-by-word reveal
   ======================================== */

function FoundingStatement() {
  return (
    <div className="founding-statement">
      <SectionReveal>
        <p>
          Legions started in 2022 as a small group of students in Dar es Salaam who
          refused to sit idle. What began as weekend beach cleanups grew into organized
          community projects spanning education, environment, and infrastructure.{' '}
          <em className="t-emphasis">Today, we mobilize 150+ volunteers across five
          major projects.</em>
        </p>
      </SectionReveal>
    </div>
  );
}

/* ========================================
   Project Index — interactive image swap
   ======================================== */

function ProjectIndexSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const activeProject = activeIdx !== null ? projectsIndex[activeIdx] : null;

  return (
    <div className="project-index">
      <div className="project-index-bg">
        {projectsIndex.map((p, i) => (
          <img
            key={p.slug}
            src={`/projects/${p.heroImage.filename}`}
            alt={p.heroImage.alt}
            className={activeIdx === i ? "is-active" : ""}
          />
        ))}
      </div>

      <div className="project-index-content container">
        <div className="project-index-header">
          <p className="t-label" style={{ color: "var(--color-mint)", marginBottom: 12 }}>
            <AsteriskSvg className="asterisk-motif" size={12} />
            Our Work
          </p>
          <h2 className="t-h1">What we&apos;ve been working on</h2>
        </div>

        <div className="project-index-list">
          {projectsIndex.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="project-index-item"
              onMouseEnter={() => setActiveIdx(i)}
              onMouseLeave={() => setActiveIdx(null)}
              onFocus={() => setActiveIdx(i)}
              onBlur={() => setActiveIdx(null)}
            >
              <span className="project-index-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="project-index-info">
                <span className="project-index-title">{p.title}</span>
                <span className="project-index-cat">{p.category}</span>
              </div>
              <span className="project-index-year">2024</span>
              <div className="project-index-arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 12L12 4M12 4H6M12 4V10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================================
   Playbook — alternating rows
   ======================================== */

function PlaybookSection() {
  return (
    <div className="section-dark">
      <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
        <SectionReveal>
          <div style={{ marginBottom: 48 }}>
            <p className="t-label" style={{ color: "var(--color-mint)", marginBottom: 12 }}>
              <AsteriskSvg className="asterisk-motif" size={12} />
              How We Operate
            </p>
            <h2 className="t-h1">From idea to impact</h2>
          </div>
        </SectionReveal>

        {PLAYBOOK_STEPS.map((step, i) => (
          <div className="playbook-row" key={i}>
            <div className="playbook-num">{String(i + 1).padStart(2, "0")}</div>
            <motion.div
              className="playbook-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PLAYBOOK_STEPS = [
  { title: "Identify", desc: "We listen to communities and pinpoint where student energy can make the biggest difference." },
  { title: "Organize", desc: "Volunteers are briefed, logistics are locked, and teams are deployed with clear objectives." },
  { title: "Execute", desc: "On the ground, hands on: beach cleanups, school renovations, food drives, tree planting." },
  { title: "Report", desc: "Every project is documented. Every impact is measured. Full transparency, always." },
];

/* ========================================
   Community Voices — editorial quotes
   ======================================== */

function CommunityVoices() {
  return (
    <div className="section-dark" style={{ borderTop: "1px solid var(--border-hairline)" }}>
      <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
        <SectionReveal>
          <div style={{ marginBottom: 48, textAlign: "center" }}>
            <p className="t-label" style={{ color: "var(--color-mint)", marginBottom: 12 }}>
              <AsteriskSvg className="asterisk-motif" size={12} />
              Community Voices
            </p>
            <h2 className="t-h1">What people say</h2>
          </div>
        </SectionReveal>

        <div className="voices-grid">
          {VOICES.map((v, i) => (
            <motion.div
              key={i}
              className="voice-card glass-panel"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <span className="voice-quote-mark">&ldquo;</span>
              <p className="voice-text">{v.text}</p>
              <p className="voice-author">{v.author}</p>
              <p className="voice-role">{v.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const VOICES = [
  {
    text: "Legions doesn't just talk about change. They show up, do the work, and document everything. That's rare.",
    author: "AMSEN Center Staff",
    role: "Community Partner",
  },
  {
    text: "I signed up for a beach cleanup and ended up leading a team. That's how things work here.",
    author: "Volunteer",
    role: "2023 Cohort",
  },
  {
    text: "Every shilling is tracked. Every outcome is reported. Full transparency, no exceptions.",
    author: "Project Lead",
    role: "Ramadhan Project",
  },
];

/* ========================================
   Final CTA — full bleed
   ======================================== */

function FinalCta() {
  return (
    <div className="final-cta">
      <div className="final-cta-ribbon" style={{ top: "10%", left: "5%" }}>
        <RibbonSvg />
      </div>
      <div className="final-cta-ribbon" style={{ bottom: "10%", right: "5%", transform: "scaleX(-1)" }}>
        <RibbonSvg />
      </div>

      <div className="final-cta-content">
        <SectionReveal>
          <h2 className="final-cta-title">
            Ready to make a{' '}
            <em className="t-emphasis">difference?</em>
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <div className="final-cta-buttons">
            <Link href="/volunteer" className="btn btn-primary">
              Join as Volunteer
            </Link>
            <Link href="/partner" className="btn btn-outline">
              Partner With Us
            </Link>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}

/* ========================================
   Ribbon SVG — chrome-mint abstract figure
   ======================================== */

function RibbonSvg() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id="ribbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e9edf1" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#63c9a8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4c3fc4" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="ribbonGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8fdcc0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3a2e9e" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* Central figure — abstract humanoid silhouette */}
      <ellipse cx="200" cy="130" rx="35" ry="40" fill="url(#ribbonGrad1)" opacity="0.6" />
      <path
        d="M200 170 C200 170 160 200 150 260 C140 320 170 370 200 380 C230 370 260 320 250 260 C240 200 200 170 200 170Z"
        fill="url(#ribbonGrad1)"
        opacity="0.4"
      />
      {/* Flowing ribbons */}
      <path
        d="M160 150 C120 180 80 160 40 200 C0 240 40 300 100 280"
        stroke="url(#ribbonGrad2)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M240 150 C280 180 320 160 360 200 C400 240 360 300 300 280"
        stroke="url(#ribbonGrad1)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M170 180 C130 220 90 200 50 250 C30 280 70 320 130 300"
        stroke="url(#ribbonGrad2)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M230 180 C270 220 310 200 350 250 C370 280 330 320 270 300"
        stroke="url(#ribbonGrad1)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
}
