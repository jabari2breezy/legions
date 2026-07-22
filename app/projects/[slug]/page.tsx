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
  context: string
  planning: string[]
  impactHighlights: string[]
  gallery: string[]
}

const projectsDB: Record<string, ProjectData> = {
  'amsen-visits': {
    title: 'AMSEN Visits',
    category: 'Community & Special Needs',
    heroImage: '/projects/amsen-visits/IMG_8275.jpg',
    stats: [
      { number: 40, suffix: '+', label: 'Students Engaged' },
      { number: 25, suffix: '+', label: 'Youth Volunteers' },
      { number: 100, suffix: '%', label: 'Resources Donated' },
    ],
    context: 'Children with neurodivergence and special physical or intellectual needs in Dar-es-Salaam often face social isolation due to lingering societal stigma and a lack of inclusive youth-led community interaction. Legions Tz recognized that institutional care needs to be complemented by genuine human connection, social integration, and peer companionship. The goal was to bridge this gap by bringing active, empathetic youth interaction directly to the students at the Al Muntazir Special Needs (AMSEN) center.',
    planning: [
      'Held consultations with AMSEN administrators and specialized educators to understand the sensory profiles, mobility needs, and comfort levels of the students.',
      'Organized internal preparation workshops for members to learn inclusive engagement techniques and activity facilitation.',
      'Planned structured, sensory-friendly itineraries featuring creative arts, crafts, interactive music, and gentle physical games designed to be stimulating without causing sensory overload.',
      'Conducted internal fundraising drives to purchase specialized art supplies, educational toys, and individual gift packages tailored for special needs learning.',
    ],
    impactHighlights: [
      '40+ Special Needs Students directly engaged in personalized 1-on-1 and small-group social activities.',
      '100% Resource Donation — All purchased sensory art supplies, games, and learning materials were left as permanent donations to the center\'s therapy department.',
      '25+ Youth Volunteers trained and engaged in disability awareness and inclusive civic action.',
    ],
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
      { number: 1.5, suffix: '+ Tons', label: 'Waste Collected' },
      { number: 150, suffix: '+', label: 'Volunteers Mobilized' },
    ],
    context: 'Rapid urban growth along Dar-es-Salaam\'s coastline (such as Coco Beach and Msasani) has led to severe plastic accumulation, endangering marine wildlife and degrading public coastal spaces. Driven by the urgent need for localized environmental stewardship, Legions Tz stepped in to address marine pollution directly through grassroots youth action, transforming popular public beaches into cleaner, safer ecosystems.',
    planning: [
      'Began with site reconnaissance to identify heavily polluted coastal sections and coordinate permissions with municipal beach governance committees.',
      'Launched digital recruitment campaigns across @legions.tz to rally youth volunteers and secure micro-sponsorships for equipment.',
      'Procured heavy-duty biodegradable waste bags, protective gloves, safety equipment, trash pickers, and volunteer hydration stations.',
      'Established an organized waste-sorting strategy on site, separating collection streams into recyclable plastics, glass, and non-recyclable waste, and partnered with local waste management collectors to ensure proper post-pickup recycling.',
    ],
    impactHighlights: [
      '1.5+ Tons (3,300+ lbs) of plastic waste, micro-debris, glass, and marine litter collected and removed from shorelines.',
      '150+ Volunteers mobilized across multiple cleanup operations.',
      'Kilometers of coastline cleared and restored for public safe use and marine protection.',
    ],
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
      { number: 1200, suffix: '+', label: 'Individuals Reached' },
      { number: 100, suffix: '%', label: 'Direct Allocation' },
    ],
    context: 'During the holy month of Ramadan, underprivileged households, local orphanages, and families supporting sick relatives in hospitals face severe economic strain due to rising food prices. Legions Tz initiated the Ramadhan Project to uphold values of charity and mutual aid, ensuring that vulnerable, fasting individuals receive reliable, dignified, and nutritious food security.',
    planning: [
      'Began with community needs assessments to identify underfunded orphanages, pediatric long-term care stays, and low-income families across Dar-es-Salaam.',
      'Launched peer-to-peer digital fundraising drives across social media and mobile money platforms (M-Pesa, Tigo Pesa) to collect micro-donations.',
      'Negotiated directly with local wholesale food suppliers to buy in bulk, maximizing purchasing power for key staples like rice, wheat flour, cooking oil, sugar, dates, and dry rations.',
      'Volunteers set up a logistics and assembly line to pack balanced food hampers, pre-mapping efficient distribution routes across target neighborhoods to hand-deliver packages directly.',
    ],
    impactHighlights: [
      '1,200+ Individuals & Fasting Families provided with essential food hampers and Iftar provisions.',
      'Multiple Local Orphanages & Care Facilities reached with direct bulk food deliveries.',
      '100% Direct Allocation — Zero administrative overhead, ensuring every donation went straight to bulk food procurement.',
    ],
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
    title: 'Tree Planting — Project MYK',
    category: 'Environment',
    heroImage: '/projects/tree-planting/IMG_8271.jpg',
    stats: [
      { number: 500, suffix: '+', label: 'Trees Planted' },
      { number: 90, suffix: '%+', label: 'Survival Rate' },
    ],
    context: 'Urban heat island effects and rapid deforestation in Dar-es-Salaam leave many public schools and community spaces barren, exposed to extreme heat, and lacking natural shade. As part of their Maboresho Ya Kijani (Green Improvements) initiative, Legions Tz sought to combat local climate vulnerability, improve air quality, and create vibrant, eco-friendly learning environments for students.',
    planning: [
      'Surveyed public school grounds and urban sites that lacked green cover and shade trees.',
      'Partnered with horticultural nurseries and environmental organizations (such as Humanitrees) to select resilient native shade trees and fruit saplings suitable for the local soil and climate.',
      'Prepared the soil, arranged digging tools, procured organic fertilizer, and coordinated planting schedules with school heads.',
      'Established "tree-guardianship" agreements with school student committees, assigning specific responsibilities for daily watering and maintenance to guarantee high sapling survival rates.',
    ],
    impactHighlights: [
      '500+ Trees planted — indigenous shade trees and fruit saplings across local schools and community grounds.',
      '90%+ Survival Rate maintained through student-led tree-guardianship programs.',
      'Hundreds of students benefiting from shaded recreational areas and greener school environments.',
    ],
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
      { number: 30, suffix: '+', label: 'Families Hosted Daily' },
      { number: 100, suffix: '%', label: 'Sweat-Equity Efficiency' },
    ],
    context: 'The Ujasiri House, operated by Tumaini La Maisha (TLM), is a vital non-clinical hostel that offers free housing, meals, and psycho-social support to pediatric cancer patients and their primary caregivers during multi-month treatment cycles at Muhimbili National Hospital. Years of continuous use had left the facility worn, faded, and sterile. Legions Tz undertook this project to transform the physical environment into a colorful, lively, and therapeutic space that supports the mental health and emotional resilience of recovering children.',
    planning: [
      'Conducted multi-stage site surveys alongside TLM staff to assess structural wall damage, painting requirements, and spatial design needs.',
      'Launched a dedicated fundraising campaign within their network to secure funds specifically for high-grade, non-toxic paints, plaster, brushes, and repair supplies.',
      'Designed child-friendly, uplifting mural concepts and color schemes tailored specifically to therapeutic pediatric environments.',
      'Over several coordinated weekend shifts, volunteers managed the physical labor — scraping, plastering, priming interior and exterior walls, and hand-painting large-scale custom art murals across living quarters and play areas.',
    ],
    impactHighlights: [
      '30+ Families hosted daily / Hundreds annually benefiting directly from the revitalized living facility.',
      '100% Sweat-Equity Efficiency — By providing all voluntary labor, 100% of donor funds were spent directly on high-quality construction and art materials.',
      'Complete spatial transformation — full interior/exterior repaint accompanied by custom therapeutic murals in all central areas.',
    ],
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

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectsDB[slug]

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

      {/* Content */}
      <section className="py-[var(--spacing-section-y)] container mx-auto px-[var(--spacing-section-x)]">
        <div className="max-w-4xl mx-auto">
          
          {/* Context & Motivation */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[var(--color-cyan)]"></span>
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-cyan)]">Context & Motivation</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8 leading-tight">Why This Matters</h2>
            <p className="text-[var(--font-size-body-large)] text-[var(--color-text-secondary)] leading-relaxed">
              {project.context}
            </p>
          </div>
          
          {/* Planning & Preparation */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[var(--color-cyan)]"></span>
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-cyan)]">Planning & Preparation</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8 leading-tight">How We Organized</h2>
            <div className="space-y-4">
              {project.planning.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface)] flex items-center justify-center text-xs font-mono text-[var(--color-cyan)] group-hover:bg-[var(--color-cyan)]/10 group-hover:border-[var(--color-cyan)]/40 transition-all duration-300">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[var(--color-cyan)]"></span>
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-cyan)]">Results & Impact</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8 leading-tight">What We Achieved</h2>
            <div className="space-y-4">
              {project.impactHighlights.map((highlight, idx) => (
                <div key={idx} className="glass-panel p-6 border-l-4 border-l-[var(--color-cyan)] hover:bg-white/[0.03] transition-colors duration-300">
                  <p className="text-[var(--color-text-primary)] leading-relaxed font-medium">
                    {highlight}
                  </p>
                </div>
              ))}
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
