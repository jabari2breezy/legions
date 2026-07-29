import { motion } from 'framer-motion';
import type { JSX } from 'react';
import { fluidEase } from '@/utils/easing';
import { GlassCard } from '@/components/ui/GlassCard';
import { Smartphone, HardHat, HandHeart, Globe } from 'lucide-react';

interface OperationsSectionProps {
  slideIndex: number;
  isActive: boolean;
}

const cells = [
  {
    emoji: '📱',
    title: 'Digital Mobilization & Peer Philanthropy',
    body:
      'Leveraging social platforms to run transparent, peer-to-peer fundraising drives channeling micro-donations.',
    icon: Smartphone,
  },
  {
    emoji: '🏗️',
    title: 'Facility & Spatial Improvement',
    body:
      'Identifying and revitalizing worn public and charitable spaces with manual labor and uplifting artistic design.',
    icon: HardHat,
  },
  {
    emoji: '🫂',
    title: 'Social Inclusion & Human Engagement',
    body:
      'Human-centered volunteering, providing companionship and mentorship to marginalized groups.',
    icon: HandHeart,
  },
  {
    emoji: '🌍',
    title: 'Environmental & Ecosystem Stewardship',
    body:
      'Youth-driven conservation, urban greening, and public cleanup campaigns.',
    icon: Globe,
  },
];

export function OperationsSection({
  isActive,
}: OperationsSectionProps): JSX.Element {
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
      className="flex h-screen w-screen shrink-0 items-center justify-center px-6"
      aria-label="General Operations"
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
          className="display mb-12 text-center font-bold text-white"
        >
          General Operations
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 md:grid-rows-2">
          {cells.map((cell, index) => {
            const Icon = cell.icon;
            return (
              <motion.div key={cell.title} variants={item}>
                <GlassCard className="aspect-square p-6 md:aspect-square">
                  <div className="flex h-full flex-col">
                    <span className="mb-3 text-4xl">{cell.emoji}</span>
                    <Icon className="mb-4 h-6 w-6 text-cyan-glow" />
                    <h3 className="mb-3 text-lg font-bold text-white">
                      {cell.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {cell.body}
                    </p>
                    <motion.div
                      className="mt-auto h-px bg-cyan-glow"
                      initial={{ width: 0 }}
                      animate={isActive ? { width: '100%' } : { width: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3 + index * 0.1,
                        ease: fluidEase,
                      }}
                    />
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
