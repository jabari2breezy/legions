"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { Section } from "@/app/components/primitives/Section";

export default function PartnerPage() {
  return (
    <>
      <Nav />
      <div className="section-dark" style={{ paddingTop: "clamp(140px, 20vw, 260px)", paddingBottom: "var(--space-section)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 16 }}>Partner</p>
            <h1 className="t-display">Let&apos;s build<br />together.</h1>
          </motion.div>
        </div>
      </div>

      <Section>
        <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 96px)" }}>
            <div>
              <h2 className="t-h1" style={{ marginBottom: 24 }}>Why partner with Legions?</h2>
              <p className="t-body-lg" style={{ marginBottom: 16 }}>
                Legions offers organizations a direct line to grassroots community impact
                in Tanzania. Our projects are documented, transparent, and driven by
                motivated student volunteers.
              </p>
              <p className="t-body-lg" style={{ marginBottom: 32 }}>
                Whether you provide funding, resources, or expertise, your partnership
                creates measurable change.
              </p>
              <div className="testimonials-columns" style={{ gap: 16 }}>
                {PARTNER_BENEFITS.map((b, i) => (
                  <motion.div
                    key={i}
                    className="glass-panel"
                    style={{ padding: 24, borderTop: "2px solid var(--color-cyan)" }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="process-num" style={{ fontSize: "1.5rem" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="process-title" style={{ marginTop: 8 }}>{b.title}</h3>
                    <p className="process-desc">{b.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="t-h2" style={{ marginBottom: 24 }}>Get in touch</h2>
              <p className="t-body-lg" style={{ marginBottom: 32 }}>
                Ready to make a difference? Reach out and let&apos;s discuss how your
                organization can partner with Legions.
              </p>
              <Link href="/contact" className="btn btn-dark">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </Section>
      <SiteFooter />
    </>
  );
}

const PARTNER_BENEFITS = [
  { title: "Verified Impact", desc: "Every project is fully documented with real data. No greenwashing, no empty promises." },
  { title: "Youth Engagement", desc: "Connect with 150+ motivated student volunteers across Dar es Salaam." },
  { title: "Brand Visibility", desc: "Your logo on project materials, social media coverage, and event presence." },
  { title: "Tax Benefits", desc: "All contributions go directly to community projects. Full accountability." },
];
