"use client";

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <a href="mailto:legions@gmail.com" className="footer-brand-email">
            legions@gmail.com
          </a>
          <p className="footer-brand-desc">
            Youth-led action. Real community change. Based in Dar es Salaam.
          </p>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/volunteer">Volunteer</Link>
          <Link href="/partner">Partner</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Projects</h4>
          <Link href="/projects/amsen-visits">AMSEN Visits</Link>
          <Link href="/projects/beach-cleanups">Beach Cleanups</Link>
          <Link href="/projects/ramadhan-project">Ramadhan Project</Link>
          <Link href="/projects/tree-planting">Tree Planting</Link>
          <Link href="/projects/ujasiri-house">Ujasiri House</Link>
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Legions. All rights reserved.</span>
        <span>Made with purpose in Dar es Salaam</span>
      </div>
    </footer>
  );
}
