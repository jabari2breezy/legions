import type { JSX } from 'react';
import { Header } from '@/components/layout/Header';
import { Scene } from '@/scene/Scene';
import { FilterPanel } from '@/components/FilterPanel';
import { ProjectOverlay } from '@/components/ProjectOverlay';
import { GridView } from '@/components/GridView';
import { useRingStore } from '@/store/useRingStore';
import { cn } from '@/utils/cn';

export function ProjectPage(): JSX.Element {
  const viewMode = useRingStore((state) => state.viewMode);
  const toggleFilterPanel = useRingStore((state) => state.toggleFilterPanel);
  const setViewMode = useRingStore((state) => state.setViewMode);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#050507] text-white">
      <video
        src="/3D_fluid_background_animation_202607282348.mp4"
        poster="/3D_fluid_background_animation_202607282348-poster.jpg"
        playsInline
        muted
        preload="auto"
        className="fixed inset-0 -z-50 h-screen w-screen object-cover pointer-events-none opacity-60"
        autoPlay
        loop
      />

      <Header />

      {/* Top controls */}
      <div className="fixed top-24 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-8">
        <button
          type="button"
          onClick={toggleFilterPanel}
          className="group flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
        >
          <span className="underline underline-offset-4">Filter Projects</span>
          <span className="text-white/40 group-hover:text-white/60 transition-colors">+</span>
        </button>

        <button
          type="button"
          onClick={() => { setViewMode(viewMode === 'ring' ? 'grid' : 'ring'); }}
          className="group flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
        >
          <span className="underline underline-offset-4">
            {viewMode === 'ring' ? 'Grid view' : 'Ring view'}
          </span>
          <span className="text-white/40 group-hover:text-white/60 transition-colors">+</span>
        </button>
      </div>

      {/* 3D Scene or Grid */}
      <main className={cn('fixed inset-0 z-0', viewMode === 'grid' && 'overflow-y-auto')}>
        {viewMode === 'ring' ? <Scene /> : <GridView />}
      </main>

      <FilterPanel />
      <ProjectOverlay />
    </div>
  );
}
