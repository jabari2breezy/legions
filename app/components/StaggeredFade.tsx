'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface StaggeredFadeProps {
  text: string
  className?: string
}

export default function StaggeredFade({ text, className = '' }: StaggeredFadeProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const characters = text.split('')

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: 0.5,
            delay: i * 0.06,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}
