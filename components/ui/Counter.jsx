'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function Counter({ target, duration = 1.6, className = '', prefix = '', suffix = '', decimals = 0 }) {
  const elRef = useRef(null);
  const objRef = useRef({ val: 0 });

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    objRef.current.val = 0;
    gsap.to(objRef.current, {
      val: target,
      duration,
      ease: 'power1.out',
      onUpdate: () => {
        if (el) {
          const val = objRef.current.val;
          el.innerText = `${prefix}${val.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
        }
      },
    });
  }, [target, duration, prefix, suffix, decimals]);

  return (
    <span ref={elRef} className={className}>
      {prefix}{target.toLocaleString()}{suffix}
    </span>
  );
}

export function CounterGroup({ counters }) {
  return (
    <div className="flex flex-wrap gap-6" role="list">
      {counters.map((props, i) => (
        <div key={i} className="flex flex-col items-center gap-2" role="listitem">
          <Counter {...props} className="font-serif text-3xl md:text-4xl font-bold text-white" />
          {props.suffix && <span className="text-white/50 text-xs uppercase tracking-wider">{props.suffix}</span>}
        </div>
      ))}
    </div>
  );
}