"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Nav } from "../components/layout/Nav";
import { SiteFooter } from "../components/layout/SiteFooter";
import { FooterTeaser } from "../components/layout/FooterTeaser";
import { Section } from "../components/primitives/Section";
import { cursorEnter, cursorLeave } from "../utils/cursor";
import projectsIndex from "@/data/projects-index.json";

export default function HomePage() {
  return (
    <>
      <Nav />
      <HeroSection />
      <StatsSection />
      <EditorialSection />
      <InitiativesSection />
      <ProcessSection />
      <TestimonialsSection />
      <FooterTeaserSection />
      <SiteFooter />
    </>
  );
}

/* ========================================
   Hero — layered imagery + mask text
   ======================================== */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="hero" ref={ref}>
      <div className="hero-bg">
        <img src="/hero-attached.jpg" alt="Legions community impact" />
        <div className="hero-overlay" />
      </div>

      {/* Layered project photos */}
      <div className="hero-layers">
        <motion.div
          className="hero-layer"
          style={{
            y: layer1Y,
            width: "28vw",
            height: "38vh",
            right: "8%",
            top: "12%",
            opacity: 0.75,
          }}
        >
          <img src="/projects/amsen-visits/IMG_8275.jpg" alt="AMSEN Visits" />
        </motion.div>
        <motion.div
          className="hero-layer"
          style={{
            y: layer2Y,
            width: "22vw",
            height: "30vh",
            right: "28%",
            top: "5%",
            opacity: 0.5,
          }}
        >
          <img src="/projects/beach-cleanups/IMG_8270.jpg" alt="Beach Cleanups" />
        </motion.div>
        <motion.div
          className="hero-layer"
          style={{
            y: layer3Y,
            width: "20vw",
            height: "26vh",
            right: "4%",
            bottom: "18%",
            opacity: 0.45,
          }}
        >
          <img src="/projects/tree-planting/IMG_8271.jpg" alt="Tree Planting" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="hero-content container"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          <span className="hero-badge-text">Est. 2022 · Dar es Salaam</span>
        </div>
        <h1 className="hero-title">
          LEGIONS
        </h1>
        <p className="hero-subtitle">
          Youth-led action. Real community change. The new standard for
          student-led impact in Tanzania.
        </p>
        <div className="hero-ctas">
          <Link href="/projects" className="btn btn-primary">
            Explore Our Work
          </Link>
          <Link href="/volunteer" className="btn btn-outline">
            Join the Movement
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
   Stats
   ======================================== */

function StatsSection() {
  return (
    <Section dark>
      <div className="container">
        <div className="stat-row">
          {STATS.map((s) => (
            <div className="stat-item" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label-text">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

const STATS = [
  { value: "1,200+", label: "Individuals Reached" },
  { value: "500+", label: "Trees Planted" },
  { value: "150+", label: "Active Volunteers" },
  { value: "5", label: "Major Projects" },
];

/* ========================================
   Editorial Statement
   ======================================== */

function EditorialSection() {
  return (
    <Section>
      <motion.div
        className="editorial"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <p>
          Legions was built on a simple belief: students don&apos;t need to wait
          for permission to change their communities. We organize, we show up,
          and we get it done.
        </p>
      </motion.div>
    </Section>
  );
}

/* ========================================
   Numbered Initiatives
   ======================================== */

function InitiativesSection() {
  return (
    <Section dark>
      <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
        <div style={{ marginBottom: 48 }}>
          <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 12 }}>
            Our Work
          </p>
          <h2 className="t-h1">Initiatives that move the needle</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {projectsIndex.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <Link
                href={`/projects/${p.slug}`}
                className="project-card"
                onMouseEnter={() => cursorEnter("Explore")}
                onMouseLeave={cursorLeave}
              >
                <div className="project-card-image">
                  <img
                    src={`/projects/${p.heroImage.filename}`}
                    alt={p.heroImage.alt}
                  />
                </div>
                <div className="project-card-meta">
                  <span className="project-card-num">({String(i + 1).padStart(2, "0")})</span>
                  <span className="project-card-title">{p.title}</span>
                  <span className="project-card-cat">{p.category}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ========================================
   Process Columns
   ======================================== */

function ProcessSection() {
  return (
    <Section>
      <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
        <div style={{ marginBottom: 48 }}>
          <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 12 }}>
            How We Operate
          </p>
          <h2 className="t-h1">From idea to impact</h2>
        </div>
        <div className="process-columns">
          {PROCESS_STEPS.map((step, i) => (
            <div className="process-col" key={i}>
              <span className="process-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

const PROCESS_STEPS = [
  { title: "Identify", desc: "We listen to communities and pinpoint where student energy can make the biggest difference." },
  { title: "Organize", desc: "Volunteers are briefed, logistics are locked, and teams are deployed with clear objectives." },
  { title: "Execute", desc: "On the ground, hands on — beach cleanups, school renovations, food drives, tree planting." },
  { title: "Report", desc: "Every project is documented. Every impact is measured. Full transparency, always." },
];

/* ========================================
   Testimonials
   ======================================== */

function TestimonialsSection() {
  return (
    <Section dark>
      <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
        <div style={{ marginBottom: 48 }}>
          <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 12 }}>
            Voices
          </p>
          <h2 className="t-h1">What people say</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="testimonial-quote-mark">"</div>
              <p className="testimonial-text">{t.quote}</p>
              <p className="testimonial-author">{t.name}</p>
              <p className="testimonial-role">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

const TESTIMONIALS = [
  {
    quote: "Legions showed up when no one else would. They didn't just talk about change — they brought paintbrushes, shovels, and a plan.",
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

/* ========================================
   Footer Teaser
   ======================================== */

function FooterTeaserSection() {
  return (
    <FooterTeaser
      label="Next Project"
      title="Beach Cleanups"
      href="/projects/beach-cleanups"
      imageSrc="/projects/beach-cleanups/IMG_8270.jpg"
    >
      <div style={{ marginTop: 20 }}>
        <Link href="/projects/beach-cleanups" className="btn btn-primary">
          View Project
        </Link>
      </div>
    </FooterTeaser>
  );
}
