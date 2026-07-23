import Nav from './components/Nav'
import Footer from './components/Footer'
import { Section } from './components/Section'
import InteractiveHero from './components/InteractiveHero'
import StatMarquee from './components/StatMarquee'
import EditorialStatement from './components/EditorialStatement'
import ProjectCardQuiet from './components/ProjectCardQuiet'
import CTASectionAccent from './components/CTASectionAccent'
import projectsIndex from '../data/projects-index.json'
import type { ProjectSummary } from '../types/project'

const projects = (projectsIndex as ProjectSummary[]).slice(0, 3)

export default function Home() {
  return (
    <main>
      <Nav />

      {/* 1. Hero — dark, untouched */}
      <Section variant="dark">
        <InteractiveHero />
      </Section>

      {/* 2. Stats — light */}
      <Section variant="light">
        <StatMarquee />
      </Section>

      {/* 3. Mission — dark */}
      <Section variant="dark">
        <EditorialStatement>
          What started in 2022 as a small group of high school students has evolved into one of Dar es Salaam's most active youth-led service organizations. We saw a gap between wanting to help and actually doing the work — so we bridged it.
        </EditorialStatement>
      </Section>

      {/* 4. Projects — light */}
      <Section variant="light">
        <section className="container-narrow" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' }}>
          <div style={{ marginBottom: 'clamp(32px, 4vw, 64px)' }}>
            <span style={{ font: 'var(--text-label)', textTransform: 'uppercase' as const, letterSpacing: 'var(--letter-spacing-label)', color: 'var(--color-cyan)', display: 'block', marginBottom: '12px' }}>Our Work</span>
            <h2 style={{ font: 'var(--text-h2)', letterSpacing: 'var(--letter-spacing-display)' }}>Selected Initiatives</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-gap)' }}>
            {projects.map((p, i) => (
              <ProjectCardQuiet
                key={p.slug}
                slug={p.slug}
                title={p.title}
                category={p.category}
                imageSrc={`/projects/${p.heroImage.filename}`}
                index={i}
              />
            ))}
          </div>
        </section>
      </Section>

      {/* 5. Process — light */}
      <Section variant="light">
        <section className="container-narrow" style={{ paddingBottom: 'var(--space-section)' }}>
          <span style={{ font: 'var(--text-label)', textTransform: 'uppercase' as const, letterSpacing: 'var(--letter-spacing-label)', color: 'var(--color-cyan)', display: 'block', marginBottom: '12px' }}>The Playbook</span>
          <h2 style={{ font: 'var(--text-h2)', letterSpacing: 'var(--letter-spacing-display)', marginBottom: 'var(--space-block)' }}>How We Operate</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-block)' }}>
            {[
              { n: '01', title: 'Identify Needs', desc: 'We consult with local leaders, schools, and hospitals to find areas where targeted action can create immediate relief or long-term growth.' },
              { n: '02', title: 'Mobilize Resources', desc: 'Using our network, we crowdfund, secure in-kind donations, and organize volunteer squads faster than traditional NGOs.' },
              { n: '03', title: 'Execute', desc: "We show up. Whether it's planting trees, painting wards, or distributing rations, our volunteers do the physical work." },
              { n: '04', title: 'Report Back', desc: 'Complete transparency. Every shilling raised and every hour worked is documented and shared with our donors and community.' },
            ].map((step) => (
              <div key={step.n}>
                <span style={{ font: 'var(--text-hero)', letterSpacing: 'var(--letter-spacing-display)', color: 'var(--color-cyan)', lineHeight: 1 }}>{step.n}</span>
                <h3 style={{ font: 'var(--text-h3)', marginTop: '8px', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary-light)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Section>

      {/* 6. Testimonials — dark */}
      <Section variant="dark">
        <section className="container-narrow" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' }}>
          <span style={{ font: 'var(--text-label)', textTransform: 'uppercase' as const, letterSpacing: 'var(--letter-spacing-label)', color: 'var(--color-cyan)', display: 'block', marginBottom: '12px' }}>Community Voices</span>
          <h2 style={{ font: 'var(--text-h2)', letterSpacing: 'var(--letter-spacing-display)', marginBottom: 'var(--space-block)' }}>The Impact We Leave</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-gap)' }}>
            {[
              { quote: 'Legions stepped in when we needed them most. The dedication these students showed in renovating Ujasiri House was nothing short of inspiring.', author: 'Staff Representative', role: 'Ujasiri House / Muhimbili' },
              { quote: "Seeing the youth take charge of our environment gives me hope. The tree planting initiative changed our school environment completely.", author: 'School Headmaster', role: 'Dar es Salaam Partner School' },
              { quote: "I joined to get service hours, but I stayed because of the family. Legions taught me that my age doesn't limit my ability to help.", author: 'Student Volunteer', role: 'Legions Member' },
            ].map((t) => (
              <div key={t.author} style={{ borderTop: '2px solid var(--color-cyan)', paddingTop: '24px' }}>
                <span style={{ font: '4rem/1 serif', color: 'var(--color-cyan)', opacity: 0.4, display: 'block', marginBottom: '-12px' }}>&ldquo;</span>
                <p style={{ font: 'var(--text-body-lg)', marginBottom: '16px' }}>{t.quote}</p>
                <div>
                  <span style={{ font: 'var(--text-label)', textTransform: 'uppercase' as const, letterSpacing: 'var(--letter-spacing-label)', color: 'var(--color-white)' }}>{t.author}</span>
                  <span style={{ font: 'var(--text-label)', color: 'var(--color-text-secondary-dark)', display: 'block', marginTop: '2px' }}>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Section>

      {/* 7. CTA — hero background */}
      <CTASectionAccent />

      <Footer />
    </main>
  )
}
