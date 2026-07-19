'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setShow(false)
            setTimeout(onComplete, 800)
          }, 400)
          return 100
        }
        return p + Math.random() * 15 + 5
      })
    }, 120)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] bg-bg-deep flex items-center justify-center"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="text-center">
            <motion.div
              className="text-[clamp(2rem,5vw,4rem)] font-serif tracking-[0.2em] uppercase mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-cyan">Legions</span>
              <span className="text-azure ml-3">Club</span>
            </motion.div>
            <motion.div
              className="text-[clamp(3rem,8vw,8rem)] font-bold font-mono tabular-nums text-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Math.min(Math.round(progress), 100)}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
