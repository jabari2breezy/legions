'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="nav">
      <Link href="/" className="nav-logo">Legions</Link>
      <div className="nav-links">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${pathname === link.href ? 'is-active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <Link href="/volunteer" className="nav-cta">Get Involved</Link>
    </nav>
  )
}
