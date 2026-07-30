import { forwardRef } from 'react';
import type { JSX } from 'react';
import { motion, type MotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '@/components/slides/HeroSection';
import { OriginSection } from '@/components/slides/OriginSection';
import { EthosSection } from '@/components/slides/EthosSection';
import { OperationsSection } from '@/components/slides/OperationsSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { useScrollStore } from '@/store/useScrollStore';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { fluidEase } from '@/utils/easing';
import { cn } from '@/utils/cn';
import { ArrowRight } from 'lucide-react';

interface ScrollTrackProps {
  x: MotionValue<number>;
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 100, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: fluidEase },
  },
};

export const ScrollTrack = forwardRef<HTMLElement, ScrollTrackProps>(
  function ScrollTrack({ x }, ref): JSX.Element {
    const navigate = useNavigate();
    const activeSlideIndex = useScrollStore((state) => state.activeSlideIndex);
    const { isMobile } = useIsTouchDevice();

    return (
      <motion.section
        ref={ref}
        style={isMobile ? undefined : { x }}
        className={cn(
          'flex items-stretch',
          isMobile
            ? 'relative h-auto w-full flex-col'
            : 'sticky top-0 h-screen w-max flex-row overflow-hidden'
        )}
        aria-label="Legions Tz presentation"
      >
        <HeroSection
          slideIndex={0}
          isActive={activeSlideIndex === 0}
          isTouch={isMobile}
        />
        <OriginSection
          slideIndex={1}
          isActive={activeSlideIndex === 1}
          isTouch={isMobile}
        />
        <EthosSection
          slideIndex={2}
          isActive={activeSlideIndex === 2}
          isTouch={isMobile}
        />
        <OperationsSection
          slideIndex={3}
          isActive={activeSlideIndex === 3}
          isTouch={isMobile}
        />
        <section
          className={cn(
            'flex items-center justify-center px-6 py-20',
            isMobile ? 'min-h-screen w-full' : 'h-screen w-screen shrink-0'
          )}
          aria-label="Projects"
          role="region"
        >
          <motion.div
            className="w-[90vw] max-w-[70vw] md:w-[70vw]"
            variants={container}
            initial="hidden"
            animate={activeSlideIndex === 4 ? 'visible' : 'hidden'}
          >
            <motion.h2
              variants={item}
              className="display mb-8 text-center font-bold text-white"
            >
              Projects
            </motion.h2>
            <motion.p
              variants={item}
              className="text-body-lg text-text-secondary mx-auto mb-12 max-w-2xl text-center leading-relaxed"
            >
              Explore our civic initiatives through an interactive project
              index.
            </motion.p>
            <motion.div variants={item} className="flex justify-center">
              <GlassCard
                className="group flex cursor-pointer items-center gap-4 rounded-full px-8 py-4"
                interactive
                onClick={() => { navigate('/projects'); }}
              >
                <span className="text-sm font-bold uppercase tracking-wider text-white">
                  Open Project Index
                </span>
                <ArrowRight className="h-5 w-5 text-cyan-glow transition-transform group-hover:translate-x-1" />
              </GlassCard>
            </motion.div>
          </motion.div>
        </section>
      </motion.section>
    );
  }
);
