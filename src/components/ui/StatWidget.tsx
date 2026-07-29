import { motion } from 'framer-motion';
import type { JSX } from 'react';
import { fluidEase } from '@/utils/easing';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';

interface StatWidgetProps {
  value: string;
  index: number;
}

export function StatWidget({ value, index }: StatWidgetProps): JSX.Element {
  const prefersReduced = useReducedMotion();
  const match = /^([\d$.%+-]+)(.*)$/.exec(value);
  const leading = match ? match[1] : value;
  const rest = match ? match[2] : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: fluidEase,
      }}
      className={cn(
        'relative rounded-card border border-white/10',
        'bg-white/[0.03] backdrop-blur-[40px] p-6 shadow-glass-inset'
      )}
    >
      {!prefersReduced && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-card"
          style={{
            boxShadow: '0 0 24px rgba(0, 240, 255, 0.2)',
            animation: 'statPulse 3s ease-in-out infinite',
          }}
        />
      )}
      <p className="relative z-10 text-2xl font-bold leading-tight">
        <span className="text-cyan-glow">{leading}</span>
        <span className="text-text-secondary">{rest}</span>
      </p>
      <style>{`
        @keyframes statPulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </motion.div>
  );
}
