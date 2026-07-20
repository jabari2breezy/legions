'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import dynamic from 'next/dynamic'
import CustomCursor from './components/CustomCursor'
import GrainOverlay from './components/GrainOverlay'
import ScrollProgress from './components/ScrollProgress'
import TextReveal from './components/TextReveal'
import ScrollReveal from './components/ScrollReveal'
import MagneticButton from './components/MagneticButton'
import ParallaxImage from './components/ParallaxImage'
import CountUp from './components/CountUp'
import Preloader from './components/Preloader'
import Hero from './components/Hero'

const programs = [
  {
    title: 'Environmental Action',
    desc: 'Tree planting campaigns, botanical gardens in schools, beach cleanups, and waste management initiatives across Dar es Salaam.',
    image: '/images/programs-environmental.jpg',
    icon: '01',
  },
  {
    title: 'Healthcare Support',
    desc: 'Renovating Ujasiri House (childhood cancer ward) at Muhimbili National Hospital, providing medical supplies and patient comfort.',
    image: '/images/programs-healthcare.jpg',
    icon: '02',
  },
  {
    title: 'Community Welfare',
    desc: 'Annual Ramadan Iftar for 550+ orphans, food security programs, hygiene kit distribution, and well construction in Pwani Region.',
    image: '/images/programs-welfare.jpg',
    icon: '03',
  },
  {
    title: 'Youth Leadership',
    desc: 'Empowering 139 student volunteers through hands-on project management, community organizing, and sustainable impact training.',
    image: '/images/programs-youth.jpg',
    icon: '04',
  },
]

const projects = [
  { title: 'Ujasiri House Renovation', category: 'Healthcare', year: '2024', impact: 'Childhood cancer ward', image: '/images/impact-ujasiri-house.jpg' },
  { title: 'School Botanical Gardens', category: 'Environment', year: '2024', impact: '2 public schools', image: '/images/impact-botanical-garden.jpg' },
  { title: 'Pwani Region Water Well', category: 'Infrastructure', year: '2023', impact: 'Clean water access', image: '/images/impact-water-well.jpg' },
  { title: 'Annual Ramadan Iftar', category: 'Welfare', year: '2024', impact: '550+ orphans served', image: '/images/impact-ramadan-iftar.jpg' },
  { title: 'Beach Cleanup Series', category: 'Environment', year: '2024', impact: 'Monthly coastal action', image: '/images/impact-beach-cleanup.jpg' },
  { title: 'Hygiene Kit Distribution', category: 'Welfare', year: '2024', impact: 'Orphan support program', image: '/images/impact-hygiene-kits.jpg' },
]

const stats = [
  { value: 139, suffix: '', label: 'Student Volunteers', prefix: '' },
  { value: 2600, suffix: '+', label: 'Service Hours', prefix: '' },
  { value: 550, suffix: '+', label: 'Orphans Supported', prefix: '' },
  { value: 3, suffix: 'rd', label: 'Annual Ramadan Iftar', prefix: '' },
]

const testimonials = [
  { quote: 'Legions taught me that age does not limit impact. As a student, I helped renovate a cancer ward - that changes how you see your own potential.', name: 'Aisha M.', role: 'Volunteer, Medical Student' },
  { quote: 'Seeing 139 young people show up every month for beach cleanups, tree planting, hospital visits - that is the future of Tanzania right there.', name: 'Dr. Kamau', role: 'Muhimbili Hospital Partner' },
  { quote: 'The Ramadan Iftar is not just a meal. It is 550 children feeling seen, celebrated, and cared for by their own community. That is Legions.', name: 'Fatuma K.', role: 'Orphanage Director' },
]

const ecos = [
  { number: '01', name: 'Action Teams', desc: 'Student-led project squads for environment, healthcare, welfare, and advocacy. Join a team, lead a project, measure impact.' },
  { number: '02', name: 'School Chapters', desc: 'Legions clubs in high schools and universities across Dar es Salaam. Peer recruitment, local action, shared mission.' },
  { number: '03', name: 'Partner Network', desc: 'Hospitals, orphanages, municipal councils, environmental NGOs. Collaboration that multiplies student volunteer impact.' },
  { number: '04', name: 'Impact Tracking', desc: 'Transparent reporting on hours served, trees planted, wells built, lives touched. Accountability built into every project.' },
]

