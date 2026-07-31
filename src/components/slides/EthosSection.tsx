import { useState } from 'react';
import type { JSX } from 'react';
import { motion } from 'framer-motion';
import { fluidEase } from '@/utils/easing';
import { GlassCard } from '@/components/ui/GlassCard';
import { Zap, Users, Heart } from 'lucide-react';
import { cn } from '@/utils/cn';

interface EthosSectionProps {
  slideIndex: number;
  isActive: boolean;
  isTouch: boolean;
}

const cards = [
  {
    emoji: '⚡',
    title: 'Sweat Equity Over Bureaucracy',
    body:
      'Emphasizes direct, physical volunteerism. Members personally show up to do the work, ensuring donor resources are used with maximum efficiency.',
    icon: Zap,
  },
  {
    emoji: '🤝',
    title: 'Collective Identity & Inclusivity',
    body:
      'Prioritizes unity and teamwork over individual acclaim. Creates an accessible environment where any student or young professional can join and take ownership of social responsibility.',
    icon: Users,
  },
  {
    emoji: '💙',
    title: 'Empathy & Dignity',
    body:
      'Deep commitment to human dignity—bringing joy to institutionalized individuals, easing financial strain on vulnerable families, and creating brighter environments.',
    icon: Heart,
  },
];

export function EthosSection({ isActive, isTouch }: EthosSectionProps): JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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
      aria-label="What We Are About"
      role="region"
    >
      <motion.div
        className="w-[90vw] max-w-[80vw] md:w-[80vw]"
        variants={container}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <motion.h2
          variants={item}
          className="display mb-12 text-center font-bold text-white"
        >
          What We Are About
        </motion.h2>

        <div className="flex flex-col gap-6 md:flex-row">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
            return (
              <motion.div
                key={card.title}
                variants={item}
                transition={{ delay: index * 0.1 }}
                className="flex-1"
              >
                <GlassCard
                  className={cn(
                    'p-8 transition-all duration-500',
                    isTouch ? 'min-h-[60vh]' : 'h-[70vh]',
                    isDimmed && 'opacity-60'
                  )}
                  interactive
                  onMouseEnter={() => { setHoveredIndex(index); }}
                  onMouseLeave={() => { setHoveredIndex(null); }}
                  animate={
                    hoveredIndex === index ? { scale: 1.02 } : { scale: 1 }
                  }
                >
                  <div className="flex h-full flex-col">
                    <span className="mb-4 text-5xl">{card.emoji}</span>
                    <Icon className="mb-6 h-8 w-8 text-cyan-glow" />
                    <h3 className="mb-4 text-h2 font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="text-body-lg text-text-secondary leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
