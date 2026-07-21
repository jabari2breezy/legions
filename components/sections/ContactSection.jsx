'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MagneticButton } from '../ui/MagneticButton';
import { LiquidGlassPill, LiquidGlass } from '../ui/LiquidGlass';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function ContactSection({ isActive }) {
  const elementsRef = useRef(null);
  const animationCtxRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (animationCtxRef.current) {
      animationCtxRef.current.revert();
      animationCtxRef.current = null;
    }

    if (!isActive) return;

    animationCtxRef.current = gsap.context(() => {
      const elements = elementsRef.current?.querySelectorAll('[data-contact-element]');
      if (elements) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            delay: reducedMotion ? 0 : 0.2,
          }
        );
      }
    });

    return () => {
      if (animationCtxRef.current) {
        animationCtxRef.current.revert();
      }
    };
  }, [isActive, reducedMotion]);

  const sectionStyle = {
    background: `
      radial-gradient(55vmax circle at 50% 70%, rgba(77,232,212,0.12) 0%, transparent 60%),
      radial-gradient(40vmax circle at 10% 20%, rgba(67,97,238,0.08) 0%, transparent 60%),
      #1A1147
    `,
  };

  return (
    <section
      id="contact"
      className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center overflow-hidden"
      style={sectionStyle}
      data-section="contact"
      aria-labelledby="contact-headline"
    >
      <div ref={elementsRef} className="relative z-10 w-full max-w-2xl px-6 md:px-12 text-center">
        <h2
          id="contact-headline"
          data-contact-element
          className="font-[Playfair_Display] font-bold italic text-white mb-6"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          Ready to serve?
        </h2>

        {/* Primary CTAs */}
        <div data-contact-element className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <MagneticButton
            strength={1.5}
            maxDistance={14}
            onClick={() => {
              const event = new CustomEvent('section-change', { detail: { index: 2 } });
              window.dispatchEvent(event);
            }}
            data-cursor-label="View Projects"
          >
            <button className="liquid-glass px-10 py-5 rounded-full text-white font-medium text-sm uppercase tracking-wider bg-[rgba(77,232,212,0.15)]">
              Become a Volunteer
            </button>
          </MagneticButton>
          <MagneticButton
            strength={1.5}
            maxDistance={14}
            data-cursor-label="Partner With Us"
          >
            <button className="liquid-glass px-10 py-5 rounded-full text-white/80 font-medium text-sm uppercase tracking-wider border border-white/20 hover:border-[var(--color-teal)] hover:text-white transition-colors duration-300">
              Partner With Us
            </button>
          </MagneticButton>
        </div>

        {/* Contact Details */}
        <div data-contact-element className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/70 font-[Poppins] text-sm mb-16">
          <a
            href="mailto:legionsclubtz@gmail.com"
            className="flex items-center gap-2 hover:text-white transition-colors duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            legionsclubtz@gmail.com
          </a>
          <a
            href="https://instagram.com/legionsclubtz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            @legionsclubtz
          </a>
        </div>

        {/* Optional Form */}
        <form data-contact-element className="space-y-4 max-w-md mx-auto text-left">
          <h3 className="font-[Playfair_Display] font-bold text-white text-xl mb-4">Send us a message</h3>
          <div className="space-y-4">
            <LiquidGlass className="flex flex-col">
              <label className="text-white/50 text-xs uppercase tracking-wider mb-1 px-4 pt-4">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="bg-transparent border-none outline-none text-white placeholder-white/40 px-4 pb-4 text-base font-[Poppins] w-full"
              />
            </LiquidGlass>
            <LiquidGlass className="flex flex-col">
              <label className="text-white/50 text-xs uppercase tracking-wider mb-1 px-4 pt-4">Email</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="bg-transparent border-none outline-none text-white placeholder-white/40 px-4 pb-4 text-base font-[Poppins] w-full"
              />
            </LiquidGlass>
            <LiquidGlass className="flex flex-col">
              <label className="text-white/50 text-xs uppercase tracking-wider mb-1 px-4 pt-4">Message</label>
              <textarea
                name="message"
                placeholder="How can we help?"
                rows={4}
                className="bg-transparent border-none outline-none text-white placeholder-white/40 px-4 py-4 text-base font-[Poppins] w-full resize-none"
              />
            </LiquidGlass>
            <MagneticButton strength={1.5} maxDistance={14} className="w-full md:w-auto">
              <button type="submit" className="liquid-glass px-10 py-4 rounded-full text-white font-medium text-sm uppercase tracking-wider bg-[rgba(77,232,212,0.15)] w-full md:w-auto">
                Send Message
              </button>
            </MagneticButton>
          </div>
        </form>
      </div>
    </section>
  );
}