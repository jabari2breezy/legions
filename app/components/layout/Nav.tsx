"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import projectsIndex from "@/data/projects-index.json";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <>
      <nav className="nav">
        <Link href="/" className="nav-logo">LEGIONS</Link>
        <div className="nav-right">
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <button className="nav-menu-btn" onClick={toggle} aria-label="Toggle menu">
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu-overlay"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <button className="menu-overlay-close" onClick={toggle} aria-label="Close menu">
              Cerrar
            </button>

            <div className="menu-overlay-left">
              <ul className="menu-nav-list">
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={l.href}
                      className="menu-nav-link"
                      data-text={l.label}
                      onClick={() => setOpen(false)}
                    >
                      <span>{l.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="menu-overlay-right">
              <p className="t-label" style={{ color: "var(--text-secondary-dark)", marginBottom: 20 }}>
                Projects
              </p>
              <ul className="menu-project-list">
                {projectsIndex.map((p, i) => (
                  <motion.li
                    key={p.slug}
                    className="menu-project-item"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                  >
                    <span className="menu-project-num">({i + 1})</span>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="menu-project-name"
                      onClick={() => setOpen(false)}
                    >
                      {p.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
