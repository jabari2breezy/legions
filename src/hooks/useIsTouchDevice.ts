import { useState, useEffect } from 'react';

export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(() => {
      try {
        document.createEvent('TouchEvent');
        return true;
      } catch {
        return false;
      }
    });
  }, []);

  return isTouch;
}
