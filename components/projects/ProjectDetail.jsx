'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { projects } from '../../lib/projects-data';
import { LiquidGlassCircle, LiquidGlassPill } from '../ui/LiquidGlass';
import { Counter } from '../ui/Counter';
import { useCursor } from '../ui/CustomCursor';

export function ProjectDetail({ project, layoutId, onClose, isOpen }) {
  const { clearHover } = useCursor();
  const detailRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      clearHover();
      // Focus trap
      const focusableElements = detailRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements?.[0];
      const lastFocusable = focusableElements?.[focusableElements.length - 1];

      const handleTab = (e) => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      };

      document.addEventListener('keydown', handleTab);
      firstFocusable?.focus();

      return () => {
        document.removeEventListener('keydown', handleTab);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, clearHover]);

  useEffect(() => {
    if (!isOpen) return;
    gsap.fromTo(
      '.gallery-image',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
    );
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={detailRef}
        className="fixed inset-0 z-60 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background scrim */}
        <motion.div
          className="absolute inset-0 bg-[var(--color-bg-deep)]/95 backdrop-blur-[20px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Close button */}
        <button
          className="absolute top-6 right-6 z-70"
          onClick={onClose}
          aria-label="Close project detail"
        >
          <LiquidGlassCircle size={44}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </LiquidGlassCircle>
        </button>

        {/* Content */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Hero image with shared layout */}
          <motion.div
            layoutId={`${layoutId}-image`}
            className="relative h-[50vh] w-full min-h-[300px] flex-shrink-0"
          >
            <motion.img
              src={project.mainImage}
              alt={project.title}
              className="w-full h-full object-cover"
              layoutId={`${layoutId}-image`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 id="detail-title" className="font-[Playfair_Display] text-3xl md:text-5xl font-bold text-white">
                {project.title}
              </h2>
            </div>
          </motion.div>

          {/* Details */}
          <div className="p-6 md:p-10 lg:p-16 max-w-4xl mx-auto w-full flex-1">
            {/* Description */}
            <div className="mb-10">
              <p className="text-white/80 text-lg md:text-xl leading-relaxed font-[Poppins]">
                {project.description}
              </p>
            </div>

            {/* Stats */}
            <div className="mb-10 flex flex-wrap gap-4">
              {project.stats.map((stat, i) => (
                <LiquidGlassPill key={i} className="flex items-center gap-3 px-5 py-3">
                  <Counter
                    target={parseInt(stat.value.replace(/[^\d]/g, ''), 10)}
                    suffix={stat.value.includes('+') ? '+' : ''}
                    className="font-serif text-xl font-bold text-white"
                  />
                  <span className="text-white/70 text-sm">{stat.label}</span>
                </LiquidGlassPill>
              ))}
            </div>

            {/* Gallery */}
            {project.galleryImages.length > 0 && (
              <div className="mb-10">
                <h3 className="font-[Playfair_Display] text-2xl font-bold text-white mb-6">Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.galleryImages.map((img, i) => (
                    <motion.div
                      key={i}
                      className="gallery-image relative aspect-[4/3] rounded-xl overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="pt-6 border-t border-white/10">
              <LiquidGlassPill
                className="w-full md:w-auto flex items-center gap-3 px-8 py-4"
                onClick={onClose}
              >
                <span className="text-white font-medium">Back to Projects</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4DE8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </LiquidGlassPill>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}