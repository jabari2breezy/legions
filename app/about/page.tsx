"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { AsteriskSvg } from "@/app/components/primitives/AsteriskSvg";
import { TextReveal } from "@/app/components/primitives/TextReveal";
import { SectionReveal } from "@/app/components/primitives/SectionReveal";

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
    <div className="section-dark" style={{ paddingTop: "clamp(140px, 20vw, 260px)", paddingBottom: "var(--space-section)" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="t-label" style={{ color: "var(--color-mint)", marginBottom: 16 }}>
            <AsteriskSvg className="asterisk-motif" size={12} />
            About Us
          </p>
          <h1 className="t-display">Built different.<br />Built to last.</h1>
        </motion.div>
      </div>
    </div>
  );
}

function StorySection() {
  return (
    <div className="section-dark" style={{ borderTop: "1px solid var(--border-hairline)" }}>
      <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
        <div className="about-grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 96px)", alignItems: "start" }}>
          <SectionReveal>
            <p className="t-label" style={{ color: "var(--color-mint)", marginBottom: 16 }}>Our Story</p>
            <TextReveal as="h2" className="t-h1" italic>
              From a school club to a movement
            </TextReveal>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p className="t-body-lg" style={{ marginBottom: 16, color: "var(--color-ink-dim)" }}>
              Legions started in 2022 as a small group of students in Dar es Salaam who
              refused to sit idle. What began as weekend beach cleanups grew into organized
              community projects spanning education, environment, and infrastructure.
            </p>
            <p className="t-body-lg" style={{ marginBottom: 16, color: "var(--color-ink-dim)" }}>
              Today, Legions engages over 150 volunteers and has reached more than 1,200
              individuals across five major projects. Every initiative is youth-led,
              community-driven, and fully documented.
            </p>
            <p className="t-body-lg" style={{ color: "var(--color-ink-dim)" }}>
              We don&apos;t wait for funding. We don&apos;t wait for permission. We organize,
              build, and deliver.
            </p>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}

function TenetsSection() {
  return (
    <section className="section-dark" style={{ borderTop: "1px solid var(--border-hairline)" }}>
      <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
        <SectionReveal>
          <div style={{ marginBottom: 48 }}>
            <p className="t-label" style={{ color: "var(--color-mint)", marginBottom: 12 }}>
              <AsteriskSvg className="asterisk-motif" size={12} />
              Core Tenets
            </p>
            <h2 className="t-h1">What we stand on</h2>
          </div>
        </SectionReveal>
        <div style={{ maxWidth: 1100 }}>
          {TENETS.map((t, i) => (
            <motion.div
              key={i}
              className="tenet-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <div className="tenet-glyph">
                <AsteriskSvg className="asterisk-motif" size={20} />
              </div>
              <div>
                <h3 className="tenet-title">{t.title}</h3>
                <p className="tenet-desc">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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
    <div className="section-dark" style={{ borderTop: "1px solid var(--border-hairline)" }}>
      <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
        <SectionReveal>
          <div style={{ marginBottom: 48 }}>
            <p className="t-label" style={{ color: "var(--color-mint)", marginBottom: 12 }}>
              <AsteriskSvg className="asterisk-motif" size={12} />
              Timeline
            </p>
            <h2 className="t-h1">How we got here</h2>
          </div>
        </SectionReveal>
        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="timeline-year">{item.year}</p>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
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
