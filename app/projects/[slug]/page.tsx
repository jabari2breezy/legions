import { notFound } from 'next/navigation'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SectionHeader from '../../components/SectionHeader'
import ImpactCounter from '../../components/ImpactCounter'
import Button from '../../components/Button'

interface Stat {
  number: number
  prefix?: string
  suffix?: string
  label: string
}

interface ProjectData {
  title: string
  category: string
  heroImage: string
  stats: Stat[]
  story: string
  impact: string
  gallery: string[]
}

const projectsDB: Record<string, ProjectData> = {
  'amsen-visits': {
    title: 'AMSEN Visits',
    category: 'Community & Special Needs',
    heroImage: '/projects/amsen-visits/IMG_8275.jpg',
    stats: [
      { number: 50, suffix: '+', label: 'Students Engaged' },
      { number: 10, suffix: '+', label: 'Visits Conducted' },
    ],
    story: 'Direct engagement and support visits to AMSEN (Al-Muntazir Special Needs School). Our volunteers provide companionship, learning tools, and interactive creative activities designed to foster social inclusion and emotional wellbeing for students with special needs.',
    impact: 'Created a supportive, inclusive environment while providing tangible educational resources and dedicated volunteer hours directly to the students and staff at AMSEN.',
    gallery: [
      '/projects/amsen-visits/IMG_8275.jpg',
      '/projects/amsen-visits/IMG_8276.jpg',
      '/projects/amsen-visits/IMG_8277.jpg',
      '/projects/amsen-visits/IMG_8278.jpg',
      '/projects/amsen-visits/IMG_8279.jpg',
      '/projects/amsen-visits/IMG_8280.jpg',
      '/projects/amsen-visits/IMG_8281.jpg',
      '/projects/amsen-visits/IMG_8282.jpg',
    ]
  },
  'beach-cleanups': {
    title: 'Beach Cleanups',
    category: 'Environment',
    heroImage: '/projects/beach-cleanups/IMG_8270.jpg',
    stats: [
      { number: 500, suffix: ' kg+', label: 'Waste Removed' },
      { number: 4, label: 'Beaches Cleaned' },
    ],
    story: 'Mobilizing youth squads along the coastline of Dar es Salaam to clear marine plastic waste and restore delicate coastal ecosystems. Our beach cleanups raise awareness about ocean conservation while taking immediate physical action.',
    impact: 'Removed hundreds of kilograms of plastic waste and trash from public beaches, protecting marine life and keeping Dar es Salaam coastline clean.',
    gallery: [
      '/projects/beach-cleanups/IMG_8270.jpg',
      '/projects/beach-cleanups/IMG_8199.jpg',
      '/projects/beach-cleanups/IMG_8200.jpg',
      '/projects/beach-cleanups/IMG_8201.jpg',
      '/projects/beach-cleanups/screenshot-1.png',
      '/projects/beach-cleanups/screenshot-2.png',
    ]
  },
  'ramadhan-project': {
    title: 'Ramadhan Project',
    category: 'Community & Food Relief',
    heroImage: '/projects/ramadhan-project/IMG_8248.jpg',
    stats: [
      { number: 500, suffix: '+', label: 'Meals Served' },
      { number: 3, label: 'Orphanages Supported' },
    ],
    story: 'Our annual Ramadhan initiative pools community donations to purchase bulk food ingredients, prepare hot Iftar meals, and deliver essential food ration packs to local orphanages and vulnerable families across Dar es Salaam.',
    impact: 'Provided over 500 hot meals and food ration packs during the holy month, bringing relief, joy, and togetherness to vulnerable community members.',
    gallery: [
      '/projects/ramadhan-project/IMG_8248.jpg',
      '/projects/ramadhan-project/IMG_8255.jpg',
      '/projects/ramadhan-project/IMG_8256.jpg',
      '/projects/ramadhan-project/IMG_8257.jpg',
      '/projects/ramadhan-project/IMG_8258.jpg',
      '/projects/ramadhan-project/IMG_8259.jpg',
      '/projects/ramadhan-project/IMG_8260.jpg',
      '/projects/ramadhan-project/IMG_8261.jpg',
      '/projects/ramadhan-project/IMG_8262.jpg',
      '/projects/ramadhan-project/IMG_8264.jpg',
      '/projects/ramadhan-project/IMG_8265.jpg',
      '/projects/ramadhan-project/IMG_8266.jpg',
      '/projects/ramadhan-project/IMG_8267.jpg',
    ]
  },
  'tree-planting': {
    title: 'Tree Planting',
    category: 'Environment',
    heroImage: '/projects/tree-planting/IMG_8271.jpg',
    stats: [
      { number: 25000, suffix: '+', label: 'Trees Planted' },
      { number: 50, suffix: '+', label: 'Volunteers' },
    ],
    story: 'The Maboresho Ya Kijani (MYK) tree planting initiative combats urban deforestation and creates green shaded spaces in local schools. We mobilize student volunteers to plant and maintain native tree saplings across school grounds.',
    impact: 'Planted over 25,000 trees across multiple school campuses, improving air quality, providing shade, and educating students on environmental stewardship.',
    gallery: [
      '/projects/tree-planting/IMG_8271.jpg',
      '/projects/tree-planting/IMG_8272.jpg',
      '/projects/tree-planting/IMG_8273.jpg',
      '/projects/tree-planting/IMG_8274.jpg',
      '/projects/tree-planting/IMG_8285.jpg',
      '/projects/tree-planting/IMG_8286.jpg',
      '/projects/tree-planting/IMG_8287.jpg',
    ]
  },
  'ujasiri-house': {
    title: 'Ujasiri House Renovation',
    category: 'Health & Infrastructure',
    heroImage: '/projects/ujasiri-house/IMG_8290.jpg',
    stats: [
      { number: 2, prefix: 'TZS ', suffix: 'M+', label: 'Raised & Invested' },
      { number: 100, suffix: '%', label: 'Renovation Completed' },
    ],
    story: 'Ujasiri House hosts pediatric cancer patients and their families while receiving treatment at Muhimbili National Hospital. Legions raised funds and physically renovated the living spaces, painting walls, repairing facilities, and improving comfort.',
    impact: 'Transformed the living quarters into a clean, bright, and hygienic environment for children fighting cancer and their caregivers.',
    gallery: [
      '/projects/ujasiri-house/IMG_8290.jpg',
      '/projects/ujasiri-house/IMG_8292.jpg',
      '/projects/ujasiri-house/IMG_8293.jpg',
      '/projects/ujasiri-house/IMG_8294.jpg',
      '/projects/ujasiri-house/IMG_8295.jpg',
      '/projects/ujasiri-house/IMG_8297.jpg',
      '/projects/ujasiri-house/IMG_8298.jpg',
      '/projects/ujasiri-house/IMG_8299.jpg',
      '/projects/ujasiri-house/IMG_8300.jpg',
      '/projects/ujasiri-house/IMG_8301.jpg',
      '/projects/ujasiri-house/IMG_8302.jpg',
      '/projects/ujasiri-house/IMG_8303.jpg',
      '/projects/ujasiri-house/IMG_8304.jpg',
      '/projects/ujasiri-house/IMG_8305.jpg',
      '/projects/ujasiri-house/IMG_8306.jpg',
    ]
  }
}

