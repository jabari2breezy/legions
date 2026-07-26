"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { ProjectWheel } from "@/app/components/layout/ProjectWheel";

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <PageHero />
      <ProjectWheel />
      <SiteFooter />
    </>
  );
}

function PageHero() {
  return (
    <div style={{
      paddingTop: "clamp(140px, 20vw, 260px)",
      paddingBottom: "clamp(60px, 8vw, 120px)",
      paddingLeft: "clamp(20px, 5vw, 64px)",
      paddingRight: "clamp(20px, 5vw, 64px)",
      borderTop: "1px solid var(--grid-border)",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p style={{
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--mint)",
          marginBottom: 16,
        }}>Projects</p>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(3rem, 8vw, 7.5rem)",
          lineHeight: 0.92,
          letterSpacing: "-0.03em",
        }}>Our work<br />speaks.</h1>
      </motion.div>
    </div>
  );
}
