"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { FooterContact } from "@/app/components/layout/FooterContact";
import { Section } from "@/app/components/primitives/Section";
import { SectionReveal } from "@/app/components/primitives/SectionReveal";

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);

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
            <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 16 }}>Volunteer</p>
            <h1 className="t-display">Show up.<br />Make a mark.</h1>
          </motion.div>
        </div>
      </div>

      <Section dark>
        <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
          <div className="split-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 96px)" }}>
            <div>
              <SectionReveal>
                <h2 className="t-h1" style={{ marginBottom: 24 }}>Why volunteer with Legions?</h2>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <p className="t-body-lg" style={{ color: "var(--text-secondary-dark)", marginBottom: 16 }}>
                  Legions runs on student energy. Every project is organized and executed
                  by volunteers who get their hands dirty, and see the results
                  firsthand.
                </p>
                <p className="t-body-lg" style={{ color: "var(--text-secondary-dark)", marginBottom: 32 }}>
                  No experience needed. No prerequisites. Just bring your time and willingness.
                </p>
              </SectionReveal>
              <div className="testimonials-columns" style={{ gap: 16 }}>
                {VOLUNTEER_BENEFITS.map((b, i) => (
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
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "80px 40px" }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: 16 }}>&#10003;</div>
                  <h3 className="t-h2" style={{ marginBottom: 12 }}>Thank you</h3>
                  <p className="t-body-lg" style={{ color: "var(--text-secondary-dark)" }}>
                    We&apos;ll be in touch soon.
                  </p>
                </motion.div>
              ) : (
                <form
                  className="contact-form"
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  style={{ display: "flex", flexDirection: "column", gap: 28 }}
                >
                  <div className="form-group">
                    <label className="form-label" htmlFor="vol-name">Full Name</label>
                    <input id="vol-name" className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="vol-email">Email</label>
                    <input id="vol-email" className="form-input" type="email" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="vol-phone">Phone (optional)</label>
                    <input id="vol-phone" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="vol-project">Which project interests you?</label>
                    <input id="vol-project" className="form-input" placeholder="e.g. Beach Cleanups, Tree Planting" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="vol-why">Why do you want to volunteer?</label>
                    <textarea id="vol-why" className="form-textarea" rows={4} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ alignSelf: "start" }}>
                    Sign Up
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>
      <FooterContact />
    </>
  );
}

const VOLUNTEER_BENEFITS = [
  { title: "Real Impact", desc: "Your hours translate directly into community outcomes. No middlemen, no bureaucracy." },
  { title: "Build Skills", desc: "Project management, logistics, teamwork: skills that look good on any resume." },
  { title: "Join a Community", desc: "150+ like-minded students working together. Friendships built through action." },
  { title: "Full Transparency", desc: "See exactly where your effort goes. Every project is documented and reported." },
];
