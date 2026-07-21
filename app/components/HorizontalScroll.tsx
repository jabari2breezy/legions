'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ProjectItem {
  id: string
  title: string
  category: string
  description: string
  image: string
  impact: string
}

const featuredProjects: ProjectItem[] = [
  {
    id: 'ujasiri-house',
    title: 'Ujasiri House Overhaul',
    category: 'Youth Shelter & Restoration',
    description: 'Renovating facilities and creating empowering safe spaces for vulnerable children in Dar es Salaam.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200',
    impact: '120+ Youth Sheltered',
  },
  {
    id: 'amsen-visits',
    title: 'AMSEN Mentorship Visits',
    category: 'Special Education & Mentorship',
    description: 'Direct engagement sessions, educational support, and creative workshops for children with special needs.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200',
    impact: '250+ Students Mentored',
  },
  {
    id: 'tree-planting',
    title: 'Dar Reforestation Campaign',
    category: 'Environmental Action',
    description: 'Planting indigenous trees across urban spaces to fight climate change and improve air quality.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200',
    impact: '1,500+ Trees Planted',
  },
  {
    id: 'beach-cleanups',
    title: 'Coastal Protection Cleanups',
    category: 'Marine Ecosystems',
    description: 'Removing tons of plastic waste from Dar es Salaam beaches and organizing ocean conservation drives.',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=1200',
    impact: '3.5 Tons Waste Removed',
  },
  {
    id: 'ramadhan-project',
    title: 'Ramadhan Food Relief Drive',
    category: 'Community Support',
    description: 'Distributing food packages and essential nutrition supplies to low-income families during Ramadhan.',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=1200',
    impact: '400+ Families Supported',
  },
]

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current || !triggerRef.current) return

    const pin = gsap.to(sectionRef.current, {
      translateX: () => -(sectionRef.current!.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${sectionRef.current!.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      pin.kill()
    }
  }, { scope: triggerRef })

  return (
    <section ref={triggerRef} className="overflow-hidden relative bg-bg-deep py-20 border-t border-b border-white/10">
      <div className="px-6 md:px-12 mb-8 max-w-[1400px] mx-auto flex items-end justify-between">
        <div>
          <span className="text-cyan font-mono uppercase text-xs tracking-widest">[ HORIZONTAL SHOWCASE ]</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
            Featured Initiatives
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-3 text-white/50 text-xs font-mono uppercase tracking-widest">
          <span>Scroll to explore</span>
          <span className="text-cyan animate-pulse">&rarr;</span>
        </div>
      </div>

      {/* Horizontal Container */}
      <div ref={sectionRef} className="flex gap-8 px-6 md:px-12 w-max items-center">
        {featuredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="group relative w-[85vw] md:w-[600px] h-[480px] rounded-3xl overflow-hidden glass-panel flex-shrink-0 flex flex-col justify-end p-8 border border-white/10 hover:border-cyan/50 transition-all duration-500"
          >
            {/* Project Cover Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out"
                sizes="600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/50 to-transparent" />
            </div>

            {/* Top Index & Tag */}
            <div className="relative z-10 mb-auto flex justify-between items-start">
              <span className="font-mono text-cyan text-sm font-bold bg-black/40 px-3 py-1 rounded-full border border-cyan/20">
                0{idx + 1}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                {project.impact}
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10">
              <span className="text-cyan text-xs font-mono uppercase tracking-widest mb-1 block">
                {project.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                {project.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-2">
                {project.description}
              </p>

              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-2 text-cyan font-mono text-xs uppercase tracking-widest group-hover:text-white transition-colors"
              >
                <span>View Full Details</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
