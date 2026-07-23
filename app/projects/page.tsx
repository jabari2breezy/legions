"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { FooterTeaser } from "@/app/components/layout/FooterTeaser";
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
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {projectsIndex.map((p, i) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="project-card"
              >
                <div className="project-card-image" style={{ aspectRatio: "16/10" }}>
                  <img src={`/projects/${p.heroImage.filename}`} alt={p.heroImage.alt} />
                </div>
                <div className="project-card-meta">
                  <span className="project-card-num">({String(i + 1).padStart(2, "0")})</span>
                  <span className="project-card-title">{p.title}</span>
                </div>
              </Link>
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
