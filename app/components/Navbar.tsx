'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from './Button'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Volunteer', path: '/volunteer' },
  { name: 'Partner', path: '/partner' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[var(--color-bg-deep)]/90 backdrop-blur-xl border-b border-[var(--color-border-subtle)] py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-[var(--spacing-section-x)] flex items-center justify-between">
        <Link href="/" className="relative z-50 flex items-center gap-2 group">
          <span className="text-2xl font-bold tracking-tighter text-white">LEGIONS</span>
          <div className="w-2 h-2 rounded-full bg-[var(--color-cyan)] group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(63,224,197,0.8)]"></div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path
            return (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-sm tracking-wide font-medium transition-colors hover:text-[var(--color-cyan)] relative ${
                  isActive ? 'text-[var(--color-cyan)]' : 'text-white/80'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-cyan)]"></span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" variant="secondary" className="!py-2 !px-6 text-sm">
            Get in Touch
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
          <span className={`block w-6 h-[2px] bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[var(--color-bg-deep)] z-40 transition-transform duration-500 flex flex-col items-center justify-center gap-8 md:hidden ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            href={link.path}
            onClick={() => setMobileMenuOpen(false)}
            className={`text-2xl font-medium tracking-wide ${pathname === link.path ? 'text-[var(--color-cyan)]' : 'text-white'}`}
          >
            {link.name}
          </Link>
        ))}
        <Button href="/contact" variant="primary" className="mt-4" onClick={() => setMobileMenuOpen(false)}>
          Get in Touch
        </Button>
      </div>
    </header>
  )
}
