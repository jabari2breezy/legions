"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";

export default function AboutPage() {
  return (
    <>
      <Nav />
      <PageHero />
      <StorySection />
      <TenetsSection />
      <TimelineSection />
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
        }}>About Us</p>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(3rem, 8vw, 7.5rem)",
          lineHeight: 0.92,
          letterSpacing: "-0.03em",
        }}>Built different.<br />Built to last.</h1>
      </motion.div>
    </div>
  );
}

function StorySection() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "clamp(40px, 6vw, 96px)",
      padding: "clamp(60px, 8vw, 120px) clamp(20px, 5vw, 64px)",
      borderTop: "1px solid var(--grid-border)",
      borderBottom: "1px solid var(--grid-border)",
      alignItems: "start",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p style={{
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--mint)",
          marginBottom: 16,
        }}>Our Story</p>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: 24,
        }}>From a school club to a movement</h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 16, color: "var(--ink-dim)" }}>
          Legions started in 2022 as a small group of students in Dar es Salaam who
          refused to sit idle. What began as weekend beach cleanups grew into organized
          community projects spanning education, environment, and infrastructure.
        </p>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 16, color: "var(--ink-dim)" }}>
          Today, Legions engages over 150 volunteers and has reached more than 1,200
          individuals across five major projects. Every initiative is youth-led,
          community-driven, and fully documented.
        </p>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-dim)" }}>
          We don&apos;t wait for funding. We don&apos;t wait for permission. We organize,
          build, and deliver.
        </p>
      </motion.div>
    </div>
  );
}

function TenetsSection() {
  return (
    <div style={{
      padding: "clamp(60px, 8vw, 120px) clamp(20px, 5vw, 64px)",
      borderTop: "1px solid var(--grid-border)",
      borderBottom: "1px solid var(--grid-border)",
    }}>
      <div style={{ marginBottom: "clamp(32px, 4vw, 64px)" }}>
        <p style={{
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--mint)",
          marginBottom: 12,
        }}>Core Tenets</p>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}>What we stand on</h2>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 1,
        background: "var(--grid-border)",
        maxWidth: 1100,
      }}>
        {TENETS.map((t, i) => (
          <motion.div
            key={i}
            style={{
              background: "var(--indigo-deep)",
              padding: "clamp(24px, 3vw, 40px)",
              display: "flex",
              flexDirection: "column",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <span style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
              color: "var(--ink-dim)",
              opacity: 0.15,
              lineHeight: 1,
              marginBottom: 20,
            }}>{String(i + 1).padStart(2, "0")}</span>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.1rem",
              marginBottom: 8,
              textTransform: "uppercase",
            }}>{t.title}</h3>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--ink-dim)" }}>{t.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const TENETS = [
  { title: "Youth-Led, Always", desc: "Every project is organized and executed by students. No top-down directives, just grassroots energy channeled with purpose." },
  { title: "Radical Transparency", desc: "Every shilling is tracked. Every outcome is documented. We publish results because accountability is non-negotiable." },
  { title: "Consistency Over One-Offs", desc: "One-time events don't change communities. Showing up repeatedly and following through does." },
  { title: "Community First", desc: "We don't impose solutions. We listen, collaborate, and build what communities actually need." },
];

function TimelineSection() {
  return (
    <div style={{
      padding: "clamp(60px, 8vw, 120px) clamp(20px, 5vw, 64px)",
      borderTop: "1px solid var(--grid-border)",
      borderBottom: "1px solid var(--grid-border)",
    }}>
      <div style={{ marginBottom: "clamp(32px, 4vw, 64px)" }}>
        <p style={{
          fontSize: "0.65rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--mint)",
          marginBottom: 12,
        }}>Timeline</p>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}>How we got here</h2>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 40,
        borderLeft: "2px solid var(--mint)",
        paddingLeft: 32,
        maxWidth: 650,
      }}>
        {TIMELINE.map((item, i) => (
          <motion.div
            key={i}
            style={{ position: "relative" }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <p style={{
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--mint)",
              marginBottom: 4,
            }}>{item.year}</p>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "1.1rem",
              marginBottom: 6,
            }}>{item.title}</h3>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--ink-dim)" }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const TIMELINE = [
  { year: "2022", title: "Legions Founded", desc: "A group of students in Dar es Salaam decide to stop waiting and start doing. First beach cleanup organized." },
  { year: "2022", title: "AMSEN Partnership", desc: "First engagement with special needs students at AMSEN center. 40+ students and 25 volunteers participate." },
  { year: "2023", title: "Tree Planting, Project MYK", desc: "500+ indigenous trees planted at public schools with a 90%+ survival rate." },
  { year: "2023", title: "Ramadhan Project Launch", desc: "1,200+ individuals reached through food hamper distribution. 100% direct allocation." },
  { year: "2024", title: "Ujasiri House Renovation", desc: "Complete renovation of Ujasiri House, a facility hosting 30+ families daily. 100% sweat-equity." },
  { year: "2024", title: "150+ Active Volunteers", desc: "Legions grows to over 150 active volunteers across five major projects." },
];
