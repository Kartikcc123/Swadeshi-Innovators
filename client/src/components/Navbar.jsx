import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG } from '../data/websiteContent';

export function Navbar({ onOpenDemo, activeSection = 'top' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#top', label: 'Home', id: 'top' },
    { href: '#initiative', label: 'Our Initiative', id: 'initiative' },
    { href: '#product', label: 'Weave Kiran', id: 'product' },
    { href: '#how-it-works', label: 'How It Works', id: 'how-it-works' },
    { href: '#sustainability', label: 'Sustainability', id: 'sustainability' },
    { href: '#team', label: 'Team', id: 'team' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner page-grid">
        {/* Brand Logo */}
        <a href="#top" className="brand" aria-label="Swadeshi Innovators - Home">
          <img
            src="/assets/swadeshi_logo.png"
            alt="Swadeshi Innovators Logo"
            className="brand-logo-img"
          />
          <div className="brand-text">
            <span className="brand-title">
              <strong>Swadeshi</strong> <em>Innovators</em>
            </span>
            <small className="brand-sub">INNOVATE • BUILD • FOR A SELF-RELIANT BHARAT</small>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Primary Navigation">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="header-actions">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={onOpenDemo}
            aria-label="Launch Live Prototype Demo"
          >
            <span>Live Demo</span>
            <ArrowUpRight size={16} />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <div className="mobile-competition-badge">
            <span>{BRAND_CONFIG.competition}</span>
          </div>
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`mobile-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mobile-cta-box">
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={() => {
                setMenuOpen(false);
                onOpenDemo();
              }}
            >
              <span>Explore Prototype Demo</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
