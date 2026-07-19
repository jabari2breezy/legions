'use client'
import { motion } from 'framer-motion'

export default function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04]">
      <motion.div
        className="absolute inset-[-50%] w-[200%] h-[200%]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        animate={{
          x: [0, -100, 50, -50, 0],
          y: [0, 50, -100, 100, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
