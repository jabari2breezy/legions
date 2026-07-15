import React from 'react';
import { Link } from 'react-router-dom';
import './pages.css';

export default function Home() {
  return (
    <div className="page-container home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title text-glow">Youth-Powered Change in Dar es Salaam</h1>
          <p className="hero-subtitle">
            Legions Club is a non-profit, student-led organisation tackling humanitarian and environmental needs across our city.
          </p>
          <div className="hero-buttons">
            <Link to="/get-involved" className="btn-primary">Volunteer With Us</Link>
            <Link to="/impact" className="btn-outline">See Our Impact</Link>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section who-we-are">
        <div className="section-content text-center">
          <h2>Who We Are</h2>
          <p className="lead-text">
            Legions Club focuses on making our city a better place by meeting its humanitarian and environmental needs. We want to make a lasting impact on the youth, so that they too can inspire others to do the same.
          </p>
          <p className="lead-text">
            We believe change starts with young people who show up. Legions exists to give them the platform to do exactly that.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="section stats-section">
        <div className="section-content">
          <div className="stats-grid">
            <div className="stat-card glass-panel">
              <h3 className="text-glow">139+</h3>
              <p>Student Volunteers Mobilised</p>
            </div>
            <div className="stat-card glass-panel">
              <h3 className="text-glow">2,600+</h3>
              <p>Hours of Service</p>
            </div>
            <div className="stat-card glass-panel">
              <h3 className="text-glow">550</h3>
              <p>Orphans Supported</p>
            </div>
            <div className="stat-card glass-panel">
              <h3 className="text-glow">2</h3>
              <p>Public Schools with New Green Spaces</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section what-we-do">
        <div className="section-content">
          <h2 className="text-center mb-4">What We Do</h2>
          <div className="cards-grid">
            <div className="service-card glass-panel">
              <div className="badge mb-2">Environmental Action</div>
              <p>Tree-planting programs, botanical gardens, and beach cleanups that restore green spaces across the city.</p>
            </div>
            <div className="service-card glass-panel">
              <div className="badge mb-2">Humanitarian Support</div>
              <p>From hospital renovations to well construction, we meet urgent needs in underserved communities.</p>
            </div>
            <div className="service-card glass-panel">
              <div className="badge mb-2">Youth Engagement</div>
              <p>Fundraisers, awareness days, and volunteer-led initiatives that put young people at the center of change.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section cta-banner">
        <div className="section-content glass-panel text-center">
          <h2 className="text-glow">Ready to Make an Impact?</h2>
          <p className="lead-text my-3">
            Whether you're a student looking to volunteer or an organisation looking to partner with us, there's a place for you at Legions.
          </p>
          <div className="hero-buttons center">
            <Link to="/get-involved" className="btn-primary">Join Us</Link>
            <Link to="/contact" className="btn-outline">Partner With Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
