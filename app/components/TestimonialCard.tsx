'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Image from 'next/image'

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  delay?: number
}

export default function TestimonialCard({ quote, author, role, delay = 0 }: TestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(cardRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        once: true
      }
    })
  }, { scope: cardRef })

  return (
    <div ref={cardRef} className="glass-panel p-8 flex flex-col justify-between h-full group hover:bg-[var(--color-surface-hover)] transition-colors duration-500">
      <div className="text-[var(--color-cyan)] text-4xl mb-4 opacity-50 font-serif">"</div>
      <p className="text-[var(--font-size-body-large)] leading-[var(--line-height-body)] text-[var(--color-text-primary)] mb-8 flex-grow">
        {quote}
      </p>
      <div className="flex items-center gap-4 border-t border-[var(--color-border-subtle)] pt-6">
        <div className="w-12 h-12 rounded-full bg-[var(--color-bg-deep)] border border-[var(--color-border-accent)] flex items-center justify-center shrink-0">
          <span className="text-[var(--color-cyan)] font-mono font-bold text-lg">{author.charAt(0)}</span>
        </div>
        <div>
          <h4 className="font-semibold text-white tracking-wide">{author}</h4>
          <p className="text-[var(--color-text-muted)] text-sm">{role}</p>
        </div>
      </div>
    </div>
  )
}
