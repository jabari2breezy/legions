'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Counter } from '../ui/Counter';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AboutSectionProps {
  isActive: boolean;
}

export function AboutSection({ isActive }: AboutSectionProps) {
  const paragraphsRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);
  const animationCtxRef = useRef<gsap.Context | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (animationCtxRef.current) {
      animationCtxRef.current.revert();
      animationCtxRef.current = null;
    }

    if (!isActive) {
      // Reset
      if (paragraphsRef.current) {
        gsap.set(paragraphsRef.current.querySelectorAll('p'), { opacity: 0, y: 24 });
      }
      return;
    }

    animationCtxRef.current = gsap.context(() => {
      // Paragraphs
      const paragraphs = paragraphsRef.current?.querySelectorAll('p');
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            delay: reducedMotion ? 0 : 0.2,
          }
        );
      }

      // Counters - animate when in view
      const counterEls = countersRef.current?.querySelectorAll('[data-counter]');
      if (counterEls) {
        counterEls.forEach((el, i) => {
          const target = parseInt(el.getAttribute('data-counter') || '0', 10);
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const obj = { val: 0 };
          
          gsap.to(obj, {
            val: target,
            duration: 1.6,
            ease: 'power1.out',
            delay: reducedMotion ? 0 : 0.6 + i * 0.1,
            onUpdate: () => {
              (el as HTMLElement).innerText = `${prefix}${Math.floor(obj.val).toLocaleString()}${suffix}`;
            },
          });
        });
      }
    });

    return () => {
      if (animationCtxRef.current) {
        animationCtxRef.current.revert();
      }
    };
  }, [isActive, reducedMotion]);

  // Section background
  const sectionStyle: React.CSSProperties = {
    background: `
      radial-gradient(45vmax circle at 20% 60%, rgba(77,232,212,0.08) 0%, transparent 60%),
      radial-gradient(40vmax circle at 80% 30%, rgba(67,97,238,0.06) 0%, transparent 60%),
      #1A1147
    `,
  };

  return (
    <section
      id="about"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={sectionStyle}
      data-section="about"
      aria-labelledby="about-headline"
    >
      <div className="relative z-10 w-full max-w-3xl px-6 md:px-20 text-center">
        <div ref={paragraphsRef} className="space-y-6">
          <h2
            id="about-headline"
            className="font-[Playfair_Display] font-bold text-white text-4xl md:text-5xl"
          >
            Youth-Led. Community-Rooted. Impact-Measured.
          </h2>

          <p className="text-white/70 text-lg md:text-xl leading-relaxed font-[Poppins]">
            Founded in 2022, Legions Club is a student-led non-profit based in Dar es Salaam, Tanzania.
            We believe young people aren't just future leaders — they're current changemakers.
          </p>

          <p className="text-white/70 text-lg md:text-xl leading-relaxed font-[Poppins]">
            Every project is student-designed, student-led, and student-executed. No paid staff.
            100% volunteer-powered. From planting 2,000+ trees in school botanical gardens to renovating
            the childhood cancer ward at Muhimbili Hospital, our work is tangible, local, and measurable.
          </p>

          <p className="text-white/70 text-lg md:text-xl leading-relaxed font-[Poppins]">
            In just three years, we've mobilised 139 student volunteers contributing over 2,600 hours
            of service — building a well in Pwani Region, serving 550+ orphans at our annual Ramadan
            Iftar, and distributing monthly ration packages to vulnerable families.
          </p>
        </div>

        {/* Stats */}
        <div ref={countersRef} className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="text-center" data-counter="139" data-suffix="+">
            <Counter target={139} suffix="+" className="font-serif text-4xl md:text-5xl font-bold text-white" />
            <p className="text-white/50 text-sm uppercase tracking-wider mt-1">Student Volunteers</p>
          </div>
          <div className="text-center" data-counter="2600" data-suffix="+">
            <Counter target={2600} suffix="+" className="font-serif text-4xl md:text-5xl font-bold text-white" />
            <p className="text-white/50 text-sm uppercase tracking-wider mt-1">Service Hours</p>
          </div>
          <div className="text-center" data-counter="550" data-suffix="+">
            <Counter target={550} suffix="+" className="font-serif text-4xl md:text-5xl font-bold text-white" />
            <p className="text-white/50 text-sm uppercase tracking-wider mt-1">Orphans Supported</p>
          </div>
          <div className="text-center" data-counter="3" data-suffix="rd">
            <Counter target={3} suffix="rd" className="font-serif text-4xl md:text-5xl font-bold text-white" />
            <p className="text-white/50 text-sm uppercase tracking-wider mt-1">Annual Ramadan Iftars</p>
          </div>
        </div>
      </div>
    </section>
  );
}