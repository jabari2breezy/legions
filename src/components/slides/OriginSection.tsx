import { motion } from 'framer-motion';
import type { JSX } from 'react';
import { fluidEase } from '@/utils/easing';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/utils/cn';

interface OriginSectionProps {
  slideIndex: number;
  isActive: boolean;
  isTouch: boolean;
}

export function OriginSection({ isActive, isTouch }: OriginSectionProps): JSX.Element {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 100, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: fluidEase },
    },
  };

  return (
    <section
      className={cn(
        'flex items-center justify-center px-6 py-20',
        isTouch ? 'min-h-screen w-full snap-start' : 'h-screen w-screen shrink-0'
      )}
      aria-label="Why We Started"
      role="region"
    >
      <motion.div
        className="w-[90vw] max-w-[70vw] md:w-[70vw]"
        variants={container}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <motion.h2
          variants={item}
          className="display mb-12 bg-gradient-to-b from-white to-white/40 bg-clip-text text-center font-bold text-transparent"
        >
          Why We Started
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
          <motion.div variants={item}>
            <GlassCard className="h-full p-8">
              <p className="text-body-lg text-text-secondary leading-relaxed">
                Founded out of a shared realization among young Tanzanians that
                waiting for large institutional aid pipelines or traditional
                NGOs to solve every local problem was insufficient. The founders
                saw immediate gaps—underfunded care facilities, vulnerable
                families, neglected public spaces, environmental
                degradation—that could be tackled through direct community
                effort.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div variants={item}>
            <GlassCard
              className="h-full border-cyan-glow/30 p-8"
              glowFollow
              interactive
            >
              <p className="text-body-lg text-text-secondary leading-relaxed">
                Democratizing philanthropy in Tanzania, lowering the barriers
                to civic participation for young people. Proving youth do not
                need massive corporate backing to create meaningful change;
                rather, structured peer networks, digital communication, and
                direct hands-on labor could achieve high-impact outcomes.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
