'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { initTextReveal } from '../utils/animations'

interface SectionHeaderProps {
  title: string
  subtitle: string
  align?: 'left' | 'center'
}

export default function SectionHeader({ title, subtitle, align = 'left' }: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    initTextReveal(containerRef)
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <div className="text-mask mb-2">
        <p className="reveal-up text-cyan font-mono uppercase tracking-widest text-sm font-semibold">
          [ {subtitle} ]
        </p>
      </div>
      <div className="text-mask">
        <h2 className="reveal-up text-4xl md:text-5xl font-bold tracking-tight text-white">
          {title}
        </h2>
      </div>
    </div>
  )
}
