"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/volunteer", label: "Volunteer" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 bg-bg/80 backdrop-blur-md border-b border-line" : "py-6 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <Link href="/" className="font-serif text-lg tracking-wide">
          Legions
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-sm tracking-wide text-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-fg transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/volunteer"
          className="text-xs uppercase tracking-[0.15em] border border-line rounded-full px-5 py-2 hover:border-accent hover:text-accent transition-colors"
        >
          Get Involved
        </Link>
      </div>
    </motion.header>
  );
}
