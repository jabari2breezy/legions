"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const els = footerRef.current.querySelectorAll("[data-footer-reveal]");
    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.03,
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative pt-20 pb-8"
      style={{ background: "var(--color-yale-blue)" }}
    >
      <div className="section-divider max-w-7xl mx-auto mb-20" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div data-footer-reveal>
            <div
              className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6"
              style={{ color: "var(--color-strong-cyan)" }}
            >
              Organization
            </div>
            <ul className="space-y-3">
              {["About", "Mission", "Team", "Careers"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm transition-colors duration-300 hover:opacity-100 opacity-60"
                    style={{ color: "var(--color-azure-mist)" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-reveal>
            <div
              className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6"
              style={{ color: "var(--color-strong-cyan)" }}
            >
              Programs
            </div>
            <ul className="space-y-3">
              {["Leadership Academy", "Mentorship Circle", "Community Impact", "Creative Lab"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#programs"
                      className="text-sm transition-colors duration-300 hover:opacity-100 opacity-60"
                      style={{ color: "var(--color-azure-mist)" }}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div data-footer-reveal>
            <div
              className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6"
              style={{ color: "var(--color-strong-cyan)" }}
            >
              Connect
            </div>
            <ul className="space-y-3">
              {["Instagram", "Twitter / X", "LinkedIn", "YouTube"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-colors duration-300 hover:opacity-100 opacity-60"
                    style={{ color: "var(--color-azure-mist)" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-reveal>
            <div
              className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6"
              style={{ color: "var(--color-strong-cyan)" }}
            >
              Legal
            </div>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-colors duration-300 hover:opacity-100 opacity-60"
                    style={{ color: "var(--color-azure-mist)" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div data-footer-reveal className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-serif text-sm font-bold"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-strong-cyan), var(--color-dark-cyan))",
                color: "var(--color-yale-blue)",
              }}
            >
              L
            </div>
            <span className="font-serif text-lg font-medium" style={{ color: "var(--color-foreground)" }}>
              Legions Club
            </span>
          </div>

          <div
            data-footer-reveal
            className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-40"
            style={{ color: "var(--color-azure-mist)" }}
          >
            &copy; {new Date().getFullYear()} Legions Club. All rights reserved.
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-[0.04] pointer-events-none select-none">
        <span className="font-serif text-[clamp(4rem,12vw,10rem)] font-bold whitespace-nowrap" style={{ color: "var(--color-foreground)" }}>
          LEGIONS
        </span>
      </div>
    </footer>
  );
}
