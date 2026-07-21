'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ImpactCounterProps {
  end: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}

export default function ImpactCounter({
  end,
  suffix = '',
  prefix = '',
  label,
  duration = 2
}: ImpactCounterProps) {
  const counterRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = numberRef.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: counterRef.current,
        start: 'top 85%',
        once: true
      }
    })

    tl.fromTo(counterRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )

    gsap.to(el, {
      scrollTrigger: {
        trigger: counterRef.current,
        start: 'top 85%',
        once: true
      },
      innerHTML: end,
      duration: duration,
      ease: 'power2.out',
      snap: { innerHTML: 1 },
      onUpdate: function() {
        if (el) {
          el.innerHTML = Math.ceil(Number(this.targets()[0].innerHTML)).toLocaleString()
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [end, duration])

  return (
    <div ref={counterRef} className="flex flex-col items-center text-center opacity-0">
      <div className="text-[var(--font-size-h2)] font-mono font-bold text-white mb-2 tabular-nums tracking-tighter">
        {prefix}<span ref={numberRef}>0</span>{suffix}
      </div>
      <div className="text-[var(--font-size-body-small)] text-[var(--color-cyan)] uppercase tracking-wider font-semibold">
        {label}
      </div>
    </div>
  )
}
