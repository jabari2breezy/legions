import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowUpRight } from 'lucide-react';
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

      tl.fromTo('.footer-content-col',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 },
        0
      );

      tl.fromTo('.footer-big-text',
        { opacity: 0, scale: 1.1, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        0.3
      );

      tl.fromTo('.footer-bottom-bar',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        0.5
      );

      tl.fromTo('.footer-credit',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.7
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="premium-footer">
      {/* Top gradient fade from page bg */}
      <div className="footer-gradient-top" />

      {/* Background glow */}
      <div className="footer-glow" />

      <div className="footer-inner">
        {/* Main content grid */}
        <div className="footer-content">
          {/* Column 1: Logo + Brand */}
          <div className="footer-content-col footer-brand-col">
            <Link to="/" className="footer-logo" data-cursor-hover>
              <Leaf className="footer-logo-icon" size={28} strokeWidth={1.5} />
              <span className="footer-logo-text">Legions.</span>
            </Link>
            <h5 className="footer-tagline">Youth-powered change in Dar es Salaam.</h5>
            <p className="footer-description">
              A student-led organization dedicated to meeting the humanitarian
              and environmental needs of our city through collective action.
            </p>
            <Link to="/get-involved" className="footer-cta-btn" data-cursor-hover>
              <span>Get Involved</span>
              <ArrowUpRight size={16} strokeWidth={2} />
            </Link>
          </div>

          {/* Column 2: Menu */}
          <div className="footer-content-col">
            <h5 className="footer-col-heading">Menu</h5>
            <ul className="footer-link-list">
              <li><Link to="/" data-cursor-hover>Home</Link></li>
              <li><Link to="/about" data-cursor-hover>About Us</Link></li>
              <li><Link to="/impact" data-cursor-hover>Our Impact</Link></li>
              <li><Link to="/programs" data-cursor-hover>Programs</Link></li>
              <li><Link to="/gallery" data-cursor-hover>Gallery</Link></li>
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div className="footer-content-col">
            <h5 className="footer-col-heading">Get Involved</h5>
            <ul className="footer-link-list">
              <li><Link to="/get-involved" data-cursor-hover>Volunteer</Link></li>
              <li><Link to="/get-involved" data-cursor-hover>Donate</Link></li>
              <li><Link to="/get-involved" data-cursor-hover>Partner With Us</Link></li>
              <li><Link to="/contact" data-cursor-hover>Contact</Link></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="footer-content-col">
            <h5 className="footer-col-heading">Connect</h5>
            <ul className="footer-link-list">
              <li><a href="mailto:hello@legionsclub.org" data-cursor-hover>Email Us</a></li>
              <li><a href="#" data-cursor-hover>Instagram</a></li>
              <li><a href="#" data-cursor-hover>Twitter / X</a></li>
              <li><a href="#" data-cursor-hover>Facebook</a></li>
            </ul>
          </div>
        </div>

        {/* Big watermark text */}
        <div className="footer-big-text-wrapper">
          <svg className="footer-big-text" viewBox="0 0 1400 280" preserveAspectRatio="xMidYMid meet">
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
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Legions Club. All rights reserved.
          </p>
          <div className="footer-credit">
            <span>Built with</span>
            <span className="footer-heart">💙</span>
            <span>by the Legions Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
