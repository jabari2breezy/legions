import { motion } from 'framer-motion';
import type { JSX } from 'react';
import { fluidEase } from '@/utils/easing';
import { LetterReveal } from '@/components/ui/LetterReveal';
import { cn } from '@/utils/cn';

interface HeroSectionProps {
  slideIndex: number;
  isActive: boolean;
}

export function HeroSection({ isActive }: HeroSectionProps): JSX.Element {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: isActive ? 0 : undefined,
      },
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
      className="flex h-screen w-screen shrink-0 flex-col items-center justify-center px-6"
      aria-label="Hero"
      role="region"
    >
      <motion.div
        className="flex flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <motion.div variants={item} className="relative mb-6">
          <LetterReveal
            text="LEGIONS TZ"
            className={cn(
              'font-black tracking-tighter text-white',
              'text-[clamp(4rem,12vw,14rem)] leading-none'
            )}
          />
          <motion.span
            className="absolute -top-4 right-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-text-secondary backdrop-blur-[40px]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            @legions.tz
          </motion.span>
        </motion.div>

        <motion.p
          variants={item}
          className="text-body-lg text-text-secondary max-w-xl text-center"
        >
          A dynamic, youth-led civic collective &amp; grassroots service
          movement based in Dar-es-Salaam, Tanzania.
        </motion.p>
      </motion.div>
    </section>
  );
}
