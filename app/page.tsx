'use client'
import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react'
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

const HeroCanvas = dynamic(() => import('./components/HeroCanvas'), { ssr: false })

const programs = [
  {
    title: 'The Founders Table',
    desc: 'Intimate dinners with 12 founders reshaping industries. No pitch decks — just raw conversation and lasting connections.',
    image: '/images/founders.jpg',
    icon: '01',
  },
  {
    title: 'The Vault',
    desc: 'Private deal flow sessions connecting verified investors with curated opportunities before they hit the market.',
    image: '/images/vault.jpg',
    icon: '02',
  },
  {
    title: 'The Expedition',
    desc: 'Quarterly retreats to extraordinary destinations. Where billion-dollar ideas are born over shared experiences.',
    image: '/images/expedition.jpg',
    icon: '03',
  },
  {
    title: 'The Summit',
    desc: 'Annual gathering of 200 industry titans. Keynotes, workshops, and connections that redefine what\'s possible.',
    image: '/images/summit.jpg',
    icon: '04',
  },
]

const projects = [
  { title: 'Vertex Capital', category: 'Venture Capital', year: '2025' },
  { title: 'Meridian Labs', category: 'Biotech', year: '2025' },
  { title: 'Atlas Infrastructure', category: 'Climate Tech', year: '2024' },
  { title: 'Nova Holdings', category: 'Family Office', year: '2024' },
  { title: 'Cipher Protocol', category: 'Web3', year: '2025' },
  { title: 'Zenith Ventures', category: 'Growth Equity', year: '2024' },
]

const stats = [
  { value: 850, suffix: '+', label: 'Members Worldwide' },
  { value: 12, prefix: '$', suffix: 'B+', label: 'Deals Facilitated' },
  { value: 45, suffix: '+', label: 'Countries Represented' },
  { value: 96, suffix: '%', label: 'Retention Rate' },
]

const testimonials = [
  { quote: 'Legions Club didn\'t just expand my network — it transformed how I think about building.', name: 'Sarah Chen', role: 'CEO, Vertex Capital' },
  { quote: 'The caliber of minds in this room is unlike anything else. Every event changes trajectory.', name: 'Marcus Webb', role: 'Founder, Atlas Infrastructure' },
  { quote: 'Three of my most significant partnerships came from a single Legions dinner.', name: 'Elena Volkov', role: 'Managing Partner, Nova Holdings' },
]

const ecos = [
  { number: '01', name: 'Legions Hub', desc: 'Your digital command center. Connect with members, access exclusive content, and manage your journey.' },
  { number: '02', name: 'Legions Globe', desc: 'Interactive member directory spanning 45+ countries. Find collaborators, advisors, and partners worldwide.' },
  { number: '03', name: 'Legions Vault', desc: 'Deal pipeline and investment memos. Access vetted opportunities shared exclusively within the community.' },
  { number: '04', name: 'Legions Legacy', desc: 'Alumni network and mentorship matching. Connect with industry veterans shaping the next generation.' },
]

