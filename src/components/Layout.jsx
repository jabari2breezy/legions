import { useState, useEffect, useCallback } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import useLenis from '../hooks/useLenis';
import CustomCursor from './CustomCursor';
import LoadingIntro from './LoadingIntro';
import Footer from './Footer';
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

        <Footer />
      </div>
    </>
  );
}
