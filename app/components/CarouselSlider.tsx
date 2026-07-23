'use client'

import React, { useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
  type Variants,
} from 'motion/react'
import { HugeiconsIcon } from '@hugeicons/react'
import { FavouriteIcon } from '@hugeicons/core-free-icons'
import type { ProjectImage } from '../../types/project'

interface CarouselSliderProps {
  slides: ProjectImage[]
}

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    filter: 'brightness(2)',
    scale: 0.75,
    opacity: 0,
    rotate: direction > 0 ? 30 : -30,
  }),
  center: {
    x: 0,
    filter: 'brightness(1)',
    scale: 1,
    opacity: 1,
    rotate: -3,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    filter: 'brightness(2)',
    scale: 0.75,
    opacity: 0,
    rotate: direction > 0 ? -30 : 30,
    zIndex: 0,
  }),
}

export const CarouselSlider: React.FC<CarouselSliderProps> = ({ slides }) => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const dragX = useMotionValue(0)
  const rotate = useTransform(dragX, [-200, 200], [-18, 18])

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setIndex((prev) => (prev + newDirection + slides.length) % slides.length)
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -120) paginate(1)
    else if (info.offset.x > 120) paginate(-1)
  }

  const current = slides[index]

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Slider */}
      <div className="relative flex aspect-square w-64 items-center justify-center -rotate-[6deg] sm:w-80">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', bounce: 0.2, duration: 0.5 },
              scale: { duration: 0.35 },
              opacity: { duration: 0.25 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ rotate, x: dragX }}
            onDragEnd={handleDragEnd}
            className="absolute h-full w-full overflow-hidden rounded-[40px] border-[1.2px] border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-2 shadow-md"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-[var(--color-bg-deep)]">
              <img
                src={`/projects/${current.filename}`}
                alt={current.alt}
                className="pointer-events-none h-full w-full object-cover"
              />

              {/* Caption overlay */}
              {current.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-bg-deep)]/80 to-transparent p-4">
                  <p className="text-sm font-medium text-white">{current.caption}</p>
                </div>
              )}

              {/* Counter badge */}
              <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)]/60 shadow-md backdrop-blur-md">
                <HugeiconsIcon
                  icon={FavouriteIcon}
                  size={20}
                  strokeWidth={1.5}
                  className="text-[var(--color-cyan)]"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Background Card */}
        <div className="absolute -z-10 h-[95%] w-[95%] scale-95 rounded-[40px] border-[6px] border-[var(--color-surface)] bg-[var(--color-surface)] opacity-50" />
      </div>

      {/* Pagination */}
      <div className="mt-8 flex -rotate-[6deg] gap-2.5 pl-8">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === index ? 1.2 : 1,
              opacity: i === index ? 1 : 0.4,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            className={`h-2.5 w-2.5 cursor-pointer rounded-full ${
              i === index ? 'bg-[var(--color-cyan)]' : 'bg-[var(--color-border-subtle)]'
            }`}
            onClick={() => {
              setDirection(i > index ? 1 : -1)
              setIndex(i)
            }}
          />
        ))}
      </div>
    </div>
  )
}
