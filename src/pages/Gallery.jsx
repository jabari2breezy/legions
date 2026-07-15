import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './pages.css';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
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

      const placeholders = containerRef.current.querySelectorAll('.gallery-placeholder');
      placeholders.forEach((ph, i) => {
        gsap.fromTo(ph,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: ph, start: 'top 90%', toggleActions: 'play none none none' },
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
            <h1 className="heading-xl hero-title" style={{ opacity: 0 }}>Gallery</h1>
            <p className="text-body text-muted hero-sub" style={{ opacity: 0 }}>
              Moments of impact. A visual record of our work across Dar es Salaam.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--darker section-transition">
        <div className="section__inner">
          <div className="container">
            <div className="grid-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="gallery-placeholder" data-cursor-hover>
                  <p>Image {item}</p>
                </div>
              ))}
            </div>
            <div className="reveal-up" style={{ textAlign: 'center', marginTop: '4rem' }}>
              <p className="text-muted">More photos coming soon as we document our ongoing projects.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
