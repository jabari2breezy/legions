'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'

interface ProjectCardQuietProps {
  slug: string
  title: string
  category: string
  imageSrc: string
  index: number
}

export default function ProjectCardQuiet({ slug, title, category, imageSrc, index }: ProjectCardQuietProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/projects/${slug}`} className="project-card-quiet">
        <div className="project-card-quiet-image">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="project-card-quiet-meta">
          <span className="project-card-quiet-index">0{index + 1}</span>
          <h3>{title}</h3>
          <span className="project-card-quiet-category">{category}</span>
        </div>
      </Link>
    </motion.div>
  )
}
