'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import SubpageCanvas from '../components/SubpageCanvas'
import GrainOverlay from '../components/GrainOverlay'

gsap.registerPlugin(ScrollTrigger)

export default function Partner() {
  const mainRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const partnerCards = document.querySelectorAll('.partner-card')
    gsap.fromTo(partnerCards,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: partnerCards[0], start: 'top 85%', once: true }
      }
    )

    const benefits = document.querySelectorAll('.benefit-item')
    gsap.fromTo(benefits,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: benefits[0], start: 'top 85%', once: true }
      }
    )

    const formPanel = document.querySelector('.partner-form')
    if (formPanel) {
      gsap.fromTo(formPanel,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: formPanel, start: 'top 85%', once: true }
        }
      )
    }
  }, { scope: mainRef })

  return (
    <main ref={mainRef} className="min-h-screen bg-[var(--color-bg-deep)]">
      <SubpageCanvas />
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <GrainOverlay opacity={0.06} />
        <div className="container mx-auto px-[var(--spacing-section-x)] relative z-10 text-center">
          <SectionHeader
            eyebrow="Corporate & Institutional"
            title="Invest in Real Change."
            subtitle="Partner with the most effective youth-led organization in Dar es Salaam to fulfill your CSR objectives with total transparency."
            className="mx-auto"
          />
        </div>
      </section>

      {/* Ways to Partner */}
      <section className="py-[var(--spacing-section-y)] bg-[var(--color-surface)]/60 backdrop-blur-md border-y border-[var(--color-border-subtle)] relative z-10 overflow-hidden">
        <div className="container mx-auto px-[var(--spacing-section-x)] relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 text-center flex flex-col items-center partner-card cursor-default">
              <div className="w-16 h-16 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Financial Sponsorship</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">Fund specific projects like our Ujasiri House revamp or the Ramadan Iftar drives. Get full reporting on fund allocation.</p>
            </div>
            <div className="glass-panel p-8 text-center flex flex-col items-center partner-card cursor-default">
              <div className="w-16 h-16 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">In-Kind Donations</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">Provide materials, logistical support, or expertise for our field operations.</p>
            </div>
            <div className="glass-panel p-8 text-center flex flex-col items-center partner-card cursor-default">
              <div className="w-16 h-16 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Ongoing Alliance</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">Establish a long-term relationship with Legions Tz for continuous, structured community impact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-[var(--spacing-section-y)] container mx-auto px-[var(--spacing-section-x)] relative z-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <SectionHeader
              title="Let's build something together."
              align="left"
              className="mb-8"
            />
            <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">We are actively looking for corporate sponsors, NGOs, and local businesses to scale our operations.</p>
            <ul className="flex flex-col gap-5 text-[var(--color-text-secondary)]">
              <li className="flex items-center gap-4 benefit-item">
                <div className="w-8 h-8 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                Tax-deductible receipts available
              </li>
              <li className="flex items-center gap-4 benefit-item">
                <div className="w-8 h-8 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                Detailed post-project impact reports
              </li>
              <li className="flex items-center gap-4 benefit-item">
                <div className="w-8 h-8 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                Brand visibility across our network
              </li>
            </ul>
          </div>
          <div className="glass-panel p-8 partner-form">
            <form className="flex flex-col gap-5">
              <input type="text" placeholder="Organization Name" className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-cyan)] focus:ring-2 focus:ring-[var(--color-cyan)]/20 transition-all duration-300" />
              <input type="text" placeholder="Contact Person" className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-cyan)] focus:ring-2 focus:ring-[var(--color-cyan)]/20 transition-all duration-300" />
              <input type="email" placeholder="Email Address" className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-cyan)] focus:ring-2 focus:ring-[var(--color-cyan)]/20 transition-all duration-300" />
              <textarea rows={4} placeholder="How would you like to partner?" className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-cyan)] focus:ring-2 focus:ring-[var(--color-cyan)]/20 transition-all duration-300 resize-none"></textarea>
              <Button type="submit" variant="primary" className="w-full mt-2">Send Inquiry</Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
