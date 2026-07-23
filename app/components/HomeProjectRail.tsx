"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import projectsIndex from "../../data/projects-index.json";
import type { ProjectSummary } from "../../types/project";
import HorizontalProjectCard from "./HorizontalProjectCard";

gsap.registerPlugin(ScrollTrigger);

const projects = (projectsIndex as ProjectSummary[]).map((project) => ({
  slug: project.slug,
  title: project.title,
  category: project.category,
  impact: project.stats[0] ? `${project.stats[0].value} ${project.stats[0].label}` : "",
  imageSrc: `/projects/${project.heroImage.filename}`,
}));

export default function HomeProjectRail() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const setup = () => {
        const totalScroll = track.scrollWidth - window.innerWidth;
        if (totalScroll <= 0) return;

        gsap.to(track, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        if (progressRef.current) {
          gsap.to(progressRef.current, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${totalScroll}`,
              scrub: 0.35,
            },
          });
        }
      };

      const id = requestAnimationFrame(setup);
      return () => cancelAnimationFrame(id);
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative py-[var(--spacing-section-y)]">
      <div className="container mx-auto px-[var(--spacing-section-x)] pb-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--color-cyan)]/60" />
              <span className="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--color-text-muted)] font-mono">
                Selected Work
              </span>
            </div>
            <h2 className="text-balance text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-white">
              Projects that unfold as you move down the page.
            </h2>
            <p className="mt-5 max-w-2xl text-[var(--font-size-body-large)] leading-[var(--line-height-body)] text-[var(--color-text-secondary)]">
              A more editorial way to browse the work — each card drifts horizontally while you keep scrolling, revealing the full archive one piece at a time.
            </p>
          </div>

          <div className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
            Scroll to reveal all five projects
          </div>
        </div>
      </div>

      <div className="relative h-[100svh] overflow-hidden border-y border-[var(--color-border-subtle)] bg-[rgba(255,255,255,0.01)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div
          ref={trackRef}
          className="flex h-full items-center gap-6 pl-[6vw] pr-[12vw]"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="flex-shrink-0 h-[72vh] w-[84vw] sm:w-[70vw] lg:w-[58vw]"
            >
              <HorizontalProjectCard
                slug={project.slug}
                title={project.title}
                category={project.category}
                impact={project.impact}
                imageSrc={project.imageSrc}
                index={index}
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-[6vw] right-[6vw] h-px overflow-hidden rounded-full bg-white/10">
          <div
            ref={progressRef}
            className="h-full origin-left rounded-full bg-[var(--color-cyan)]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
