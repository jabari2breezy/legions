"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { ProjectWheel } from "@/app/components/layout/ProjectWheel";
import { MagneticButton } from "@/app/components/primitives/MagneticButton";
import { cursorEnter, cursorLeave } from "@/app/utils/cursor";

export default function HomePage() {
  return (
    <>
      <Nav />
      <HeroSection />
      <StatsSection />
      <NarrativeSection />
      <ProjectWheel />
      <PlaybookSection />
      <TestimonialsSection />
      <ClosingCTA />
      <SiteFooter />
    </>
  );
}

/* ═══════════════════════════════════════════
   HERO — "LEGIONS" edge-to-edge + 3D parallax
   ═══════════════════════════════════════════ */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const objectRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Africa/Dar_es_Salaam",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouse({ x, y });

    if (objectRef.current) {
      objectRef.current.style.transform =
        `perspective(1200px) rotateX(${y * -8}deg) rotateY(${x * 8}deg)`;
    }
  }, []);

  return (
    <section className="hero" ref={ref} onMouseMove={handleMouseMove}>
      <motion.div className="hero-bg" style={{ scale: bgScale }}>
        <img src="/hero-attached.jpg" alt="Legions community impact" />
        <div className="hero-bg-overlay" />
      </motion.div>

      {/* Decorative 3D ribbon object */}
      <div ref={objectRef} className="hero-3d-object">
        <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M300 50C400 50 500 150 500 300C500 450 400 550 300 550C200 550 100 450 100 300C100 150 200 50 300 50Z"
            stroke="rgba(99,201,168,0.15)"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M300 100C380 100 450 170 450 300C450 430 380 500 300 500C220 500 150 430 150 300C150 170 220 100 300 100Z"
            stroke="rgba(99,201,168,0.1)"
            strokeWidth="0.5"
            fill="none"
          />
          <path
            d="M100 300L500 300"
            stroke="rgba(233,237,241,0.06)"
            strokeWidth="0.5"
          />
          <path
            d="M300 50L300 550"
            stroke="rgba(233,237,241,0.06)"
            strokeWidth="0.5"
          />
          <circle cx="300" cy="300" r="200" stroke="rgba(99,201,168,0.08)" strokeWidth="0.5" fill="none" />
          <circle cx="300" cy="300" r="150" stroke="rgba(198,192,232,0.06)" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Architectural grid overlay */}
      <div className="arch-grid">
        <div /><div /><div /><div />
      </div>

      {/* Corner metadata */}
      <div className="hero-corner hero-corner-tl">
        <span className="hero-meta">EST. 2022 // DAR ES SALAAM</span>
      </div>
      <div className="hero-corner hero-corner-tr">
        <span className="hero-meta">
          LOCAL TIME: EAT (UTC+3) &middot; LIVE
          <span className="hero-live-dot" />
        </span>
      </div>
      <div className="hero-corner hero-corner-bl">
        <span className="hero-meta">STUDENT-LED COMMUNITY SERVICE</span>
      </div>
      <div className="hero-corner hero-corner-br">
        <span className="hero-meta">STATUS: ACTIVE &middot; REF: 01 // HERO</span>
      </div>

      {/* Main title */}
      <div className="hero-content">
        <motion.h1
          className="hero-display-title"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          LEGIONS
        </motion.h1>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   STATS MATRIX — 4-column count-up strip
   ═══════════════════════════════════════════ */

function StatsSection() {
  return (
    <div className="stats-strip">
      {STATS.map((stat, i) => (
        <StatsCell key={i} {...stat} delay={i * 0.1} />
      ))}
    </div>
  );
}

