'use client'

import Image from 'next/image'
import { useMemo } from 'react'

const allImages = [
  '/projects/amsen-visits/IMG_8275.jpg',
  '/projects/amsen-visits/IMG_8276.jpg',
  '/projects/amsen-visits/IMG_8277.jpg',
  '/projects/amsen-visits/IMG_8278.jpg',
  '/projects/amsen-visits/IMG_8279.jpg',
  '/projects/amsen-visits/IMG_8280.jpg',
  '/projects/beach-cleanups/IMG_8270.jpg',
  '/projects/beach-cleanups/IMG_8199.jpg',
  '/projects/beach-cleanups/IMG_8200.jpg',
  '/projects/beach-cleanups/IMG_8201.jpg',
  '/projects/ramadhan-project/IMG_8248.jpg',
  '/projects/ramadhan-project/IMG_8255.jpg',
  '/projects/ramadhan-project/IMG_8256.jpg',
  '/projects/ramadhan-project/IMG_8257.jpg',
  '/projects/ramadhan-project/IMG_8258.jpg',
  '/projects/tree-planting/IMG_8271.jpg',
  '/projects/tree-planting/IMG_8272.jpg',
  '/projects/tree-planting/IMG_8273.jpg',
  '/projects/tree-planting/IMG_8274.jpg',
  '/projects/ujasiri-house/IMG_8290.jpg',
  '/projects/ujasiri-house/IMG_8292.jpg',
  '/projects/ujasiri-house/IMG_8293.jpg',
  '/projects/ujasiri-house/IMG_8294.jpg',
  '/projects/ujasiri-house/IMG_8295.jpg',
]

function shuffle(arr: string[]): string[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ProjectImageBelt() {
  const [strip1, strip2] = useMemo(() => {
    const shuffled = shuffle(allImages)
    return [shuffled.slice(0, 12), shuffled.slice(12, 24)]
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Top strip — scrolls left */}
      <div className="absolute top-[15%] flex belt-scroll-left" style={{ width: 'max-content' }}>
        {[...strip1, ...strip1].map((src, i) => (
          <div
            key={`s1-${i}`}
            className="relative w-[280px] h-[180px] mx-3 rounded-2xl overflow-hidden flex-shrink-0 opacity-15"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover filter blur-[1px]"
              sizes="280px"
            />
          </div>
        ))}
      </div>

      {/* Middle strip — scrolls right */}
      <div className="absolute top-[45%] flex belt-scroll-right" style={{ width: 'max-content' }}>
        {[...strip2, ...strip2].map((src, i) => (
          <div
            key={`s2-${i}`}
            className="relative w-[320px] h-[200px] mx-3 rounded-2xl overflow-hidden flex-shrink-0 opacity-10"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover filter blur-[2px]"
              sizes="320px"
            />
          </div>
        ))}
      </div>

      {/* Bottom strip — scrolls left, faster */}
      <div className="absolute top-[75%] flex belt-scroll-left-slow" style={{ width: 'max-content' }}>
        {[...strip1.slice(0, 8), ...strip1.slice(0, 8)].map((src, i) => (
          <div
            key={`s3-${i}`}
            className="relative w-[240px] h-[150px] mx-3 rounded-2xl overflow-hidden flex-shrink-0 opacity-12"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="240px"
            />
          </div>
        ))}
      </div>

      {/* Vignette overlay to fade edges */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-deep)] via-transparent to-[var(--color-bg-deep)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-deep)] via-transparent to-[var(--color-bg-deep)]" />
    </div>
  )
}
