'use client'

import { motion } from 'motion/react'
import type { ProjectTestimonial } from '../../types/project'

interface ProjectStoryProps {
  paragraphs: string[]
  testimonial?: ProjectTestimonial
}

export default function ProjectStory({ paragraphs, testimonial }: ProjectStoryProps) {
  return (
    <section className="project-story">
      <div className="project-story-text">
        {paragraphs.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            {para}
          </motion.p>
        ))}
      </div>

      {testimonial && (
        <motion.blockquote
          className="project-testimonial"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <p>&ldquo;{testimonial.quote}&rdquo;</p>
          <footer>
            <span className="testimonial-name">{testimonial.name}</span>
            <span className="testimonial-role">{testimonial.role}</span>
          </footer>
        </motion.blockquote>
      )}
    </section>
  )
}
