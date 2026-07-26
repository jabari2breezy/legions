"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function SiteFooter() {
  const [time, setTime] = useState("");

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
    <footer className="site-footer">
      <div className="footer-cta">
        <h2 className="footer-cta-title">LET&apos;S BUILD</h2>
        <div className="footer-cta-glow" />
      </div>

      <div className="footer-grid">
        <div className="footer-col">
          <p className="footer-col-label">LOCATION</p>
          <p className="footer-col-value">DAR ES SALAAM</p>
          <p className="footer-col-value">IST CAMPUS</p>
          <p className="footer-col-value">TANZANIA</p>
        </div>

        <div className="footer-col">
          <p className="footer-col-label">LOCAL TIME</p>
          <p className="footer-col-clock">{time}</p>
          <p className="footer-col-sub">EAT / UTC+3</p>
        </div>

        <div className="footer-col">
          <p className="footer-col-label">STATUS</p>
          <p className="footer-col-status">
            ACTIVE
            <span className="footer-status-dot" />
          </p>
          <div className="footer-social">
            <a href="https://instagram.com" className="footer-social-link" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            <a href="https://twitter.com" className="footer-social-link" target="_blank" rel="noopener noreferrer">TWITTER</a>
          </div>
        </div>

        <div className="footer-col">
          <p className="footer-col-label">LEGAL</p>
          <p className="footer-col-legal">&copy; 2024 LEGIONS</p>
          <p className="footer-col-legal">ALL RIGHTS RESERVED</p>
          <Link href="/contact" className="footer-col-contact">GET IN TOUCH</Link>
        </div>
      </div>
    </footer>
  );
}
