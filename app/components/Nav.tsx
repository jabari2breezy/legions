"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="nav">
      <Link href="/" className="nav-logo">Legions Club</Link>
      <nav className="nav-links">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link ${pathname.startsWith(item.href) ? "is-active" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link href="/volunteer" className="btn-secondary nav-cta">Get Involved</Link>
    </header>
  );
}
