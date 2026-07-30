import { useState, useEffect } from 'react';

interface TouchDeviceState {
  isTouch: boolean;
  isMobile: boolean;
}

export function useIsTouchDevice(): TouchDeviceState {
  const [state, setState] = useState<TouchDeviceState>({
    isTouch: false,
    isMobile: false,
  });

  useEffect(() => {
    const detect = (): void => {
      const isTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      const isMobile = isTouch || window.innerWidth < 768;
      setState({ isTouch, isMobile });
    };

    detect();
    window.addEventListener('resize', detect);
    return () => { window.removeEventListener('resize', detect); };
  }, []);

  return state;
}

export function useIsTouchOnly(): boolean {
  return useIsTouchDevice().isTouch;
}

export function useIsMobile(): boolean {
  return useIsTouchDevice().isMobile;
}
