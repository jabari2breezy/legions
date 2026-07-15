import { useState, useEffect, useCallback } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import useLenis from '../hooks/useLenis';
import CustomCursor from './CustomCursor';
import LoadingIntro from './LoadingIntro';
import './Layout.css';

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const lenisRef = useLenis();

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    setMobileMenuOpen(false);
  }, [location.pathname, lenisRef]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Impact', path: '/impact' },
    { name: 'Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <CustomCursor />
      {isLoading && <LoadingIntro onComplete={handleLoadComplete} />}

      <div className="app-wrapper" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
          <div className="container">
            <Link to="/" className="logo">
              <Leaf className="logo-icon" size={28} strokeWidth={1.5} />
              <span className="logo-text">Legions.</span>
            </Link>

            <nav className="desktop-nav">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  data-cursor-hover
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/get-involved" className="btn-primary" style={{ padding: '0.75rem 1.5rem' }} data-cursor-hover>
                Get Involved
              </Link>
            </nav>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </header>

        <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'is-open' : ''}`}>
          <div className="mobile-nav-links">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className="mobile-nav-link"
                style={{ transitionDelay: mobileMenuOpen ? `${index * 0.1}s` : '0s' }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/get-involved"
              className="mobile-nav-link text-accent"
              style={{ transitionDelay: mobileMenuOpen ? `${navLinks.length * 0.1}s` : '0s' }}
            >
              Get Involved
            </Link>
          </div>
        </div>

        <main>
          <Outlet />
        </main>

        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand reveal-up">
                <Link to="/" className="logo" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
                  <Leaf className="logo-icon" size={28} strokeWidth={1.5} />
                  <span className="logo-text">Legions Club.</span>
                </Link>
                <p className="text-muted">
                  A student-led organization dedicated to meeting the humanitarian and environmental needs of Dar es Salaam.
                </p>
              </div>

              <div className="reveal-up" data-delay="1">
                <h4 className="footer-heading">Quick Links</h4>
                <ul className="footer-links">
                  <li><Link to="/about" data-cursor-hover>About Us</Link></li>
                  <li><Link to="/impact" data-cursor-hover>Our Impact</Link></li>
                  <li><Link to="/programs" data-cursor-hover>Programs</Link></li>
                  <li><Link to="/get-involved" data-cursor-hover>Get Involved</Link></li>
                </ul>
              </div>

              <div className="reveal-up" data-delay="2">
                <h4 className="footer-heading">Connect</h4>
                <ul className="footer-links">
                  <li><a href="mailto:hello@legionsclub.org" data-cursor-hover>Email Us</a></li>
                  <li><a href="#" data-cursor-hover>Instagram</a></li>
                  <li><a href="#" data-cursor-hover>Twitter</a></li>
                  <li><a href="#" data-cursor-hover>Facebook</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom reveal-up" data-delay="3">
              <p className="text-muted">© {new Date().getFullYear()} Legions Club. All rights reserved.</p>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <a href="#" className="text-muted" data-cursor-hover>Twitter</a>
                <a href="#" className="text-muted" data-cursor-hover>Facebook</a>
                <a href="mailto:hello@legionsclub.org" className="text-muted" data-cursor-hover>Email</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
