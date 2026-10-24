import { ArrowUp, Mail } from 'lucide-react';
import { BRAND_CONFIG, NAV_LINKS } from '../data/websiteContent';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      {/* Subtle Refined Tricolour Top Accent Ribbon */}
      <div className="footer-accent-strip" aria-hidden="true">
        <span className="strip-saffron" />
        <span className="strip-white" />
        <span className="strip-green" />
      </div>

      <div className="page-grid footer-main-grid">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-brand">
            <img
              src="/assets/swadeshi_logo.png"
              alt="Swadeshi Innovators Logo"
              className="footer-logo-img"
            />
            <div className="brand-text">
              <span className="brand-title">
                <strong>Swadeshi</strong> <em>Innovators</em>
              </span>
            </div>
          </div>

          <p className="footer-desc">
            Weave Kiran is an AI-powered fabric inspection prototype developed for <strong>{BRAND_CONFIG.competition}</strong>,
            exploring accessible computer vision to identify fabric defects, minimize avoidable waste, and support self-reliant
            textile manufacturing.
          </p>

          <div className="footer-contact-link">
            <Mail size={15} />
            <a href={`mailto:${BRAND_CONFIG.contactEmail}`}>{BRAND_CONFIG.contactEmail}</a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-links-list">
            {NAV_LINKS.slice(0, 5).map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Deep Dive Links Column */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Prototype & Story</h4>
          <ul className="footer-links-list">
            {NAV_LINKS.slice(5).map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Competition Context Column */}
        <div className="footer-comp-col">
          <h4 className="footer-col-title">Innovation Entry</h4>
          <div className="comp-card">
            <span className="comp-badge">{BRAND_CONFIG.competition}</span>
            <p className="comp-text">
              Demonstrating student-led frugal engineering in computer vision, textile quality automation, and resource
              stewardship for a self-reliant Bharat.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="page-grid footer-bottom-bar">
        <div className="bottom-copy">
          <p>© {currentYear} Swadeshi Innovators. Built with intent for a sustainable textile future.</p>
        </div>

        <div className="bottom-meta">
          <span>Sanrachna IQTSX 2026 Evaluation Website</span>
          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
