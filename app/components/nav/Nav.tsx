'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { LiquidGlassCircle, LiquidGlassPill } from '../ui/LiquidGlass';
import { MobileMenu } from './MobileMenu';
import { NavLink } from './NavLink';
import { sectionIndices, sectionHashes } from '../../lib/constants';
import { useCursor } from '../ui/CustomCursor';

const navSections = [
  { label: 'Home', key: 'home' },
  { label: 'About', key: 'about' },
  { label: 'Projects', key: 'projects' },
  { label: 'Contact', key: 'contact' },
] as const;

export function Nav({
  activeIndex,
  onSectionChange,
}: {
  activeIndex: number;
  onSectionChange: (index: number) => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setHoverLabel, clearHover } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (index: number) => {
    onSectionChange(index);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    onSectionChange(0);
  };

  return (
    <>
      {/* Logo - Top Left */}
      <motion.button
        className="fixed top-6 left-6 z-51"
        onClick={handleLogoClick}
        onMouseEnter={() => setHoverLabel('Home')}
        onMouseLeave={clearHover}
        aria-label="Legions Club - Home"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1], delay: 0.2 }}
        style={{
          filter: 'drop-shadow(0 0 8px rgba(77,232,212,0.6))',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </motion.button>

      {/* Desktop Nav - Centered Pill */}
      <motion.div
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:flex"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1], delay: 0.3 }}
      >
        <LiquidGlassPill className="px-3 py-3 flex items-center gap-1">
          {navSections.map((section) => (
            <NavLink
              key={section.key}
              label={section.label}
              section={section.key}
              isActive={activeIndex === sectionIndices[section.key]}
              onClick={() => handleNavClick(sectionIndices[section.key])}
            />
          ))}
        </LiquidGlassPill>
      </motion.div>

      {/* Desktop CTA - Top Right */}
      <motion.button
        className="fixed top-6 right-6 z-50 hidden lg:flex"
        onClick={() => handleNavClick(3)}
        onMouseEnter={() => setHoverLabel('Volunteer With Us')}
        onMouseLeave={clearHover}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1], delay: 0.4 }}
      >
        <LiquidGlassPill className="flex items-center gap-3 px-6 py-3">
          <span
            className="w-2 h-2 rounded-full bg-[var(--color-accent-cyan)]"
            style={{ boxShadow: '0 0 6px var(--color-accent-cyan)' }}
            aria-hidden="true"
          />
          <span className="text-white font-medium text-sm">Volunteer With Us</span>
        </LiquidGlassPill>
      </motion.button>

      {/* Mobile Hamburger */}
      <motion.button
        className="fixed top-6 right-6 z-50 lg:hidden"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open menu"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1], delay: 0.4 }}
      >
        <LiquidGlassCircle size={44}>
          <div className="flex flex-col items-center gap-1.5">
            <span className="w-5 h-[1.5px] bg-white rounded" />
            <span className="w-3.5 h-[1.5px] bg-white rounded" />
          </div>
        </LiquidGlassCircle>
      </motion.button>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeIndex={activeIndex}
        onSectionChange={onSectionChange}
      />
    </>
  );
}