'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

type BeforeAfterSliderProps = {
  before: string
  after: string
  alt: string
}

export default function BeforeAfterSlider({
  before,
  after,
  alt,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)

  const clipStyle = useMemo(
    () => ({
      clipPath: `inset(0 ${100 - position}% 0 0)`,
    }),
    [position]
  )

  return (
    <div className="before-after-slider">
      <div className="before-after-slider__stage">
        <div className="before-after-slider__layer">
          <Image src={before} alt={`${alt} before`} fill sizes="(max-width: 768px) 100vw, 50vw" priority />
        </div>
        <div className="before-after-slider__layer before-after-slider__layer--after" style={clipStyle}>
          <Image src={after} alt={`${alt} after`} fill sizes="(max-width: 768px) 100vw, 50vw" priority />
        </div>
        <div className="before-after-slider__divider" style={{ left: `${position}%` }} />
      </div>

      <input
        className="before-after-slider__range"
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Adjust before and after comparison"
      />

      <div className="before-after-slider__labels" aria-hidden="true">
        <span>Before</span>
        <span>After</span>
      </div>
    </div>
  )
}
