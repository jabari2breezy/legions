import React from 'react';
import './pages.css';

export default function Impact() {
  return (
    <div className="page-container impact-page">
      <section className="section">
        <div className="section-content text-center">
          <h1 className="hero-title text-glow">The Numbers So Far</h1>
          <p className="lead-text">
            Legions has mobilised 139 high school and university student volunteers, contributing over 2,600 hours of service toward community initiatives.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="section-content">
          <div className="stats-grid">
            <div className="stat-card glass-panel">
              <h3 className="text-glow">139+</h3>
              <p>Volunteers Mobilised</p>
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
              <p>Public Schools Greened</p>
            </div>
            <div className="stat-card glass-panel">
              <h3 className="text-glow">1</h3>
              <p>Hospital Ward Renovated</p>
            </div>
            <div className="stat-card glass-panel">
              <h3 className="text-glow">1</h3>
              <p>Village Well Constructed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-content">
          <h2 className="text-center mb-4">Milestones</h2>
          <div className="cards-grid">
            <div className="glass-panel">
              <div className="badge mb-2">Environment</div>
              <h3 className="text-glow mb-2">Tree-Planting & Botanical Gardens</h3>
              <p>Established green spaces and botanical gardens in two public schools, giving students a living classroom and greener surroundings.</p>
            </div>
            
            <div className="glass-panel">
              <div className="badge mb-2">Humanitarian</div>
              <h3 className="text-glow mb-2">Ujasiri House Renovation</h3>
              <p>Renovated the childhood cancer ward at Muhimbili National Hospital, creating a more comforting environment for young patients and their families.</p>
            </div>

            <div className="glass-panel">
              <div className="badge mb-2">Humanitarian</div>
              <h3 className="text-glow mb-2">Village Well Construction</h3>
              <p>Built a well for a village in the Pwani Region, improving access to clean water for the community.</p>
            </div>

            <div className="glass-panel">
              <div className="badge mb-2">Humanitarian</div>
              <h3 className="text-glow mb-2">Ramadan Orphan Support</h3>
              <p>Provided 550 orphans with essential food supplies and hygiene kits over the past two years, including our annual Ramadan Iftar gathering.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-content text-center glass-panel">
          <p className="lead-text mb-0" style={{ fontStyle: 'italic', margin: 0 }}>
            "Through community outreach, environmental action, and collaboration with like-minded organisations, Legions Club continues to serve as a catalyst for meaningful, sustainable change."
          </p>
        </div>
      </section>
    </div>
  );
}
