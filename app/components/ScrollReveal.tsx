'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  clipPath?: boolean
}

export default function ScrollReveal({ children, className = '', delay = 0, y = 60, clipPath = false }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const clipVariants = {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
    visible: { clipPath: 'inset(0% 0% 0% 0%)' },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={clipPath ? clipVariants.hidden : { opacity: 0, y }}
      animate={isInView ? (clipPath ? clipVariants.visible : { opacity: 1, y: 0 }) : {}}
      transition={{
        duration: clipPath ? 1.2 : 0.8,
        ease: [0.33, 1, 0.68, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
