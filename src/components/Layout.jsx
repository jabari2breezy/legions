import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Layout.css';

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useScrollReveal();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle header scroll background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
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
    <div className="app-wrapper">
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <Link to="/" className="logo">
            <Leaf className="logo-icon" size={32} />
            <span className="logo-text">Legions.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/get-involved" className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
              Get Involved
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay Navigation */}
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
            <div className="footer-brand reveal">
              <Link to="/" className="logo">
                <Leaf className="logo-icon" size={32} />
                <span className="logo-text">Legions Club.</span>
              </Link>
              <p className="text-muted">
                A student-led organization dedicated to meeting the humanitarian and environmental needs of Dar es Salaam.
              </p>
            </div>
            
            <div className="reveal" data-delay="1">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/impact">Our Impact</Link></li>
                <li><Link to="/programs">Programs</Link></li>
                <li><Link to="/get-involved">Get Involved</Link></li>
              </ul>
            </div>
            
            <div className="reveal" data-delay="2">
              <h4 className="footer-heading">Connect</h4>
              <ul className="footer-links">
                <li><a href="mailto:hello@legionsclub.org">Email Us</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Facebook</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom reveal" data-delay="3">
            <p className="text-muted">© {new Date().getFullYear()} Legions Club. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" className="text-muted">Twitter</a>
              <a href="#" className="text-muted">Facebook</a>
              <a href="mailto:hello@legionsclub.org" className="text-muted">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
