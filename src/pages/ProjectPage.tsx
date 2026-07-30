import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Scene } from '@/scene/Scene';
import { FilterPanel } from '@/components/FilterPanel';
import { ProjectOverlay } from '@/components/ProjectOverlay';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/utils/cn';

export function ProjectPage(): JSX.Element {
  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#050507]">
      <Scene />

      <div className="pointer-events-none fixed inset-0 z-20 flex flex-col">
        <div className="flex items-center justify-between px-4 py-4 md:px-8">
          <Link
            to="/"
            className={cn(
              'pointer-events-auto flex items-center gap-2 rounded-full border border-white/10',
              'bg-white/[0.03] px-4 py-2 text-sm font-medium text-white backdrop-blur-[40px]',
              'transition-colors hover:bg-white/[0.08]'
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <GlassCard
            className="pointer-events-auto rounded-full px-6 py-2"
            interactive={false}
          >
            <span className="text-sm font-bold uppercase tracking-wider text-white">
              Project Index
            </span>
          </GlassCard>
        </div>
      </div>

      <FilterPanel />
      <ProjectOverlay />
    </div>
  );
}
