'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { projects } from '../../lib/projects-data';
import { ProjectCard } from './ProjectCard';
import { ProjectMarquee } from './ProjectMarquee';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function ProjectGrid({ isActive }) {
  const reducedMotion = useReducedMotion();
  const animationCtxRef = useRef(null);

  useEffect(() => {
    if (animationCtxRef.current) {
      animationCtxRef.current.revert();
      animationCtxRef.current = null;
    }

    if (!isActive) return;

    animationCtxRef.current = gsap.context(() => {});

    return () => {
      if (animationCtxRef.current) {
        animationCtxRef.current.revert();
      }
    };
  }, [isActive, reducedMotion]);

  const sectionStyle = {
    background: `
      radial-gradient(50vmax circle at 80% 30%, rgba(77,232,212,0.1) 0%, transparent 60%),
      radial-gradient(45vmax circle at 20% 70%, rgba(67,97,238,0.08) 0%, transparent 60%),
      #1A1147
    `,
  };

  return (
    <section
      id="projects"
      className="relative w-screen h-screen flex-shrink-0 flex flex-col overflow-hidden"
      style={sectionStyle}
      data-section="projects"
      aria-labelledby="projects-headline"
    >
      <ProjectMarquee isActive={isActive} />

      <div className="relative z-10 flex-1 flex flex-col w-full max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="pt-12 md:pt-16 pb-6">
          <h2 id="projects-headline" className="font-[Playfair_Display] font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
            Our Projects
          </h2>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed font-[Poppins] max-w-2xl">
            Tangible, community-driven initiatives across Dar es Salaam and beyond.
            Each project is designed and delivered by student volunteers.
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center min-h-0 pb-8">
          <motion.div
            className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
            initial={false}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
