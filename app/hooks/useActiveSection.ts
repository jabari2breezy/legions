import { useState, useEffect, useCallback, useRef } from 'react';
import { sectionIndices, sectionHashes } from '../lib/constants';

type SectionIndex = 0 | 1 | 2 | 3;

export function useActiveSection() {
  const [activeIndex, setActiveIndexState] = useState<SectionIndex>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationLockRef = useRef(false);

  // Read initial hash from URL
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash in sectionIndices) {
      setActiveIndexState(sectionIndices[hash as keyof typeof sectionIndices]);
    }
  }, []);

  const scrollToSection = useCallback((index: number) => {
    const sectionIndex = Math.max(0, Math.min(3, index)) as SectionIndex;
    if (animationLockRef.current || isAnimating) return;
    if (sectionIndex === activeIndex) return;

    animationLockRef.current = true;
    setIsAnimating(true);
    setActiveIndexState(sectionIndex);

    // Update URL hash without scroll
    const hash = sectionHashes[sectionIndex];
    if (hash) {
      history.replaceState(null, '', `#${hash}`);
    }

    // Release lock after transition duration
    setTimeout(() => {
      animationLockRef.current = false;
      setIsAnimating(false);
    }, 1200); // Slightly longer than GSAP transition
  }, [activeIndex, isAnimating]);

  // Wheel event handler
  useEffect(() => {
    let lastWheel = 0;
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheel < 100) return; // Debounce
      lastWheel = now;

      if (animationLockRef.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(3, activeIndex + direction)) as SectionIndex;
      if (nextIndex !== activeIndex) {
        scrollToSection(nextIndex);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeIndex, scrollToSection]);

  // Touch swipe handler
  useEffect(() => {
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (animationLockRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaY) > 50) {
        const direction = deltaY > 0 ? 1 : -1;
        const nextIndex = Math.max(0, Math.min(3, activeIndex + direction)) as SectionIndex;
        if (nextIndex !== activeIndex) {
          scrollToSection(nextIndex);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeIndex, scrollToSection]);

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (animationLockRef.current) return;
      const keys = ['ArrowDown', 'PageDown', 'ArrowUp', 'PageUp'];
      if (!keys.includes(e.key)) return;

      e.preventDefault();
      const direction = ['ArrowDown', 'PageDown'].includes(e.key) ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(3, activeIndex + direction)) as SectionIndex;
      if (nextIndex !== activeIndex) {
        scrollToSection(nextIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, scrollToSection]);

  return { activeIndex, setActiveIndex: scrollToSection, isAnimating };
}