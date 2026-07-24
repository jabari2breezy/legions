"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

export function FooterContact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="footer-contact">
      <div className="footer-contact-inner container">
        <div className="footer-contact-left">
          <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 16 }}>
            Get in Touch
          </p>
          <h2 className="t-display" style={{ color: "var(--color-white)", marginBottom: 24 }}>
            Say hello.
          </h2>
          <p className="t-body-lg" style={{ color: "var(--text-secondary-dark)", maxWidth: 400 }}>
            Have a question, want to collaborate, or just want to say hi?
            We&apos;d love to hear from you.
          </p>
        </div>

        <div className="footer-contact-right">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center", padding: "60px 24px" }}
            >
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>&#10003;</div>
              <h3 className="t-h2" style={{ color: "var(--color-white)", marginBottom: 12 }}>Message sent</h3>
              <p className="t-body-lg" style={{ color: "var(--text-secondary-dark)" }}>
                We&apos;ll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <form
              className="footer-contact-form"
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            >
              <div className="footer-contact-field">
                <label className="t-label" htmlFor="footer-name">Name</label>
                <input id="footer-name" className="footer-contact-input" required />
              </div>
              <div className="footer-contact-field">
                <label className="t-label" htmlFor="footer-email">Email</label>
                <input id="footer-email" className="footer-contact-input" type="email" required />
              </div>
              <div className="footer-contact-field">
                <label className="t-label" htmlFor="footer-message">Message</label>
                <textarea id="footer-message" className="footer-contact-input footer-contact-textarea" rows={3} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: "start" }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="footer-contact-bottom container">
        <Link href="/" className="footer-contact-logo">LEGIONS</Link>
        <div className="footer-contact-links">
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/volunteer">Volunteer</Link>
          <Link href="/partner">Partner</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <p className="footer-contact-copy">&copy; {new Date().getFullYear()} Legions. All rights reserved.</p>
      </div>
    </footer>
  );
}
