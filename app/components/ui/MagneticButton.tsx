'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  maxDistance?: number;
  onClick?: () => void;
  href?: string;
  'data-cursor-label'?: string;
}

export function MagneticButton({
  children,
  className = '',
  style = {},
  strength = 1.5,
  maxDistance = 14,
  onClick,
  href,
  'data-cursor-label': cursorLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: Event) => {
      const me = e as MouseEvent;
      if (!boundsRef.current) return;
      const rect = boundsRef.current;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (me.clientX - centerX) * strength;
      const deltaY = (me.clientY - centerY) * strength;

      const clampedX = Math.max(-maxDistance, Math.min(maxDistance, deltaX));
      const clampedY = Math.max(-maxDistance, Math.min(maxDistance, deltaY));

      gsap.to(el, {
        x: clampedX,
        y: clampedY,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    const handleMouseEnter = () => {
      boundsRef.current = el.getBoundingClientRect();
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [strength, maxDistance]);

  if (href) {
    return (
      <a
        ref={ref as unknown as React.Ref<HTMLAnchorElement>}
        className={className}
        style={{ ...style, position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={onClick}
        href={href}
        data-cursor-label={cursorLabel}
      >
        <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={ref as unknown as React.Ref<HTMLButtonElement>}
      className={className}
      style={{ ...style, position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClick}
      data-cursor-label={cursorLabel}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  );
}