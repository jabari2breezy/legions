'use client'
import React, { useRef, useEffect, useState } from 'react'
import { useInView, useMotionValue, animate } from 'framer-motion'

interface CountUpProps {
  to: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}

export default function CountUp({ to, duration = 2, className = '', suffix = '', prefix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration,
        ease: [0.33, 1, 0.68, 1],
        onUpdate: (latest) => setDisplay(Math.round(latest)),
      })
      return controls.stop
    }
  }, [isInView, count, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
