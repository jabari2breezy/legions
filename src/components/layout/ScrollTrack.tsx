import { forwardRef } from 'react';
import type { JSX } from 'react';
import { motion, type MotionValue } from 'framer-motion';
import { HeroSection } from '@/components/slides/HeroSection';
import { OriginSection } from '@/components/slides/OriginSection';
import { EthosSection } from '@/components/slides/EthosSection';
import { OperationsSection } from '@/components/slides/OperationsSection';
import { ProjectShowcase } from '@/components/slides/ProjectShowcase';
import { useScrollStore } from '@/store/useScrollStore';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { projects } from '@/data/projects';
import { cn } from '@/utils/cn';

interface ScrollTrackProps {
  x: MotionValue<number>;
}

export const ScrollTrack = forwardRef<HTMLElement, ScrollTrackProps>(
  function ScrollTrack({ x }, ref): JSX.Element {
    const activeSlideIndex = useScrollStore((state) => state.activeSlideIndex);
    const isTouch = useIsTouchDevice();

    return (
      <motion.section
        ref={ref}
        style={isTouch ? undefined : { x }}
        className={cn(
          'flex items-stretch',
          isTouch
            ? 'relative h-auto w-full flex-col'
            : 'sticky top-0 h-screen w-max flex-row overflow-hidden'
        )}
        aria-label="Legions Tz presentation"
      >
        <HeroSection
          slideIndex={0}
          isActive={activeSlideIndex === 0}
          isTouch={isTouch}
        />
        <OriginSection
          slideIndex={1}
          isActive={activeSlideIndex === 1}
          isTouch={isTouch}
        />
        <EthosSection
          slideIndex={2}
          isActive={activeSlideIndex === 2}
          isTouch={isTouch}
        />
        <OperationsSection
          slideIndex={3}
          isActive={activeSlideIndex === 3}
          isTouch={isTouch}
        />
        {projects.map((_, index) => (
          <ProjectShowcase
            key={index}
            slideIndex={4 + index}
            projectIndex={index}
            isActive={activeSlideIndex === 4 + index}
            isTouch={isTouch}
          />
        ))}
      </motion.section>
    );
  }
);
