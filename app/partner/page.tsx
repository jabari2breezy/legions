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
          <h2 className="t-h1" style={{ marginBottom: 12 }}>Why partner with Legions?</h2>
          <p className="t-body-lg" style={{ marginBottom: 40, maxWidth: 600 }}>
            Direct line to grassroots community impact in Tanzania.
            Documented, transparent, and driven by student volunteers.
          </p>
          <div className="partner-benefits-grid">
            {PARTNER_BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                className="glass-panel"
                style={{ padding: 24, borderTop: "2px solid var(--color-cyan)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
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
      </Section>

      <Section dark>
        <div className="container" style={{ paddingBlock: "var(--space-section)", textAlign: "center" }}>
          <h2 className="t-h1" style={{ marginBottom: 16 }}>Ready to make a difference?</h2>
          <p className="t-body-lg" style={{ color: "var(--text-secondary-dark)", marginBottom: 32, maxWidth: 500, marginInline: "auto" }}>
            Reach out and let&apos;s discuss how your organization can partner with Legions.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Contact Us
          </Link>
        </div>
      </Section>
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
