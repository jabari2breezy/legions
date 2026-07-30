import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { Scene } from '@/scene/Scene';
import { FilterPanel } from '@/components/FilterPanel';
import { ProjectOverlay } from '@/components/ProjectOverlay';
import { GridView } from '@/components/GridView';
import { useRingStore } from '@/store/useRingStore';
import { cn } from '@/utils/cn';
import { FILTER_SECTIONS } from '@/data/projects';

function RingLabels(): JSX.Element {
  const programmeSection = FILTER_SECTIONS.find((s) => s.category === 'programme');
  const labels = programmeSection?.options.filter((o) => o.count > 0) ?? [];
  const radiusX = 46; // vw
  const radiusY = 38; // vh

  return (
    <div className="relative h-screen w-screen">
      {labels.map((label, index) => {
        const angle = (index / labels.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + radiusX * Math.cos(angle);
        const y = 50 + radiusY * Math.sin(angle);
        return (
          <div
            key={label.value}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className="text-xs font-medium text-black/70 underline underline-offset-4 decoration-black/20 md:text-sm">
              {label.label}
            </span>
            <sup className="ml-0.5 text-[9px] text-black/40 md:text-[10px]">
              ({String(label.count).padStart(2, '0')})
            </sup>
          </div>
        );
      })}
    </div>
  );
}

export function ProjectPage(): JSX.Element {
  const viewMode = useRingStore((state) => state.viewMode);
  const toggleFilterPanel = useRingStore((state) => state.toggleFilterPanel);
  const setViewMode = useRingStore((state) => state.setViewMode);

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-white text-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center gap-8 px-6 py-5 md:px-10">
        <Link
          to="/"
          className="group flex items-center gap-2 font-black tracking-tight text-lg text-black"
          aria-label="Legions Tz home"
        >
          <span>LEGIONS TZ</span>
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00F0FF]" />
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          <Link to="/" className="text-sm font-medium text-black/60 hover:text-black transition-colors">
            Home
          </Link>
          <span className="text-sm font-medium text-black underline underline-offset-4">
            Projects
          </span>
          <a
            href="https://instagram.com/legions.tz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-black/60 hover:text-black transition-colors"
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Top controls */}
      <div className="fixed top-20 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10">
        <button
          type="button"
          onClick={toggleFilterPanel}
          className="group flex items-center gap-2 text-sm font-medium text-black hover:text-black/70 transition-colors"
        >
          <span className="underline underline-offset-4">Filter Projects</span>
          <span className="text-black/40 group-hover:text-black/60 transition-colors">+</span>
        </button>

        <button
          type="button"
          onClick={() => { setViewMode(viewMode === 'ring' ? 'grid' : 'ring'); }}
          className="group flex items-center gap-2 text-sm font-medium text-black hover:text-black/70 transition-colors"
        >
          <span className="underline underline-offset-4">
            {viewMode === 'ring' ? 'Grid view' : 'Ring view'}
          </span>
          <span className="text-black/40 group-hover:text-black/60 transition-colors">+</span>
        </button>
      </div>

      {/* Center text */}
      {viewMode === 'ring' && (
        <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center">
          <h1 className="text-center text-[clamp(2rem,7vw,5rem)] font-bold leading-[0.9] tracking-tight text-black">
            We are<br /><span className="text-[0.75em]">LEGIONS TZ.</span>
          </h1>
        </div>
      )}

      {/* Category labels around the ring */}
      {viewMode === 'ring' && (
        <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center">
          <RingLabels />
        </div>
      )}

      {/* 3D Scene or Grid */}
      <main className={cn('fixed inset-0 z-0', viewMode === 'grid' && 'overflow-y-auto')}>
        {viewMode === 'ring' ? <Scene /> : <GridView />}
      </main>

      <FilterPanel />
      <ProjectOverlay />
    </div>
  );
}
