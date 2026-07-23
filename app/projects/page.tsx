"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Nav } from "../components/layout/Nav";
import { SiteFooter } from "../components/layout/SiteFooter";
import { FooterTeaser } from "../components/layout/FooterTeaser";
import { cursorEnter, cursorLeave } from "@/app/utils/cursor";
import projectsIndex from "@/data/projects-index.json";

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <PageHero />
      <ProjectsRail />
      <FooterTeaser
        label="Get Involved"
        title="Your move."
        href="/volunteer"
        imageSrc="/projects/ramadhan-project/IMG_8248.jpg"
      >
        <div style={{ marginTop: 20 }}>
          <Link href="/volunteer" className="btn btn-primary">Volunteer With Us</Link>
        </div>
      </FooterTeaser>
      <SiteFooter />
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
   Pinned horizontal project rail
   ======================================== */

function ProjectsRail() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress to horizontal translate
  // The rail has N panels. We need to translate by (total width - viewport width)
  const totalPanels = projectsIndex.length;
  const panelWidth = 500; // approximate panel + gap
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(totalPanels - 1.5) * panelWidth}px`]
  );

  return (
    <div
      ref={wrapperRef}
      className="projects-rail-wrapper section-dark"
      style={{ height: `${totalPanels * 60}vh` }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
        <motion.div className="projects-rail" style={{ x }}>
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
        </motion.div>
      </div>
    </div>
  );
}
