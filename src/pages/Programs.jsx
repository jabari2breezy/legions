import React from 'react';
import './pages.css';

export default function Programs() {
  return (
    <div className="page-container programs-page">
      <section className="section">
        <div className="section-content text-center">
          <h1 className="hero-title text-glow">Our Programs</h1>
          <p className="lead-text">
            Discover the initiatives we run to make Dar es Salaam a better place for everyone.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="section-content">
          <div className="cards-grid mb-4">
            <div className="glass-panel">
              <h3 className="text-glow mb-2">Environmental Initiatives</h3>
              <p>Tree-planting programs, botanical gardens in public schools, beach cleanups, environmental awareness days.</p>
            </div>
            
            <div className="glass-panel">
              <h3 className="text-glow mb-2">Humanitarian Initiatives</h3>
              <p>Hospital ward renovations, village well construction, orphan support (food supplies, hygiene kits), annual Ramadan Iftar for Orphans.</p>
            </div>

            <div className="glass-panel">
              <h3 className="text-glow mb-2">Youth Engagement Initiatives</h3>
              <p>Volunteer recruitment and training, fundraisers, community awareness campaigns, cross-organisation collaborations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <div className="glass-panel text-center" style={{ padding: '60px 40px', border: '2px solid var(--color-accent-cyan)' }}>
            <div className="badge mb-2">Featured Program Spotlight</div>
            <h2 className="text-glow">Legions Ramadan Project</h2>
            <p className="lead-text my-3">
              Our flagship humanitarian initiative. An annual Ramadan Iftar that brings together local orphans and student volunteers for an evening of food, connection, and community.
            </p>
            <p className="lead-text mb-0">
              Now in its 3rd year, the project has grown alongside our volunteer base and remains one of our most meaningful events every year.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
