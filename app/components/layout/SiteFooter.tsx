"use client";

import Link from "next/link";
import { AsteriskSvg } from "@/app/components/primitives/AsteriskSvg";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/partner", label: "Partner" },
  { href: "/contact", label: "Contact" },
];

const PROJECT_LINKS = [
  { href: "/projects/amsen-visits", label: "AMSEN Visits" },
  { href: "/projects/beach-cleanups", label: "Beach Cleanups" },
  { href: "/projects/ramadhan-project", label: "Ramadhan Project" },
  { href: "/projects/tree-planting", label: "Tree Planting" },
  { href: "/projects/ujasiri-house", label: "Ujasiri House" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <AsteriskSvg className="asterisk-motif" size={16} />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              LEGIONS
            </span>
          </Link>
          <p className="footer-brand-statement">
            Youth-led community service in Dar es Salaam. Students building what
            communities need.
          </p>
        </div>

        <div className="footer-col">
          <h4>Pages</h4>
          {FOOTER_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </div>

        <div className="footer-col">
          <h4>Projects</h4>
          {PROJECT_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <a href="mailto:legions@gmail.com">legions@gmail.com</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <span>&copy; {new Date().getFullYear()} Legions. All rights reserved.</span>
        <span>Dar es Salaam, Tanzania</span>
      </div>
    </footer>
  );
}