export function generateStaticParams() {
  return Object.keys(projectsDB).map((slug) => ({
    slug: slug,
  }))
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projectsDB[params.slug as keyof typeof projectsDB]

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-deep)]">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 border-b border-[var(--color-border-subtle)] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <Image 
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)] via-[var(--color-bg-deep)]/70 to-transparent z-0"></div>
        
        <div className="container mx-auto px-[var(--spacing-section-x)] relative z-10 text-center">
          <div className="inline-block px-3 py-1 rounded-full border border-[var(--color-cyan)] text-[var(--color-cyan)] text-xs font-mono tracking-widest uppercase mb-8 bg-[var(--color-bg-deep)]/50 backdrop-blur-md">
            {project.category}
          </div>
          <h1 className="text-[var(--font-size-h1)] font-bold text-white mb-6 tracking-tight text-balance">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[var(--color-surface)] border-b border-[var(--color-border-subtle)]">
        <div className="container mx-auto px-[var(--spacing-section-x)] flex flex-wrap justify-center gap-12 md:gap-24">
          {project.stats.map((stat, i) => (
            <ImpactCounter 
              key={i}
              end={stat.number} 
              prefix={stat.prefix} 
              suffix={stat.suffix} 
              label={stat.label} 
            />
          ))}
        </div>
      </section>

      {/* Story & Impact */}
      <section className="py-[var(--spacing-section-y)] container mx-auto px-[var(--spacing-section-x)]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-6">The Initiative</h2>
            <p className="text-[var(--font-size-body-large)] text-[var(--color-text-secondary)] leading-relaxed">
              {project.story}
            </p>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-6">The Impact</h2>
            <div className="glass-panel p-8 border-l-4 border-l-[var(--color-cyan)]">
              <p className="text-[var(--font-size-body-large)] text-[var(--color-text-primary)] leading-relaxed">
                {project.impact}
              </p>
            </div>
          </div>

          {/* Project Gallery */}
          {project.gallery.length > 0 && (
            <div className="mb-16">
              <SectionHeader 
                eyebrow="Field Documentation"
                title="Project Gallery"
                align="left"
                className="mb-8"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.gallery.map((imgSrc, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel group">
                    <Image
                      src={imgSrc}
                      alt={`${project.title} photo ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-12 border-t border-[var(--color-border-subtle)] mt-20">
            <Button href="/projects" variant="secondary">Back to Projects</Button>
            <Button href="/volunteer" variant="primary">Help on the Next One</Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
