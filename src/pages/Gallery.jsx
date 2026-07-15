import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './pages.css';

export default function Gallery() {
  useScrollReveal();

  return (
    <>
      <section className="section hero">
        <div className="section__inner" style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
          <div className="container">
            <h1 className="heading-xl reveal">Gallery</h1>
            <p className="text-body text-muted reveal" data-delay="1">
              Moments of impact. A visual record of our work across Dar es Salaam.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--darker">
        <div className="section__inner">
          <div className="container">
            <div className="grid-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="gallery-placeholder reveal" data-delay={(item % 3) + 1}>
                  <p>Image {item}</p>
                </div>
              ))}
            </div>
            <div className="reveal" style={{ textAlign: 'center', marginTop: '4rem' }}>
              <p className="text-muted">More photos coming soon as we document our ongoing projects.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
