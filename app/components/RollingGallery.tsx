'use client'

import Image from 'next/image'

interface RollingGalleryProps {
  images: string[]
}

export default function RollingGallery({ images }: RollingGalleryProps) {
  // Duplicate array for seamless infinite loop
  const duplicatedImages = [...images, ...images, ...images]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
      <div className="flex gap-6 w-max animate-marquee py-8">
        {duplicatedImages.map((imgSrc, i) => (
          <div
            key={i}
            className="relative w-[320px] h-[220px] md:w-[450px] md:h-[300px] rounded-2xl overflow-hidden flex-shrink-0 border border-white/10"
          >
            <Image
              src={imgSrc}
              alt="Project Gallery Image"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              sizes="450px"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  )
}
