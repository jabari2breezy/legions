'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  charDelay?: number
}

export default function TextReveal({ children, className = '', delay = 0, charDelay = 0.02 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const words = children.split(' ')

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div className="flex flex-wrap">
        {words.map((word, wi) => (
          <span key={wi} className="inline-block mr-[0.3em]">
            {word.split('').map((char, ci) => (
              <motion.span
                key={ci}
                className="inline-block"
                initial={{ y: '120%', rotateX: 80 }}
                animate={isInView ? { y: '0%', rotateX: 0 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.33, 1, 0.68, 1],
                  delay: delay + wi * charDelay * 3 + ci * charDelay,
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
