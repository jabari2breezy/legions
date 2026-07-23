"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";

export default function ContactPage() {
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
            <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 16 }}>Contact</p>
            <h1 className="t-display">Say hello.</h1>
          </motion.div>
        </div>
      </div>

      <section className="section-dark">
        <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 96px)" }}>
            <div>
              <p className="t-body-lg" style={{ color: "var(--text-secondary-dark)", marginBottom: 32 }}>
                Have a question, want to collaborate, or just want to say hi?
                We&apos;d love to hear from you.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <p className="t-label" style={{ color: "var(--text-secondary-dark)", marginBottom: 4 }}>Email</p>
                  <a href="mailto:legions@gmail.com" className="t-h3" style={{ color: "var(--color-cyan)", transition: "color 0.3s" }}>
                    legions@gmail.com
                  </a>
                </div>
                <div>
                  <p className="t-label" style={{ color: "var(--text-secondary-dark)", marginBottom: 4 }}>Location</p>
                  <p className="t-h3">Dar es Salaam, Tanzania</p>
                </div>
                <div>
                  <p className="t-label" style={{ color: "var(--text-secondary-dark)", marginBottom: 4 }}>Social</p>
                  <div style={{ display: "flex", gap: 16 }}>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="t-h3" style={{ color: "var(--color-cyan)", transition: "color 0.3s" }}>Instagram</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="t-h3" style={{ color: "var(--color-cyan)", transition: "color 0.3s" }}>Twitter</a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "80px 40px" }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: 16 }}>✓</div>
                  <h3 className="t-h2" style={{ marginBottom: 12, color: "var(--color-white)" }}>Message sent</h3>
                  <p className="t-body-lg" style={{ color: "var(--text-secondary-dark)" }}>
                    We&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form
                  className="contact-form"
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  style={{ display: "flex", flexDirection: "column", gap: 28 }}
                >
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea className="form-textarea" rows={5} required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ alignSelf: "start" }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
