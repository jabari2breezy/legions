"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);

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
          }}>Volunteer</p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
          }}>Show up.<br />Make a mark.</h1>
        </motion.div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(40px, 6vw, 96px)",
        padding: "clamp(60px, 8vw, 120px) clamp(20px, 5vw, 64px)",
        borderTop: "1px solid var(--grid-border)",
        borderBottom: "1px solid var(--grid-border)",
      }}>
        <div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}>Why volunteer with Legions?</h2>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-dim)", marginBottom: 16 }}>
            Legions runs on student energy. Every project is organized and executed
            by volunteers who get their hands dirty, and see the results
            firsthand.
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-dim)", marginBottom: 32 }}>
            No experience needed. No prerequisites. Just bring your time and willingness.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {VOLUNTEER_BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                style={{
                  background: "var(--indigo)",
                  padding: 24,
                  borderRadius: 0,
                  borderTop: "2px solid var(--mint)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
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
                  fontSize: "0.95rem",
                  marginBottom: 8,
                  textTransform: "uppercase",
                }}>{b.title}</h3>
                <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "var(--ink-dim)" }}>{b.desc}</p>
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
              <div style={{ fontSize: "3rem", marginBottom: 16, color: "var(--mint)" }}>&#10003;</div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                marginBottom: 12,
              }}>Thank you</h3>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-dim)" }}>
                We&apos;ll be in touch soon.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              style={{ display: "flex", flexDirection: "column", gap: 28 }}
            >
              {[
                { label: "Full Name", type: "text", required: true },
                { label: "Email", type: "email", required: true },
                { label: "Phone (optional)", type: "text", required: false },
                { label: "Which project interests you?", type: "text", required: false, placeholder: "e.g. Beach Cleanups, Tree Planting" },
              ].map((field) => (
                <div key={field.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--ink-dim)",
                  }}>{field.label}</label>
                  <input
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    style={{
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid var(--grid-border)",
                      padding: "12px 0",
                      fontFamily: "var(--font-body)",
                      fontSize: "1rem",
                      color: "var(--ink)",
                      outline: "none",
                      width: "100%",
                    }}
                  />
                </div>
              ))}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ink-dim)",
                }}>Why do you want to volunteer?</label>
                <textarea
                  rows={4}
                  style={{
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid var(--grid-border)",
                    padding: "12px 0",
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    color: "var(--ink)",
                    outline: "none",
                    width: "100%",
                    resize: "none",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  alignSelf: "start",
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
                }}
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}

const VOLUNTEER_BENEFITS = [
  { title: "Real Impact", desc: "Your hours translate directly into community outcomes. No middlemen, no bureaucracy." },
  { title: "Build Skills", desc: "Project management, logistics, teamwork: skills that look good on any resume." },
  { title: "Join a Community", desc: "150+ like-minded students working together. Friendships built through action." },
  { title: "Full Transparency", desc: "See exactly where your effort goes. Every project is documented and reported." },
];
