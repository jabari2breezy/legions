'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { projectsList } from '../data/projects'

export default function HorizontalProjects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-24 px-6 md:px-12 bg-[#010101] text-white">
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-cyan font-mono text-xs uppercase tracking-[0.25em] block mb-2">
            [ HORIZONTAL SHOWCASE // PORTFOLIO ]
          </span>
          <h2 className="font-garamond text-4xl sm:text-6xl text-white font-normal tracking-tight">
            Featured Initiatives
          </h2>
        </div>
        <p className="text-white/60 font-sans text-sm max-w-md leading-relaxed">
          Scroll horizontally to explore our ongoing youth-led community service endeavors across Tanzania.
        </p>
      </div>

      {/* Horizontal Scroll Track */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-8 overflow-x-auto pb-8 pt-4 no-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {projectsList.map((project, idx) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-[85vw] sm:w-[480px] md:w-[560px] snap-center glass-card overflow-hidden group hover:border-cyan/40 transition-all duration-500 flex flex-col"
          >
            {/* Project Cover Image */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-mono bg-[#010101]/60 backdrop-blur-md text-white/90 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="p-8 flex flex-col justify-between flex-grow bg-gradient-to-b from-[#0a0a0f] to-[#010101]">
              <div>
                <span className="text-cyan font-mono text-xs uppercase tracking-widest block mb-1">
                  0{idx + 1} // {project.subtitle}
                </span>
                <h3 className="font-garamond text-2xl sm:text-3xl text-white mb-3 tracking-wide">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm font-sans leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-cyan uppercase font-mono text-xs tracking-widest group-hover:translate-x-1 transition-transform"
              >
                <span>View Full Archive</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
