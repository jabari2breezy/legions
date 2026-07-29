import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fluidEase } from '@/utils/easing';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useScrollStore } from '@/store/useScrollStore';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { TODO_JOIN_URL } from '@/data/projects';
import { cn } from '@/utils/cn';

const TOTAL_SLIDES = 10;

const navItems = [
  { label: 'Origin', index: 1 },
  { label: 'Ethos', index: 2 },
  { label: 'Pillars', index: 3 },
  { label: 'Projects', index: 4 },
];

export function Header(): JSX.Element {
  const isTouch = useIsTouchDevice();
  const prefersReduced = useReducedMotion();
  const activeSlideIndex = useScrollStore((state) => state.activeSlideIndex);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSlide = async (index: number): Promise<void> => {
    if (typeof window === 'undefined') return;
    const [{ gsap }, { ScrollToPlugin }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollToPlugin'),
    ]);
    gsap.registerPlugin(ScrollToPlugin);
    const target = index / TOTAL_SLIDES;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    gsap.to(window, {
      scrollTo: { y: target * maxScroll },
      duration: prefersReduced ? 0.1 : 1.2,
      ease: fluidEase,
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between">
        <a
          href="/"
          className="group flex items-center gap-2 font-black tracking-tight text-lg text-white"
          aria-label="Legions Tz home"
        >
          <span>LEGIONS TZ</span>
          <span className="relative flex h-2 w-2">
            {!prefersReduced && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-glow opacity-75" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-glow" />
          </span>
        </a>

        <GlassCard
          className="hidden rounded-full px-6 py-2 md:flex"
          interactive={false}
        >
          <nav className="flex items-center gap-6" aria-label="Primary">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => { void scrollToSlide(item.index); }}
                className={cn(
                  'text-sm font-medium transition-colors',
                  activeSlideIndex === item.index
                    ? 'text-white'
                    : 'text-text-secondary hover:text-white'
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </GlassCard>

        <AnimatePresence>
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: fluidEase }}
            >
              <MagneticButton
                inverse
                href={TODO_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isTouch ? 'Join' : 'Join Movement'}
              </MagneticButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
