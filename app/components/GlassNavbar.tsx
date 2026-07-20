'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'

interface GlassNavbarProps {
  className?: string
}

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Members', href: '#members' },
  { label: 'Contact', href: '#contact' },
]

export default function GlassNavbar({ className = '' }: GlassNavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const navLinksRef = useRef<HTMLAnchorElement[]>([])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate mobile menu items with GSAP for staggered entry
  useEffect(() => {
    if (!menuOpen || reducedMotion) return

    const links = navLinksRef.current.filter(Boolean)
    gsap.fromTo(
      links,
      { opacity: 0, y: 40, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.1,
      }
    )
  }, [menuOpen, reducedMotion])

  const closeMenu = () => setMenuOpen(false)

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'} ${className}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      style={{
        backdropFilter: scrolled ? 'blur(40px) saturate(180%)' : 'none',
        background: scrolled ? 'rgba(6, 10, 20, 0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
        boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 60px -10px rgba(17, 199, 202, 0.08)' : 'none',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo mark top-left */}
        <a href="#" className="flex items-center gap-3 z-[101]" aria-label="Legions Club Home">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #11C7CA 0%, #00D4C8 50%, #3E5DE0 100%)',
              boxShadow: '0 0 20px rgba(17, 199, 202, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#060A14"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-serif text-xl tracking-[0.1em] uppercase text-white">
            <span className="text-cyan">Legions</span>
            <span className="text-white/40 ml-1">Club</span>
          </span>
        </a>

        {/* Centered pill nav on desktop */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 liquid-glass">
          {navItems.map((item, i) => (
            <motion.a
              key={item.label}
              ref={(el) => { navLinksRef.current[i] = el! }}
              href={item.href}
              className="px-5 py-2 text-sm tracking-widest uppercase text-text-secondary hover:text-cyan transition-colors duration-300 relative overflow-hidden rounded-md"
              whileHover={{ scale: 1.02 }}
              onClick={closeMenu}
            >
              <motion.span
                className="relative z-10"
                style={{ willChange: 'transform' }}
              >
                {item.label}
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan/20 to-indigo/20"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="group relative px-6 py-2.5 border border-cyan/30 text-cyan text-sm tracking-widest uppercase hover:bg-cyan hover:text-bg-deep transition-all duration-300 rounded-none overflow-hidden"
          >
            <span className="relative z-10">Apply</span>
            <motion.div
              className="absolute inset-0 bg-neon-ice"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              style={{ transformOrigin: 'left' }}
            />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 z-[101]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.span
            className="w-6 h-[1px] bg-white block origin-center"
            animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          />
          <motion.span
            className="w-6 h-[1px] bg-white block"
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="w-6 h-[1px] bg-white block origin-center"
            animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          />
        </button>
      </div>

      {/* Fullscreen mobile menu */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-0 bg-bg-deep/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 z-[99] px-6"
            initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{
              clipPath: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
              opacity: { duration: 0.3 },
            }}
          >
            <div className="flex flex-col items-center gap-6 w-full max-w-md">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  ref={(el) => { navLinksRef.current[i] = el! }}
                  href={item.href}
                  className="text-3xl md:text-4xl font-serif tracking-widest uppercase text-white hover:text-cyan transition-colors text-center w-full py-4 relative overflow-hidden"
                  onClick={closeMenu}
                >
                  <motion.span className="relative z-10">{item.label}</motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-indigo/10"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                    style={{ transformOrigin: 'left' }}
                  />
                </motion.a>
              ))}

              <motion.div
                className="w-full max-w-md pt-4 border-t border-border-subtle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <a
                  href="#contact"
                  className="group relative w-full block px-8 py-4 border border-cyan/30 text-cyan text-sm tracking-widest uppercase text-center hover:bg-cyan hover:text-bg-deep transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Request Membership</span>
                  <motion.div
                    className="absolute inset-0 bg-neon-ice"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    style={{ transformOrigin: 'left' }}
                  />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}