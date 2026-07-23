'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import type { LeadershipMember } from '../../types/project'

interface LeadershipGridProps {
  members: LeadershipMember[]
}

export default function LeadershipGrid({ members }: LeadershipGridProps) {
  return (
    <section className="leadership-grid">
      {members.map((member, i) => (
        <motion.div
          key={member.id}
          className="leadership-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <div className="leadership-photo-wrapper">
            {member.photo ? (
              <Image
                src={`/team/${member.photo.filename}`}
                alt={member.photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="leadership-photo"
              />
            ) : (
              <div className="leadership-photo-placeholder" aria-hidden="true">
                <span>{member.name.charAt(0)}</span>
              </div>
            )}
          </div>
          <h3>{member.name}</h3>
          <span className="leadership-role">{member.role}</span>
          <p className="leadership-bio">{member.bio}</p>
        </motion.div>
      ))}
    </section>
  )
}
