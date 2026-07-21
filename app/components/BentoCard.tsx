'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { initBentoHover } from '../utils/animations'

interface BentoCardProps {
  title: string
  description?: string
  imageSrc?: string
  className?: string
  icon?: React.ReactNode
}

export default function BentoCard({ title, description, imageSrc, className = '', icon }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useGSAP(() => {
    if (imageSrc) {
      initBentoHover(cardRef, imageRef)
    }
  }, { scope: cardRef, dependencies: [imageSrc] })

  return (
    <div 
      ref={cardRef} 
      className={`relative overflow-hidden glass-panel group transition-colors duration-500 hover:bg-surface-hover ${className}`}
    >
      {imageSrc && (
        <div className="absolute inset-0 z-0">
          <Image
            ref={imageRef}
            src={imageSrc}
            alt={title}
            fill
            className="object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/40 to-transparent" />
        </div>
      )}
      
      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end">
        {icon && <div className="mb-auto pb-4 text-cyan w-8 h-8">{icon}</div>}
        <h3 className="text-2xl font-bold mb-2 tracking-tight text-white">{title}</h3>
        {description && (
          <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
