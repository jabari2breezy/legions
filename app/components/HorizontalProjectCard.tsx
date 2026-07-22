'use client'

import Image from 'next/image'
import { useFlipTransition } from './Transitions/PageTransition'

interface HorizontalProjectCardProps {
  slug: string
  title: string
  category: string
  impact: string
  imageSrc: string
  index: number
}

export default function HorizontalProjectCard({
  slug,
  title,
  category,
  impact,
  imageSrc,
  index,
}: HorizontalProjectCardProps) {
  const { navigateWithFlip } = useFlipTransition()

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault()
    navigateWithFlip(`/projects/${slug}`, `project-${slug}`, e.currentTarget)
  }

  return (
    <div
      className="group relative w-full h-full rounded-3xl overflow-hidden block cursor-pointer"
      data-cursor-type="cta"
      data-magnetic
      onClick={handleClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[var(--color-bg-deep)]/30 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)] via-[var(--color-bg-deep)]/40 to-transparent opacity-90 z-10" />
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
          sizes="(max-width: 768px) 65vw, (max-width: 1024px) 55vw, 45vw"
        />
      </div>

      {/* Index number */}
      <div className="absolute top-8 left-8 z-20">
        <span className="text-8xl font-black text-white/[0.04] leading-none select-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 p-8 sm:p-10 md:p-12 flex flex-col justify-end">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="flex items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <span className="px-3 py-1 rounded-full border border-[var(--color-cyan)] text-[var(--color-cyan)] text-xs font-mono tracking-widest uppercase backdrop-blur-md bg-[var(--color-bg-deep)]/50">
              {category}
            </span>
            <span className="text-xs text-white/60 font-mono tracking-wider">{impact}</span>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight tracking-tight">
            {title}
          </h3>

          <div className="flex items-center text-[var(--color-cyan)] font-medium tracking-wide text-sm mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            View Project
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 z-20 rounded-3xl border border-white/5 group-hover:border-[var(--color-cyan)]/30 transition-colors duration-500 pointer-events-none" />
    </div>
  )
}
