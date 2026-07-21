import Navbar from '../../components/Navbar'
import FilmGrain from '../../components/FilmGrain'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'nextimport'

interface ProjectDetail {
  title: string
  category: string
  location: string
  timeline: string
  impact: string
  heroImage: string
  overview: string
  keyObjectives: string[]
  gallery: string[]
}

const projectDetailsMap: Record<string, ProjectDetail> = {
  'ujasiri-house': {
    title: 'Ujasiri House Renovation',
    category: 'Youth Shelter & Infrastructure',
    location: 'Dar es Salaam, Tanzania',
    timeline: '2024 - Active',
    impact: '120+ Youth Sheltered',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1600',
    overview: 'Ujasiri House provides shelter, safety, and care for vulnerable children and youth. The Legions team spearheaded a comprehensive restoration project to renovate living quarters, install upgraded plumbing and lighting, paint facilities with uplifting murals, and equip educational study areas.',
    keyObjectives: [
      'Overhaul sleeping dormitories with new mattresses & mosquito nets',
      'Construct a dedicated computer study hub with donated laptops',
      'Establish clean sanitation facilities and safe water filtration',
      'Host weekly mentorship and tutoring workshops'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=800',
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800'
    ]
  },
  'amsen-visits': {
    title: 'AMSEN Mentorship Visits',
    category: 'Special Education',
    location: 'Dar es Salaam, Tanzania',
    timeline: 'Ongoing Initiative',
    impact: '250+ Students Mentored',
    heroImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600',
    overview: 'The AMSEN project focuses on supporting children with special educational needs through tailored mentorship sessions, arts & crafts workshops, musical exercises, and interactive sports days.',
    keyObjectives: [
      'Provide specialized learning materials and sensory toys',
      'Conduct 1-on-1 tutoring sessions in literacy and math',
      'Organize inclusive athletic field days and games',
      'Train student volunteers in special education support'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800'
    ]
  },
  'tree-planting': {
    title: 'Dar Reforestation Campaign',
    category: 'Environmental Action',
    location: 'Dar es Salaam, Tanzania',
    timeline: 'Quarterly',
    impact: '1,500+ Trees Planted',
    heroImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600',
    overview: 'To combat urban heat islands and coastal soil erosion, Legions volunteers plant native trees across school campuses, public parks, and degraded forest reserves across Dar es Salaam.',
    keyObjectives: [
      'Plant over 1,500 indigenous shade and fruit trees',
      'Establish student environmental clubs in local secondary schools',
      'Conduct workshops on sustainable composting & water conservation',
      'Monitor tree survival rates with digital tracking'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800'
    ]
  },
  'beach-cleanups': {
    title: 'Coastal Protection Cleanups',
    category: 'Marine Conservation',
    location: 'Kipepeo & Coco Beach, Dar es Salaam',
    timeline: 'Monthly',
    impact: '3.5 Tons Plastic Removed',
    heroImage: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=1600',
    overview: 'Our monthly ocean cleanup events bring together dozens of youth volunteers to clean Dar es Salaam beaches, collect microplastics, and sort recyclables for ethical processing.',
    keyObjectives: [
      'Remove non-biodegradable plastics from marine habitats',
      'Partner with local recyclers for zero-landfill disposal',
      'Raise public awareness on ocean microplastic pollution',
      'Host beach volleyball & community bonding sessions'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=800',
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800'
    ]
  },
  'ramadhan-project': {
    title: 'Ramadhan Food Relief Drive',
    category: 'Community Relief',
    location: 'Dar es Salaam Neighborhoods',
    timeline: 'Annual',
    impact: '400+ Families Supported',
    heroImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=1600',
    overview: 'During the holy month of Ramadhan, Legions mobilizes resources to assemble and deliver comprehensive food and hygiene packages to vulnerable families and orphanages.',
    keyObjectives: [
      'Distribute rice, flour, oil, dates, and clean water supplies',
      'Host community Iftar dinners for underprivileged youth',
      'Provide basic medical kits and hygiene items',
      'Mobilize over 50 student volunteers for packing & delivery'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=800',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800'
    ]
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const project = projectDetailsMap[resolvedParams.id]

  if (!project) {
    return (
      <main className="relative bg-bg-deep min-h-screen text-text-primary flex items-center justify-center p-6 text-center">
        <FilmGrain />
        <Navbar />
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-cyan font-mono hover:underline">
            &larr; Back to All Projects
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="relative bg-bg-deep min-h-screen text-text-primary overflow-hidden pb-24 pt-24">
      <FilmGrain />
      <Navbar />

      {/* Hero Header */}
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/60 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 max-w-[1400px] mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-cyan font-mono text-xs uppercase tracking-widest mb-6 hover:text-white transition-colors"
          >
            <span>&larr; All Projects</span>
          </Link>

          <span className="text-cyan font-mono uppercase text-xs tracking-widest mb-2 block">
            [ {project.category} ]
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-xs font-mono text-white/80">
            <div><span className="text-cyan">LOCATION:</span> {project.location}</div>
            <div><span className="text-cyan">TIMELINE:</span> {project.timeline}</div>
            <div><span className="text-cyan">KEY IMPACT:</span> {project.impact}</div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Story & Objectives */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
              <p className="text-text-secondary text-base leading-relaxed">
                {project.overview}
              </p>
            </div>

            <div className="glass-panel p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Key Objectives & Accomplishments</h2>
              <ul className="space-y-3 text-text-secondary text-sm">
                {project.keyObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-cyan font-mono font-bold">0{i + 1}.</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar & Gallery */}
          <div className="space-y-6">
            <div className="glass-panel p-6 text-center">
              <h3 className="text-lg font-bold text-white mb-2">Want to Support This Project?</h3>
              <p className="text-xs text-text-secondary mb-6">
                Join our volunteer roster or contribute supplies directly to our team in Dar es Salaam.
              </p>
              <Link
                href="/contact"
                className="block w-full py-3 rounded-full bg-cyan text-bg-deep font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md shadow-cyan/20"
              >
                Volunteer For This Cause
              </Link>
            </div>

            {/* Gallery Thumbnails */}
            <div className="glass-panel p-6">
              <h3 className="text-sm font-mono uppercase tracking-widest text-cyan mb-4">Project Gallery</h3>
              <div className="grid grid-cols-2 gap-3">
                {project.gallery.map((img, idx) => (
                  <div key={idx} className="relative h-28 rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src={img}
                      alt={`Gallery ${idx}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
