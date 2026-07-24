"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { FooterTeaser } from "@/app/components/layout/FooterTeaser";
import { Section } from "@/app/components/primitives/Section";
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
      <TestimonialsSection />
      <FooterTeaserSection />
      <SiteFooter />
    </>
  );
}

/* ========================================
   Hero — layered imagery + hover light
   ======================================== */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const layer1Scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const layer2Scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!glowRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glowRef.current.style.setProperty("--mx", `${x}%`);
    glowRef.current.style.setProperty("--my", `${y}%`);
  }, []);

  return (
    <div className="hero" ref={ref} onMouseMove={handleMouseMove}>
      <div className="hero-bg">
        <img src="/hero-attached.jpg" alt="Legions community impact" />
        <div className="hero-overlay" />
      </div>

      {/* Hover light glow */}
      <div ref={glowRef} className="hero-glow" />

      {/* Subtle layered project photos */}
      <div className="hero-layers">
        <motion.div
          className="hero-layer hero-layer--1"
          style={{ y: layer1Y, scale: layer1Scale }}
        >
          <img src="/projects/amsen-visits/IMG_8275.jpg" alt="AMSEN Visits" />
        </motion.div>
        <motion.div
          className="hero-layer hero-layer--2"
          style={{ y: layer2Y, scale: layer2Scale }}
        >
          <img src="/projects/beach-cleanups/IMG_8270.jpg" alt="Beach Cleanups" />
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
   Editorial Statement
   ======================================== */

function EditorialSection() {
  return (
    <Section className="liquid-metal">
      <motion.div
        className="editorial"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <p>
          Legions was built on a simple belief: students don&apos;t need to wait
          for permission to change their communities. We organize, plan,
          and deliver.
        </p>
      </motion.div>
    </Section>
  );
}

/* ========================================
   Numbered Initiatives — layer transform on scroll
   ======================================== */

function InitiativesSection() {
  return (
    <Section dark>
      <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
        <div style={{ marginBottom: 48 }}>
          <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 12 }}>
            Our Work
          </p>
          <h2 className="t-h1">What we&apos;ve been working on</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {projectsIndex.map((p, i) => (
            <InitiativeCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function InitiativeCard({ project, index }: { project: typeof projectsIndex[0]; index: number }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      viewport={{ once: true, margin: "-40px" }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="project-card"
        onMouseEnter={() => !isMobile && cursorEnter("Explore")}
        onMouseLeave={() => !isMobile && cursorLeave()}
      >
        <div className="project-card-image">
          <img
            src={`/projects/${project.heroImage.filename}`}
            alt={project.heroImage.alt}
            loading={index > 1 ? "lazy" : "eager"}
          />
        </div>
        <div className="project-card-meta">
          <span className="project-card-num">({String(index + 1).padStart(2, "0")})</span>
          <span className="project-card-title">{project.title}</span>
          <span className="project-card-cat">{project.category}</span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ========================================
   Process Columns — staggered slide-up
   ======================================== */

function ProcessSection() {
  return (
    <Section className="liquid-metal">
      <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
        <div style={{ marginBottom: 48 }}>
          <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 12 }}>
            How We Operate
          </p>
          <h2 className="t-h1">From idea to impact</h2>
        </div>
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

/* ========================================
   Testimonials — columns slider style
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
        <div className="testimonials-columns">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card glass-panel"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
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
    </Section>
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
