"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import projectsIndex from "@/data/projects-index.json";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/partner", label: "Partner" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const utc3 = new Date(now.getTime() + (3 * 60 + now.getTimezoneOffset()) * 60000);
      setTime(utc3.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header
        className="nav"
        data-scrolled={scrolled || undefined}
      >
        <div className="nav-inner">
          <Link href="/" className="nav-wordmark">
            LEGIONS
          </Link>

          <div className="nav-meta">
            <span>DAR ES SALAAM</span>
            <span className="nav-meta-sep">·</span>
            <span>06°48&apos;S 39°17&apos;E</span>
          </div>

          <div className="nav-right">
            <button
              className="nav-menu-btn"
              onClick={toggle}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className="nav-menu-label">{open ? "CLOSE" : "MENU"}</span>
            </button>
            <Link href="/volunteer" className="nav-cta">
              GET INVOLVED
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="megamenu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="megamenu-inner">
              <div className="megamenu-left">
                <p className="megamenu-label">NAVIGATION</p>
                <ul className="megamenu-nav-list">
                  {NAV_LINKS.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
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

              <div className="megamenu-divider" />

              <div className="megamenu-right">
                <p className="megamenu-label">PROJECTS</p>
                <ul className="megamenu-project-list">
                  {projectsIndex.map((p, i) => (
                    <motion.li
                      key={p.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + i * 0.05, duration: 0.4 }}
                    >
                      <Link
                        href={`/projects/${p.slug}`}
                        className="megamenu-project-link"
                        onClick={() => setOpen(false)}
                      >
                        <span className="megamenu-project-num">({String(i + 1).padStart(2, "0")})</span>
                        <span>{p.title}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <div className="megamenu-clock">
                  <p className="megamenu-clock-time">{time}</p>
                  <p className="megamenu-clock-zone">EAT / UTC+3</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
