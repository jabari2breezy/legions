'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiquidGlassCircle, LiquidGlassPill } from '../ui/LiquidGlass';
import { useCursor } from '../ui/CustomCursor';
import { sectionIndices } from '../../lib/constants';

const menuVariants = {
  closed: {
    clipPath: 'circle(0% at calc(100% - 2.75rem) 2.75rem)',
    transition: { duration: 0.8, ease: [0.77, 0, 0.18, 1], delay: 0.2 },
  },
  open: {
    clipPath: 'circle(150% at calc(100% - 2.75rem) 2.75rem)',
    transition: { duration: 0.9, ease: [0.77, 0, 0.18, 1] },
  },
};

const letterVariants = {
  hidden: { y: '110%' },
  visible: (i) => ({
    y: '0%',
    transition: {
      duration: 0.6,
      ease: [0.77, 0, 0.18, 1],
      delay: 0.3 + i * 0.03,
    },
  }),
  exit: (i) => ({
    y: '-110%',
    transition: {
      duration: 0.4,
      ease: [0.77, 0, 0.18, 1],
      delay: i * 0.02,
    },
  }),
};

function RollingText({ text, isOpen }) {
  return (
    <span className="inline-flex overflow-hidden">
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate={isOpen ? 'visible' : 'exit'}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export function FullscreenMenu({ isOpen, onClose, activeIndex, onSectionChange, navSections }) {
  const { setHoverLabel, clearHover } = useCursor();
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleItemClick = (index) => {
    onSectionChange(index);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          className="fixed inset-0 z-[55] flex flex-col items-center justify-center"
          style={{ background: 'var(--color-bg-deep)' }}
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 z-[56]"
            onClick={onClose}
            aria-label="Close menu"
          >
            <LiquidGlassCircle size={44}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </LiquidGlassCircle>
          </button>

          {/* Nav Items */}
          <nav className="flex flex-col items-center gap-2">
            {navSections.map((section, i) => {
              const isActive = activeIndex === sectionIndices[section.key];
              return (
                <motion.button
                  key={section.key}
                  className={`group relative px-8 py-4 rounded-full transition-colors ${
                    isActive
                      ? 'bg-white/10'
                      : 'hover:bg-white/5'
                  }`}
                  onClick={() => handleItemClick(sectionIndices[section.key])}
                  onMouseEnter={() => setHoverLabel(section.label)}
                  onMouseLeave={clearHover}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.77, 0, 0.18, 1],
                    delay: 0.15 + i * 0.08,
                  }}
                >
                  <span className={`font-[Playfair_Display] text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight ${
                    isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                  }`}>
                    <RollingText text={section.label} isOpen={isOpen} />
                  </span>

                  {isActive && (
                    <motion.span
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-accent-cyan)]"
                      style={{ boxShadow: '0 0 8px var(--color-accent-cyan)' }}
                      layoutId="menu-active-dot"
                      transition={{ duration: 0.4, ease: [0.77, 0, 0.18, 1] }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* CTA */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.18, 1], delay: 0.5 }}
          >
            <LiquidGlassPill
              className="flex items-center gap-3 px-8 py-4"
              onClick={() => handleItemClick(sectionIndices.contact)}
              onMouseEnter={() => setHoverLabel('Volunteer With Us')}
              onMouseLeave={clearHover}
            >
              <span
                className="w-3 h-3 rounded-full bg-[var(--color-accent-cyan)]"
                style={{ boxShadow: '0 0 6px var(--color-accent-cyan)' }}
                aria-hidden="true"
              />
              <span className="text-white font-medium text-lg">Volunteer With Us</span>
            </LiquidGlassPill>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
