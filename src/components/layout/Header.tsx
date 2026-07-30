import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useScrollStore } from '@/store/useScrollStore';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { TODO_JOIN_URL } from '@/data/projects';
import { fluidEase } from '@/utils/easing';
import { cn } from '@/utils/cn';

const TOTAL_SLIDES = 5;

const scrollNavItems = [
  { label: 'Origin', index: 1 },
  { label: 'Ethos', index: 2 },
  { label: 'Pillars', index: 3 },
  { label: 'Projects', index: 4 },
];

export function Header(): JSX.Element {
  const navigate = useNavigate();
  const { isMobile } = useIsTouchDevice();
  const prefersReduced = useReducedMotion();
  const activeSlideIndex = useScrollStore((state) => state.activeSlideIndex);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const scrollToSlide = (index: number): void => {
    if (typeof window === 'undefined') return;

    const target = index / TOTAL_SLIDES;
    const behavior = prefersReduced ? 'auto' : 'smooth';

    if (isMobile) {
      const main = document.querySelector('main');
      if (!main) return;
      const maxScroll = main.scrollHeight - main.clientHeight;
      main.scrollTo({ top: target * maxScroll, behavior });
      setMenuOpen(false);
      return;
    }

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: target * maxScroll, behavior });
  };

  const handleProjectsClick = (): void => {
    navigate('/projects');
    setMenuOpen(false);
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

        <div className="hidden md:block">
          <GlassCard
            className="rounded-full px-6 py-2"
            interactive={false}
          >
            <nav className="flex items-center gap-6" aria-label="Primary">
              {scrollNavItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    if (item.label === 'Projects') {
                      handleProjectsClick();
                    } else {
                      scrollToSlide(item.index);
                    }
                  }}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    activeSlideIndex === item.index && item.label !== 'Projects'
                      ? 'text-white'
                      : 'text-text-secondary hover:text-white'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </GlassCard>
        </div>

        <div className="flex items-center gap-3">
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
                  {isMobile ? 'Join' : 'Join Movement'}
                </MagneticButton>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => { setMenuOpen((prev) => !prev); }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white backdrop-blur-[40px] md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: fluidEase }}
            className="absolute left-4 right-4 top-full mt-3 md:hidden"
          >
            <GlassCard className="rounded-card p-4" interactive={false}>
              <nav className="flex flex-col gap-3" aria-label="Mobile primary">
                {scrollNavItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      if (item.label === 'Projects') {
                        handleProjectsClick();
                      } else {
                        scrollToSlide(item.index);
                      }
                    }}
                    className={cn(
                      'text-left text-sm font-medium transition-colors',
                      activeSlideIndex === item.index && item.label !== 'Projects'
                        ? 'text-white'
                        : 'text-text-secondary hover:text-white'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
