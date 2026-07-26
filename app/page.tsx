"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { Section } from "@/app/components/primitives/Section";
import { SectionReveal } from "@/app/components/primitives/SectionReveal";
import { StatsMatrix } from "@/app/components/primitives/StatsMatrix";
import { FoundingNarrative } from "@/app/components/primitives/FoundingNarrative";
import { PhotoWheel } from "@/app/components/primitives/PhotoWheel";
import { CommunityVoices } from "@/app/components/primitives/CommunityVoices";
import projectsIndex from "@/data/projects-index.json";

export default function HomePage() {
  return (
    <>
      <Nav />
      <HeroSection />
      <StatsMatrix />
      <FoundingNarrative />
      <ProjectsWheelSection />
      <ProcessSection />
      <CommunityVoices />
      <SiteFooter />
    </>
  );
}

/* ========================================
   Hero — CLOU architectural treatment
   ======================================== */

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState("");

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const ribbonsY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const ribbonsOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scrollIndicatorY = useTransform(scrollYProgress, [0, 1], [0, 20]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const utc3 = new Date(now.getTime() + (3 * 60 + now.getTimezoneOffset()) * 60000);
      setTime(utc3.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      className="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Ribbons behind title */}
      <motion.div
        className="hero-ribbons"
        style={{
          y: ribbonsY,
          opacity: ribbonsOpacity,
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
      >
        <div className="hero-ribbon hero-ribbon--1" />
        <div className="hero-ribbon hero-ribbon--2" />
        <div className="hero-ribbon hero-ribbon--3" />
      </motion.div>

      {/* Corner Anchors */}
      <div className="hero-corner hero-corner--tl">EST. 2022</div>
      <div className="hero-corner hero-corner--tr">
        STATUS: ACTIVE
        <span className="hero-pulse" />
      </div>
      <div className="hero-corner hero-corner--bl">DAR ES SALAAM · TANZANIA</div>
      <div className="hero-corner hero-corner--br">LOCAL TIME {time}</div>

      {/* Main Title */}
      <motion.div
        className="hero-content"
        style={{ y: ribbonsY, opacity: ribbonsOpacity }}
      >
        <h1 className="hero-title">LEGIONS</h1>
      </motion.div>

      {/* Scroll Indicator — Right Edge */}
      <motion.div className="hero-scroll" style={{ y: scrollIndicatorY }}>
        <span className="hero-scroll-text">SCROLL</span>
        <div className="hero-scroll-line" />
      </motion.div>
    </div>
  );
}


/* ========================================
   Projects Wheel Section
   ======================================== */

function ProjectsWheelSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = projectsIndex[activeIndex] || projectsIndex[0];

  return (
    <Section dark>
      <div className="projects-wheel-section">
        <div className="projects-wheel-header">
          <p className="projects-wheel-label">FEATURED WORK</p>
          <h2 className="projects-wheel-title">Selected Projects</h2>
        </div>

        <PhotoWheel onActiveChange={setActiveIndex} />

        <div className="projects-wheel-meta">
          <span className="projects-wheel-meta-id">
            PROJECT {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="projects-wheel-meta-title">{activeProject.title}</span>
          <Link
            href={`/projects/${activeProject.slug}`}
            className="projects-wheel-meta-cta"
          >
            VIEW PROJECT
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ========================================
   Process / Playbook — CLOU architectural
   ======================================== */

function ProcessSection() {
  return (
    <Section className="liquid-metal">
      <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
        <SectionReveal>
          <div style={{ marginBottom: 48 }}>
            <p className="t-label" style={{ color: "var(--mint)", marginBottom: 12 }}>
              PLAYBOOK
            </p>
            <h2 className="t-h1">The Process</h2>
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
