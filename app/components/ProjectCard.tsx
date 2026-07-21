'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectCardProps {
  slug: string
  title: string
  category: string
  impact: string
  imageSrc: string
}

export default function ProjectCard({ slug, title, category, impact, imageSrc }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  
  useGSAP(() => {
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        once: true
      }
    })
  }, { scope: cardRef })

  return (
    <Link ref={cardRef} href={`/projects/${slug}`} className="group relative rounded-3xl overflow-hidden block aspect-[4/5] sm:aspect-square md:aspect-[3/4] w-full isolate">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[var(--color-bg-deep)]/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-700"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)] via-[var(--color-bg-deep)]/50 to-transparent opacity-90 z-10"></div>
        <Image 
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 p-6 sm:p-8 flex flex-col justify-end">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="flex items-center gap-3 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <span className="px-3 py-1 rounded-full border border-[var(--color-cyan)] text-[var(--color-cyan)] text-xs font-mono tracking-widest uppercase backdrop-blur-md bg-[var(--color-bg-deep)]/50">
              {category}
            </span>
            <span className="text-xs text-white font-mono tracking-wider">{impact}</span>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2 leading-tight">
            {title}
          </h3>
          
          <div className="flex items-center text-[var(--color-cyan)] font-medium tracking-wide text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
            View Project
            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
