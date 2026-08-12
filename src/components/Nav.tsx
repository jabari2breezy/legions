'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Who We Are' },
  { href: '/work', label: 'How We Move' },
  { href: '/projects', label: 'Proof' },
  { href: '/join', label: 'Join' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="nav-header">
      <nav className="nav-inner container">
        <Link href="/" className="nav-logo">
          <span className="nav-badge">L</span>
          <span className="nav-wordmark">LEGIONS</span>
        </Link>

        <div className="nav-links">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link${isActive(href) ? ' active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <Link href="/join" className="nav-cta">
          Get Involved
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {open && (
        <div className="nav-mobile">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-mobile-link"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
