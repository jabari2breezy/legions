'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Nav } from './components/nav/Nav';
import { HomeSection } from './components/sections/HomeSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectGrid } from './components/projects/ProjectGrid';
import { ContactSection } from './components/sections/ContactSection';
import { useActiveSection } from './hooks/useActiveSection';
import { sectionIndices } from './lib/constants';

export default function Home() {
  const { activeIndex, setActiveIndex, isAnimating } = useActiveSection();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleSectionChange = (e: CustomEvent) => {
      if (e.detail?.index !== undefined) {
        setActiveIndex(e.detail.index);
      }
    };

    window.addEventListener('section-change', handleSectionChange as EventListener);
    return () => window.removeEventListener('section-change', handleSectionChange as EventListener);
  }, [setActiveIndex]);

  useEffect(() => {
    if (!mounted || !wrapperRef.current) return;

    const targetY = -activeIndex * 100;
    gsap.to(wrapperRef.current, {
      yPercent: targetY,
      duration: 1.1,
      ease: 'power3.inOut',
    });
  }, [activeIndex, mounted]);

  if (!mounted) {
    return (
      <div className="h-screen w-full bg-[var(--color-bg-deep)] flex items-center justify-center">
        <div className="text-center">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4DE8D4" strokeWidth="1.5" className="mx-auto mb-4 animate-float">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <p className="text-white/50 font-[Poppins] text-sm uppercase tracking-wider">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Nav
        activeIndex={activeIndex}
        onSectionChange={setActiveIndex}
      />

      <div
        ref={wrapperRef}
        className="section-wrapper"
        style={{ willChange: 'transform' }}
      >
        <HomeSection isActive={activeIndex === sectionIndices.home} />
        <AboutSection isActive={activeIndex === sectionIndices.about} />
        <ProjectGrid isActive={activeIndex === sectionIndices.projects} />
        <ContactSection isActive={activeIndex === sectionIndices.contact} />
      </div>
    </div>
  );
}