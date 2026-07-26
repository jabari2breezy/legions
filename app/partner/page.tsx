"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";

export default function PartnerPage() {
  return (
    <>
      <Nav />
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
          }}>Partner</p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
          }}>Let&apos;s build<br />together.</h1>
        </motion.div>
      </div>

      <div style={{
        padding: "clamp(60px, 8vw, 120px) clamp(20px, 5vw, 64px)",
        borderTop: "1px solid var(--grid-border)",
        borderBottom: "1px solid var(--grid-border)",
      }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: 12,
        }}>Why partner with Legions?</h2>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-dim)", marginBottom: 40, maxWidth: 600 }}>
          Direct line to grassroots community impact in Tanzania.
          Documented, transparent, and driven by student volunteers.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, background: "var(--grid-border)" }}>
          {PARTNER_BENEFITS.map((b, i) => (
            <motion.div
              key={i}
              style={{
                background: "var(--indigo-deep)",
                padding: "clamp(24px, 3vw, 40px)",
                borderTop: "2px solid var(--mint)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <span style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "var(--ink-dim)",
                opacity: 0.15,
                display: "block",
                marginBottom: 8,
              }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1rem",
                marginBottom: 8,
                textTransform: "uppercase",
              }}>{b.title}</h3>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "var(--ink-dim)" }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div style={{
        padding: "clamp(60px, 8vw, 120px) clamp(20px, 5vw, 64px)",
        textAlign: "center",
        borderTop: "1px solid var(--grid-border)",
        borderBottom: "1px solid var(--grid-border)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, var(--indigo-bright), transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}>Ready to make a difference?</h2>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-dim)", marginBottom: 32, maxWidth: 500, marginInline: "auto" }}>
            Reach out and let&apos;s discuss how your organization can partner with Legions.
          </p>
          <Link href="/contact" style={{
            display: "inline-flex",
            alignItems: "center",
            fontFamily: "var(--font-body)",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "14px 32px",
            borderRadius: 100,
            background: "var(--mint)",
            color: "var(--indigo-deep)",
            border: "none",
            cursor: "pointer",
          }}>
            Contact Us
          </Link>
        </div>
      </div>
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
