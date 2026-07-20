'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import { motion } from 'framer-motion';
import { HeroScene } from '../three/HeroScene';
import { MagneticButton } from '../ui/MagneticButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function HomeSection({ isActive }: { isActive: boolean }) {
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<InstanceType<typeof SplitType> | null>(null);
  const animationCtxRef = useRef<gsap.Context | null>(null);
  const reducedMotion = useReducedMotion();

  // Animation on section enter/exit
  useEffect(() => {
    if (animationCtxRef.current) {
      animationCtxRef.current.revert();
      animationCtxRef.current = null;
    }

    // Reset all elements
    gsap.set([headlineRef.current, subtextRef.current, ctaRef.current, scrollCueRef.current], {
      opacity: 0,
      clearProps: 'transform',
    });

    if (!isActive) return;

    animationCtxRef.current = gsap.context(() => {
      // Split headline into lines
      if (headlineRef.current && !reducedMotion) {
        splitRef.current = new SplitType(headlineRef.current, { types: 'lines' });
        const lines = headlineRef.current.querySelectorAll('.line');

        gsap.from(lines, {
          yPercent: 110,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.08,
        });
      } else if (headlineRef.current) {
        gsap.set(headlineRef.current, { opacity: 1 });
      }

      // Subtext
      gsap.fromTo(
        subtextRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: reducedMotion ? 0 : 0.7,
        }
      );

      // CTA
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: reducedMotion ? 0.1 : 1.0,
        }
      );

      // Scroll cue
      gsap.fromTo(
        scrollCueRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: reducedMotion ? 0.2 : 1.4,
        }
      );

      // Scroll cue dot animation
      const dot = scrollCueRef.current?.querySelector('.scroll-dot');
      if (dot && !reducedMotion) {
        gsap.to(dot, {
          y: 20,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    });

    return () => {
      if (animationCtxRef.current) {
        animationCtxRef.current.revert();
        animationCtxRef.current = null;
      }
      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }
    };
  }, [isActive, reducedMotion]);

  // Section background gradient
  const sectionStyle: React.CSSProperties = {
    background: `
      radial-gradient(60vmax circle at 50% 40%, rgba(77,232,212,0.15) 0%, transparent 60%),
      radial-gradient(50vmax circle at 30% 70%, rgba(67,97,238,0.1) 0%, transparent 60%),
      #1A1147
    `,
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-start justify-center overflow-hidden"
      style={sectionStyle}
      data-section="home"
      aria-labelledby="home-headline"
    >
      {/* Hero visual - Three.js scene or static fallback */}
      <HeroScene />

      {/* Grain overlay is global at layout level */}

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] px-6 md:px-20">
        <div className="pt-32 md:pt-40 pb-20">
          {/* Headline */}
          <div
            ref={headlineRef}
            id="home-headline"
            className="font-[Playfair_Display] font-bold leading-[1.05] text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)' }}
          >
            Youth-Led Action. Real Community Change.
          </div>

          {/* Subtext */}
          <div
            ref={subtextRef}
            className="mt-6 max-w-[480px] font-[Poppins] text-white/80 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
          >
            Legions Club mobilises students across Dar es Salaam to lead humanitarian and environmental projects — from tree planting and hospital renovations to orphan support and clean water access.
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="mt-10">
            <MagneticButton
              strength={1.5}
              maxDistance={14}
              className="inline-flex"
              onClick={() => {
                const event = new CustomEvent('section-change', { detail: { index: 2 } });
                window.dispatchEvent(event);
              }}
              data-cursor-label="View Projects"
            >
              <button className="liquid-glass px-8 py-4 rounded-full text-white font-medium text-sm uppercase tracking-wider">
                View Our Projects
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          aria-hidden="true"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
          <div className="relative w-[12px] h-[32px] border border-white/30 rounded-full">
            <div
              className="scroll-dot absolute left-1/2 top-2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-[var(--color-accent-cyan)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}