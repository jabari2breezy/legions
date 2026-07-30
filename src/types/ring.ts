import type { FilterCategory } from '@/data/projects';

export type CameraMode = 'overview' | 'focused';

export interface RingState {
  currentRotation: number;
  targetRotation: number;
  cameraMode: CameraMode;
  focusedIndex: number | null;
  activeFilters: Record<FilterCategory, string[]>;
}

export interface RingActions {
  setFocusedIndex: (index: number | null) => void;
  clearFocus: () => void;
  setFilter: (category: FilterCategory, value: string) => void;
  clearFilters: () => void;
  setTargetRotation: (rotation: number) => void;
  addTargetRotation: (delta: number) => void;
  tickRotation: (lerpValue: number) => void;
}

export type RingStore = RingState & RingActions;
