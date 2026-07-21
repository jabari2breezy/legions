'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCursor } from '../ui/CustomCursor';

export function ProjectCard({ project, index, className = '' }) {
  const { setHoverLabel, clearHover } = useCursor();

  return (
    <Link
      href={`/projects/${project.id}`}
      className={`block ${className}`}
      onMouseEnter={() => setHoverLabel('View Project', 56, 'rgba(77,232,212,0.15)')}
      onMouseLeave={clearHover}
    >
      <motion.div
        className="relative aspect-[4/5] rounded-[20px] overflow-hidden cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.03, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      >
        <img
          src={project.mainImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)]/90 via-[var(--color-bg-deep)]/30 to-transparent rounded-b-[20px]" />
          <h3 className="relative font-[Playfair_Display] text-2xl md:text-3xl font-bold text-white">
            {project.title}
          </h3>
        </div>

        {/* Hover indicator */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
