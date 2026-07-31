import { useState } from 'react';
import type { JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useRingStore } from '@/store/useRingStore';
import { FILTER_SECTIONS, projectsMatchingFilters } from '@/data/projects';
import type { FilterCategory } from '@/data/projects';
import { cn } from '@/utils/cn';

export function FilterPanel(): JSX.Element | null {
  const filterPanelOpen = useRingStore((state) => state.filterPanelOpen);
  const setFilterPanelOpen = useRingStore((state) => state.setFilterPanelOpen);
  const activeFilters = useRingStore((state) => state.activeFilters);
  const setFilter = useRingStore((state) => state.setFilter);
  const clearFilters = useRingStore((state) => state.clearFilters);
  const [expandedCategory, setExpandedCategory] = useState<FilterCategory>('programme');

  const hasFilters = Object.values(activeFilters).some((values) => values.length > 0);
  const filteredCount = projectsMatchingFilters(activeFilters).length;

  return (
    <AnimatePresence>
      {filterPanelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => { setFilterPanelOpen(false); }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed top-0 left-0 z-50 flex h-screen w-full max-w-md flex-col border-r border-white/10 bg-[#0a0a0c]/95 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Filter Projects
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  ({String(filteredCount).padStart(2, '0')})
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setFilterPanelOpen(false); }}
                className="text-sm font-medium text-white underline underline-offset-4 hover:text-white/60"
              >
                Close
              </button>
            </div>

            {/* Clear all */}
            {hasFilters && (
              <div className="border-b border-white/10 px-6 py-3">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Accordion */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {FILTER_SECTIONS.map((section) => {
                const isExpanded = expandedCategory === section.category;
                const activeCount = activeFilters[section.category].length;

                return (
                  <div
                    key={section.category}
                    className="border-b border-white/10 last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() => { setExpandedCategory(isExpanded ? '' as FilterCategory : section.category); }}
                      className="flex w-full items-center justify-between py-4 text-left"
                    >
                      <span className="text-xl font-medium text-white">
                        {section.label}
                      </span>
                      <span className="flex items-center gap-2 text-white/40">
                        {activeCount > 0 && (
                          <span className="text-xs font-medium">({activeCount})</span>
                        )}
                        <Plus
                          className={cn(
                            'h-5 w-5 transition-transform duration-300',
                            isExpanded && 'rotate-45'
                          )}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5">
                            <label className="mb-3 flex cursor-pointer items-center gap-3">
                              <input
                                type="checkbox"
                                checked={activeFilters[section.category].length === 0}
                                onChange={() => {
                                  const next = { ...activeFilters };
                                  next[section.category] = [];
                                  useRingStore.setState({ activeFilters: next });
                                }}
                                className="h-4 w-4 rounded border-white/30 bg-white/5 text-cyan-glow focus:ring-cyan-glow"
                              />
                              <span className="text-sm font-medium text-white">All</span>
                            </label>

                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                              {section.options.map((option) => {
                                const checked = activeFilters[section.category].includes(option.value);
                                return (
                                  <label
                                    key={option.value}
                                    className="flex cursor-pointer items-center gap-3"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      onChange={() => { setFilter(section.category, option.value); }}
                                      className="h-4 w-4 rounded border-white/30 bg-white/5 text-cyan-glow focus:ring-cyan-glow"
                                    />
                                    <span className="text-sm text-white">
                                      {option.label}
                                    </span>
                                    <span className="ml-auto text-xs text-white/40">
                                      ({String(option.count).padStart(2, '0')})
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
