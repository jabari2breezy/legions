"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/app/components/layout/Nav";
import { FooterContact } from "@/app/components/layout/FooterContact";
import { SectionReveal } from "@/app/components/primitives/SectionReveal";
import { cursorEnter, cursorLeave } from "@/app/utils/cursor";
import projectsIndex from "@/data/projects-index.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <PageHero />
      <ProjectsRail />
      <FooterContact />
    </>
  );
}

function PageHero() {
  return (
    <div className="section-dark" style={{ paddingTop: "clamp(140px, 20vw, 260px)", paddingBottom: "var(--space-section)" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 16 }}>Projects</p>
          <h1 className="t-display">Our work<br />speaks.</h1>
        </motion.div>
      </div>
    </div>
  );
}

/* ========================================
   Pinned horizontal project rail (GSAP)
   Desktop only — mobile shows vertical cards
   ======================================== */

function ProjectsRail() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      const rail = railRef.current;
      if (!wrapper || !rail) return;

      const totalScroll = rail.scrollWidth - window.innerWidth;

      gsap.to(rail, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="section-dark" style={{ paddingBlock: "var(--space-section)" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {projectsIndex.map((p, i) => (
              <MobileProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="projects-rail-wrapper section-dark"
      style={{ overflow: "hidden" }}
    >
      <div className="projects-rail-container">
        <div ref={railRef} className="projects-rail">
          {projectsIndex.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="project-panel"
              onMouseEnter={() => cursorEnter("Explore")}
              onMouseLeave={cursorLeave}
            >
              <img
                src={`/projects/${p.heroImage.filename}`}
                alt={p.heroImage.alt}
              />
              <div className="project-panel-overlay" />
              <div className="light-reveal" />
              <span className="project-panel-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="project-panel-content">
                <p className="project-panel-cat">{p.category}</p>
                <h3 className="project-panel-title">{p.title}</h3>
                {p.stats[0] && (
                  <p className="project-panel-stat">{p.stats[0].value} {p.stats[0].label}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================================
   Mobile Project Card — Spline/Webflow style
   ======================================== */

function MobileProjectCard({ project, index }: { project: typeof projectsIndex[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const y = useSpring(rawY, { stiffness: 200, damping: 40 });
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [isEven ? -6 : 6, 0, isEven ? 3 : -3]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
  const skewX = useTransform(scrollYProgress, [0, 0.5, 1], [isEven ? -2 : 2, 0, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, perspective: 800, marginBottom: 32 }}
    >
      <Link href={`/projects/${project.slug}`} style={{ display: "block", textDecoration: "none" }}>
        <motion.div
          style={{
            y,
            rotate,
            skewX,
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div style={{ overflow: "hidden", aspectRatio: "16/10" }}>
            <motion.img
              src={`/projects/${project.heroImage.filename}`}
              alt={project.heroImage.alt}
              style={{
                scale: imageScale,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </motion.div>

          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,10,12,0.85) 0%, rgba(10,10,12,0.2) 50%, transparent 100%)",
            pointerEvents: "none",
          }} />

          <div style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: "rgba(10,10,12,0.7)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: 8,
            padding: "6px 10px",
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
            color: "var(--color-cyan)",
            letterSpacing: "0.05em",
          }}>
            {String(index + 1).padStart(2, "0")}
          </div>

          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px 20px 24px",
          }}>
            <p style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--color-cyan)",
              marginBottom: 6,
            }}>
              {project.category}
            </p>
            <h3 style={{
              fontSize: "clamp(22px, 5vw, 30px)",
              fontWeight: 700,
              color: "var(--color-white)",
              lineHeight: 1.15,
              marginBottom: 4,
            }}>
              {project.title}
            </h3>
            {project.stats[0] && (
              <p style={{
                fontSize: 13,
                color: "rgba(250,250,250,0.6)",
                fontWeight: 500,
              }}>
                {project.stats[0].value} {project.stats[0].label}
              </p>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