function StatsCell({
  value,
  label,
  numOnly,
  suffix,
  delay,
}: {
  value: number;
  label: string;
  numOnly: boolean;
  suffix: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    const duration = 1600;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const timer = setTimeout(() => requestAnimationFrame(tick), delay * 1000);
    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  return (
    <div className="stats-cell" ref={ref}>
      <span className="stats-value">
        {numOnly ? display.toLocaleString() : value.toLocaleString()}
        {suffix}
      </span>
      <span className="stats-label">{label}</span>
    </div>
  );
}

const STATS = [
  { value: 12, label: "TZS MILLION+ FUNDS RAISED", numOnly: true, suffix: "M+" },
  { value: 500, label: "TREES PLANTED", numOnly: true, suffix: "+" },
  { value: 5, label: "MAJOR INITIATIVES", numOnly: true, suffix: "" },
  { value: 150, label: "ACTIVE VOLUNTEERS", numOnly: true, suffix: "+" },
];

/* ═══════════════════════════════════════════
   NARRATIVE SPLIT — Sticky left / scroll right
   ═══════════════════════════════════════════ */

function NarrativeSection() {
  return (
    <div className="narrative-split">
      <div className="narrative-left">
        <span className="narrative-section-marker">[02] // FOUNDING STATEMENT</span>
        <h2 className="narrative-sticky-headline">
          MOBILIZING YOUTH ACTION IN DAR ES SALAAM SINCE 2022.
        </h2>
      </div>
      <div className="narrative-right">
        <NarrativeParagraph delay={0}>
          Legions was born in 2022 from a single conviction: students don&apos;t need
          permission to change their communities. From a school club in Dar es Salaam,
          a group of young organizers decided to stop waiting for systems to move
          and started moving themselves.
        </NarrativeParagraph>
        <NarrativeParagraph delay={0.1}>
          What began as weekend beach cleanups and school visits became something
          larger &mdash; a <span className="narrative-highlight">structured, transparent,
          student-led machine</span> for delivering real community impact. No bureaucracy.
          No overhead bloat. Just students with a plan, resources, and the will to execute.
        </NarrativeParagraph>
        <NarrativeParagraph delay={0.2}>
          Today, Legions runs five major initiatives across Dar es Salaam: from
          planting 500+ trees at public schools to renovating pediatric care facilities,
          from feeding 1,200+ people during Ramadan to building ongoing relationships
          with special needs students at the AMSEN center.
        </NarrativeParagraph>
        <NarrativeParagraph delay={0.3}>
          The numbers matter, but they&apos;re not the point. The point is that every
          shilling is accounted for, every volunteer hour is tracked, and every
          project is documented end-to-end.{" "}
          <span className="narrative-highlight">Radical transparency isn&apos;t a
          tagline &mdash; it&apos;s the operating system.</span>
        </NarrativeParagraph>
        <NarrativeParagraph delay={0.4}>
          Legions isn&apos;t a charity. It&apos;s proof that when young people
          are trusted with real responsibility, they don&apos;t just meet
          expectations &mdash; they redefine what&apos;s possible.
        </NarrativeParagraph>
      </div>
    </div>
  );
}

function NarrativeParagraph({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.p
      ref={ref}
      className={`narrative-paragraph ${isInView ? "is-visible" : ""}`}
      initial={{ opacity: 0.2, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.p>
  );
}

/* ═══════════════════════════════════════════
   PLAYBOOK — How we operate
   ═══════════════════════════════════════════ */

function PlaybookSection() {
  return (
    <div className="playbook-section">
      <div className="playbook-header">
        <span className="playbook-marker">[03] // THE PLAYBOOK</span>
        <h2 className="playbook-title">From idea to impact</h2>
      </div>
      <div className="playbook-grid">
        {PLAYBOOK_STEPS.map((step, i) => (
          <motion.div
            key={i}
            className="playbook-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <span className="playbook-card-num">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="playbook-card-title">{step.title}</h3>
            <p className="playbook-card-desc">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const PLAYBOOK_STEPS = [
  {
    title: "Identify Needs",
    desc: "We listen to communities and pinpoint exactly where student energy can make the biggest, most tangible difference.",
  },
  {
    title: "Mobilize Resources",
    desc: "Volunteers are briefed, logistics are locked, and teams are deployed with clear objectives and accountability.",
  },
  {
    title: "Execute",
    desc: "On the ground, hands on: beach cleanups, school renovations, food drives, tree planting. No armchair activism.",
  },
  {
    title: "Report Back",
    desc: "Every project is documented. Every impact is measured. Full transparency, always. That's not optional — it's the operating system.",
  },
];

/* ═══════════════════════════════════════════
   TESTIMONIALS — Community Voices
   ═══════════════════════════════════════════ */

function TestimonialsSection() {
  return (
    <div className="testimonials-section">
      <div style={{ marginBottom: "clamp(32px, 4vw, 64px)" }}>
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--mint)",
          }}
        >
          [04] // COMMUNITY VOICES
        </span>
      </div>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            className="testimonial-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="testimonial-quote-mark">&ldquo;</div>
            <p className="testimonial-text">{t.quote}</p>
            <p className="testimonial-author">{t.name}</p>
            <p className="testimonial-role">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  {
    quote: "Legions showed up when no one else would. They didn't just talk about change, they brought paintbrushes, shovels, and a plan.",
    name: "Amina Juma",
    role: "Ujasiri House Director",
  },
  {
    quote: "I joined as a volunteer and left with a community. These students are building something real.",
    name: "David Mwangi",
    role: "Volunteer, Beach Cleanup Team",
  },
  {
    quote: "The transparency is what sets them apart. You see exactly where the effort goes and what it produces.",
    name: "Fatima Osman",
    role: "Community Partner, AMSEN",
  },
];

/* ═══════════════════════════════════════════
   CLOSING CTA — Full-width master CTA
   ═══════════════════════════════════════════ */

function ClosingCTA() {
  return (
    <div className="closing-cta">
      <div className="closing-cta-glow" />
      <motion.div
        className="closing-cta-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <h2 className="closing-cta-title">
          READY TO MAKE<br />AN IMPACT?
        </h2>
        <div className="closing-cta-buttons">
          <MagneticButton>
            <Link href="/volunteer" className="btn-cta-primary">
              Volunteer With Us
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link href="/partner" className="btn-cta-ghost">
              Partner With Legions
            </Link>
          </MagneticButton>
        </div>
      </motion.div>
    </div>
  );
}
