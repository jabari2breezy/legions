import type { JSX } from 'react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Maximize2 } from 'lucide-react';
import { useRingStore } from '@/store/useRingStore';
import { projects } from '@/data/projects';
import { fluidEase } from '@/utils/easing';
import { cn } from '@/utils/cn';

export function ProjectOverlay(): JSX.Element {
  const focusedIndex = useRingStore((state) => state.focusedIndex);
  const clearFocus = useRingStore((state) => state.clearFocus);

  const project = focusedIndex !== null ? projects[focusedIndex] : null;

  // Disable body scroll when overlay is open
  useEffect(() => {
    if (!project) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: fluidEase }}
          className="pointer-events-auto fixed inset-0 z-50 bg-[#050507]/95 backdrop-blur-md"
          onClick={clearFocus}
        >
          <button
            type="button"
            onClick={clearFocus}
            className="fixed right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
            aria-label="Close project details"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="grid h-full grid-cols-1 md:grid-cols-2"
            onClick={(e) => { e.stopPropagation(); }}
          >
            {/* Left: project info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: fluidEase, delay: 0.1 }}
              className="flex flex-col justify-end px-6 pb-10 pt-28 md:px-12 md:pb-16"
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#00F0FF]">
                {project.programme.join(' · ')}
              </p>
              <h2 className="mb-4 text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-white">
                {project.title}
              </h2>
              <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/60">
                {project.subtitle}
              </p>

              <div className="mb-8 grid grid-cols-2 gap-3 md:max-w-md">
                <MetadataItem icon={<MapPin className="h-4 w-4" />} label="Location" value={project.location} />
                <MetadataItem icon={<Calendar className="h-4 w-4" />} label="Year" value={String(project.year)} />
                <MetadataItem icon={<Maximize2 className="h-4 w-4" />} label="Scale" value={project.scale} />
                <MetadataItem icon={<span className="text-xs font-bold">S</span>} label="Status" value={project.status.join(', ')} />
              </div>

              <div className="mb-8 max-w-lg space-y-4 text-sm leading-relaxed text-white/70">
                <p>{project.context}</p>
                <p>{project.description}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 md:max-w-md">
                {project.stats.map((stat) => (
                  <div
                    key={stat}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-xl font-bold leading-tight text-[#00F0FF]">
                      {/^([\d$.%+-]+)(.*)$/.exec(stat)?.[1] ?? stat}
                    </p>
                    <p className="text-xs text-white/50">
                      {/^([\d$.%+-]+)(.*)$/.exec(stat)?.[2] ?? ''}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: rolling 3D image gallery */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: fluidEase, delay: 0.15 }}
              className="relative hidden h-full overflow-hidden md:block"
              style={{ perspective: '1400px' }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <RollingStrip images={project.images} title={project.title} />
              </div>

              {/* Gradient masks */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050507] to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050507] to-transparent" />
            </motion.div>

            {/* Mobile: vertical scroll gallery */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6, ease: fluidEase, delay: 0.2 }}
              className="flex h-full flex-col gap-4 overflow-y-auto px-6 pb-10 pt-4 md:hidden"
            >
              {project.images.map((image, index) => (
                <div
                  key={`mobile-${project.id}-${index}`}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  <img
                    src={image}
                    alt={`${project.title} ${index + 1}`}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RollingStrip({ images, title }: { images: string[]; title: string }): JSX.Element {
  // Triple the images so the loop feels seamless
  const loop = [...images, ...images, ...images];

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="flex flex-col items-center gap-8"
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ y: '25%' }}
        animate={{ y: '-25%' }}
        transition={{
          duration: 24,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {loop.map((image, index) => {
          const normalized = (index % images.length) / Math.max(images.length - 1, 1);
          const rotateX = -8 - normalized * 28;
          const translateZ = -normalized * 320;
          const opacity = 0.35 + (1 - normalized) * 0.65;

          return (
            <motion.div
              key={`${image}-${index}`}
              className="relative w-[55%] shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotateX}deg) translateZ(${translateZ}px)`,
                opacity,
              }}
              initial={{ opacity: 0, y: 80, rotateX: -35 }}
              animate={{ opacity, y: 0, rotateX }}
              transition={{
                duration: 0.7,
                ease: fluidEase,
                delay: (index % images.length) * 0.06,
              }}
            >
              <img
                src={image}
                alt={`${title} ${(index % images.length) + 1}`}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

interface MetadataItemProps {
  icon: JSX.Element;
  label: string;
  value: string;
}

function MetadataItem({ icon, label, value }: MetadataItemProps): JSX.Element {
  return (
    <div className={cn('rounded-2xl border border-white/10 bg-white/5 p-3')}>
      <div className="mb-1 flex items-center gap-1.5 text-white/40">
        {icon}
        <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  );
}
