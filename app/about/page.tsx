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
      <GrainientSection1 />
      <TenetsSection />
      <GrainientSection2 />
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

function GrainientSection1() {
  return (
    <div style={{ width: "100%", height: "60vh", minHeight: 400, position: "relative" }}>
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
  { title: "Youth-Led, Always", desc: "Every project is organized and executed by students. No top-down directives — just grassroots energy channeled with purpose." },
  { title: "Radical Transparency", desc: "Every shilling is tracked. Every outcome is documented. We publish results because accountability is non-negotiable." },
  { title: "Show Up, Then Show Up Again", desc: "One-off events don't change communities. Consistent presence and follow-through do." },
  { title: "Community First", desc: "We don't impose solutions. We listen, collaborate, and build what communities actually need." },
];

function GrainientSection2() {
  return (
    <div style={{ width: "100%", height: "60vh", minHeight: 400, position: "relative" }}>
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
  );
}
