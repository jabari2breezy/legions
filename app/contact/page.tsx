"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";

export default function ContactPage() {
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
          }}>Contact</p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(3rem, 8vw, 7.5rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
          }}>Say hello.</h1>
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
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-dim)", marginBottom: 32 }}>
            Have a question, want to collaborate, or just want to say hi?
            We&apos;d love to hear from you.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <p style={{
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-dim)",
                marginBottom: 4,
              }}>Email</p>
              <a href="mailto:legions@gmail.com" style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
                color: "var(--mint)",
                transition: "color 0.3s",
              }}>
                legions@gmail.com
              </a>
            </div>
            <div>
              <p style={{
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-dim)",
                marginBottom: 4,
              }}>Location</p>
              <p style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
              }}>Dar es Salaam, Tanzania</p>
            </div>
            <div>
              <p style={{
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-dim)",
                marginBottom: 4,
              }}>Social</p>
              <div style={{ display: "flex", gap: 16 }}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
                  color: "var(--mint)",
                  transition: "color 0.3s",
                }}>Instagram</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
                  color: "var(--mint)",
                  transition: "color 0.3s",
                }}>Twitter</a>
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
              <div style={{ fontSize: "3rem", marginBottom: 16, color: "var(--mint)" }}>&#10003;</div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                marginBottom: 12,
              }}>Message sent</h3>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-dim)" }}>
                We&apos;ll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              style={{ display: "flex", flexDirection: "column", gap: 28 }}
            >
              {[
                { label: "Name", type: "text", required: true },
                { label: "Email", type: "email", required: true },
                { label: "Subject", type: "text", required: false },
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
                }}>Message</label>
                <textarea
                  rows={5}
                  required
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
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
