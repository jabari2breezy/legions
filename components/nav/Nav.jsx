'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiquidGlassCircle, LiquidGlassPill } from '../ui/LiquidGlass';
import { FullscreenMenu } from './FullscreenMenu';
import { sectionIndices } from '../../lib/constants';
import { useCursor } from '../ui/CustomCursor';

const navSections = [
  { label: 'Home', key: 'home' },
  { label: 'About', key: 'about' },
  { label: 'Projects', key: 'projects' },
  { label: 'Contact', key: 'contact' },
];

export function Nav({ activeIndex, onSectionChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setHoverLabel, clearHover } = useCursor();

  const handleNavClick = (index) => {
    onSectionChange(index);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Logo - Top Left */}
      <motion.button
        className="fixed top-6 left-6 z-[60]"
        onClick={() => handleNavClick(0)}
        onMouseEnter={() => setHoverLabel('Home')}
        onMouseLeave={clearHover}
        aria-label="Legions Club - Home"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1], delay: 0.2 }}
        style={{ filter: 'drop-shadow(0 0 8px rgba(77,232,212,0.6))' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </motion.button>

      {/* Hamburger - Top Right (all screen sizes) */}
      <motion.button
        className="fixed top-6 right-6 z-[60]"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open menu"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1], delay: 0.4 }}
        onMouseEnter={() => setHoverLabel('Menu')}
        onMouseLeave={clearHover}
      >
        <LiquidGlassCircle size={44}>
          <div className="flex flex-col items-center gap-1.5">
            <span className="w-5 h-[1.5px] bg-white rounded" />
            <span className="w-3.5 h-[1.5px] bg-white rounded" />
          </div>
        </LiquidGlassCircle>
      </motion.button>

      {/* Fullscreen Overlay Menu */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeIndex={activeIndex}
        onSectionChange={handleNavClick}
        navSections={navSections}
      />
    </>
  );
}
