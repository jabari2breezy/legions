import React from 'react';
import './pages.css';

export default function Contact() {
  return (
    <div className="page-container contact-page">
      <section className="section">
        <div className="section-content text-center">
          <h1 className="hero-title text-glow">Get in Touch</h1>
          <p className="lead-text">
            Have a question, want to volunteer, or interested in partnering with us? Reach out.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="section-content">
          <div className="glass-panel" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your Name" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Your Email" required />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number (Optional)</label>
                <input type="tel" id="phone" placeholder="Your Phone Number" />
              </div>

              <div className="form-group">
                <label htmlFor="reason">Reason for Contact</label>
                <select id="reason" required>
                  <option value="">Select a reason...</option>
                  <option value="volunteering">Volunteering</option>
                  <option value="donations">Donations</option>
                  <option value="partnership">Partnership</option>
                  <option value="media">Media</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Your Message" required></textarea>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
