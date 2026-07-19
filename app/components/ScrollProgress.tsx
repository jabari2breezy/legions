'use client'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[150] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #11C7CA, #41EFE7, #3E5DE0)',
      }}
    />
  )
}
