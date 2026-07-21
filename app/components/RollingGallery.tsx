'use client'

import Image from 'next/image'

// Unsplash high quality stock images for community service, youth initiatives, and nature
const projectStockImages = [
  { id: '1', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80', title: 'AMSEN Visits' },
  { id: '2', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80', title: 'Tree Planting Initiative' },
  { id: '3', url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80', title: 'Ujasiri House Renovation' },
  { id: '4', url: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80', title: 'Coastline Beach Cleanups' },
  { id: '5', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80', title: 'Ramadhan Food Drive' },
  { id: '6', url: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?auto=format&fit=crop&w=800&q=80', title: 'Youth Mentorship Workshops' },
]

export default function RollingGallery() {
  // Duplicate array for seamless infinite looping animation
  const galleryItems = [...projectStockImages, ...projectStockImages]

  return (
    <div className="relative w-full overflow-hidden py-12 border-y border-white/10 bg-[#010101]/80 backdrop-blur-md">
      {/* Vignette fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#010101] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#010101] to-transparent pointer-events-none" />

      <div className="animate-marquee-rtl flex items-center gap-6">
        {galleryItems.map((item, index) => (
          <div 
            key={`${item.id}-${index}`}
            className="relative flex-shrink-0 w-72 h-44 sm:w-96 sm:h-56 rounded-2xl overflow-hidden glass-card group cursor-pointer"
          >
            <Image
              src={item.url}
              alt={item.title}
              fill
              className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#010101]/90 via-transparent to-transparent p-5 flex flex-col justify-end">
              <span className="text-cyan font-mono text-[10px] tracking-widest uppercase">
                [ LEGIONS ARCHIVE ]
              </span>
              <h4 className="text-white font-sans text-sm sm:text-base font-medium tracking-wide">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
