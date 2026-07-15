import { useEffect, useRef, useState } from 'react';

export default function LoadingIntro({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const textRef = useRef(null);
  const barFillRef = useRef(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setIsExiting(true), 400);
        setTimeout(() => onComplete(), 1200);
      }
      setProgress(Math.min(current, 100));
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (barFillRef.current) {
      barFillRef.current.style.width = `${progress}%`;
    }
  }, [progress]);

  return (
    <div 
      className="loading-intro"
      style={{
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.05)' : 'scale(1)',
        transition: 'opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1), transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
      }}
    >
      <div className="loading-text" ref={textRef}>
        LEGIONS.
      </div>
      <div className="loading-bar">
        <div className="loading-bar-fill" ref={barFillRef} />
      </div>
    </div>
  );
}
