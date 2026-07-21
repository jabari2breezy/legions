'use client';

import { motion } from 'framer-motion';
import { useCursor } from '../ui/CustomCursor';

export function ProjectCard({ project, layoutId, onOpen, index, className = '', ...props }) {
  const { setHoverLabel, clearHover } = useCursor();

  return (
    <motion.button
      ref={props.ref}
      className={`relative aspect-[4/5] rounded-[20px] overflow-hidden ${className}`}
      style={{
        ...props.style,
        cursor: 'pointer',
      }}
      onClick={onOpen}
      onMouseEnter={() => {
        setHoverLabel('View Project', 56, 'rgba(77,232,212,0.15)');
      }}
      onMouseLeave={clearHover}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View ${project.title} project`}
      layoutId={layoutId}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      {...props}
    >
      <motion.img
        src={project.mainImage}
        alt={project.title}
        className="w-full h-full object-cover"
        layoutId={`${layoutId}-image`}
        style={{ transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
      />

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)]/90 via-[var(--color-bg-deep)]/30 to-transparent rounded-b-[20px]" />
        <h3
          className="relative font-[Playfair_Display] text-2xl md:text-3xl font-bold text-white"
        >
          {project.title}
        </h3>
      </div>
    </motion.button>
  );
}