import { create } from 'zustand';

interface ScrollState {
  cursorX: number;
  cursorY: number;
  setCursor: (x: number, y: number) => void;
  activeSlideIndex: number;
  setActiveSlideIndex: (index: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
  totalSlides: number;
  setTotalSlides: (total: number) => void;
  getSlideProgress: (slideIndex: number) => number;
  scrollTargetIndex: number | null;
  setScrollTargetIndex: (index: number | null) => void;
  isVirtualScroll: boolean;
  setIsVirtualScroll: (active: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set, get) => ({
  cursorX: 0,
  cursorY: 0,
  setCursor: (x: number, y: number) => { set({ cursorX: x, cursorY: y }); },
  activeSlideIndex: 0,
  setActiveSlideIndex: (index: number) => { set({ activeSlideIndex: index }); },
  progress: 0,
  setProgress: (progress: number) => { set({ progress }); },
  totalSlides: 10,
  setTotalSlides: (totalSlides: number) => { set({ totalSlides }); },
  getSlideProgress: (slideIndex: number) => {
    const { totalSlides, progress } = get();
    if (totalSlides <= 1) return 0;
    const slideStart = slideIndex / totalSlides;
    const slideEnd = (slideIndex + 1) / totalSlides;
    if (progress < slideStart) return 0;
    if (progress > slideEnd) return 1;
    return (progress - slideStart) / (slideEnd - slideStart);
  },
  scrollTargetIndex: null,
  setScrollTargetIndex: (index: number | null) => { set({ scrollTargetIndex: index }); },
  isVirtualScroll: false,
  setIsVirtualScroll: (active: boolean) => { set({ isVirtualScroll: active }); },
}));
