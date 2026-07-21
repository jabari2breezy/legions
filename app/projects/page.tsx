import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  const projects = [
    {
      slug: 'tree-planting',
      title: 'MYK Tree Planting',
      category: 'Environment',
      impact: '25,000+ Trees'
    },
    {
      slug: 'ujasiri-house',
      title: 'Ujasiri House',
      category: 'Health',
      impact: 'TZS 2M Raised'
    },
    {
      slug: 'pwani-well',
      title: 'Pwani Well',
      category: 'Infrastructure',
      impact: 'Clean Water'
    },
    {
      slug: 'ramadan-iftar',
      title: 'Ramadan Iftar',
      category: 'Community',
      impact: '500+ Meals'
    },
    {
      slug: 'ration-packages',
      title: 'Ration Packages',
      category: 'Relief',
      impact: 'Monthly Support'
    }
  ]

  return (
    <main className="min-h-screen bg-[var(--color-bg-deep)]">
      <Navbar />
      
      <section className="pt-40 pb-20 relative">
        <div className="container mx-auto px-[var(--spacing-section-x)] relative z-10">
          <SectionHeader 
            title="Our Projects."
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
                imageSrc="/hero-attached.jpg"
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
