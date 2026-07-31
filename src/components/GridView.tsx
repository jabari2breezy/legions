import type { JSX } from 'react';
import { motion } from 'framer-motion';
import { useRingStore } from '@/store/useRingStore';
import { projects } from '@/data/projects';

export function GridView(): JSX.Element {
  const setFocusedIndex = useRingStore((state) => state.setFocusedIndex);

  return (
    <div className="min-h-screen bg-[#050507] px-6 pb-20 pt-36 md:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project, index) => (
          <motion.button
            key={project.id}
            type="button"
            onClick={() => { setFocusedIndex(index); }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group relative aspect-[4/3] overflow-hidden bg-white/5 text-left"
          >
            <img
              src={project.images[0]}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                {project.programme.join(' · ')}
              </p>
              <h3 className="text-lg font-bold text-white">
                {project.title}
              </h3>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
