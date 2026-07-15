import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './pages.css';

gsap.registerPlugin(ScrollTrigger);

export default function Impact() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
            <h1 className="heading-xl hero-title" style={{ opacity: 0 }}>The Numbers So Far</h1>
            <p className="text-body text-muted hero-sub" style={{ opacity: 0 }}>
              Real change happens when consistency meets passion. Here's what our 139+ volunteers
              have achieved over 2,600+ hours of dedicated service.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--darker section-transition">
        <div className="section__inner">
          <div className="container">
            <div className="grid-3">
              <div className="glass-card">
                <div className="stat-number">139+</div>
                <h3 className="heading-md">Volunteers Mobilised</h3>
              </div>
              <div className="glass-card">
                <div className="stat-number">2,600+</div>
                <h3 className="heading-md">Hours of Service</h3>
              </div>
              <div className="glass-card">
                <div className="stat-number">550</div>
                <h3 className="heading-md">Orphans Supported</h3>
              </div>
              <div className="glass-card">
                <div className="stat-number">2</div>
                <h3 className="heading-md">Public Schools Greened</h3>
              </div>
              <div className="glass-card">
                <div className="stat-number">1</div>
                <h3 className="heading-md">Hospital Ward Renovated</h3>
              </div>
              <div className="glass-card">
                <div className="stat-number">1</div>
                <h3 className="heading-md">Village Well Constructed</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark section-transition">
        <div className="section__inner">
          <div className="container">
            <h2 className="heading-lg reveal-up text-serif" style={{ textAlign: 'center', marginBottom: '4rem' }}>Milestones</h2>
            <div className="grid-2">
              <div className="glass-card">
                <span className="badge">Environment</span>
                <h3 className="heading-md" style={{ marginTop: '1rem', fontSize: '1.75rem' }}>School Tree-Planting Initiative</h3>
                <p className="text-body text-muted">
                  We partnered with two local public schools to plant over 300 indigenous trees, creating shaded areas for students and teaching environmental stewardship.
                </p>
              </div>
              <div className="glass-card">
                <span className="badge" style={{ backgroundColor: 'rgba(67, 97, 238, 0.1)', color: '#4361EE', borderColor: 'rgba(67, 97, 238, 0.2)' }}>Humanitarian</span>
                <h3 className="heading-md" style={{ marginTop: '1rem', fontSize: '1.75rem' }}>Ujasiri House Renovation</h3>
                <p className="text-body text-muted">
                  Our volunteers spent three weekends painting, cleaning, and decorating a children's ward at the local hospital, creating a brighter environment for recovery.
                </p>
              </div>
              <div className="glass-card">
                <span className="badge" style={{ backgroundColor: 'rgba(67, 97, 238, 0.1)', color: '#4361EE', borderColor: 'rgba(67, 97, 238, 0.2)' }}>Humanitarian</span>
                <h3 className="heading-md" style={{ marginTop: '1rem', fontSize: '1.75rem' }}>Kigamboni Village Well</h3>
                <p className="text-body text-muted">
                  Through student-led fundraising, we successfully financed and helped construct a clean water well for a community of 400 families in rural Kigamboni.
                </p>
              </div>
              <div className="glass-card">
                <span className="badge" style={{ backgroundColor: 'rgba(67, 97, 238, 0.1)', color: '#4361EE', borderColor: 'rgba(67, 97, 238, 0.2)' }}>Humanitarian</span>
                <h3 className="heading-md" style={{ marginTop: '1rem', fontSize: '1.75rem' }}>Ramadan Orphan Support</h3>
                <p className="text-body text-muted">
                  Our annual flagship program providing food packages, clothing, and hosting Iftar dinners for 550 orphans across three centers in Dar es Salaam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--darker section-transition">
        <div className="section__inner">
          <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
            <h2 className="heading-lg reveal-up text-serif" style={{ color: 'var(--color-accent-cyan)' }}>
              "The impact isn't just in the trees we plant or the wells we build. It's in the mindset shift of every student who realizes they have the power to change their community."
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
