"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import projectsIndex from "@/data/projects-index.json";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/volunteer", label: "Playbook" },
  { href: "/partner", label: "Impact" },
];

const MEGAMENU_LINKS = [
  { num: "01", href: "/projects", label: "Projects" },
  { num: "02", href: "/about", label: "About" },
  { num: "03", href: "/volunteer", label: "Playbook" },
  { num: "04", href: "/partner", label: "Community" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <>
      <header className="site-header">
        <div className="header-left">
          <div className="header-logo-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--mint)" }}>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <Link href="/" className="header-wordmark">LEGIONS</Link>
          <span className="header-divider-pipe">|</span>
          <span className="header-meta-text">DAR ES SALAAM &middot; 06&deg;48&apos;S 39&deg;17&apos;E</span>
        </div>
        <div className="header-right">
          <nav className="header-nav-links">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="header-nav-link">
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="header-cta">Get Involved</Link>
          <button className="menu-trigger" onClick={toggle} aria-label="Open menu">
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="megamenu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <button className="megamenu-close" onClick={toggle} aria-label="Close menu">
              Close
            </button>
            <div className="megamenu-left">
              <ul className="megamenu-nav-list">
                {MEGAMENU_LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    className="megamenu-nav-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                  >
                    <span className="megamenu-nav-num">{l.num}</span>
                    <Link
                      href={l.href}
                      className="megamenu-nav-link"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="megamenu-right">
              <p className="megamenu-status-label">Organization Status</p>
              <div className="megamenu-status-row">
                <span className="megamenu-status-dot" />
                <span>Active &mdash; Dar es Salaam</span>
              </div>
              <div className="megamenu-status-row">
                <span style={{ color: "var(--ink-dim)" }}>Volunteers: 150+</span>
              </div>
              <div className="megamenu-status-row">
                <span style={{ color: "var(--ink-dim)" }}>Projects Completed: 5</span>
              </div>

              <p className="megamenu-status-label" style={{ marginTop: 40 }}>Contact</p>
              <div className="megamenu-social-links">
                <a href="mailto:legions@gmail.com" className="megamenu-social-link">legions@gmail.com</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="megamenu-social-link">Instagram</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="megamenu-social-link">LinkedIn</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
