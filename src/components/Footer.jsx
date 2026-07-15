import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowUpRight, Mail, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo('.footer-brand-col',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        0
      );

      tl.fromTo('.footer-content-col:not(.footer-brand-col)',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
        0.2
      );

      tl.fromTo('.footer-link-item',
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.04 },
        0.4
      );

      tl.fromTo('.footer-big-text',
        { opacity: 0, scale: 1.15, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'power3.out' },
        0.3
      );

      tl.fromTo('.footer-divider',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power3.inOut' },
        0.6
      );

      tl.fromTo('.footer-bottom-bar > *',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 },
        0.8
      );

      tl.fromTo('.footer-social-icon',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)', stagger: 0.08 },
        0.5
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="premium-footer">
      <div className="footer-gradient-top" />
      <div className="footer-glow" />
      <div className="footer-glow-accent" />

      <div className="footer-inner">
        <div className="footer-content">
          {/* Column 1: Logo + Brand */}
          <div className="footer-content-col footer-brand-col">
            <Link to="/" className="footer-logo" data-cursor-hover>
              <Leaf className="footer-logo-icon" size={28} strokeWidth={1.5} />
              <span className="footer-logo-text">Legions.</span>
            </Link>
            <p className="footer-tagline">Youth-powered change in Dar es Salaam.</p>
            <p className="footer-description">
              A student-led organization dedicated to meeting the humanitarian
              and environmental needs of our city through collective action.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-icon" data-cursor-hover aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" className="footer-social-icon" data-cursor-hover aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="footer-social-icon" data-cursor-hover aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="mailto:hello@legionsclub.org" className="footer-social-icon" data-cursor-hover aria-label="Email">
                <Mail size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-content-col">
            <h5 className="footer-col-heading">Navigation</h5>
            <ul className="footer-link-list">
              <li className="footer-link-item"><Link to="/" data-cursor-hover>Home</Link></li>
              <li className="footer-link-item"><Link to="/about" data-cursor-hover>About Us</Link></li>
              <li className="footer-link-item"><Link to="/impact" data-cursor-hover>Our Impact</Link></li>
              <li className="footer-link-item"><Link to="/programs" data-cursor-hover>Programs</Link></li>
              <li className="footer-link-item"><Link to="/gallery" data-cursor-hover>Gallery</Link></li>
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div className="footer-content-col">
            <h5 className="footer-col-heading">Get Involved</h5>
            <ul className="footer-link-list">
              <li className="footer-link-item"><Link to="/get-involved" data-cursor-hover>Volunteer</Link></li>
              <li className="footer-link-item"><Link to="/get-involved" data-cursor-hover>Donate</Link></li>
              <li className="footer-link-item"><Link to="/get-involved" data-cursor-hover>Partner With Us</Link></li>
              <li className="footer-link-item"><Link to="/contact" data-cursor-hover>Contact</Link></li>
            </ul>
          </div>

          {/* Column 4: CTA */}
          <div className="footer-content-col footer-cta-col">
            <h5 className="footer-col-heading">Ready to make a difference?</h5>
            <p className="footer-cta-text">
              Join 139+ student volunteers building a better Dar es Salaam.
            </p>
            <Link to="/get-involved" className="footer-cta-btn" data-cursor-hover>
              <span>Get Involved</span>
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Big watermark text */}
        <div className="footer-big-text-wrapper">
          <svg className="footer-big-text" viewBox="0 0 1400 220" preserveAspectRatio="xMidYMid meet">
            <text
              x="50%"
              y="85%"
              textAnchor="middle"
              dominantBaseline="auto"
              className="footer-big-text-svg"
            >
              LEGIONS.
            </text>
          </svg>
        </div>

        {/* Divider */}
        <div className="footer-divider" />
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Legions Club. All rights reserved.
          </p>
          <div className="footer-credit">
            <span>Built with</span>
            <Heart size={12} fill="var(--color-accent-cyan)" color="var(--color-accent-cyan)" />
            <span>by the Legions Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
