import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './pages.css';

gsap.registerPlugin(ScrollTrigger);

function Counter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const end = parseInt(value.replace(/[^0-9]/g, ''), 10);
        if (isNaN(end)) return;

        let start = 0;
        const totalMs = duration * 1000;
        const incrementTime = Math.max(Math.floor(totalMs / end), 16);

        const timer = setInterval(() => {
          start += Math.ceil(end / (totalMs / incrementTime));
          if (start >= end) {
            clearInterval(timer);
            setCount(end);
          } else {
            setCount(start);
          }
        }, incrementTime);
      }
    }, { threshold: 0.3 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  const suffix = value.replace(/[0-9]/g, '');
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const containerRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const manifestoRef = useRef(null);
  const programsRef = useRef(null);
  const statsRef = useRef(null);
  const quoteRef = useRef(null);

  // Hero entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.4 });

      if (heroTitleRef.current) {
        tl.fromTo(heroTitleRef.current,
          { opacity: 0, y: 80, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power4.out' }
        );
      }

      if (heroSubtitleRef.current) {
        tl.fromTo(heroSubtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 0.6, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.8'
        );
      }

      tl.fromTo('.scroll-prompt',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Manifesto text reveal
  useEffect(() => {
    if (!manifestoRef.current) return;

    const ctx = gsap.context(() => {
      const lines = manifestoRef.current.querySelectorAll('.manifesto-word');
      
      gsap.fromTo(lines,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.04,
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Programs section animations
  useEffect(() => {
    if (!programsRef.current) return;

    const ctx = gsap.context(() => {
      const cards = programsRef.current.querySelectorAll('.program-card-large');
      
      cards.forEach((card) => {
        const num = card.querySelector('.program-num');
        const title = card.querySelector('.program-title-large');
        const desc = card.querySelector('.program-desc');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        if (num) tl.fromTo(num, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, 0);
        if (title) tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.1);
        if (desc) tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.2);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Stats pinned section
  useEffect(() => {
    if (!statsRef.current) return;

    const ctx = gsap.context(() => {
      const statsSection = statsRef.current;
      
      gsap.fromTo(statsSection,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsSection,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      const statItems = statsSection.querySelectorAll('.specimen-stat');
      statItems.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: statsSection,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Quote section with hover reveal
  useEffect(() => {
    if (!quoteRef.current) return;

    const ctx = gsap.context(() => {
      const quote = quoteRef.current.querySelector('.story-quote');
      const author = quoteRef.current.querySelector('.quote-author');

      if (quote) {
        gsap.fromTo(quote,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (author) {
        gsap.fromTo(author,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Section transitions
  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll('.section-transition');
    if (!sections) return;

    const ctx = gsap.context(() => {
      sections.forEach(section => {
        gsap.fromTo(section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const sentences = [
    "A non-profit",
    "student-led",
    "organisation",
    "tackling humanitarian",
    "and environmental",
    "needs across",
    "our city."
  ];

  const programs = [
    {
      number: "01",
      title: "Environmental Action",
      desc: "Tree-planting programs, botanical gardens, and beach cleanups that restore green spaces across the city."
    },
    {
      number: "02",
      title: "Humanitarian Support",
      desc: "From hospital renovations to well construction, we meet urgent needs in underserved communities."
    },
    {
      number: "03",
      title: "Youth Engagement",
      desc: "Fundraisers, awareness days, and volunteer-led initiatives that put young people at the center of change."
    }
  ];

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <section className="section hero">
        <div className="section__inner">
          <div className="container hero-content">
            <h1 ref={heroTitleRef} className="heading-hero" style={{ opacity: 0 }}>
              LEGIONS.
            </h1>
            <p ref={heroSubtitleRef} className="hero-subtitle" style={{ opacity: 0 }}>
              Youth-powered change in Dar es Salaam.
            </p>
            <div className="scroll-prompt" style={{ opacity: 0 }}>
              <span>Scroll to discover</span>
              <span style={{ fontSize: '1.2rem' }}>↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="section section--darker section-transition">
        <div className="section__inner">
          <div className="container">
            <div className="manifesto-container" ref={manifestoRef}>
              {sentences.map((line, i) => (
                <h2 key={i} className="manifesto-line">
                  {line.split(' ').map((word, j) => (
                    <span key={j} className="manifesto-word" style={{ display: 'inline-block', marginRight: '0.3em' }}>
                      {word}
                    </span>
                  ))}
                </h2>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section section--dark section-transition">
        <div className="section__inner">
          <div className="container">
            <h2 className="heading-lg text-serif reveal-up" style={{ marginBottom: '6rem' }}>
              Our Initiatives
            </h2>

            <div className="program-stack" ref={programsRef}>
              {programs.map((prog, index) => (
                <div key={index} className="program-card-large">
                  <div className="program-num">{prog.number}</div>
                  <div className="program-details">
                    <h3 className="program-title-large">{prog.title}</h3>
                    <p className="text-body text-muted program-desc" style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>
                      {prog.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section section--darker section-transition">
        <div className="section__inner">
          <div className="container">
            <h2 className="heading-lg text-serif" style={{ marginBottom: '6rem', textAlign: 'center' }}>
              The Impact
            </h2>

            <div className="specimen-grid" ref={statsRef}>
              <div className="specimen-stat">
                <div className="specimen-number">
                  <Counter value="139+" />
                </div>
                <div className="specimen-label">Volunteers Mobilised</div>
              </div>

              <div className="specimen-stat">
                <div className="specimen-number">
                  <Counter value="2600+" />
                </div>
                <div className="specimen-label">Hours of Service</div>
              </div>

              <div className="specimen-stat">
                <div className="specimen-number">
                  <Counter value="550" />
                </div>
                <div className="specimen-label">Orphans Supported</div>
              </div>

              <div className="specimen-stat">
                <div className="specimen-number">
                  <Counter value="2" />
                </div>
                <div className="specimen-label">Schools Greened</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story/Quote Section */}
      <section className="section section--dark section-transition">
        <div className="section__inner">
          <div className="container">
            <div className="story-quote-container" ref={quoteRef}>
              <p className="story-quote">
                "We're not just trying to finish projects. We're trying to build a generation of young people who see{' '}
                <span className="keyword-glow hover-reveal-container" data-cursor-hover>
                  service
                  <svg className="hover-reveal-svg" width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ top: '-20px', right: '-40px' }}>
                    <path d="M40 10 C40 10, 55 25, 55 40 C55 55, 40 70, 40 70 C40 70, 25 55, 25 40 C25 25, 40 10, 40 10Z" 
                          stroke="var(--color-accent-cyan)" strokeWidth="1.5" fill="none" 
                          strokeDasharray="200" strokeDashoffset="200"
                          style={{ animation: 'drawPath 0.8s ease forwards' }} />
                    <circle cx="40" cy="35" r="4" stroke="var(--color-accent-cyan)" strokeWidth="1.5" fill="none"
                            strokeDasharray="30" strokeDashoffset="30"
                            style={{ animation: 'drawPath 0.6s ease 0.3s forwards' }} />
                    <line x1="40" y1="45" x2="40" y2="60" stroke="var(--color-accent-cyan)" strokeWidth="1.5"
                          strokeDasharray="20" strokeDashoffset="20"
                          style={{ animation: 'drawPath 0.5s ease 0.5s forwards' }} />
                  </svg>
                </span>
                {' '}as normal."
              </p>
              <div className="glow-graphic" />
              <p className="text-muted quote-author" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                — The Legions Team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="section section--accent section-transition">
        <div className="section__inner">
          <div className="container" style={{ textAlign: 'center', padding: '8rem 0' }}>
            <h2 className="heading-xl reveal-up">
              Join the Movement
            </h2>
            <div className="btn-group" style={{ justifyContent: 'center', marginTop: '3rem' }} data-delay="1">
              <Link to="/get-involved" className="btn-primary" style={{ backgroundColor: '#0D0A2B', color: '#4DE8D4' }} data-cursor-hover>
                Volunteer
              </Link>
              <Link to="/get-involved" className="btn-outline" data-cursor-hover>
                Donate
              </Link>
              <Link to="/get-involved" className="btn-outline" data-cursor-hover>
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
