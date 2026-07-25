"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { AsteriskSvg } from "@/app/components/primitives/AsteriskSvg";
import { SectionReveal } from "@/app/components/primitives/SectionReveal";
import { cursorEnter, cursorLeave } from "@/app/utils/cursor";
import projectsIndex from "@/data/projects-index.json";

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <PageHero />
      <ProjectsRail />
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
          <p className="t-label" style={{ color: "var(--color-mint)", marginBottom: 16 }}>
            <AsteriskSvg className="asterisk-motif" size={12} />
            Projects
          </p>
          <h1 className="t-display">Our work<br />speaks.</h1>
        </motion.div>
      </div>
    </div>
  );
}

/* ========================================
   Projects Rail — card grid (no GSAP dependency)
   Desktop: horizontal scroll row
   Mobile: vertical stacked cards
   ======================================== */

function ProjectsRail() {
  return (
    <div className="section-dark" style={{ paddingBlock: "var(--space-section)" }}>
      <div className="container">
        <SectionReveal>
          <div style={{ marginBottom: 48 }}>
            <p className="t-label" style={{ color: "var(--color-mint)", marginBottom: 12 }}>
              All Projects
            </p>
            <h2 className="t-h2">Five initiatives, one mission</h2>
          </div>
        </SectionReveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          gap: 24,
        }}>
          {projectsIndex.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projectsIndex[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-40px" }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="glass-panel"
        style={{
          display: "block",
          overflow: "hidden",
          textDecoration: "none",
          transition: "border-color 0.3s, transform 0.3s var(--ease-smooth)",
        }}
        onMouseEnter={() => cursorEnter("Explore")}
        onMouseLeave={cursorLeave}
      >
        <div style={{ overflow: "hidden", aspectRatio: "16/10" }}>
          <img
            src={`/projects/${project.heroImage.filename}`}
            alt={project.heroImage.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s var(--ease-smooth)",
            }}
          />
        </div>
        <div style={{ padding: "24px 28px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              color: "var(--color-mint)",
            }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span style={{
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-ink-dim)",
            }}>
              {project.category}
            </span>
          </div>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
            color: "var(--color-ink)",
            marginBottom: 8,
            lineHeight: 1.15,
          }}>
            {project.title}
          </h3>
          {project.stats[0] && (
            <p style={{
              fontSize: "0.8rem",
              color: "var(--color-ink-dim)",
            }}>
              {project.stats[0].value} {project.stats[0].label}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
