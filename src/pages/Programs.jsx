import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './pages.css';

export default function Programs() {
  useScrollReveal();

  return (
    <>
      <section className="section hero">
        <div className="section__inner" style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
          <div className="container">
            <h1 className="heading-xl reveal">Our Programs</h1>
            <p className="text-body text-muted reveal" data-delay="1">
              Structured initiatives designed to create targeted, sustainable impact across Dar es Salaam.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--darker">
        <div className="section__inner">
          <div className="container">
            <div className="grid-3">
              <div className="glass-card reveal" data-delay="1">
                <span className="badge">Environment</span>
                <h3 className="heading-md" style={{ marginTop: '1rem', fontSize: '1.5rem' }}>Environmental Initiatives</h3>
                <p className="text-body text-muted">
                  Focusing on the restoration and creation of green spaces within the city. This includes our ongoing partnerships with public schools for tree planting and campus greening, as well as community beach cleanups along the coast.
                </p>
              </div>
              <div className="glass-card reveal" data-delay="2">
                <span className="badge" style={{ backgroundColor: 'rgba(67, 97, 238, 0.1)', color: '#4361EE', borderColor: 'rgba(67, 97, 238, 0.2)' }}>Humanitarian</span>
                <h3 className="heading-md" style={{ marginTop: '1rem', fontSize: '1.5rem' }}>Humanitarian Initiatives</h3>
                <p className="text-body text-muted">
                  Addressing immediate community needs through targeted interventions. Projects range from funding and building clean water infrastructure in rural areas to renovating dilapidated facilities in underfunded public hospitals.
                </p>
              </div>
              <div className="glass-card reveal" data-delay="3">
                <span className="badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.2)' }}>Youth</span>
                <h3 className="heading-md" style={{ marginTop: '1rem', fontSize: '1.5rem' }}>Youth Engagement</h3>
                <p className="text-body text-muted">
                  Building capacity in our volunteers through leadership workshops, project management experience, and collaborative networking events with other student organizations across Tanzania.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="section__inner">
          <div className="container">
            <div className="glass-card spotlight-card reveal">
              <div className="grid-2" style={{ alignItems: 'center' }}>
                <div>
                  <span className="badge">Featured Program Spotlight</span>
                  <h2 className="heading-lg text-serif" style={{ marginTop: '1rem' }}>Legions Ramadan Project</h2>
                  <p className="text-body text-muted" style={{ fontSize: '1.25rem' }}>
                    Our largest annual program brings together volunteers, donors, and local businesses to support orphans during the holy month of Ramadan. 
                  </p>
                  <p className="text-body text-muted">
                    Over the past three years, this initiative has grown from supporting a single orphanage to providing comprehensive care packages, new Eid clothing, and hosting large community Iftar dinners for over 550 children across Dar es Salaam.
                  </p>
                </div>
                <div style={{ padding: '2rem' }}>
                  {/* Placeholder for an image or graphic */}
                  <div style={{ aspectRatio: '1/1', background: 'var(--color-bg-darkest)', borderRadius: '2rem', border: '1px solid var(--color-glass-border)' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
