import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './pages.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: 'volunteer',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTitle = containerRef.current.querySelector('.hero-title');
      if (heroTitle) {
        gsap.fromTo(heroTitle,
          { opacity: 0, y: 60, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out', delay: 1.4 }
        );
      }

      const heroSub = containerRef.current.querySelector('.hero-sub');
      if (heroSub) {
        gsap.fromTo(heroSub,
          { opacity: 0, y: 30 },
          { opacity: 0.6, y: 0, duration: 1, ease: 'power3.out', delay: 1.7 }
        );
      }

      const sections = containerRef.current.querySelectorAll('.section-transition');
      sections.forEach(section => {
        gsap.fromTo(section,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', reason: 'volunteer', message: '' });
  };

  return (
    <div ref={containerRef}>
      <section className="section hero">
        <div className="section__inner" style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
          <div className="container">
            <h1 className="heading-xl hero-title" style={{ opacity: 0 }}>Get in Touch</h1>
            <p className="text-body text-muted hero-sub" style={{ opacity: 0 }}>
              Have a question, want to partner, or ready to volunteer? Send us a message and our team will get back to you.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--darker section-transition">
        <div className="section__inner">
          <div className="container">
            <div className="contact-form-container">
              <div className="glass-card">
                <form onSubmit={handleSubmit}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Your email address"
                      />
                    </div>
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Phone (Optional)</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="reason" className="form-label">Reason for Contact *</label>
                      <select
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                      >
                        <option value="volunteer">I want to volunteer</option>
                        <option value="donate">I want to make a donation</option>
                        <option value="partner">Partnership inquiry</option>
                        <option value="project">Suggest a project</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} data-cursor-hover>
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
