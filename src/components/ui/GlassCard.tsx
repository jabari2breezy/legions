import { useRef } from 'react';
import type { JSX } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { appleEase } from '@/utils/easing';
import { cn } from '@/utils/cn';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  interactive?: boolean;
  glowFollow?: boolean;
}

export function GlassCard({
  children,
  className,
  interactive = false,
  glowFollow = false,
  ...props
}: GlassCardProps): JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!glowFollow || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--x', `${String(x)}px`);
    cardRef.current.style.setProperty('--y', `${String(y)}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      data-cursor-hover={interactive ? '' : undefined}
      className={cn(
        'group relative overflow-hidden rounded-card border border-white/10',
        'bg-white/[0.03] backdrop-blur-[40px] shadow-glass-inset',
        className
      )}
      whileHover={
        interactive
          ? { scale: 1.01, backgroundColor: 'rgba(255,255,255,0.08)' }
          : undefined
      }
      transition={{ duration: 0.4, ease: appleEase }}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {glowFollow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.12), transparent 60%)',
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
