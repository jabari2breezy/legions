"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { AsteriskSvg } from "@/app/components/primitives/AsteriskSvg";
import { SectionReveal } from "@/app/components/primitives/SectionReveal";

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
            <p className="t-label" style={{ color: "var(--color-mint)", marginBottom: 16 }}>
              <AsteriskSvg className="asterisk-motif" size={12} />
              Partner
            </p>
            <h1 className="t-display">Let&apos;s build<br />together.</h1>
          </motion.div>
        </div>
      </div>

      <section className="section-dark" style={{ borderTop: "1px solid var(--border-hairline)" }}>
        <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
          <SectionReveal>
            <h2 className="t-h1" style={{ marginBottom: 12 }}>Why partner with Legions?</h2>
            <p className="t-body-lg" style={{ marginBottom: 40, maxWidth: 600, color: "var(--color-ink-dim)" }}>
              Direct line to grassroots community impact in Tanzania.
              Documented, transparent, and driven by student volunteers.
            </p>
          </SectionReveal>
          <div className="partner-benefits-grid">
            {PARTNER_BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                className="glass-panel"
                style={{ padding: 24 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    letterSpacing: "0.08em",
                    color: "var(--color-mint)",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "1.1rem",
                  }}>{b.title}</h3>
                </div>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--color-ink-dim)" }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta-content">
          <SectionReveal>
            <h2 className="final-cta-title" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
              Ready to make a <em className="t-emphasis">difference?</em>
            </h2>
            <p className="t-body-lg" style={{ color: "var(--color-ink-dim)", marginBottom: 32, maxWidth: 500, marginInline: "auto" }}>
              Reach out and let&apos;s discuss how your organization can partner with Legions.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div className="final-cta-buttons">
              <Link href="/contact" className="btn btn-primary">
                Contact Us
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}

const PARTNER_BENEFITS = [
  { title: "Verified Impact", desc: "Every project fully documented with real data. No empty promises." },
  { title: "Youth Engagement", desc: "Connect with 150+ motivated student volunteers in Dar es Salaam." },
  { title: "Brand Visibility", desc: "Your logo on project materials, social media, and events." },
  { title: "Full Transparency", desc: "All contributions go directly to community projects." },
];
