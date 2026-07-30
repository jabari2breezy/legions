import type { FilterCategory } from '@/data/projects';

export type CameraMode = 'overview' | 'focused';
export type ViewMode = 'ring' | 'grid';

export interface RingState {
  currentRotation: number;
  targetRotation: number;
  cameraMode: CameraMode;
  focusedIndex: number | null;
  activeFilters: Record<FilterCategory, string[]>;
  viewMode: ViewMode;
  filterPanelOpen: boolean;
}

export interface RingActions {
  setFocusedIndex: (index: number | null) => void;
  clearFocus: () => void;
  setFilter: (category: FilterCategory, value: string) => void;
  clearFilters: () => void;
  setTargetRotation: (rotation: number) => void;
  addTargetRotation: (delta: number) => void;
  tickRotation: (lerpValue: number) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleFilterPanel: () => void;
  setFilterPanelOpen: (open: boolean) => void;
}

export type RingStore = RingState & RingActions;
