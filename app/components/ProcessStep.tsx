'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

interface ProcessStepProps {
  number: string
  title: string
  description: string
}

export default function ProcessStep({ number, title, description }: ProcessStepProps) {
  const stepRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stepRef.current,
        start: 'top 80%',
        once: true
      }
    })

    tl.fromTo('.step-num', 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    )
    .fromTo('.step-content',
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
  }, { scope: stepRef })

  return (
    <div ref={stepRef} className="flex flex-col md:flex-row gap-6 md:gap-12 group items-start">
      <div className="step-num w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-2xl bg-[var(--color-cyan-dim)] border border-[var(--color-cyan)] flex items-center justify-center text-3xl md:text-5xl font-mono font-bold text-[var(--color-cyan)] group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(63,224,197,0.15)]">
        {number}
      </div>
      <div className="step-content flex flex-col justify-center pt-2 md:pt-4">
        <h3 className="text-[var(--font-size-h3)] font-semibold text-white mb-3">
          {title}
        </h3>
        <p className="text-[var(--font-size-body)] text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
          {description}
        </p>
      </div>
    </div>
  )
}
