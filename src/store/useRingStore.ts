import { create } from 'zustand';
import type { FilterCategory } from '@/data/projects';
import type { RingStore } from '@/types/ring';

const initialFilters: Record<FilterCategory, string[]> = {
  programme: [],
  scope: [],
  status: [],
  scale: [],
  year: [],
};

export const useRingStore = create<RingStore>((set, get) => ({
  currentRotation: 0,
  targetRotation: 0,
  cameraMode: 'overview',
  focusedIndex: null,
  activeFilters: { ...initialFilters },
  visibleIndices: [],

  setFocusedIndex: (index) => {
    set({
      focusedIndex: index,
      cameraMode: index === null ? 'overview' : 'focused',
    });
  },

  clearFocus: () => {
    set({ focusedIndex: null, cameraMode: 'overview' });
  },

  setFilter: (category, value) => {
    const activeFilters = { ...get().activeFilters };
    const current = activeFilters[category];
    const index = current.indexOf(value);

    if (index === -1) {
      activeFilters[category] = [...current, value];
    } else {
      activeFilters[category] = current.filter((v) => v !== value);
    }

    set({ activeFilters });
  },

  clearFilters: () => {
    set({ activeFilters: { ...initialFilters } });
  },

  setTargetRotation: (rotation) => {
    set({ targetRotation: rotation });
  },

  addTargetRotation: (delta) => {
    set({ targetRotation: get().targetRotation + delta });
  },

  tickRotation: (lerpValue) => {
    const { currentRotation, targetRotation } = get();
    const next = currentRotation + (targetRotation - currentRotation) * lerpValue;
    set({ currentRotation: next });
  },
}));
