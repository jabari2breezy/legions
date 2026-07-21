'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { LiquidGlassCircle, LiquidGlassPill } from '../ui/LiquidGlass';
import { sectionIndices, sectionHashes } from '../../lib/constants';
import { useCursor } from '../ui/CustomCursor';

const navItems = [
  { label: 'Home', index: 0 },
  { label: 'About', index: 1 },
  { label: 'Projects', index: 2 },
  { label: 'Contact', index: 3 },
];

export function MobileMenu({ isOpen, onClose, activeIndex, onSectionChange }) {
  const { setHoverLabel, clearHover } = useCursor();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSectionClick = (index) => {
    onSectionChange(index);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[var(--color-bg-deep)] z-55 flex flex-col items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <button
            className="absolute top-6 right-6"
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

          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item, i) => (
              <motion.button
                key={item.label}
                className={`text-5xl font-medium tracking-tight transition-colors ${
                  activeIndex === item.index
                    ? 'text-white'
                    : 'text-white/90 hover:text-[var(--color-accent-cyan)]'
                }`}
                onClick={() => handleSectionClick(item.index)}
                onMouseEnter={() => setHoverLabel(item.label)}
                onMouseLeave={clearHover}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{
                  duration: 0.6,
                  ease: [0.77, 0, 0.18, 1],
                  delay: 0.1 + i * 0.06,
                }}
              >
                {item.label}
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{
                duration: 0.6,
                ease: [0.77, 0, 0.18, 1],
                delay: 0.4,
              }}
            >
              <LiquidGlassPill
                className="flex items-center gap-3 px-8 py-4"
                onClick={() => handleSectionChange(3)}
                onMouseEnter={() => setHoverLabel('Volunteer With Us')}
                onMouseLeave={clearHover}
              >
                <span
                  className="w-3 h-3 rounded-full bg-[var(--color-accent-cyan)]"
                  style={{ boxShadow: '0 0 6px var(--color-accent-cyan)' }}
                  aria-hidden="true"
                />
                <span className="text-white font-medium">Volunteer With Us</span>
              </LiquidGlassPill>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}