function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])

  return (
    <div ref={containerRef} className="overflow-hidden py-12 border-y border-border-subtle">
      <motion.div className="flex gap-16 whitespace-nowrap" style={{ x }}>
        {['Exclusivity', 'Innovation', 'Legacy', 'Community', 'Vision', 'Impact', 'Exclusivity', 'Innovation', 'Legacy', 'Community', 'Vision', 'Impact'].map((word, i) => (
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

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'py-4 glass' : 'py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 2, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="font-serif text-xl tracking-[0.15em] uppercase">
          <span className="text-cyan">Legions</span>
          <span className="text-white/40 ml-1">Club</span>
        </a>
        <div className="hidden md:flex items-center gap-10">
          {['About', 'Programs', 'Members', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm tracking-widest uppercase text-text-secondary hover:text-cyan transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <MagneticButton strength={0.2}>
            <button className="px-6 py-2.5 border border-cyan/30 text-cyan text-sm tracking-widest uppercase hover:bg-cyan hover:text-bg-deep transition-all duration-300 rounded-none">
              Apply
            </button>
          </MagneticButton>
        </div>
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.span
            className="w-6 h-[1px] bg-white block"
            animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="w-6 h-[1px] bg-white block"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="w-6 h-[1px] bg-white block"
            animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          />
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-[60px] bg-bg-deep/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 z-[99]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {['About', 'Programs', 'Members', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-3xl font-serif tracking-widest uppercase text-white hover:text-cyan transition-colors"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />

      {loaded && (
        <>
          <CustomCursor />
          <GrainOverlay />
          <ScrollProgress />
          <Navbar />

          <main>
            {/* ═══════════════ HERO ═══════════════ */}
            <section ref={heroRef} className="relative h-[200vh]" id="hero">
              <motion.div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}>
                <HeroCanvas />

                <GlowOrb className="w-[600px] h-[600px] bg-cyan/10 -top-40 -right-40" />
                <GlowOrb className="w-[500px] h-[500px] bg-indigo/10 -bottom-40 -left-40" />

                <div className="relative z-10 text-center max-w-[1200px] mx-auto px-6">
                  <motion.div
                    className="overflow-hidden mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2, duration: 1 }}
                  >
                    <motion.p
                      className="text-sm md:text-base tracking-[0.5em] uppercase text-cyan/70 font-mono"
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      transition={{ delay: 2.2, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    >
                      Invitation Only
                    </motion.p>
                  </motion.div>

                  <div className="overflow-hidden mb-2">
                    <motion.h1
                      className="text-[clamp(3.5rem,12vw,11rem)] font-serif font-light leading-[0.85] tracking-tight"
                      initial={{ y: '120%' }}
                      animate={{ y: '0%' }}
                      transition={{ delay: 2.4, duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                    >
                      <span className="text-gradient-warm">Where</span>
                    </motion.h1>
                  </div>
                  <div className="overflow-hidden mb-2">
                    <motion.h1
                      className="text-[clamp(3.5rem,12vw,11rem)] font-serif font-light leading-[0.85] tracking-tight"
                      initial={{ y: '120%' }}
                      animate={{ y: '0%' }}
                      transition={{ delay: 2.55, duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                    >
                      <span className="text-gradient-cyan">Legends</span>{' '}
                      <span className="text-gradient-warm italic">Rise</span>
                    </motion.h1>
                  </div>

                  <motion.div
                    className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-6"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3, duration: 0.8 }}
                  >
                    <MagneticButton>
                      <button className="group relative px-10 py-4 bg-cyan text-bg-deep text-sm tracking-[0.3em] uppercase font-medium overflow-hidden">
                        <span className="relative z-10">Request Membership</span>
                        <motion.div className="absolute inset-0 bg-neon-ice" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
                      </button>
                    </MagneticButton>
                    <MagneticButton>
                      <button className="px-10 py-4 border border-white/15 text-white/70 text-sm tracking-[0.3em] uppercase hover:border-cyan/40 hover:text-cyan transition-all duration-500">
                        Our Story
                      </button>
                    </MagneticButton>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.5, duration: 1 }}
                  >
                    <span className="text-[10px] tracking-[0.5em] uppercase text-white/30">Scroll</span>
                    <motion.div
                      className="w-[1px] h-10 bg-gradient-to-b from-cyan/50 to-transparent"
                      animate={{ scaleY: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </section>

            {/* ═══════════════ HORIZONTAL SCROLL ═══════════════ */}
            <HorizontalScroll />

            {/* ═══════════════ ABOUT ═══════════════ */}
            <section id="about" className="relative py-32 md:py-48 overflow-hidden">
              <GlowOrb className="w-[400px] h-[400px] bg-ocean/10 top-20 -right-60" />

              <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                  <div>
                    <ScrollReveal>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="line-accent" />
                        <span className="text-xs tracking-[0.5em] uppercase text-cyan/70 font-mono">About Us</span>
                      </div>
                    </ScrollReveal>

                    <TextReveal
                      className="text-[clamp(2.2rem,5vw,4.5rem)] font-serif font-light leading-[1.1] mb-8"
                      delay={0.2}
                    >
                      Not just a network — a movement.
                    </TextReveal>

                    <ScrollReveal delay={0.4}>
                      <p className="text-text-secondary text-lg leading-relaxed max-w-xl mb-6">
                        Founded in 2019, Legions Club emerged from a simple observation: the most transformative
                        conversations happen outside boardrooms. We curate intimate experiences where genuine
                        connection drives extraordinary outcomes.
                      </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.5}>
                      <p className="text-text-muted leading-relaxed max-w-xl">
                        Every member is hand-selected. Every event is meticulously designed. Every connection
                        is intentional. We don&apos;t facilitate networking — we architect relationships that
                        reshape industries.
                      </p>
                    </ScrollReveal>
                  </div>

                  <div className="relative mt-8 lg:mt-16">
                    <ScrollReveal clipPath delay={0.3}>
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <ParallaxImage
                          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                          alt="Luxury meeting space"
                          className="w-full h-full"
                          speed={0.2}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/60 via-transparent to-transparent" />
                      </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.6} className="absolute -bottom-8 -left-8 glass p-8 max-w-[280px]">
                      <p className="text-4xl font-serif text-cyan mb-1">
                        <CountUp to={2019} />
                      </p>
                      <p className="text-sm text-text-secondary tracking-widest uppercase">Year Founded</p>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══════════════ PROGRAMS ═══════════════ */}
            <section id="programs" className="relative py-32 md:py-48">
              <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <ScrollReveal>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="line-accent" />
                    <span className="text-xs tracking-[0.5em] uppercase text-cyan/70 font-mono">Programs</span>
                  </div>
                </ScrollReveal>

                <TextReveal
                  className="text-[clamp(2.2rem,5vw,4.5rem)] font-serif font-light leading-[1.1] max-w-4xl mb-20"
                  delay={0.1}
                >
                  Experiences designed to redefine what&apos;s possible.
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
                          <h3 className="text-2xl md:text-3xl font-serif mb-4 group-hover:text-cyan transition-colors duration-500">
                            {prog.title}
                          </h3>
                          <p className="text-text-secondary leading-relaxed mb-8">
                            {prog.desc}
                          </p>
                          <div className="flex items-center gap-3 text-cyan text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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

                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        />
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            {/* ═══════════════ GLIMPSE ═══════════════ */}
            <section id="members" className="relative py-32 md:py-48 overflow-hidden">
              <GlowOrb className="w-[500px] h-[500px] bg-indigo/8 top-1/4 -left-60" />

              <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20">
                  <div>
                    <ScrollReveal>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="line-accent" />
                        <span className="text-xs tracking-[0.5em] uppercase text-cyan/70 font-mono">Glimpse</span>
                      </div>
                    </ScrollReveal>
                    <TextReveal
                      className="text-[clamp(2.2rem,5vw,4.5rem)] font-serif font-light leading-[1.1]"
                      delay={0.1}
                    >
                      The people shaping tomorrow.
                    </TextReveal>
                  </div>
                  <ScrollReveal delay={0.3}>
                    <a href="#" className="mt-6 md:mt-0 text-sm tracking-widest uppercase text-cyan/60 hover:text-cyan transition-colors border-b border-cyan/20 pb-1">
                      View All Members →
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
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-indigo/10 to-ocean/10 opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-bg-deep/20 to-transparent" />

                        <motion.div
                          className="absolute inset-0 bg-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />

                        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                          <p className="text-xs tracking-widest uppercase text-cyan/50 mb-2">{proj.category}</p>
                          <h3 className="text-xl md:text-2xl font-serif mb-1 group-hover:text-cyan transition-colors duration-300">{proj.title}</h3>
                          <p className="text-xs text-text-muted">{proj.year}</p>
                        </div>

                        <div className="absolute top-6 right-6 w-8 h-8 border border-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs">↗</span>
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            {/* ═══════════════ STATS ═══════════════ */}
            <section className="relative py-32 md:py-40 border-y border-border-subtle">
              <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
                  {stats.map((stat, i) => (
                    <ScrollReveal key={stat.label} delay={i * 0.1}>
                      <div className="text-center md:text-left">
                        <p className="text-[clamp(2.5rem,5vw,4.5rem)] font-serif text-gradient-cyan mb-3">
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

            {/* ═══════════════ TESTIMONIALS ═══════════════ */}
            <section className="relative py-32 md:py-48 overflow-hidden">
              <GlowOrb className="w-[400px] h-[400px] bg-cyan/8 top-1/3 right-[-200px]" />

              <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <ScrollReveal>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="line-accent" />
                    <span className="text-xs tracking-[0.5em] uppercase text-cyan/70 font-mono">Testimonials</span>
                  </div>
                </ScrollReveal>

                <TextReveal
                  className="text-[clamp(2.2rem,5vw,4.5rem)] font-serif font-light leading-[1.1] max-w-3xl mb-20"
                  delay={0.1}
                >
                  Words from our members.
                </TextReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((t, i) => (
                    <ScrollReveal key={t.name} delay={i * 0.15}>
                      <motion.blockquote
                        className="glass p-8 md:p-10 h-full flex flex-col shimmer-border"
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="text-cyan text-4xl font-serif mb-4">&ldquo;</div>
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

            {/* ═══════════════ ECOSYSTEM ═══════════════ */}
            <section className="relative py-32 md:py-48">
              <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <ScrollReveal>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="line-accent" />
                    <span className="text-xs tracking-[0.5em] uppercase text-cyan/70 font-mono">Ecosystem</span>
                  </div>
                </ScrollReveal>

                <TextReveal
                  className="text-[clamp(2.2rem,5vw,4.5rem)] font-serif font-light leading-[1.1] max-w-4xl mb-20"
                  delay={0.1}
                >
                  Four pillars. One unified experience.
                </TextReveal>

                <div className="space-y-0">
                  {ecos.map((eco, i) => (
                    <ScrollReveal key={eco.number} delay={i * 0.1}>
                      <motion.div
                        className="group flex items-start gap-8 md:gap-16 py-10 border-b border-border-subtle"
                        whileHover={{ x: 20 }}
                        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                      >
                        <span className="text-5xl md:text-7xl font-serif text-white/[0.04] group-hover:text-cyan/20 transition-colors duration-500 select-none shrink-0 w-24">
                          {eco.number}
                        </span>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-serif mb-3 group-hover:text-cyan transition-colors duration-300">
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

            {/* ═══════════════ CTA ═══════════════ */}
            <section id="contact" className="relative py-40 md:py-56 overflow-hidden">
              <GlowOrb className="w-[600px] h-[600px] bg-cyan/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

              <div className="max-w-[900px] mx-auto px-6 text-center relative z-10">
                <ScrollReveal>
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="line-accent" />
                    <span className="text-xs tracking-[0.5em] uppercase text-cyan/70 font-mono">Begin</span>
                    <div className="line-accent" style={{ background: 'linear-gradient(270deg, var(--color-cyan), transparent)' }} />
                  </div>
                </ScrollReveal>

                <TextReveal
                  className="text-[clamp(2.5rem,6vw,5.5rem)] font-serif font-light leading-[1.05] mb-8"
                  delay={0.1}
                >
                  Ready to join the legions?
                </TextReveal>

                <ScrollReveal delay={0.3}>
                  <p className="text-text-secondary text-lg mb-12 max-w-xl mx-auto">
                    Membership is by invitation and referral only. Apply to begin your journey
                    with the world&apos;s most ambitious minds.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.4}>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <MagneticButton strength={0.25}>
                      <button className="group relative px-12 py-5 bg-cyan text-bg-deep text-sm tracking-[0.3em] uppercase font-medium overflow-hidden">
                        <span className="relative z-10">Request Membership</span>
                        <motion.div
                          className="absolute inset-0 bg-neon-ice"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.4 }}
                          style={{ transformOrigin: 'left' }}
                        />
                      </button>
                    </MagneticButton>
                    <MagneticButton strength={0.25}>
                      <button className="px-12 py-5 border border-white/15 text-white/60 text-sm tracking-[0.3em] uppercase hover:border-cyan/40 hover:text-white transition-all duration-500">
                        Contact Us
                      </button>
                    </MagneticButton>
                  </div>
                </ScrollReveal>
              </div>
            </section>

            {/* ═══════════════ FOOTER ═══════════════ */}
            <footer className="border-t border-border-subtle py-16 md:py-20">
              <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                  <div className="md:col-span-1">
                    <p className="font-serif text-2xl tracking-[0.1em] mb-4">
                      <span className="text-cyan">Legions</span>
                      <span className="text-white/30 ml-1">Club</span>
                    </p>
                    <p className="text-sm text-text-muted leading-relaxed">
                      Where ambition meets purpose.<br />
                      Where legacy begins.
                    </p>
                  </div>

                  {[
                    { title: 'Navigate', links: ['About', 'Programs', 'Members', 'Contact'] },
                    { title: 'Connect', links: ['LinkedIn', 'Twitter', 'Instagram', 'Newsletter'] },
                    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookie Policy'] },
                  ].map((col) => (
                    <div key={col.title}>
                      <p className="text-xs tracking-[0.4em] uppercase text-text-muted mb-6">{col.title}</p>
                      <ul className="space-y-3">
                        {col.links.map((link) => (
                          <li key={link}>
                            <a href="#" className="text-sm text-text-secondary hover:text-cyan transition-colors duration-300">
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
                    © 2025 Legions Club. All rights reserved.
                  </p>
                  <p className="text-xs text-text-muted tracking-widest">
                    Made with precision &amp; purpose
                  </p>
                </div>
              </div>
            </footer>
          </main>
        </>
      )}
    </>
  )
}
