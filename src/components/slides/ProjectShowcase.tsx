import { motion } from 'framer-motion';
import type { JSX } from 'react';
import { fluidEase } from '@/utils/easing';
import { StatWidget } from '@/components/ui/StatWidget';
import { projects } from '@/data/projects';

interface ProjectShowcaseProps {
  slideIndex: number;
  projectIndex: number;
  isActive: boolean;
}

export function ProjectShowcase({
  projectIndex,
  isActive,
}: ProjectShowcaseProps): JSX.Element {
  const project = projects[projectIndex];
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
      className="flex h-screen w-screen shrink-0 items-center justify-center px-6"
      aria-label={project.title}
      role="region"
    >
      <motion.div
        className="grid w-[90vw] max-w-[80vw] gap-12 md:w-[80vw] md:grid-cols-[1fr_1fr]"
        variants={container}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        <div className="flex flex-col justify-center">
          <motion.h2
            variants={item}
            className="display mb-8 font-bold text-white"
          >
            {project.title}
          </motion.h2>
          <motion.p
            variants={item}
            className="text-body-lg text-text-secondary mb-6 leading-relaxed"
          >
            {project.context}
          </motion.p>
          <motion.p
            variants={item}
            className="text-body-lg text-text-secondary leading-relaxed"
          >
            {project.planning}
          </motion.p>
        </div>

        <div className="flex flex-col justify-center gap-4">
          {project.stats.map((stat, index) => (
            <StatWidget key={stat} value={stat} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
