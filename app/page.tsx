"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { FooterContact } from "@/app/components/layout/FooterContact";
import { Section } from "@/app/components/primitives/Section";
import { TextReveal } from "@/app/components/primitives/TextReveal";
import { SectionReveal } from "@/app/components/primitives/SectionReveal";
import { ImageReveal } from "@/app/components/primitives/ImageReveal";
import { cursorEnter, cursorLeave } from "@/app/utils/cursor";
import projectsIndex from "@/data/projects-index.json";

export default function HomePage() {
  return (
    <>
      <Nav />
      <HeroSection />
      <EditorialSection />
      <InitiativesSection />
      <ProcessSection />
      <FooterContact />
    </>
  );
}

/* ========================================
   Hero — clean, text-forward
   ======================================== */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="hero" ref={ref}>
      <motion.div className="hero-bg" style={{ scale: bgScale }}>
        <img src="/hero-attached.jpg" alt="Legions community impact" />
        <div className="hero-overlay" />
      </motion.div>

      <motion.div
        className="hero-content container"
        style={{ y: textY, opacity: textOpacity }}
      >
        <TextReveal
          as="h1"
          className="hero-title"
          delay={0.3}
        >
          LEGIONS
        </TextReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/projects" className="btn btn-primary">
            Explore Our Work
          </Link>
        </motion.div>
      </motion.div>

      <div className="hero-scroll">
        <div className="hero-scroll-line" />
      </div>
    </div>
  );
}

/* ========================================
   Editorial Statement — dramatic TextReveal
   ======================================== */

function EditorialSection() {
  return (
    <Section className="liquid-metal">
      <div className="editorial">
        <TextReveal
          as="p"
          delay={0}
          italic
        >
          Students building what communities need
        </TextReveal>
      </div>
    </Section>
  );
}

/* ========================================
   Numbered Project List (normalisboring.es style)
   ======================================== */

function InitiativesSection() {
  return (
    <Section dark>
      <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
        <SectionReveal>
          <div style={{ marginBottom: 48 }}>
            <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 12 }}>
              Our Work
            </p>
            <h2 className="t-h1">What we&apos;ve been working on</h2>
          </div>
        </SectionReveal>

        <div className="project-list">
          {projectsIndex.map((p, i) => (
            <ProjectListItem key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProjectListItem({ project, index }: { project: typeof projectsIndex[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-40px" }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="project-list-item"
        onMouseEnter={() => cursorEnter("Explore")}
        onMouseLeave={cursorLeave}
      >
        <span className="project-list-num">{String(index + 1).padStart(2, "0")}</span>
        <div className="project-list-info">
          <span className="project-list-title">{project.title}</span>
          <span className="project-list-cat">{project.category}</span>
        </div>
        <span className="project-list-year">2024</span>
      </Link>
    </motion.div>
  );
}

/* ========================================
   Process Columns — with animations
   ======================================== */

function ProcessSection() {
  return (
    <Section className="liquid-metal">
      <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
        <SectionReveal>
          <div style={{ marginBottom: 48 }}>
            <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 12 }}>
              How We Operate
            </p>
            <h2 className="t-h1">From idea to impact</h2>
          </div>
        </SectionReveal>
        <div className="process-columns">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              className="process-col"
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <span className="process-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

const PROCESS_STEPS = [
  { title: "Identify", desc: "We listen to communities and pinpoint where student energy can make the biggest difference." },
  { title: "Organize", desc: "Volunteers are briefed, logistics are locked, and teams are deployed with clear objectives." },
  { title: "Execute", desc: "On the ground, hands on: beach cleanups, school renovations, food drives, tree planting." },
  { title: "Report", desc: "Every project is documented. Every impact is measured. Full transparency, always." },
];
