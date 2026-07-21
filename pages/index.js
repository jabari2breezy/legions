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

    const targetX = -(activeIndex * 25);
    gsap.to(wrapperRef.current, {
      xPercent: targetX,
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
      <div className="grain-overlay" aria-hidden="true" />
      <PageContent />
    </div>
  );
}