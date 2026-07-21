import { useState, useEffect, useCallback, useRef } from 'react';
import { sectionIndices, sectionHashes } from '../lib/constants';

export function useActiveSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationLockRef = useRef(false);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash in sectionIndices) {
      setActiveIndex(sectionIndices[hash]);
    }
  }, []);

  const scrollToSection = useCallback((index) => {
    if (animationLockRef.current || isAnimating) return;
    if (index === activeIndex) return;

    animationLockRef.current = true;
    setIsAnimating(true);
    setActiveIndex(index);

    const hash = sectionHashes[index];
    if (hash) {
      history.replaceState(null, '', `#${hash}`);
    }

    setTimeout(() => {
      animationLockRef.current = false;
      setIsAnimating(false);
    }, 1200);
  }, [activeIndex, isAnimating]);

  useEffect(() => {
    let lastWheel = 0;
    const handleWheel = (e) => {
      const now = Date.now();
      if (now - lastWheel < 100) return;
      lastWheel = now;

      if (animationLockRef.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(3, activeIndex + direction));
      if (nextIndex !== activeIndex) {
        scrollToSection(nextIndex);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeIndex, scrollToSection]);

  useEffect(() => {
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      if (animationLockRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaY) > 50) {
        const direction = deltaY > 0 ? 1 : -1;
        const nextIndex = Math.max(0, Math.min(3, activeIndex + direction));
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (animationLockRef.current) return;
      const keys = ['ArrowDown', 'PageDown', 'ArrowUp', 'PageUp'];
      if (!keys.includes(e.key)) return;

      e.preventDefault();
      const direction = ['ArrowDown', 'PageDown'].includes(e.key) ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(3, activeIndex + direction));
      if (nextIndex !== activeIndex) {
        scrollToSection(nextIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, scrollToSection]);

  return { activeIndex, setActiveIndex: scrollToSection, isAnimating };
}