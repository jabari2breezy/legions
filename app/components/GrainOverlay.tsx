interface GrainOverlayProps {
  opacity?: number
  className?: string
}

export default function GrainOverlay({ opacity = 0.1, className = '' }: GrainOverlayProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none z-10 ${className}`} style={{ opacity }}>
      <svg className="absolute inset-0 w-full h-full mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}
