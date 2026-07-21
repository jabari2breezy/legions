'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 mix-blend-difference transition-all duration-300">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <Link href="/" className="font-mono text-xl font-bold tracking-tighter uppercase text-white hover:text-cyan transition-colors">
          Legions<span className="text-cyan">.</span>
        </Link>

        <nav className="flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs md:text-sm font-mono uppercase tracking-widest transition-all relative py-1 ${
                  isActive ? 'text-cyan font-bold' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan rounded-full animate-pulse" />
                )}
              </Link>
            )
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan/40 bg-cyan/10 hover:bg-cyan hover:text-bg-deep text-cyan text-xs font-mono uppercase tracking-wider transition-all duration-300 backdrop-blur-md"
        >
          <span>Join Us</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </header>
  )
}
