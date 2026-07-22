'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Volunteer', path: '/volunteer' },
  { name: 'Partner', path: '/partner' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Close on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        ref={navRef}
        className="pointer-events-auto relative"
        initial={false}
      >
        {/* Pill Container */}
        <motion.div
          className={`relative overflow-hidden rounded-full border transition-colors duration-500 ${
            scrolled || isOpen 
              ? 'bg-[var(--color-bg-deep)]/80 border-[var(--color-border-subtle)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
              : 'bg-[var(--color-bg-deep)]/40 border-white/[0.06]'
          }`}
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        >
          {/* Closed state — just the brand name */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 px-6 py-3 cursor-pointer select-none"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <Link 
              href="/" 
              className="text-lg font-bold tracking-tight text-white hover:text-[var(--color-cyan)] transition-colors duration-300"
              onClick={(e) => {
                if (isOpen) {
                  e.stopPropagation()
                }
              }}
            >
              LEGIONS
            </Link>
            <div className={`w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] transition-all duration-500 ${isOpen ? 'scale-150 shadow-[0_0_12px_rgba(63,224,197,0.8)]' : ''}`}></div>
            
            {/* Hamburger dots */}
            <div className="flex flex-col gap-[3px] ml-1">
              <motion.span 
                className="block w-4 h-[1.5px] bg-white/80 rounded-full origin-center"
                animate={{ 
                  rotate: isOpen ? 45 : 0, 
                  y: isOpen ? 4.5 : 0,
                }}
                transition={{ duration: 0.25 }}
              />
              <motion.span 
                className="block w-4 h-[1.5px] bg-white/80 rounded-full"
                animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="block w-4 h-[1.5px] bg-white/80 rounded-full origin-center"
                animate={{ 
                  rotate: isOpen ? -45 : 0, 
                  y: isOpen ? -4.5 : 0,
                }}
                transition={{ duration: 0.25 }}
              />
            </div>
          </button>

          {/* Expanded links */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ 
                  height: { type: 'spring', stiffness: 500, damping: 40 },
                  opacity: { duration: 0.2 }
                }}
                className="overflow-hidden"
              >
                {/* Desktop: horizontal links */}
                <div className="hidden md:flex items-center gap-1 px-4 pb-3">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.path
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ delay: index * 0.04, duration: 0.25 }}
                      >
                        <Link
                          href={link.path}
                          className={`relative px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 block ${
                            isActive 
                              ? 'text-[var(--color-cyan)] bg-[var(--color-cyan)]/10' 
                              : 'text-white/70 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {link.name}
                          {isActive && (
                            <motion.span 
                              layoutId="nav-indicator"
                              className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-cyan)]"
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Mobile: vertical links */}
                <div className="flex md:hidden flex-col items-center gap-1 px-4 pb-4">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.path
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ delay: index * 0.05, duration: 0.25 }}
                        className="w-full"
                      >
                        <Link
                          href={link.path}
                          className={`relative px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 block text-center ${
                            isActive 
                              ? 'text-[var(--color-cyan)] bg-[var(--color-cyan)]/10' 
                              : 'text-white/70 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Glow effect when open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute -inset-1 rounded-full bg-[var(--color-cyan)]/5 blur-xl -z-10 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  )
}
