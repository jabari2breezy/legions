"use client";

import Image from "next/image";
import { useFlipTransition } from "./Transitions/PageTransition";

interface HorizontalProjectCardProps {
  slug: string;
  title: string;
  category: string;
  impact: string;
  imageSrc: string;
  index: number;
}

export default function HorizontalProjectCard({
  slug,
  title,
  category,
  impact,
  imageSrc,
  index,
}: HorizontalProjectCardProps) {
  const { navigateWithFlip } = useFlipTransition();

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    navigateWithFlip(`/projects/${slug}`, `project-${slug}`, e.currentTarget);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigateWithFlip(`/projects/${slug}`, `project-${slug}`, e.currentTarget);
    }
  }

  return (
    <div
      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
      data-cursor-type="cta"
      data-magnetic
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="link"
      aria-label={`View ${title} project`}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-[var(--color-bg-deep)]/20 mix-blend-overlay transition-colors duration-700 group-hover:bg-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080816] via-[#080816]/35 to-transparent opacity-90" />
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 84vw, (max-width: 1024px) 70vw, 58vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-[1.03] filter grayscale group-hover:grayscale-0"
        />
      </div>

      <div className="absolute left-6 top-6 z-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[0.68rem] uppercase tracking-[0.26em] text-white/60 backdrop-blur-md">
          <span className="text-[var(--color-cyan)]">{String(index + 1).padStart(2, "0")}</span>
          <span>Project</span>
        </span>
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 sm:p-10 md:p-12">
        <div className="translate-y-3 transition-transform duration-500 ease-out group-hover:translate-y-0">
          <div className="mb-4 flex items-center gap-3 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
            <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs font-mono uppercase tracking-[0.18em] text-[var(--color-cyan)] backdrop-blur-md">
              {category}
            </span>
            <span className="text-xs font-mono tracking-wider text-white/60">{impact}</span>
          </div>

          <h3 className="mb-3 max-w-[12ch] text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h3>

          <div className="mt-5 flex items-center text-sm font-medium uppercase tracking-[0.12em] text-[var(--color-cyan)] opacity-0 transition-opacity duration-500 delay-200 group-hover:opacity-100">
            View Project
            <svg
              className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 rounded-[2rem] border border-white/5 transition-colors duration-500 group-hover:border-[var(--color-cyan)]/20" />
    </div>
  );
}