function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])

  return (
    <div ref={containerRef} className="overflow-hidden py-12 border-y border-border-subtle">
      <motion.div className="flex gap-16 whitespace-nowrap" style={{ x }}>
        {['Action', 'Impact', 'Youth', 'Community', 'Service', 'Change', 'Action', 'Impact', 'Youth', 'Community', 'Service', 'Change'].map((word, i) => (
          <span key={i} className="text-[clamp(3rem,8vw,6rem)] font-serif italic text-white/5 select-none">
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function ParallaxSection({ children, className = '', speed = 0.1 }: { children: React.ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [50 * speed * 10, -50 * speed * 10])

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}

function GlowOrb({ className }: { className?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />

      {loaded && (
        <>
          <CustomCursor />
          <GrainOverlay />
          <ScrollProgress />
          <Hero />
        </>
      )}

      <main>
        {/* HORIZONTAL SCROLL */}
        <HorizontalScroll />

        {/* ABOUT */}
        <section id="about" className="relative py-32 md:py-48 overflow-hidden">
          <GlowOrb className="w-[400px] h-[400px] bg-teal/10 top-20 -right-60" />

          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div>
                <ScrollReveal>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="line-accent" />
                    <span className="text-xs tracking-[0.5em] uppercase text-teal/70 font-mono">Who We Are</span>
                  </div>
                </ScrollReveal>

                <TextReveal
                  className="text-[clamp(2.2rem,5vw,4.5rem)] font-serif font-light leading-[1.1] mb-8"
                  delay={0.2}
                >
                  Youth-led action. Real community change.
                </TextReveal>

                <ScrollReveal delay={0.4}>
                  <p className="text-text-secondary text-lg leading-relaxed max-w-xl mb-6">
                    Legions Club is a non-profit, student-led organisation based in Dar es Salaam, Tanzania.
                    We mobilise high school and university students to lead humanitarian and environmental
                    initiatives across the city - from tree planting and beach cleanups to hospital renovations
                    and orphan support.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.5}>
                  <p className="text-text-muted leading-relaxed max-w-xl">
                    Founded on the belief that young people are not just future leaders - they are
                    current changemakers. Every project is student-designed, student-led, and
                    student-executed. No paid staff. 100% volunteer-powered.
                  </p>
                </ScrollReveal>
              </div>

              <div className="relative mt-8 lg:mt-16">
                <ScrollReveal clipPath delay={0.3}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <ParallaxImage
                      src="/images/about-tree-planting.jpg"
                      alt="Students planting trees in Tanzania"
                      className="w-full h-full"
                      speed={0.2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/60 via-transparent to-transparent" />
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.6} className="absolute -bottom-8 -left-8 glass p-8 max-w-[280px]">
                  <p className="text-4xl font-serif text-teal mb-1">
                    <CountUp to={2022} />
                  </p>
                  <p className="text-sm text-text-secondary tracking-widest uppercase">Founded</p>
                </ScrollReveal>
              </div>
            </div>

            {/* About gallery - second row of images */}
            <ScrollReveal delay={0.7} className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src="/images/about-beach-cleanup.jpg"
                  alt="Beach cleanup volunteers"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white text-sm font-medium">Beach Cleanup Action</div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src="/images/about-team-photo.png"
                  alt="Legions team photo"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white text-sm font-medium">Our Volunteer Team</div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* PROGRAMS */}
        <section id="programs" className="relative py-32 md:py-48">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="line-accent" />
                <span className="text-xs tracking-[0.5em] uppercase text-teal/70 font-mono">Our Work</span>
              </div>
            </ScrollReveal>

            <TextReveal
              className="text-[clamp(2.2rem,5vw,4.5rem)] font-serif font-light leading-[1.1] max-w-4xl mb-20"
              delay={0.1}
            >
              Four pillars. One mission: sustainable community impact.
            </TextReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programs.map((prog, i) => (
                <ScrollReveal key={prog.icon} delay={i * 0.1}>
                  <motion.div
                    className="group relative glass glass-hover shimmer-border p-10 md:p-12 h-full"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <span className="text-6xl md:text-7xl font-serif text-white/[0.03] absolute top-6 right-8 select-none">
                      {prog.icon}
                    </span>

                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-serif mb-4 group-hover:text-teal transition-colors duration-500">
                        {prog.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed mb-8">
                        {prog.desc}
                      </p>
                      <div className="flex items-center gap-3 text-teal text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span>Learn More</span>
                        <motion.span
                          className="inline-block"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>

                    {/* Program background image */}
                    <div className="absolute inset-0 opacity-5">
                      <img
                        src={prog.image}
                        alt={prog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    />
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* IMPACT HIGHLIGHTS */}
        <section id="impact" className="relative py-32 md:py-48 overflow-hidden">
          <GlowOrb className="w-[500px] h-[500px] bg-emerald/8 top-1/4 -left-60" />

          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
              <div>
                <ScrollReveal>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="line-accent" />
                    <span className="text-xs tracking-[0.5em] uppercase text-teal/70 font-mono">Projects</span>
                  </div>
                </ScrollReveal>
                <TextReveal
                  className="text-[clamp(2.2rem,5vw,4.5rem)] font-serif font-light leading-[1.1]"
                  delay={0.1}
                >
                  On the ground. In the community. Measurable results.
                </TextReveal>
              </div>
              <ScrollReveal delay={0.3}>
                <a href="#contact" className="mt-6 md:mt-0 text-sm tracking-widest uppercase text-teal/60 hover:text-teal transition-colors border-b border-teal/20 pb-1">
                  View All Projects →
                </a>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {projects.map((proj, i) => (
                <ScrollReveal key={proj.title} delay={i * 0.08}>
                  <motion.div
                    className="group relative aspect-[4/5] overflow-hidden bg-bg-card"
                    whileHover={{ scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-teal/10 via-emerald/10 to-cyan/10 opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-bg-deep/20 to-transparent" />

                    <motion.div
                      className="absolute inset-0 bg-teal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <p className="text-xs tracking-widest uppercase text-teal/50 mb-2">{proj.category}</p>
                      <h3 className="text-xl md:text-2xl font-serif mb-1 group-hover:text-teal transition-colors duration-300">{proj.title}</h3>
                      <p className="text-xs text-text-muted mb-2">{proj.year}</p>
                      <p className="text-sm text-teal/70 font-medium">{proj.impact}</p>
                    </div>

                    <div className="absolute top-6 right-6 w-8 h-8 border border-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs">→</span>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="relative py-32 md:py-40 border-y border-border-subtle">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
              {stats.map((stat, i) => (
                <ScrollReveal key={stat.label} delay={i * 0.1}>
                  <div className="text-center md:text-left">
                    <p className="text-[clamp(2.5rem,5vw,4.5rem)] font-serif text-gradient-teal mb-3">
                      <CountUp
                        to={stat.value}
                        prefix={stat.prefix || ''}
                        suffix={stat.suffix || ''}
                        duration={2.5}
                      />
                    </p>
                    <p className="text-sm tracking-widest uppercase text-text-muted">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="relative py-32 md:py-48 overflow-hidden">
          <GlowOrb className="w-[400px] h-[400px] bg-teal/8 top-1/3 right-[-200px]" />

          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="line-accent" />
                <span className="text-xs tracking-[0.5em] uppercase text-teal/70 font-mono">Voices</span>
              </div>
            </ScrollReveal>

            <TextReveal
              className="text-[clamp(2.2rem,5vw,4.5rem)] font-serif font-light leading-[1.1] max-w-3xl mb-20"
              delay={0.1}
            >
              Words from our community.
            </TextReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <ScrollReveal key={t.name} delay={i * 0.15}>
                  <motion.blockquote
                    className="glass p-8 md:p-10 h-full flex flex-col shimmer-border"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-teal text-4xl font-serif mb-4">"</div>
                    <p className="text-text-secondary leading-relaxed flex-1 italic font-serif text-lg mb-8">
                      {t.quote}
                    </p>
                    <footer>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-text-muted tracking-widest uppercase mt-1">{t.role}</p>
                    </footer>
                  </motion.blockquote>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="relative py-32 md:py-48">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="line-accent" />
                <span className="text-xs tracking-[0.5em] uppercase text-teal/70 font-mono">Model</span>
              </div>
            </ScrollReveal>

            <TextReveal
              className="text-[clamp(2.2rem,5vw,4.5rem)] font-serif font-light leading-[1.1] max-w-4xl mb-20"
              delay={0.1}
            >
              Student-led. Community-rooted. Impact-measured.
            </TextReveal>

            <div className="space-y-0">
              {ecos.map((eco, i) => (
                <ScrollReveal key={eco.number} delay={i * 0.1}>
                  <motion.div
                    className="group flex items-start gap-8 md:gap-16 py-10 border-b border-border-subtle"
                    whileHover={{ x: 20 }}
                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <span className="text-5xl md:text-7xl font-serif text-white/[0.04] group-hover:text-teal/20 transition-colors duration-500 select-none shrink-0 w-24">
                      {eco.number}
                    </span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-serif mb-3 group-hover:text-teal transition-colors duration-300">
                        {eco.name}
                      </h3>
                      <p className="text-text-secondary leading-relaxed max-w-2xl">
                        {eco.desc}
                      </p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="relative py-40 md:py-56 overflow-hidden">
          <GlowOrb className="w-[600px] h-[600px] bg-teal/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="max-w-[900px] mx-auto px-6 text-center relative z-10">
            <ScrollReveal>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="line-accent" />
                <span className="text-xs tracking-[0.5em] uppercase text-teal/70 font-mono">Join Us</span>
                <div className="line-accent" style={{ background: 'linear-gradient(270deg, var(--color-teal), transparent)' }} />
              </div>
            </ScrollReveal>

            <TextReveal
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-serif font-light leading-[1.05] mb-8"
              delay={0.1}
            >
              Ready to serve?
            </TextReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-text-secondary text-lg mb-12 max-w-xl mx-auto">
                Whether you are a student wanting to volunteer, a school looking to start a chapter,
                or an organisation seeking youth partners - there is a place for you in Legions.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <MagneticButton strength={0.25}>
                  <button className="group relative px-12 py-5 bg-teal text-bg-deep text-sm tracking-[0.3em] uppercase font-medium overflow-hidden">
                    <span className="relative z-10">Become a Volunteer</span>
                    <motion.div
                      className="absolute inset-0 bg-emerald-300"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </button>
                </MagneticButton>
                <MagneticButton strength={0.25}>
                  <button className="px-12 py-5 border border-white/15 text-white/60 text-sm tracking-[0.3em] uppercase hover:border-teal/40 hover:text-white transition-all duration-500">
                    Partner With Us
                  </button>
                </MagneticButton>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-text-muted">
                <a href="mailto:legionsclubtz@gmail.com" className="flex items-center gap-2 hover:text-teal transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  legionsclubtz@gmail.com
                </a>
                <a href="https://instagram.com/legionsclubtz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-teal transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  @legionsclubtz
                </a>
                <a href="https://wa.me/255700000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-teal transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  WhatsApp Group
                </a>
              </div>
            </ScrollReveal>

            {/* CTA volunteer photo */}
            <ScrollReveal delay={0.7} className="mt-16">
              <div className="relative aspect-[16/9] max-w-3xl mx-auto overflow-hidden rounded-lg">
                <img
                  src="/images/cta-volunteers.png"
                  alt="Volunteers in action"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-border-subtle py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-1">
                <p className="font-serif text-2xl tracking-[0.1em] mb-4">
                  <span className="text-teal">Legions</span>
                  <span className="text-white/30 ml-1">Club</span>
                </p>
                <p className="text-sm text-text-muted leading-relaxed">
                  Youth-led humanitarian and environmental action in Dar es Salaam.<br />
                  Student volunteers. Real impact. Since 2022.
                </p>
              </div>

              {[
                { title: 'Programs', links: ['Environmental Action', 'Healthcare Support', 'Community Welfare', 'Youth Leadership'] },
                { title: 'Get Involved', links: ['Volunteer', 'Start a Chapter', 'Partner With Us', 'Donate'] },
                { title: 'Connect', links: ['Instagram', 'Email', 'WhatsApp', 'LinkedIn'] },
              ].map((col) => (
                <div key={col.title}>
                  <p className="text-xs tracking-[0.4em] uppercase text-text-muted mb-6">{col.title}</p>
                  <ul className="space-y-3">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-sm text-text-secondary hover:text-teal transition-colors duration-300">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-border-subtle pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-text-muted">
                © 2025 Legions Club Tanzania. Registered Non-Profit. All rights reserved.
              </p>
              <p className="text-xs text-text-muted tracking-widest">
                Powered by youth volunteers in Dar es Salaam
              </p>
            </div>

            {/* Footer community photo */}
            <ScrollReveal delay={0.2} className="mt-12">
              <div className="relative aspect-[21/9] max-w-5xl mx-auto overflow-hidden rounded-lg opacity-50">
                <img
                  src="/images/footer-community.png"
                  alt="Community gathering"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </footer>
      </main>
    </>
  )
}