import React from 'react';
import { Link } from 'react-router-dom';
import './pages.css';

export default function GetInvolved() {
  return (
    <div className="page-container get-involved-page">
      <section className="section">
        <div className="section-content text-center">
          <h1 className="hero-title text-glow">Join the Movement</h1>
          <p className="lead-text">
            Legions runs on volunteers. If you're a student in Dar es Salaam who wants to give back, there's a role for you. No experience necessary.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="section-content">
          <div className="cards-grid">
            <div className="glass-panel text-center">
              <h3 className="text-glow mb-2">Volunteer</h3>
              <p className="mb-4">
                Join us for hands-on projects, from tree plantings to hospital visits to our Ramadan Iftar. Sign up for one event or become a regular.
              </p>
              <Link to="/contact" className="btn-outline">Sign Up to Volunteer</Link>
            </div>
            
            <div className="glass-panel text-center">
              <h3 className="text-glow mb-2">Donate</h3>
              <p className="mb-4">
                Support our work with supplies, funds, or in-kind contributions. Every donation goes directly toward our projects.
              </p>
              <Link to="/contact" className="btn-outline">Support Us</Link>
            </div>

            <div className="glass-panel text-center">
              <h3 className="text-glow mb-2">Partner With Us</h3>
              <p className="mb-4">
                Represent a school, business, or organisation that shares our mission? Let's collaborate.
              </p>
              <Link to="/contact" className="btn-outline">Get in Touch</Link>
            </div>

            <div className="glass-panel text-center">
              <h3 className="text-glow mb-2">Spread the Word</h3>
              <p className="mb-4">
                Follow us on social media and help us reach more young people who want to make a difference.
              </p>
              <a href="https://instagram.com/legions.tz" target="_blank" rel="noopener noreferrer" className="btn-outline">Follow Us</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-content glass-panel">
          <h2 className="text-center mb-4">FAQ</h2>
          
          <div className="faq-item" style={{ marginBottom: '20px' }}>
            <h4 className="text-glow" style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Do I need experience to volunteer?</h4>
            <p>No. Just enthusiasm and a willingness to help.</p>
          </div>
          
          <div className="faq-item" style={{ marginBottom: '20px' }}>
            <h4 className="text-glow" style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Who can volunteer?</h4>
            <p>High school and university students in Dar es Salaam.</p>
          </div>
          
          <div className="faq-item">
            <h4 className="text-glow" style={{ marginBottom: '10px', fontSize: '1.2rem' }}>How much time do I need to commit?</h4>
            <p>As little as a few hours for a single event, or ongoing involvement across multiple projects. It's up to you.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
