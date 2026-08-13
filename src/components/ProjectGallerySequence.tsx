'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

type ProjectGallerySequenceProps = {
  slug: string
  title: string
  images: string[]
}

type Segment = {
  src: string
  className: string
  span?: number
  note?: string
}

function buildSegments(slug: string, images: string[]): Segment[] {
  const [a, b, c, d, e, f, g] = images
  if (slug === 'ramadhan') {
    return [
      { src: a, className: 'gallery-seq__item gallery-seq__item--primary' },
      { src: b, className: 'gallery-seq__item gallery-seq__item--overlap' },
      { src: c, className: 'gallery-seq__item gallery-seq__item--overlap gallery-seq__item--shift' },
      { src: d, className: 'gallery-seq__item gallery-seq__item--stack' },
      { src: e, className: 'gallery-seq__item gallery-seq__item--stack' },
      { src: f, className: 'gallery-seq__item gallery-seq__item--support' },
      { src: g, className: 'gallery-seq__item gallery-seq__item--support' },
      ...images.slice(7).map((src) => ({ src, className: 'gallery-seq__item gallery-seq__item--support' })),
    ]
  }
  if (slug === 'ujasiri-house') {
    return [
      { src: a, className: 'gallery-seq__item gallery-seq__item--slider' },
      { src: b, className: 'gallery-seq__item gallery-seq__item--support' },
      { src: c, className: 'gallery-seq__item gallery-seq__item--support' },
      { src: d, className: 'gallery-seq__item gallery-seq__item--large' },
      { src: e, className: 'gallery-seq__item gallery-seq__item--support' },
      ...images.slice(5).map((src) => ({ src, className: 'gallery-seq__item gallery-seq__item--support' })),
    ]
  }
  if (slug === 'beach-cleanups') {
    return [
      { src: a, className: 'gallery-seq__item gallery-seq__item--primary gallery-seq__item--full' },
      { src: b, className: 'gallery-seq__item gallery-seq__item--mid' },
      { src: c, className: 'gallery-seq__item gallery-seq__item--mid gallery-seq__item--shift' },
      { src: d, className: 'gallery-seq__item gallery-seq__item--sort' },
      { src: e, className: 'gallery-seq__item gallery-seq__item--support' },
      { src: f, className: 'gallery-seq__item gallery-seq__item--support' },
    ]
  }
  if (slug === 'tree-planting') {
    return [
      { src: a, className: 'gallery-seq__item gallery-seq__item--primary', note: 'No growth photo yet. This slot should become a return-visit image.' },
      { src: b, className: 'gallery-seq__item gallery-seq__item--support' },
      { src: c, className: 'gallery-seq__item gallery-seq__item--support' },
      { src: d, className: 'gallery-seq__item gallery-seq__item--support' },
      { src: e, className: 'gallery-seq__item gallery-seq__item--support' },
      { src: f, className: 'gallery-seq__item gallery-seq__item--support' },
      { src: g, className: 'gallery-seq__item gallery-seq__item--support' },
    ]
  }
  return images.map((src, index) => ({
    src,
    className: `gallery-seq__item gallery-seq__item--${index === 0 ? 'primary' : 'support'}`,
  }))
}

export default function ProjectGallerySequence({ slug, title, images }: ProjectGallerySequenceProps) {
  const segments = useMemo(() => buildSegments(slug, images), [slug, images])
  const [active, setActive] = useState<number | null>(null)

  return (
    <>
      <section className="gallery-seq">
        {segments.map((segment, index) => (
          <button
            key={`${segment.src}-${index}`}
            className={segment.className}
            onClick={() => setActive(index)}
            type="button"
          >
            <span className="gallery-seq__frame">
              <Image src={segment.src} alt={`${title} photo ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 70vw" />
            </span>
            {segment.note ? <span className="gallery-seq__note">{segment.note}</span> : null}
          </button>
        ))}
      </section>

      {active !== null && (
        <div className="gallery-lightbox" onClick={() => setActive(null)} role="dialog" aria-modal="true">
          <div className="gallery-lightbox__inner" onClick={(event) => event.stopPropagation()}>
            <button className="gallery-lightbox__close" onClick={() => setActive(null)} type="button">
              Close
            </button>
            <div className="gallery-lightbox__image">
              <Image src={segments[active].src} alt={`${title} photo ${active + 1}`} fill sizes="100vw" />
            </div>
            <div className="gallery-lightbox__thumbs">
              {segments.map((segment, index) => (
                <button key={segment.src} type="button" onClick={() => setActive(index)}>
                  <Image src={segment.src} alt="" fill sizes="120px" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
