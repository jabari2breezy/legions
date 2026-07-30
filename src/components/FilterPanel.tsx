import { useState } from 'react';
import type { JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronUp } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { useRingStore } from '@/store/useRingStore';
import {
  PROGRAMMES,
  SCOPES,
  STATUSES,
  SCALES,
  YEARS,
  type FilterCategory,
} from '@/data/projects';
import { cn } from '@/utils/cn';

const CATEGORIES: { key: FilterCategory; label: string; values: readonly string[] | number[] }[] = [
  { key: 'programme', label: 'Programme', values: PROGRAMMES },
  { key: 'scope', label: 'Scope', values: SCOPES },
  { key: 'status', label: 'Status', values: STATUSES },
  { key: 'scale', label: 'Scale', values: SCALES },
  { key: 'year', label: 'Year', values: YEARS.map(String) },
];

export function FilterPanel(): JSX.Element {
  const activeFilters = useRingStore((state) => state.activeFilters);
  const setFilter = useRingStore((state) => state.setFilter);
  const clearFilters = useRingStore((state) => state.clearFilters);
  const [expanded, setExpanded] = useState(false);

  const activeCount = Object.values(activeFilters).flat().length;

  return (
    <>
      <div className="pointer-events-none fixed right-4 top-24 z-40 hidden flex-col items-end gap-3 md:flex">
        <GlassCard className="pointer-events-auto max-h-[calc(100vh-8rem)] w-64 overflow-y-auto rounded-card p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </div>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-text-secondary transition-colors hover:text-white"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {CATEGORIES.map((category) => (
              <div key={category.key}>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-text-tertiary">
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.values.map((value) => {
                    const isActive = activeFilters[category.key].includes(String(value));
                    return (
                      <button
                        key={String(value)}
                        type="button"
                        onClick={() => { setFilter(category.key, String(value)); }}
                        className={cn(
                          'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                          isActive
                            ? 'border-cyan-glow/50 bg-cyan-glow/10 text-white'
                            : 'border-white/10 bg-white/[0.03] text-text-secondary hover:bg-white/[0.08] hover:text-white'
                        )}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {activeCount > 0 && (
            <div className="mt-4 border-t border-white/10 pt-3 text-xs text-text-tertiary">
              {activeCount} active filter{activeCount === 1 ? '' : 's'}
            </div>
          )}
        </GlassCard>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="pointer-events-auto max-h-[70vh] overflow-y-auto rounded-t-card border-t border-white/10 bg-[#050507]/95 p-4 backdrop-blur-[40px]"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </div>
                <div className="flex items-center gap-3">
                  {activeCount > 0 && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-xs text-text-secondary transition-colors hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => { setExpanded(false); }}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white"
                    aria-label="Close filters"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {CATEGORIES.map((category) => (
                  <div key={category.key}>
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-text-tertiary">
                      {category.label}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.values.map((value) => {
                        const isActive = activeFilters[category.key].includes(String(value));
                        return (
                          <button
                            key={String(value)}
                            type="button"
                            onClick={() => { setFilter(category.key, String(value)); }}
                            className={cn(
                              'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                              isActive
                                ? 'border-cyan-glow/50 bg-cyan-glow/10 text-white'
                                : 'border-white/10 bg-white/[0.03] text-text-secondary hover:bg-white/[0.08] hover:text-white'
                            )}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {activeCount > 0 && (
                <div className="mt-4 border-t border-white/10 pt-3 text-xs text-text-tertiary">
                  {activeCount} active filter{activeCount === 1 ? '' : 's'}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!expanded && (
          <div className="pointer-events-auto p-4">
            <button
              type="button"
              onClick={() => { setExpanded(true); }}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-3 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-[40px]"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeCount > 0 && (
                <span className="ml-1 rounded-full bg-cyan-glow/20 px-2 py-0.5 text-xs text-cyan-glow">
                  {activeCount}
                </span>
              )}
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
