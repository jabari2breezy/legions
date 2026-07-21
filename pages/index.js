'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Nav } from '../components/nav/Nav';
import { HomeSection } from '../components/sections/HomeSection';
import { AboutSection } from '../components/sections/AboutSection';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { ContactSection } from '../components/sections/ContactSection';
import { useActiveSection } from '../hooks/useActiveSection';
import { sectionIndices } from '../lib/constants';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';

function PageContent() {
  const { activeIndex, setActiveIndex, isAnimating } = useActiveSection();
  const wrapperRef = useRef(null);
  const [mounted, setMounted] = useState(true); // Set to true by default to avoid loading flash

  useEffect(() => {
    const handleSectionChange = (e) => {
      if (e.detail?.index !== undefined) {
        setActiveIndex(e.detail.index);
      }
    };

    window.addEventListener('section-change', handleSectionChange);
    return () => window.removeEventListener('section-change', handleSectionChange);
  }, [setActiveIndex]);

  useEffect(() => {
    if (!mounted || !wrapperRef.current) return;

    const targetY = -(activeIndex * 25);
    gsap.to(wrapperRef.current, {
      yPercent: targetY,
      duration: 1.1,
      ease: 'power3.inOut',
    });
  }, [activeIndex, mounted]);

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

export default function Home() {
  return (
    <div className="h-full">
      {/* Global grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />
      <ErrorBoundary
        fallback={
          <div className="h-screen w-full bg-[var(--color-bg-deep)] flex items-center justify-center p-8 text-center">
            <h1 className="font-[Playfair_Display] text-4xl text-white mb-4">Something went wrong</h1>
            <p className="text-white/70 font-[Poppins] mb-6 max-w-md mx-auto">
              The page failed to load. Please refresh or try again later.
            </p>
          </div>
        }
      >
        <PageContent />
      </ErrorBoundary>
    </div>
  );
}