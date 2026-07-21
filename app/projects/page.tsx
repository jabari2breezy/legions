import Navbar from '../components/Navbar'
import FilmGrain from '../components/FilmGrain'
import RollingGallery from '../components/RollingGallery'
import Image from 'next/image'
import Link from 'next/link'
import SectionHeader from '../components/SectionHeader'

interface Project {
  id: string
  title: string
  category: string
  summary: string
  coverImage: string
  impact: string
  date: string
}

const projects: Project[] = [
  {
    id: 'ujasiri-house',
    title: 'Ujasiri House Renovation',
    category: 'Infrastructure & Youth Shelter',
    summary: 'Restoring living quarters, repairing facilities, and installing essential amenities for vulnerable youth in Dar es Salaam.',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200',
    impact: '120+ Youth Supported',
    date: '2024 - Active',
  },
  {
    id: 'amsen-visits',
    title: 'AMSEN Mentorship Visits',
    category: 'Education & Special Needs',
    summary: 'Bi-weekly school visits focused on tutoring, music therapy, creative art, and social integration.',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200',
    impact: '250+ Students Engaged',
    date: 'Ongoing Initiative',
  },
  {
    id: 'tree-planting',
    title: 'Dar Reforestation Drive',
    category: 'Environmental Sustainability',
    summary: 'Planting over 1,500 shade and fruit-bearing indigenous trees across schools and public grounds.',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200',
    impact: '1,500+ Trees Planted',
    date: 'Quarterly Project',
  },
  {
    id: 'beach-cleanups',
    title: 'Coastal Protection & Marine Cleanup',
    category: 'Environmental Action',
    summary: 'Organizing community plastic removal campaigns across Dar es Salaam beaches to protect marine life.',
    coverImage: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=1200',
    impact: '3.5 Tons Waste Removed',
    date: 'Monthly Drive',
  },
  {
    id: 'ramadhan-project',
    title: 'Ramadhan Food & Family Aid',
    category: 'Community Relief',
    summary: 'Providing nutritious food baskets, clean water, and hygiene essentials to underprivileged families during Ramadhan.',
    coverImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=1200',
    impact: '400+ Families Served',
    date: 'Annual Campaign',
  },
]

// All project gallery images rolling in background right to left
const allProjectGalleryImages = [
  'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=800',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
  'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=800',
  'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=800',
  'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800',
  'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800',
]

export default function ProjectsPage() {
  return (
    <main className="relative bg-bg-deep min-h-screen text-text-primary overflow-hidden pt-28 pb-20">
      <FilmGrain />
      <Navbar />

      {/* Background Rolling Gallery Marquee (Right to Left) */}
      <RollingGallery images={allProjectGalleryImages} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeader title="All Community Projects" subtitle="Our Portfolio of Impact" align="left" />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((proj) => (
            <Link
              key={proj.id}
              href={`/projects/${proj.id}`}
              className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-cyan/50 transition-all duration-500 flex flex-col h-[480px]"
            >
              {/* Cover Image of Said Project */}
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={proj.coverImage}
                  alt={proj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-cyan text-xs font-mono">
                  {proj.impact}
                </div>
              </div>

              {/* Project Card Info */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-cyan uppercase tracking-wider mb-2">
                    <span>{proj.category}</span>
                    <span className="text-white/40">{proj.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                    {proj.summary}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-2 text-cyan font-mono text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                  <span>View Project Case Study</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
