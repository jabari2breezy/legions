"use client";

import { ReactNode } from "react";

interface FooterTeaserProps {
  label: string;
  title: string;
  href: string;
  imageSrc: string;
  children?: ReactNode;
}

export function FooterTeaser({ label, title, href, imageSrc, children }: FooterTeaserProps) {
  return (
    <div className="footer-teaser">
      <div className="footer-teaser-img">
        <img src={imageSrc} alt="" />
      </div>
      <div className="footer-teaser-overlay" />
      <div className="footer-teaser-content">
        <p className="footer-teaser-label">{label}</p>
        <h2 className="footer-teaser-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
