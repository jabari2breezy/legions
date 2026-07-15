import React from 'react';
import './pages.css';

export default function Gallery() {
  // Placeholder images array
  const images = Array(6).fill(null);

  return (
    <div className="page-container gallery-page">
      <section className="section">
        <div className="section-content text-center">
          <h1 className="hero-title text-glow">Gallery</h1>
          <p className="lead-text">
            A look back at some of our recent projects and the faces behind the change.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {images.map((_, index) => (
            <div key={index} className="glass-panel" style={{ padding: '10px', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <div 
                className="duotone-img" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '0.9rem'
                }}
              >
                Image Placeholder {index + 1}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
