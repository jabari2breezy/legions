'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { initTextReveal } from '../utils/animations'
import { SplitReveal } from './Transitions/SplitReveal'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = ''
}: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    initTextReveal(containerRef.current)
  }, { scope: containerRef })

  const alignClass = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'

  return (
    <div ref={containerRef} className={`flex flex-col gap-4 max-w-3xl ${alignClass} ${className} reveal-container`}>
      {eyebrow && (
        <h4 className="text-[var(--color-cyan)] font-mono uppercase tracking-[0.2em] text-[var(--font-size-h4)] reveal-text opacity-0">
          {eyebrow}
        </h4>
      )}
      <SplitReveal
        as="h2"
        className={`text-[var(--font-size-h2)] leading-[var(--line-height-heading)] font-semibold text-balance text-white`}
        splitBy="words"
      >
        {title}
      </SplitReveal>
      {subtitle && (
        <p className="text-[var(--font-size-body-large)] text-[var(--color-text-secondary)] mt-2 reveal-text opacity-0 max-w-2xl text-balance leading-[var(--line-height-body)]">
          {subtitle}
        </p>
      )}
    </div>
  )
}
