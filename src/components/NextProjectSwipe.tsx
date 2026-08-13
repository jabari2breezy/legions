'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

type NextProjectSwipeProps = {
  href: string
  title: string
  subtitle: string
  image: string
}

export default function NextProjectSwipe({
  href,
  title,
  subtitle,
  image,
}: NextProjectSwipeProps) {
  return (
    <Link href={href} className="next-project-swipe">
      <motion.div
        className="next-project-swipe__inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.7 }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="next-project-swipe__copy">
          <span className="label">Next project</span>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <div className="next-project-swipe__media">
          <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </motion.div>
    </Link>
  )
}
