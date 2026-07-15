import React from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import './pages.css';

export default function GetInvolved() {
  useScrollReveal();

  return (
    <>
      <section className="section hero">
        <div className="section__inner" style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
          <div className="container">
            <h1 className="heading-xl reveal">Join the Movement</h1>
            <p className="text-body text-muted reveal" data-delay="1">
              Whether you have time to give, resources to share, or a platform to amplify our message, there's a place for you here.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--darker">
        <div className="section__inner">
          <div className="container">
            <div className="grid-2">
              <div className="glass-card reveal" data-delay="1">
                <h3 className="heading-md" style={{ fontSize: '1.75rem' }}>Volunteer</h3>
                <p className="text-body text-muted" style={{ marginBottom: '2rem' }}>
                  Join our network of student changemakers. Participate in tree planting, hospital visits, event organizing, and community outreach. No prior experience needed—just a willingness to show up and work hard.
                </p>
                <Link to="/contact" className="btn-primary">Apply to Volunteer</Link>
              </div>
              <div className="glass-card reveal" data-delay="2">
                <h3 className="heading-md" style={{ fontSize: '1.75rem' }}>Donate</h3>
                <p className="text-body text-muted" style={{ marginBottom: '2rem' }}>
                  100% of public donations go directly to our project funds. Your financial support buys saplings, construction materials, food packages, and medical supplies for the communities we serve.
                </p>
                <Link to="/contact" className="btn-outline">Make a Donation</Link>
              </div>
              <div className="glass-card reveal" data-delay="3">
                <h3 className="heading-md" style={{ fontSize: '1.75rem' }}>Partner With Us</h3>
                <p className="text-body text-muted" style={{ marginBottom: '2rem' }}>
                  Are you a school looking to start a Legions chapter? A business wanting to sponsor a project? Or an NGO looking to collaborate? We are always looking for partners to scale our impact.
                </p>
                <Link to="/contact" className="btn-outline">Discuss Partnership</Link>
              </div>
              <div className="glass-card reveal" data-delay="4">
                <h3 className="heading-md" style={{ fontSize: '1.75rem' }}>Spread the Word</h3>
                <p className="text-body text-muted" style={{ marginBottom: '2rem' }}>
                  Follow us on social media, share our campaigns, and tell your friends about our work. Awareness is the first step to action.
                </p>
                <div className="btn-group">
                  <a href="#" className="btn-outline" style={{ padding: '0.75rem 1.5rem' }}>Instagram</a>
                  <a href="#" className="btn-outline" style={{ padding: '0.75rem 1.5rem' }}>Twitter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="section__inner">
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 className="heading-lg reveal text-serif" style={{ textAlign: 'center', marginBottom: '3rem' }}>FAQ</h2>
            <div className="glass-card reveal">
              <div style={{ marginBottom: '2rem' }}>
                <h4 className="heading-md">Who can join Legions Club?</h4>
                <p className="text-body text-muted">Currently, our volunteer base is made up of high school and university students based in Dar es Salaam. However, anyone can support our work through donations or partnerships.</p>
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <h4 className="heading-md">How are donations used?</h4>
                <p className="text-body text-muted">We maintain strict transparency. Operational costs are kept to a bare minimum and are covered internally. 100% of external donations are deployed directly into our humanitarian and environmental projects.</p>
              </div>
              <div>
                <h4 className="heading-md">Can I suggest a project idea?</h4>
                <p className="text-body text-muted">Yes! We are community-centered. If you know of an urgent need in Dar es Salaam that aligns with our mission, please reach out via our contact page.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
