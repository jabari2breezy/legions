"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { FooterTeaser } from "@/app/components/layout/FooterTeaser";

const Grainient = dynamic(() => import("@/app/components/primitives/Grainient"), {
  ssr: false,
});

export default function AboutPage() {
  return (
    <>
      <Nav />
      <PageHero />
      <StorySection />
      <TenetsSection />
      <TimelineSection />
      <FooterTeaser
        label="See Our Work"
        title="Five projects. One mission."
        href="/projects"
        imageSrc="/projects/amsen-visits/IMG_8275.jpg"
      >
        <div style={{ marginTop: 20 }}>
          <Link href="/projects" className="btn btn-primary">View Projects</Link>
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
          <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 16 }}>About Us</p>
          <h1 className="t-display">Built different.<br />Built to last.</h1>
        </motion.div>
      </div>
    </div>
  );
}

function StorySection() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Grainient
          color1="#3bd0de"
          color2="#3B4FE0"
          color3="#0A0A0C"
          timeSpeed={0.2}
          warpStrength={1.0}
          warpFrequency={5.0}
          warpSpeed={2.0}
          warpAmplitude={50.0}
          rotationAmount={500.0}
          noiseScale={2.0}
          grainAmount={0.08}
          grainScale={2.0}
          contrast={1.5}
          gamma={1.0}
          saturation={1.0}
          zoom={0.9}
        />
      </div>
      <div className="container" style={{ position: "relative", zIndex: 1, paddingBlock: "var(--space-section)" }}>
        <div className="about-grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 96px)", alignItems: "start" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 16 }}>Our Story</p>
            <h2 className="t-h1" style={{ marginBottom: 24 }}>From a school club to a movement</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="t-body-lg" style={{ marginBottom: 16, color: "rgba(250,250,250,0.85)" }}>
              Legions started in 2022 as a small group of students in Dar es Salaam who
              refused to sit idle. What began as weekend beach cleanups grew into organized
              community projects spanning education, environment, and infrastructure.
            </p>
            <p className="t-body-lg" style={{ marginBottom: 16, color: "rgba(250,250,250,0.85)" }}>
              Today, Legions engages over 150 volunteers and has reached more than 1,200
              individuals across five major projects. Every initiative is youth-led,
              community-driven, and fully documented.
            </p>
            <p className="t-body-lg" style={{ color: "rgba(250,250,250,0.85)" }}>
              We don&apos;t wait for funding. We don&apos;t wait for permission. We organize,
              build, and deliver.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function TenetsSection() {
  return (
    <section className="section-dark">
      <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
        <div style={{ marginBottom: 48 }}>
          <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 12 }}>Core Tenets</p>
          <h2 className="t-h1">What we stand on</h2>
        </div>
        <div className="testimonials-columns tenets-columns" style={{ maxWidth: 1100 }}>
          {TENETS.map((t, i) => (
            <motion.div
              key={i}
              className="glass-panel"
              style={{ padding: 32, borderTop: "2px solid var(--color-cyan)" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <span className="process-num" style={{ marginBottom: 16 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="tenet-title" style={{ marginTop: 8 }}>{t.title}</h3>
              <p className="tenet-desc">{t.desc}</p>
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
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Grainient
          color1="#3B4FE0"
          color2="#3bd0de"
          color3="#111114"
          timeSpeed={0.15}
          warpStrength={0.8}
          warpFrequency={4.0}
          warpSpeed={1.5}
          warpAmplitude={40.0}
          rotationAmount={400.0}
          noiseScale={1.5}
          grainAmount={0.06}
          grainScale={2.5}
          contrast={1.4}
          gamma={1.0}
          saturation={1.1}
          zoom={0.85}
        />
      </div>
      <div className="container" style={{ position: "relative", zIndex: 1, paddingBlock: "var(--space-section)" }}>
        <div style={{ marginBottom: 48 }}>
          <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 12 }}>Timeline</p>
          <h2 className="t-h1">How we got here</h2>
        </div>
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
