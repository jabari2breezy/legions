'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { getProjectById } from '../../lib/projects-data';
import { LiquidGlassCircle, LiquidGlassPill } from '../../components/ui/LiquidGlass';
import { Counter } from '../../components/ui/Counter';
import { useCursor } from '../../components/ui/CustomCursor';
import Link from 'next/link';

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const project = id ? getProjectById(id) : null;
  const { setHoverLabel, clearHover } = useCursor();
  const detailRef = useRef(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        '.detail-gallery-image',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
      );
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  if (!project) {
    return (
      <div className="h-screen w-full bg-[var(--color-bg-deep)] flex items-center justify-center p-8 text-center">
        <div>
          <h1 className="font-[Playfair_Display] text-4xl text-white mb-4">Project Not Found</h1>
          <p className="text-white/70 font-[Poppins] mb-6 max-w-md mx-auto">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/#projects">
            <LiquidGlassPill className="inline-flex items-center gap-3 px-8 py-4">
              <span className="text-white font-medium">Back to Projects</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4DE8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </LiquidGlassPill>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[var(--color-bg-deep)] overflow-y-auto" ref={detailRef}>
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Back button - fixed top left */}
      <div className="fixed top-6 left-6 z-[60]">
        <Link href="/#projects">
          <LiquidGlassCircle
            size={44}
            onMouseEnter={() => setHoverLabel('Back')}
            onMouseLeave={clearHover}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </LiquidGlassCircle>
        </Link>
      </div>

      {/* Hero image */}
      <motion.div
        className="relative h-[55vh] w-full min-h-[350px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={project.mainImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)] via-[var(--color-bg-deep)]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
          <motion.h1
            className="font-[Playfair_Display] text-4xl md:text-6xl lg:text-7xl font-bold text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.title}
          </motion.h1>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-12 lg:p-16 max-w-5xl mx-auto">
        {/* Description */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-white/80 text-lg md:text-xl leading-relaxed font-[Poppins]">
            {project.description}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mb-12 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {project.stats.map((stat, i) => (
            <LiquidGlassPill key={i} className="flex items-center gap-3 px-5 py-3">
              <Counter
                target={parseInt(stat.value.replace(/[^\d]/g, ''), 10)}
                suffix={stat.value.includes('+') ? '+' : ''}
                className="font-[Playfair_Display] text-xl font-bold text-white"
              />
              <span className="text-white/70 text-sm font-[Poppins]">{stat.label}</span>
            </LiquidGlassPill>
          ))}
        </motion.div>

        {/* Gallery */}
        {project.galleryImages.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <h2 className="font-[Playfair_Display] text-3xl font-bold text-white mb-8">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="detail-gallery-image relative aspect-[4/3] rounded-2xl overflow-hidden opacity-0"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back to Projects CTA */}
        <motion.div
          className="pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Link href="/#projects">
            <LiquidGlassPill
              className="inline-flex items-center gap-3 px-8 py-4"
              onMouseEnter={() => setHoverLabel('Back to Projects')}
              onMouseLeave={clearHover}
            >
              <span className="text-white font-medium">Back to Projects</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4DE8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </LiquidGlassPill>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
