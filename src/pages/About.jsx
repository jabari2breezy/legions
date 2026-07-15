import React from 'react';
import './pages.css';

export default function About() {
  return (
    <div className="page-container about-page">
      <section className="section">
        <div className="section-content text-center">
          <h1 className="hero-title text-glow">About Legions Club</h1>
          <p className="lead-text">
            Legions Club is a non-profit, student-led organisation that organises and participates in initiatives addressing humanitarian and environmental needs across Dar es Salaam. Our work goes beyond one-off projects. We're actively building initiatives that improve community well-being and promote environmental sustainability.
          </p>
          <p className="lead-text">
            Legions Club aims to inspire youth to take action, and we do this through multiple avenues: fundraisers, awareness days, beach cleanups, tree plantings, and more. All of it is powered by the volunteers who work with us.
          </p>
          <p className="lead-text">
            We're not just trying to finish projects. We're trying to build a generation of young people who see service as normal, who volunteer once and keep coming back, and who bring others along with them.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <div className="cards-grid">
            <div className="glass-panel text-center">
              <h3 className="text-glow mb-2">Mission</h3>
              <p className="lead-text">
                To meet the humanitarian and environmental needs of Dar es Salaam through student-led action, while building young people into lifelong changemakers.
              </p>
            </div>
            <div className="glass-panel text-center">
              <h3 className="text-glow mb-2">Vision</h3>
              <p className="lead-text">
                A city where young people aren't just beneficiaries of change. They're the ones driving it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <h2 className="text-center mb-4">Our Values</h2>
          <div className="cards-grid">
            <div className="value-card glass-panel">
              <h3>Youth-Led</h3>
              <p>Every initiative is designed and run by students who care.</p>
            </div>
            <div className="value-card glass-panel">
              <h3>Community-Centered</h3>
              <p>We listen to the needs of the communities we serve.</p>
            </div>
            <div className="value-card glass-panel">
              <h3>Sustainable Impact</h3>
              <p>We aim for lasting change, not one-off gestures.</p>
            </div>
            <div className="value-card glass-panel">
              <h3>Collaboration</h3>
              <p>We work alongside like-minded organisations to multiply our impact.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
