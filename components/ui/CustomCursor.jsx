'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { create } from 'zustand';

export const useCursorStore = create((set) => ({
  scale: 20,
  fill: 'transparent',
  label: '',
  setHover: (data) =>
    set(
      data ?? { scale: 20, fill: 'transparent', label: '' }
    ),
}));

export function CustomCursor() {
  const { scale, fill, label } = useCursorStore();
  const cursorRef = useRef(null);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const quickXRef = useRef(null);
  const quickYRef = useRef(null);

  useEffect(() => {
    const checkPointer = () => {
      setIsFinePointer(window.matchMedia('(pointer: fine)').matches);
    };
    checkPointer();
    const mq = window.matchMedia('(pointer: fine)');
    mq.addEventListener('change', checkPointer);
    return () => mq.removeEventListener('change', checkPointer);
  }, []);

  useEffect(() => {
    if (!isFinePointer || !cursorRef.current) return;

    const el = cursorRef.current;
    quickXRef.current = gsap.quickTo(el, 'x', { duration: 0.18, ease: 'power3' });
    quickYRef.current = gsap.quickTo(el, 'y', { duration: 0.18, ease: 'power3' });

    const handleMouseMove = (e) => {
      quickXRef.current(e.clientX - scale / 2);
      quickYRef.current(e.clientY - scale / 2);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isFinePointer, scale]);

  if (!isFinePointer) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] mix-blend-difference"
      style={{
        width: scale,
        height: scale,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.6)',
        background: fill,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#4DE8D4',
        whiteSpace: 'nowrap',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      {label && <span>{label}</span>}
    </div>
  );
}

export function useCursor() {
  const { setHover } = useCursorStore();
  return {
    setHoverLabel: (label, scale = 56, fill = 'rgba(77,232,212,0.15)') => {
      setHover({ scale, fill, label });
    },
    clearHover: () => setHover(null),
  };
}
