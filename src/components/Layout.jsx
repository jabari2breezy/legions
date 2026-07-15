import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';
import './Layout.css';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Impact', path: '/impact' },
    { name: 'Programs', path: '/programs' },
    { name: 'Get Involved', path: '/get-involved' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="layout-container">
      <header className="header glass-panel">
        <div className="header-content">
          <Link to="/" className="brand" onClick={closeMenu}>
            <Logo width={30} height={45} />
            <span className="brand-name">LEGIONS CLUB</span>
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
          </nav>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X color="var(--color-accent-cyan)" /> : <Menu color="var(--color-accent-cyan)" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="mobile-nav">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`nav-link mobile ${location.pathname === link.path ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer glass-panel">
        <div className="footer-content">
          <div className="footer-brand">
            <Logo width={40} height={60} />
            <div>
              <h3>Legions Club</h3>
              <p>Student-led. City-focused. Youth-powered.</p>
              <p className="footer-desc">A non-profit, student-led organisation addressing humanitarian and environmental needs across Dar es Salaam.</p>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <div className="link-grid">
              <Link to="/about">About</Link>
              <Link to="/impact">Impact</Link>
              <Link to="/programs">Programs</Link>
              <Link to="/get-involved">Get Involved</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <a href="https://instagram.com/legions.tz" target="_blank" rel="noopener noreferrer" className="social-link">
              <span>IG:</span> @legions.tz
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Legions Club. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
