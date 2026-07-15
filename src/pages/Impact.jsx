import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './pages.css';

export default function Impact() {
  useScrollReveal();

  return (
    <>
      <section className="section hero">
        <div className="section__inner" style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
          <div className="container">
            <h1 className="heading-xl reveal">The Numbers So Far</h1>
            <p className="text-body text-muted reveal" data-delay="1">
              Real change happens when consistency meets passion. Here's what our 139+ volunteers 
              have achieved over 2,600+ hours of dedicated service.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--darker">
        <div className="section__inner">
          <div className="container">
            <div className="grid-3">
              <div className="glass-card reveal" data-delay="1">
                <div className="stat-number">139+</div>
                <h3 className="heading-md">Volunteers Mobilised</h3>
              </div>
              <div className="glass-card reveal" data-delay="2">
                <div className="stat-number">2,600+</div>
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
              <div className="glass-card reveal" data-delay="5">
                <div className="stat-number">1</div>
                <h3 className="heading-md">Hospital Ward Renovated</h3>
              </div>
              <div className="glass-card reveal" data-delay="5">
                <div className="stat-number">1</div>
                <h3 className="heading-md">Village Well Constructed</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="section__inner">
          <div className="container">
            <h2 className="heading-lg reveal text-serif" style={{ textAlign: 'center', marginBottom: '4rem' }}>Milestones</h2>
            <div className="grid-2">
              <div className="glass-card reveal" data-delay="1">
                <span className="badge">Environment</span>
                <h3 className="heading-md" style={{ marginTop: '1rem', fontSize: '1.75rem' }}>School Tree-Planting Initiative</h3>
                <p className="text-body text-muted">
                  We partnered with two local public schools to plant over 300 indigenous trees, creating shaded areas for students and teaching environmental stewardship.
                </p>
              </div>
              <div className="glass-card reveal" data-delay="2">
                <span className="badge" style={{ backgroundColor: 'rgba(67, 97, 238, 0.1)', color: '#4361EE', borderColor: 'rgba(67, 97, 238, 0.2)' }}>Humanitarian</span>
                <h3 className="heading-md" style={{ marginTop: '1rem', fontSize: '1.75rem' }}>Ujasiri House Renovation</h3>
                <p className="text-body text-muted">
                  Our volunteers spent three weekends painting, cleaning, and decorating a children's ward at the local hospital, creating a brighter environment for recovery.
                </p>
              </div>
              <div className="glass-card reveal" data-delay="3">
                <span className="badge" style={{ backgroundColor: 'rgba(67, 97, 238, 0.1)', color: '#4361EE', borderColor: 'rgba(67, 97, 238, 0.2)' }}>Humanitarian</span>
                <h3 className="heading-md" style={{ marginTop: '1rem', fontSize: '1.75rem' }}>Kigamboni Village Well</h3>
                <p className="text-body text-muted">
                  Through student-led fundraising, we successfully financed and helped construct a clean water well for a community of 400 families in rural Kigamboni.
                </p>
              </div>
              <div className="glass-card reveal" data-delay="4">
                <span className="badge" style={{ backgroundColor: 'rgba(67, 97, 238, 0.1)', color: '#4361EE', borderColor: 'rgba(67, 97, 238, 0.2)' }}>Humanitarian</span>
                <h3 className="heading-md" style={{ marginTop: '1rem', fontSize: '1.75rem' }}>Ramadan Orphan Support</h3>
                <p className="text-body text-muted">
                  Our annual flagship program providing food packages, clothing, and hosting Iftar dinners for 550 orphans across three centers in Dar es Salaam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--darker">
        <div className="section__inner">
          <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
            <h2 className="heading-lg reveal text-serif" style={{ color: 'var(--color-accent-cyan)' }}>
              "The impact isn't just in the trees we plant or the wells we build. It's in the mindset shift of every student who realizes they have the power to change their community."
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
