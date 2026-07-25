"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { AsteriskSvg } from "@/app/components/primitives/AsteriskSvg";
import projectsIndex from "@/data/projects-index.json";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(h > 0 ? Math.round((window.scrollY / h) * 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <Link href="/" className="nav-left">
          <AsteriskSvg className="nav-asterisk" size={24} />
          <span className="nav-logo">LEGIONS</span>
        </Link>
        <div className="nav-right">
          <button className="nav-menu-btn" onClick={toggle} aria-label="Toggle menu">
            {open ? "Cerrar" : "Menu"}
          </button>
          <Link href="/volunteer" className="nav-cta-pill">
            Get Involved
          </Link>
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
              <p className="t-label" style={{ color: "var(--color-ink-dim)", marginBottom: 20 }}>
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

            <div className="menu-scroll-pct">{scrollPct}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
