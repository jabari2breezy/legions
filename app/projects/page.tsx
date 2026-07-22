import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  const projects = [
    {
      slug: 'amsen-visits',
      title: 'AMSEN Visits',
      category: 'Community & Special Needs',
      impact: '40+ Students Engaged',
      imageSrc: '/projects/amsen-visits/IMG_8275.jpg'
    },
    {
      slug: 'beach-cleanups',
      title: 'Beach Cleanups',
      category: 'Environment',
      impact: '1.5+ Tons Collected',
      imageSrc: '/projects/beach-cleanups/IMG_8270.jpg'
    },
    {
      slug: 'ramadhan-project',
      title: 'Ramadhan Project',
      category: 'Community & Food Relief',
      impact: '1,200+ Individuals Reached',
      imageSrc: '/projects/ramadhan-project/IMG_8248.jpg'
    },
    {
      slug: 'tree-planting',
      title: 'Tree Planting — Project MYK',
      category: 'Environment',
      impact: '500+ Trees Planted',
      imageSrc: '/projects/tree-planting/IMG_8271.jpg'
    },
    {
      slug: 'ujasiri-house',
      title: 'Ujasiri House Renovation',
      category: 'Health & Infrastructure',
      impact: '30+ Families Hosted Daily',
      imageSrc: '/projects/ujasiri-house/IMG_8290.jpg'
    }
  ]

  return (
    <main className="min-h-screen bg-[var(--color-bg-deep)]">
      <Navbar />
      
      <section className="pt-40 pb-20 relative">
        <div className="container mx-auto px-[var(--spacing-section-x)] relative z-10">
          <SectionHeader 
            eyebrow="Our Work"
            title="Projects That Matter."
            subtitle="Explore the initiatives where Legions has directed funding, sweat, and community power."
            className="mb-16"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <ProjectCard 
                key={project.slug}
                slug={project.slug}
                title={project.title}
                category={project.category}
                impact={project.impact}
                imageSrc={project.imageSrc}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
