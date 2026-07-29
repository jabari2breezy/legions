import { motion } from 'framer-motion';
import type { JSX } from 'react';
import { fluidEase } from '@/utils/easing';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';

interface LetterRevealProps {
  text: string;
  staggerDelay?: number;
  className?: string;
}

export function LetterReveal({
  text,
  staggerDelay = 0.03,
  className,
}: LetterRevealProps): JSX.Element {
  const prefersReduced = useReducedMotion();
  const letters = Array.from(text);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const child = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: fluidEase },
    },
  };

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={cn('inline-flex flex-wrap', className)}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      {letters.map((letter, index) => (
        <span
          key={`${letter}-${index.toString()}`}
          className="inline-block overflow-hidden"
        >
          <motion.span
            className="inline-block"
            variants={child}
            aria-hidden="true"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
