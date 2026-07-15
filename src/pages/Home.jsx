import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './pages.css';

// Counter component for animated stats
function Counter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = parseInt(value.replace(/[^0-9]/g, ''), 10);
    if (isNaN(end)) return;
    
    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 16);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  const suffix = value.replace(/[0-9]/g, '');

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  
  // Slide elements transition
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

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
      {/* 1. Hero Section */}
      <section className="section hero">
        <div className="section__inner">
          <div className="container hero-content">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.2 } }
              }}
            >
              <motion.h1 
                className="hero-large-title"
                variants={{
                  hidden: { opacity: 0, y: 70 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                LEGIONS.
              </motion.h1>
              <motion.p 
                className="hero-subtitle"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 0.6, transition: { duration: 1 } }
                }}
              >
                Youth-powered change in Dar es Salaam.
              </motion.p>
            </motion.div>

            <div className="scroll-prompt">
              <span>Scroll to discover</span>
              <span>↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Intro/Manifesto Section */}
      <section className="section section--darker">
        <div className="section__inner">
          <div className="container">
            <div className="manifesto-container">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.15 } }
                }}
              >
                {sentences.map((line, i) => (
                  <motion.h2 
                    key={i}
                    variants={fadeUp}
                    className="manifesto-line"
                  >
                    {line}
                  </motion.h2>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Programs Section */}
      <section className="section section--dark">
        <div className="section__inner">
          <div className="container">
            <motion.h2 
              className="heading-lg text-serif" 
              style={{ marginBottom: '6rem' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              Our Initiatives
            </motion.h2>
            
            <div className="program-stack">
              {programs.map((prog, index) => (
                <motion.div 
                  key={index}
                  className="program-card-large"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUp}
                >
                  <div className="program-num">{prog.number}</div>
                  <div className="program-details">
                    <h3 className="program-title-large">{prog.title}</h3>
                    <p className="text-body text-muted" style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>
                      {prog.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Impact/Stats Section */}
      <section className="section section--darker">
        <div className="section__inner">
          <div className="container">
            <motion.h2 
              className="heading-lg text-serif" 
              style={{ marginBottom: '6rem', textAlign: 'center' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              The Impact
            </motion.h2>

            <div className="specimen-grid">
              <motion.div 
                className="specimen-stat"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="specimen-number">
                  <Counter value="139+" />
                </div>
                <div className="specimen-label">Volunteers Mobilised</div>
              </motion.div>

              <motion.div 
                className="specimen-stat"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="specimen-number">
                  <Counter value="2600+" />
                </div>
                <div className="specimen-label">Hours of Service</div>
              </motion.div>

              <motion.div 
                className="specimen-stat"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="specimen-number">
                  <Counter value="550" />
                </div>
                <div className="specimen-label">Orphans Supported</div>
              </motion.div>

              <motion.div 
                className="specimen-stat"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="specimen-number">
                  <Counter value="2" />
                </div>
                <div className="specimen-label">Schools Greened</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Story/Quote Section */}
      <section className="section section--dark">
        <div className="section__inner">
          <div className="container">
            <div className="story-quote-container">
              <motion.p 
                className="story-quote"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                "We're not just trying to finish projects. We're trying to build a generation of young people who see <span className="keyword-glow">service</span> as normal."
              </motion.p>
              <div className="glow-graphic" />
              <motion.p 
                className="text-muted" 
                style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                — The Legions Team
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Get Involved Section */}
      <section className="section section--accent">
        <div className="section__inner">
          <div className="container" style={{ textAlign: 'center', padding: '8rem 0' }}>
            <motion.h2 
              className="heading-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              Join the Movement
            </motion.h2>
            <motion.div 
              className="btn-group" 
              style={{ justifyContent: 'center', marginTop: '3rem' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Link to="/get-involved" className="btn-primary" style={{ backgroundColor: '#0D0A2B', color: '#4DE8D4' }}>Volunteer</Link>
              <Link to="/get-involved" className="btn-outline">Donate</Link>
              <Link to="/get-involved" className="btn-outline">Partner With Us</Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
