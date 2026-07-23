"use client";

import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  dark?: boolean;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export function Section({ children, dark = false, className = "", id, style }: SectionProps) {
  return (
    <section
      id={id}
      className={`${dark ? "section-dark" : "section-light"} ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}
