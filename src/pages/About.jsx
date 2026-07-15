import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './pages.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = containerRef.current.querySelectorAll('.reveal-up');
      reveals.forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });

      const heroTitle = containerRef.current.querySelector('.hero-title');
      if (heroTitle) {
        gsap.fromTo(heroTitle,
          { opacity: 0, y: 60, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out', delay: 1.4 }
        );
      }

      const heroSub = containerRef.current.querySelector('.hero-sub');
      if (heroSub) {
        gsap.fromTo(heroSub,
          { opacity: 0, y: 30 },
          { opacity: 0.6, y: 0, duration: 1, ease: 'power3.out', delay: 1.7 }
        );
      }

      const sections = containerRef.current.querySelectorAll('.section-transition');
      sections.forEach(section => {
        gsap.fromTo(section,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      });

      const glassCards = containerRef.current.querySelectorAll('.glass-card');
      glassCards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="section hero">
        <div className="section__inner" style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
          <div className="container">
            <h1 className="heading-xl hero-title" style={{ opacity: 0 }}>About Legions Club</h1>
            <p className="text-body text-muted hero-sub" style={{ opacity: 0 }}>
              Building a city where young people aren't just beneficiaries of change, but the ones driving it.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--darker section-transition">
        <div className="section__inner">
          <div className="container" style={{ maxWidth: '900px' }}>
            <h2 className="heading-lg reveal-up text-serif">Our Story</h2>
            <div className="reveal-up">
              <p className="text-body" style={{ fontSize: '1.25rem' }}>
                Legions began with a simple observation: Dar es Salaam is full of young people who want to make a difference, but lack the platform and resources to do so effectively.
              </p>
              <p className="text-body" style={{ fontSize: '1.25rem' }}>
                We started as a small group of students organizing local beach cleanups. As we saw the impact of our collective effort, we realized that our generation has the energy and creativity to tackle much larger issues facing our city.
              </p>
              <p className="text-body text-muted" style={{ fontSize: '1.125rem' }}>
                Today, Legions Club has grown into a network of over 130 dedicated student volunteers across multiple schools. We organize major environmental initiatives, fundraise for essential humanitarian projects, and prove that young people are capable of creating lasting, sustainable change in our communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark section-transition">
        <div className="section__inner">
          <div className="container">
            <div className="grid-2">
              <div className="glass-card">
                <span className="badge" style={{ backgroundColor: 'rgba(67, 97, 238, 0.1)', color: '#4361EE', borderColor: 'rgba(67, 97, 238, 0.2)' }}>Mission</span>
                <h3 className="heading-md" style={{ marginTop: '1rem', fontSize: '1.75rem' }}>To meet the humanitarian and environmental needs of Dar es Salaam through student-led action, while building young people into lifelong changemakers.</h3>
              </div>
              <div className="glass-card">
                <span className="badge">Vision</span>
                <h3 className="heading-md" style={{ marginTop: '1rem', fontSize: '1.75rem' }}>A city where young people aren't just beneficiaries of change. They're the ones driving it.</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--darker section-transition">
        <div className="section__inner">
          <div className="container">
            <h2 className="heading-lg reveal-up text-serif" style={{ textAlign: 'center', marginBottom: '4rem' }}>Our Values</h2>
            <div className="grid-4">
              <div className="glass-card">
                <h3 className="heading-md text-accent">Youth-Led</h3>
                <p className="text-body text-muted">
                  Every project is conceptualized, planned, and executed by students. We believe in learning by doing.
                </p>
              </div>
              <div className="glass-card">
                <h3 className="heading-md text-accent">Community-Centered</h3>
                <p className="text-body text-muted">
                  We don't impose solutions. We listen to community needs and work alongside them to create sustainable impact.
                </p>
              </div>
              <div className="glass-card">
                <h3 className="heading-md text-accent">Sustainable Impact</h3>
                <p className="text-body text-muted">
                  We focus on long-term solutions, not just quick fixes. Whether it's planting trees or building wells.
                </p>
              </div>
              <div className="glass-card">
                <h3 className="heading-md text-accent">Collaboration</h3>
                <p className="text-body text-muted">
                  We partner with schools, local organizations, and community leaders because real change requires teamwork.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
