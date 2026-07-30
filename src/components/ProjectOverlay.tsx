import type { JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Maximize2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatWidget } from '@/components/ui/StatWidget';
import { useRingStore } from '@/store/useRingStore';
import { projects } from '@/data/projects';
import { fluidEase } from '@/utils/easing';
import { cn } from '@/utils/cn';

export function ProjectOverlay(): JSX.Element {
  const focusedIndex = useRingStore((state) => state.focusedIndex);
  const clearFocus = useRingStore((state) => state.clearFocus);

  const project = focusedIndex !== null ? projects[focusedIndex] : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: fluidEase }}
          className="pointer-events-auto fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm md:p-8"
          onClick={clearFocus}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: fluidEase }}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-card border border-white/10 bg-[#050507]/90 p-6 shadow-glass-deep backdrop-blur-[40px] md:p-10"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <button
              type="button"
              onClick={clearFocus}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-colors hover:bg-white/[0.08]"
              aria-label="Close project details"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-cyan-glow">
              {project.programme.join(' · ')}
            </p>
            <h2 className="display mb-4 font-bold text-white">
              {project.title}
            </h2>
            <p className="text-body-lg text-text-secondary mb-6 leading-relaxed">
              {project.subtitle}
            </p>

            <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              <MetadataItem icon={<MapPin className="h-4 w-4" />} label="Location" value={project.location} />
              <MetadataItem icon={<Calendar className="h-4 w-4" />} label="Year" value={String(project.year)} />
              <MetadataItem icon={<Maximize2 className="h-4 w-4" />} label="Scale" value={project.scale} />
              <MetadataItem icon={<span className="text-xs font-bold">S</span>} label="Status" value={project.status.join(', ')} />
            </div>

            <div className="mb-8 grid gap-4 md:grid-cols-2">
              <GlassCard className="p-5" interactive={false}>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-text-tertiary">
                  Context
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {project.context}
                </p>
              </GlassCard>
              <GlassCard className="p-5" interactive={false}>
                <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-text-tertiary">
                  Scope
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {project.scope.join(', ')}
                </p>
              </GlassCard>
            </div>

            <p className="text-body-lg text-text-secondary mb-8 leading-relaxed">
              {project.description}
            </p>

            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.stats.map((stat, index) => (
                <StatWidget key={stat} value={stat} index={index} />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {project.images.slice(0, 8).map((image, index) => (
                <GlassCard
                  key={`${project.id}-${index}`}
                  className="aspect-square overflow-hidden p-0"
                  interactive={false}
                >
                  <img
                    src={image}
                    alt={`${project.title} ${index + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface MetadataItemProps {
  icon: JSX.Element;
  label: string;
  value: string;
}

function MetadataItem({ icon, label, value }: MetadataItemProps): JSX.Element {
  return (
    <div className={cn('rounded-card border border-white/10 bg-white/[0.03] p-3')}
>
      <div className="mb-1 flex items-center gap-1.5 text-text-tertiary">
        {icon}
        <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  );
}
