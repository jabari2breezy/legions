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
    if (animationLockRef.current) return;
    if (index < 0 || index > 3) return;

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
  }, []);

  // Wheel: deltaX for horizontal trackpads, deltaY for vertical scroll
  useEffect(() => {
    let lastWheel = 0;
    const handleWheel = (e) => {
      const now = Date.now();
      if (now - lastWheel < 100) return;
      lastWheel = now;

      if (animationLockRef.current) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const direction = delta > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(3, activeIndex + direction));
      if (nextIndex !== activeIndex) {
        scrollToSection(nextIndex);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeIndex, scrollToSection]);

  // Touch: horizontal swipe
  useEffect(() => {
    let touchStartX = 0;
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e) => {
      if (animationLockRef.current) return;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchStartX - touchEndX;
      if (Math.abs(deltaX) > 50) {
        const direction = deltaX > 0 ? 1 : -1;
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

  // Keyboard: left/right arrows, page up/down
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (animationLockRef.current) return;

      let direction = 0;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') direction = 1;
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') direction = -1;
      else if (e.key === 'ArrowDown') direction = 1;
      else if (e.key === 'ArrowUp') direction = -1;
      else return;

      e.preventDefault();
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
