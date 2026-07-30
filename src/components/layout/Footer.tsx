import { motion } from 'framer-motion';
import type { JSX } from 'react';
import { fluidEase } from '@/utils/easing';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';

export function Footer(): JSX.Element {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={cn(
        'fixed bottom-8 left-1/2 z-30 -translate-x-1/2',
        'rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-[40px]',
        'flex items-center gap-3 px-5 py-3 shadow-glass-inset'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: fluidEase, delay: 0.5 }}
    >
      <span className="relative flex h-6 w-4 items-start justify-center rounded-full border border-white/20 p-1">
        {!prefersReduced && (
          <motion.span
            className="h-1 w-1 rounded-full bg-white"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        {prefersReduced && (
          <span className="h-1 w-1 rounded-full bg-white" />
        )}
      </span>
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary">
        Scroll to Explore
      </span>
    </motion.div>
  );
}
