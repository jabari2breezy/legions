"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function SiteFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Dar_es_Salaam",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(now.toLocaleTimeString("en-GB", opts));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand-wordmark">LEGIONS</div>
          <p className="footer-brand-desc">
            Youth-led community service. Student-organized, community-first, fully transparent. Dar es Salaam, Tanzania.
          </p>
        </div>
        <div className="footer-col">
          <p className="footer-col-label">Navigate</p>
          <Link href="/projects">Projects</Link>
          <Link href="/about">About</Link>
          <Link href="/volunteer">Playbook</Link>
          <Link href="/partner">Impact</Link>
        </div>
        <div className="footer-col">
          <p className="footer-col-label">Connect</p>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:legions@gmail.com">Email</a>
        </div>
        <div className="footer-col">
          <p className="footer-col-label">Local Time</p>
          <div className="footer-live-clock">{time}</div>
          <p className="footer-clock-label">DAR ES SALAAM &mdash; EAT (UTC+3)</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} LEGIONS. ALL RIGHTS RESERVED.</span>
        <span>DAR ES SALAAM, TANZANIA</span>
      </div>
    </footer>
  );
}
