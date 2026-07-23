'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import type { ProjectImage } from '../../types/project'

interface LightboxProps {
  images: ProjectImage[]
  startIndex: number
  onClose: () => void
}

export default function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex)
  const current = images[index]

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev, onClose])

  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Image ${index + 1} of ${images.length}: ${current.alt}`}
      >
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close gallery"
        >
          ✕
        </button>

        <button
          className="lightbox-nav lightbox-nav--prev"
          onClick={(e) => {
            e.stopPropagation()
            goPrev()
          }}
          aria-label="Previous image"
        >
          ‹
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            className="lightbox-image-wrapper"
            onClick={(e) => e.stopPropagation()}
            key={current.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={`/projects/${current.filename}`}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="90vw"
              className="lightbox-image"
              priority
            />
            {current.caption && (
              <p className="lightbox-caption">{current.caption}</p>
            )}
          </motion.div>
        </AnimatePresence>

        <button
          className="lightbox-nav lightbox-nav--next"
          onClick={(e) => {
            e.stopPropagation()
            goNext()
          }}
          aria-label="Next image"
        >
          ›
        </button>

        <div className="lightbox-counter" aria-live="polite">
          {index + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
