'use client'

import { useEffect, useRef, useState } from 'react'

interface Hero3DLogoProps {
  className?: string
  size?: number
}

export default function Hero3DLogo({ className = '', size = 400 }: Hero3DLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Check if video asset exists
  useEffect(() => {
    const video = document.createElement('video')
    video.src = '/hero-logo.mp4'
    video.oncanplaythrough = () => setVideoReady(true)
    video.onerror = () => setVideoReady(false)
    video.load()
  }, [])

  // CSS-animated 3D placeholder using layered divs with transforms
  // TODO: Replace this placeholder with the final rendered 3D video asset
  // Drop the rendered MP4/WebM file at /public/hero-logo.mp4
  // The video should feature: teal/emerald spheres (representing youth/global action) 
  // orbiting a chrome ribbon swoosh forming a tree/leaf motif
  // Recommended specs: 1080p, 30fps, 10-15s loop, muted, alpha channel if possible
  // Once the video is added, this component will auto-detect and use it instead

  if (videoReady) {
    return (
      <div
        ref={containerRef}
        className={`relative w-[${size}px] h-[${size}px] ${className}`}
        aria-hidden="true"
      >
        <video
          src="/hero-logo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90"
          style={{ filter: 'drop-shadow(0 0 80px rgba(0, 212, 200, 0.4))' }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-teal/10 via-transparent to-emerald/10 pointer-events-none"
          aria-hidden="true"
        />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-[${size}px] h-[${size}px] ${className}`}
      aria-hidden="true"
      style={{ animationPlayState: reducedMotion ? 'paused' : 'running' }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full border border-teal/20"
        style={{
          animation: 'pulse-ring 4s ease-in-out infinite',
          boxShadow: '0 0 60px rgba(0, 212, 200, 0.2), inset 0 0 60px rgba(0, 212, 200, 0.1)',
        }}
      />

      {/* Middle rotating ring */}
      <div
        className="absolute inset-4 rounded-full border border-teal-glow/30"
        style={{
          animation: 'rotate-ring 20s linear infinite',
          boxShadow: '0 0 40px rgba(0, 212, 200, 0.15)',
        }}
      />

      {/* Inner rotating ring (opposite direction) */}
      <div
        className="absolute inset-12 rounded-full border border-emerald/30"
        style={{
          animation: 'rotate-ring-reverse 15s linear infinite',
          boxShadow: '0 0 30px rgba(16, 185, 129, 0.15)',
        }}
      />

      {/* Central sphere cluster - teal/emerald spheres representing youth & nature */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Main central sphere */}
        <div
          className="relative w-24 h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #00D4C8 0%, #10B981 40%, #006B66 100%)',
            boxShadow: `
              0 0 40px rgba(0, 212, 200, 0.6),
              0 0 80px rgba(16, 185, 129, 0.3),
              inset 0 -10px 20px rgba(0, 0, 0, 0.3),
              inset 0 10px 20px rgba(255, 255, 255, 0.1)
            `,
            animation: 'float-sphere 3s ease-in-out infinite',
          }}
        >
          {/* Chrome ribbon swoosh - CSS approximation with leaf/tree motif */}
          <div
            className="absolute inset-0"
            style={{
              animation: 'rotate-swoosh 8s linear infinite',
            }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px]"
              style={{
                border: '2px solid transparent',
                borderTopColor: 'rgba(255, 255, 255, 0.4)',
                borderRightColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                boxShadow: `
                  0 0 20px rgba(255, 255, 255, 0.1),
                  inset 0 0 20px rgba(255, 255, 255, 0.05)
                `,
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px]"
              style={{
                border: '2px solid transparent',
                borderBottomColor: 'rgba(0, 212, 200, 0.5)',
                borderLeftColor: 'rgba(16, 185, 129, 0.3)',
                borderRadius: '50%',
                animation: 'rotate-swoosh-inner 6s linear infinite reverse',
              }}
            />
          </div>
        </div>

        {/* Orbiting teal/emerald spheres - representing youth volunteers & nature */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute w-6 h-6 rounded-full"
            style={{
              background: i % 2 === 0
                ? 'radial-gradient(circle at 30% 30%, #41EFE7 0%, #00D4C8 50%, #006B66 100%)'
                : 'radial-gradient(circle at 30% 30%, #34D399 0%, #10B981 50%, #059669 100%)',
              boxShadow: i % 2 === 0
                ? '0 0 20px rgba(0, 212, 200, 0.5), 0 0 40px rgba(0, 212, 200, 0.2)'
                : '0 0 20px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.2)',
              animation: `orbit-sphere-${i} ${12 + i * 2}s linear infinite`,
              transformOrigin: `${size / 2}px ${size / 2}px`,
            }}
          />
        ))}
      </div>

      {/* Outer particle ring */}
      <div
        className="absolute inset-[-20px] rounded-full border border-teal/10"
        style={{
          animation: 'rotate-ring 30s linear infinite reverse',
        }}
      />

      {/* Pulsing outer glow */}
      <div
        className="absolute inset-[-40px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 200, 0.08) 0%, transparent 70%)',
          animation: 'pulse-glow-ring 5s ease-in-out infinite',
        }}
      />

      <style jsx global>{`
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.5; }
        }
        @keyframes rotate-ring {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotate-ring-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes float-sphere {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        @keyframes rotate-swoosh {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotate-swoosh-inner {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes orbit-sphere-0 {
          from { transform: rotate(0deg) translateX(180px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
        }
        @keyframes orbit-sphere-1 {
          from { transform: rotate(90deg) translateX(200px) rotate(-90deg); }
          to { transform: rotate(450deg) translateX(200px) rotate(-450deg); }
        }
        @keyframes orbit-sphere-2 {
          from { transform: rotate(180deg) translateX(160px) rotate(-180deg); }
          to { transform: rotate(540deg) translateX(160px) rotate(-540deg); }
        }
        @keyframes orbit-sphere-3 {
          from { transform: rotate(270deg) translateX(220px) rotate(-270deg); }
          to { transform: rotate(630deg) translateX(220px) rotate(-630deg); }
        }
        @keyframes pulse-glow-ring {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}