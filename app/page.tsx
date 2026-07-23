import Navbar from './components/Navbar'
import Footer from './components/Footer'
import InteractiveHero from './components/InteractiveHero'
import Marquee from './components/Marquee'
import SectionHeader from './components/SectionHeader'
import ProcessStep from './components/ProcessStep'
import TestimonialCard from './components/TestimonialCard'
import ImpactCounter from './components/ImpactCounter'
import HomeProjectRail from './components/HomeProjectRail'
import Button from './components/Button'

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-deep)]">
      <Navbar />
      
      {/* 1. Interactive Hero */}
      <InteractiveHero />
      
      {/* 2. Trust Marquee */}
      <Marquee items={[
        '5 CORE INITIATIVES',
        'TSH 12M+ RAISED',
        '500+ TREES PLANTED',
        '150+ STUDENT VOLUNTEERS'
      ]} />

      {/* 3. The Mission / Story (Asymmetric 2-column) */}
      <section className="py-[var(--spacing-section-y)] container mx-auto px-[var(--spacing-section-x)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-5">
            <SectionHeader 
              eyebrow="Our Story"
              title="Built by Students. Driven by Impact."
              align="left"
            />
            <p className="mt-6 text-[var(--font-size-body-large)] text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
              What started in 2022 as a small group of high school students has evolved into one of Dar es Salaam's most active youth-led service organizations. We saw a gap between wanting to help and actually doing the work—so we bridged it.
            </p>
            <p className="mt-4 text-[var(--font-size-body-large)] text-[var(--color-text-secondary)] leading-relaxed max-w-lg mb-8">
              From renovating cancer patient housing at Ujasiri House to coastal beach cleanups and tree planting, our mandate is simple: direct action, zero bureaucracy, total transparency.
            </p>
            <Button href="/about" variant="secondary">Read Our History</Button>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden relative glass-panel p-2">
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <img 
                  src="/projects/ujasiri-house/IMG_8290.jpg"
                  alt="Legions Team at Work"
                  className="w-full h-full object-cover filter contrast-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Animated Stats */}
      <section className="py-[var(--spacing-section-y)] bg-[var(--color-bg-deep)] relative overflow-hidden border-y border-[var(--color-border-subtle)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-cyan)]/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-[var(--spacing-section-x)] relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            <ImpactCounter end={12} prefix="TZS " suffix="M+" label="Funds Raised" />
            <ImpactCounter end={500} suffix="+" label="Trees Planted" />
            <ImpactCounter end={5} label="Major Initiatives" />
            <ImpactCounter end={150} suffix="+" label="Active Volunteers" />
          </div>
        </div>
      </section>

      {/* 5. Projects Rail */}
      <HomeProjectRail />

      {/* 6. How It Works (Process) */}
      <section className="py-[var(--spacing-section-y)] bg-[var(--color-surface)] border-y border-[var(--color-border-subtle)]">
        <div className="container mx-auto px-[var(--spacing-section-x)]">
          <SectionHeader 
            eyebrow="The Playbook"
            title="How We Operate."
            subtitle="We don't wait for permission to make a difference. Our model is built on speed, transparency, and community integration."
            className="mb-20"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-5xl mx-auto">
            <ProcessStep 
              number="01"
              title="Identify Needs"
              description="We consult with local leaders, schools, and hospitals to find areas where targeted action can create immediate relief or long-term growth."
            />
            <ProcessStep 
              number="02"
              title="Mobilize Resources"
              description="Using our network, we crowdfund, secure in-kind donations, and organize volunteer squads faster than traditional NGOs."
            />
            <ProcessStep 
              number="03"
              title="Execute"
              description="We show up. Whether it's planting trees, painting wards, or distributing rations, our volunteers do the physical work."
            />
            <ProcessStep 
              number="04"
              title="Report Back"
              description="Complete transparency. Every shilling raised and every hour worked is documented and shared with our donors and community."
            />
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-[var(--spacing-section-y)] container mx-auto px-[var(--spacing-section-x)]">
        <SectionHeader 
          eyebrow="Community Voices"
          title="The Impact We Leave."
          className="mb-16"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <TestimonialCard 
            quote="Legions stepped in when we needed them most. The dedication these students showed in renovating Ujasiri House was nothing short of inspiring."
            author="Staff Representative"
            role="Ujasiri House / Muhimbili"
            delay={0}
          />
          <TestimonialCard 
            quote="Seeing the youth take charge of our environment gives me hope. The tree planting initiative changed our school environment completely."
            author="School Headmaster"
            role="Dar es Salaam Partner School"
            delay={0.2}
          />
          <TestimonialCard 
            quote="I joined to get service hours, but I stayed because of the family. Legions taught me that my age doesn't limit my ability to help."
            author="Student Volunteer"
            role="Legions Member"
            delay={0.4}
          />
        </div>
      </section>

      {/* 8. Closing CTA */}
      <section className="py-[var(--spacing-section-y)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-cyan)]/10 to-transparent"></div>
        <div className="container mx-auto px-[var(--spacing-section-x)] relative z-10 text-center flex flex-col items-center">
          <h2 className="text-[var(--font-size-h1)] font-bold text-white mb-6 tracking-tight max-w-4xl text-balance">
            Ready to Do the Work?
          </h2>
          <p className="text-[var(--font-size-body-large)] text-[var(--color-text-secondary)] mb-12 max-w-2xl text-balance">
            Whether you want to volunteer on the frontlines or partner with us to fund the next major initiative, there is a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/volunteer" variant="primary">Become a Volunteer</Button>
            <Button href="/partner" variant="secondary">Partner With Us</Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
