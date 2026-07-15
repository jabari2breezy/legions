import React from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import './pages.css';

export default function Home() {
  useScrollReveal();

  return (
    <>
      <section className="section hero">
        <div className="section__inner" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
          <div className="container">
            <h1 className="heading-xl reveal">Youth-Powered Change<br />in Dar es Salaam.</h1>
            <p className="text-body text-muted reveal" data-delay="1">
              Legions Club is a student-led organization dedicated to meeting the humanitarian 
              and environmental needs of our city, while building the next generation of changemakers.
            </p>
            <div className="btn-group reveal" data-delay="2">
              <Link to="/get-involved" className="btn-primary">Volunteer With Us</Link>
              <Link to="/impact" className="btn-outline">See Our Impact</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--darker">
        <div className="section__inner">
          <div className="container" style={{ maxWidth: '900px' }}>
            <h2 className="heading-lg reveal text-serif">Who We Are</h2>
            <p className="text-body reveal" data-delay="1" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
              Legions Club focuses on making our city a better place by meeting its humanitarian and environmental needs. We want to make a lasting impact on the youth, so that they too can inspire others to do the same.
            </p>
            <p className="text-body text-muted reveal" data-delay="2" style={{ fontSize: '1.25rem' }}>
              We believe change starts with young people who show up. Legions exists to give them the platform to do exactly that.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="section__inner">
          <div className="container">
            <div className="grid-4">
              <div className="glass-card reveal" data-delay="1">
                <div className="stat-number">139+</div>
                <h3 className="heading-md">Student Volunteers Mobilised</h3>
              </div>
              <div className="glass-card reveal" data-delay="2">
                <div className="stat-number">2.6k</div>
                <h3 className="heading-md">Hours of Service</h3>
              </div>
              <div className="glass-card reveal" data-delay="3">
                <div className="stat-number">550</div>
                <h3 className="heading-md">Orphans Supported</h3>
              </div>
              <div className="glass-card reveal" data-delay="4">
                <div className="stat-number">2</div>
                <h3 className="heading-md">Public Schools Greened</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--darker">
        <div className="section__inner">
          <div className="container">
            <h2 className="heading-lg reveal text-serif" style={{ textAlign: 'center', marginBottom: '4rem' }}>What We Do</h2>
            <div className="grid-3">
              <div className="glass-card reveal" data-delay="1">
                <span className="badge">Environment</span>
                <h3 className="heading-md" style={{ marginTop: '1rem' }}>Environmental Action</h3>
                <p className="text-body text-muted">
                  Tree-planting programs, botanical gardens, and beach cleanups that restore green spaces across the city.
                </p>
              </div>
              <div className="glass-card reveal" data-delay="2">
                <span className="badge">Humanitarian</span>
                <h3 className="heading-md" style={{ marginTop: '1rem' }}>Humanitarian Support</h3>
                <p className="text-body text-muted">
                  From hospital renovations to well construction, we meet urgent needs in underserved communities.
                </p>
              </div>
              <div className="glass-card reveal" data-delay="3">
                <span className="badge">Youth</span>
                <h3 className="heading-md" style={{ marginTop: '1rem' }}>Youth Engagement</h3>
                <p className="text-body text-muted">
                  Fundraisers, awareness days, and volunteer-led initiatives that put young people at the center of change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--accent">
        <div className="section__inner">
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
            <h2 className="heading-xl reveal">Ready to Make an Impact?</h2>
            <p className="text-body reveal" data-delay="1" style={{ fontSize: '1.25rem', marginBottom: '3rem' }}>
              Whether you want to volunteer your time, partner with us, or donate to our cause, there's a place for you in the Legions community.
            </p>
            <div className="btn-group reveal" data-delay="2" style={{ justifyContent: 'center' }}>
              <Link to="/get-involved" className="btn-primary" style={{ backgroundColor: '#0D0A2B', color: '#4DE8D4' }}>Get Involved Now</Link>
              <Link to="/contact" className="btn-outline">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
