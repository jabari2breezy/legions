import { notFound } from 'next/navigation'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SectionHeader from '../../components/SectionHeader'
import ImpactCounter from '../../components/ImpactCounter'
import Button from '../../components/Button'

// Project Database
interface Stat {
  number: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

interface ProjectData {
  title: string;
  category: string;
  heroImage: string;
  stats: Stat[];
  story: string;
  impact: string;
}

const projectsDB: Record<string, ProjectData> = {
  'tree-planting': {
    title: 'MYK Tree Planting',
    category: 'Environment',
    heroImage: '/hero-attached.jpg',
    stats: [
      { number: 25000, suffix: '+', label: 'Trees Planted' },
      { number: 50, suffix: '+', label: 'Volunteers' },
    ],
    story: 'Maboresho Ya Kijani (MYK) was our first major initiative. Recognizing the severe deforestation and lack of green spaces in public schools around Dar es Salaam, we mobilized students to plant over 25,000 trees across multiple campuses. The project not only improved the local environment but served as a massive educational campaign on climate action for the youth involved.',
    impact: 'By creating greener micro-climates around schools, we have provided shaded areas for students to study and play, while significantly contributing to urban reforestation efforts.'
  },
  'ujasiri-house': {
    title: 'Ujasiri House',
    category: 'Health',
    heroImage: '/hero-attached.jpg',
    stats: [
      { number: 2, prefix: 'TZS ', suffix: 'M', label: 'Raised' },
      { number: 100, suffix: '%', label: 'Completed' },
    ],
    story: 'Ujasiri House provides accommodation for pediatric cancer patients and their families. When we saw the state of their facilities, we knew we had to act. We ran a massive fundraising campaign across multiple international schools in Dar es Salaam, raising TZS 2 Million.',
    impact: 'The funds were used to purchase essential supplies, revamp the living quarters, and provide direct financial assistance to families struggling with the ancillary costs of long-term medical care.'
  },
  'pwani-well': {
    title: 'Pwani Well',
    category: 'Infrastructure',
    heroImage: '/hero-attached.jpg',
    stats: [
      { number: 1, label: 'Deep Water Well' },
      { number: 500, suffix: '+', label: 'Villagers Served' },
    ],
    story: 'Access to clean water is a fundamental human right. In a remote village in the Pwani region, residents were walking kilometers daily for contaminated water. Legions partnered with local contractors to fund and dig a deep-water well right in the center of the community.',
    impact: 'The well now provides a consistent, clean water source for over 500 residents, drastically reducing waterborne diseases and freeing up hours of time previously spent fetching water, allowing children to attend school.'
  },
  'ramadan-iftar': {
    title: 'Ramadan Iftar',
    category: 'Community',
    heroImage: '/hero-attached.jpg',
    stats: [
      { number: 500, suffix: '+', label: 'Meals Served' },
      { number: 3, label: 'Orphanages' },
    ],
    story: 'During the holy month of Ramadan, we focus our efforts on the most vulnerable. Our annual Ramadan Iftar project involves pooling funds, purchasing bulk ingredients, and physically cooking and serving meals at local orphanages.',
    impact: 'Beyond the nutritional value of over 500 hot meals, this project fosters a sense of belonging and community joy. Our volunteers sit, eat, and play with the children, providing emotional support alongside the physical meals.'
  },
  'ration-packages': {
    title: 'Ration Packages',
    category: 'Relief',
    heroImage: '/hero-attached.jpg',
    stats: [
      { number: 200, suffix: '+', label: 'Families Supported' },
      { number: 5, suffix: ' Tons', label: 'Food Distributed' },
    ],
    story: 'Economic hardship hits daily wage earners the hardest. Our Ration Packages initiative is an ongoing rapid-response project where we distribute essential food staples (maize flour, beans, cooking oil, sugar) to families identified by local community leaders as most at risk.',
    impact: 'We have distributed over 5 tons of food, providing immediate food security to hundreds of families during difficult economic periods.'
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
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 border-b border-[var(--color-border-subtle)]">
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
          <Image 
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)] to-[var(--color-bg-deep)]/80 z-0"></div>
        
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
