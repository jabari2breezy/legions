'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ImpactCounterProps {
  end: number
  suffix?: string
  label: string
}

export default function ImpactCounter({ end, suffix = '', label }: ImpactCounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!numberRef.current) return

    const el = numberRef.current
    const obj = { val: 0 }

    const tween = gsap.to(obj, {
      val: end,
      duration: 2,
      ease: 'power3.out',
      onUpdate: () => {
        if (el) el.innerHTML = Math.floor(obj.val).toString()
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
      }
    })

    return () => {
      tween.kill()
    }
  }, [end])

  return (
    <div className="flex flex-col items-center justify-center p-6 glass-panel text-center">
      <div className="text-4xl md:text-5xl font-bold text-cyan mb-2 font-mono">
        <span ref={numberRef}>0</span>{suffix}
      </div>
      <div className="text-text-secondary text-sm font-semibold uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}
