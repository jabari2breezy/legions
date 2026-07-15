import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export function useSplitText(selector, options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    const splits = [];

    elements.forEach(el => {
      const split = new SplitType(el, {
        types: options.types || 'words',
      });
      splits.push(split);
    });

    return () => {
      splits.forEach(split => split.revert());
    };
  }, [selector, options.types]);

  return containerRef;
}

export function useSectionReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll('.reveal-up, .reveal-fade');

    elements.forEach((el) => {
      const isUp = el.classList.contains('reveal-up');
      gsap.fromTo(el,
        { opacity: 0, y: isUp ? 40 : 0 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options.start || 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [options.start]);

  return ref;
}

export { gsap, ScrollTrigger, SplitType };
