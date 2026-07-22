'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Lightbox from './Lightbox'
import type { ProjectImageGroup, ProjectImage } from '../../types/project'

interface ProjectGalleryProps {
  groups: ProjectImageGroup[]
}

export default function ProjectGallery({ groups }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const allImages = groups.flatMap((g) => g.images)

  const openLightbox = useCallback(
    (image: ProjectImage) => {
      const index = allImages.findIndex((img) => img.id === image.id)
      setLightboxIndex(index)
    },
    [allImages]
  )

  return (
    <div className="gallery-wrapper">
      {groups.map((group) => (
        <section key={group.groupId} className="gallery-group">
          {group.label && (
            <div className="gallery-group-header">
              <h3>{group.label}</h3>
              {group.description && <p>{group.description}</p>}
            </div>
          )}

          <div className="gallery-masonry">
            {group.images.map((image, i) => (
              <motion.button
                key={image.id}
                className={`gallery-item gallery-item--${image.orientation}`}
                onClick={() => openLightbox(image)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: Math.min((i % 6) * 0.05, 0.3),
                  ease: [0.16, 1, 0.3, 1],
                }}
                aria-label={`Open image: ${image.alt}`}
              >
                <Image
                  src={`/projects/${image.filename}`}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="gallery-image"
                  loading="lazy"
                />
                {image.caption && (
                  <span className="gallery-caption">{image.caption}</span>
                )}
              </motion.button>
            ))}
          </div>
        </section>
      ))}

      {lightboxIndex !== null && (
        <Lightbox
          images={allImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  )
}
