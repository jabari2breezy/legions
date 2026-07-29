import { forwardRef } from 'react';
import type { JSX } from 'react';
import { HeroSection } from '@/components/slides/HeroSection';
import { OriginSection } from '@/components/slides/OriginSection';
import { EthosSection } from '@/components/slides/EthosSection';
import { OperationsSection } from '@/components/slides/OperationsSection';
import { ProjectShowcase } from '@/components/slides/ProjectShowcase';
import { useScrollStore } from '@/store/useScrollStore';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { projects } from '@/data/projects';
import { cn } from '@/utils/cn';

export const ScrollTrack = forwardRef<HTMLElement>(function ScrollTrack(
  _props,
  ref
): JSX.Element {
  const activeSlideIndex = useScrollStore((state) => state.activeSlideIndex);
  const isTouch = useIsTouchDevice();

  return (
    <section
      ref={ref}
      className={cn(
        'flex items-stretch',
        isTouch
          ? 'h-auto w-full flex-col'
          : 'h-screen w-max flex-row'
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
    </section>
  );
});
