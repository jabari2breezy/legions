import { forwardRef } from 'react';
import type { JSX } from 'react';
import { HeroSection } from '@/components/slides/HeroSection';
import { OriginSection } from '@/components/slides/OriginSection';
import { EthosSection } from '@/components/slides/EthosSection';
import { OperationsSection } from '@/components/slides/OperationsSection';
import { ProjectShowcase } from '@/components/slides/ProjectShowcase';
import { useScrollStore } from '@/store/useScrollStore';
import { projects } from '@/data/projects';

export const ScrollTrack = forwardRef<HTMLElement>(function ScrollTrack(
  _props,
  ref
): JSX.Element {
  const activeSlideIndex = useScrollStore((state) => state.activeSlideIndex);

  return (
    <section
      ref={ref}
      className="flex h-screen w-max flex-row items-stretch"
      aria-label="Legions Tz presentation"
    >
      <HeroSection slideIndex={0} isActive={activeSlideIndex === 0} />
      <OriginSection slideIndex={1} isActive={activeSlideIndex === 1} />
      <EthosSection slideIndex={2} isActive={activeSlideIndex === 2} />
      <OperationsSection slideIndex={3} isActive={activeSlideIndex === 3} />
      {projects.map((_, index) => (
        <ProjectShowcase
          key={index}
          slideIndex={4 + index}
          projectIndex={index}
          isActive={activeSlideIndex === 4 + index}
        />
      ))}
    </section>
  );
});
