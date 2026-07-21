'use client';

import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { LiquidGlassCircle } from './LiquidGlass';

export function AudioToggle({ src, volume = 0.3, className = '' }) {
  const [playing, setPlaying] = useState(false);
  const howlRef = useRef(null);

  useEffect(() => {
    howlRef.current = new Howl({
      src,
      loop: true,
      volume,
      html5: true,
    });

    return () => {
      howlRef.current?.unload();
    };
  }, [src, volume]);

  const toggle = () => {
    if (!howlRef.current) return;
    if (playing) {
      howlRef.current.pause();
    } else {
      howlRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <LiquidGlassCircle
      size={44}
      className={className}
      onClick={toggle}
      aria-label={playing ? 'Pause ambient audio' : 'Play ambient audio'}
    >
      {playing ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4DE8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4DE8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </LiquidGlassCircle>
  );
}
