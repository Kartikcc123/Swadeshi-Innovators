import { Play, ArrowDown, Award, Scan, ShieldCheck, Cpu, Maximize2, ZoomIn } from 'lucide-react';
import { BRAND_CONFIG } from '../data/websiteContent';

export function Hero({ onOpenDemo, onOpenVideo, onOpenImageModal }) {
  const scrollToInitiative = () => {
    const el = document.getElementById('initiative');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenPrototypeModal = () => {
    onOpenImageModal({
      src: '/assets/image.png',
      title: 'Weave Kiran — Benchtop Prototype Setup',
      subtitle: 'Sanrachna IQTSX 2026 • Official Hardware & Software Prototype',
      caption:
        'Authentic working benchtop prototype built from scratch by Swadeshi Innovators. Combines overhead high-resolution optical sensing, Arduino-controlled 1-meter fabric transport, and real-time computer vision defect classification.',
      tags: [
        { label: 'Laptop & Software', desc: 'FastAPI backend, OpenCV, YOLO defect detector & interactive dashboard' },
        { label: 'Hardware Rig', desc: 'Arduino Uno, motor driver, ultrasonic sensor, power cells & custom bed' },
        { label: 'Optical Rig', desc: 'Calibrated overhead USB camera & diffused LED ring light' },
        { label: 'Fabric Test Bed', desc: '1.0 meter continuous rolling fabric inspection bed' },
      ],
    });
  };

  return (
    <section className="hero-section" id="top" aria-label="Hero Overview">
      <div className="page-grid hero-grid">
        {/* Left Column: Copy & Actions */}
        <div className="hero-content">
          <div className="competition-badge" role="status">
            <Award className="badge-icon" size={15} />
            <span className="badge-team">{BRAND_CONFIG.competition}</span>
            <span className="badge-divider" />
            <span className="badge-tag">Innovation Entry</span>
          </div>

          <h1 className="hero-headline">
            {BRAND_CONFIG.primaryHeadline.start}
            <span className="highlight-saffron">{BRAND_CONFIG.primaryHeadline.saffronHighlight}</span>
            {BRAND_CONFIG.primaryHeadline.middle}
            <span className="highlight-green">{BRAND_CONFIG.primaryHeadline.greenHighlight}</span>
            {BRAND_CONFIG.primaryHeadline.end}
          </h1>

          <p className="hero-description">{BRAND_CONFIG.heroDescription}</p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={scrollToInitiative}
              aria-label="Explore Weave Kiran Project Details"
            >
              <span>Explore Our Project</span>
              <ArrowDown size={18} />
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={onOpenVideo || onOpenDemo}
              aria-label="Watch Prototype Demo or Simulation"
            >
              <Play size={17} className="btn-icon-play" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Supporting line */}
          <div className="hero-supporting-line" aria-label="Core Pillars">
            <div className="pillar-item">
              <span className="dot saffron-dot" />
              <span>Affordable Innovation</span>
            </div>
            <span className="pillar-sep">•</span>
            <div className="pillar-item">
              <span className="dot green-dot" />
              <span>Smart Inspection</span>
            </div>
            <span className="pillar-sep">•</span>
            <div className="pillar-item">
              <span className="dot navy-dot" />
              <span>Sustainable Textiles</span>
            </div>
          </div>
        </div>

        {/* Right Column: Authentic Product Visual & Prototype Inspection Rig */}
        <div className="hero-visual-col">
          <div className="product-visual-card">
            {/* Image Container - Click anywhere to open medium size clear box */}
            <div
              className="visual-media-wrapper clickable-image-card"
              onClick={handleOpenPrototypeModal}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenPrototypeModal();
                }
              }}
              aria-label="Click to enlarge Weave Kiran prototype setup image in medium size clear box"
            >
              <img
                src="/assets/image.png"
                alt="Weave Kiran engineering prototype showing overhead USB camera, ring light, 1-meter fabric inspection bed, and laptop running computer vision software"
                className="visual-img"
                loading="eager"
              />

              {/* Status Pill */}
              <div className="visual-status-pill">
                <span className="live-pulse" />
                <span>Prototype Setup v1.2</span>
              </div>

              {/* Hover Overlay with Clear Enlarge Prompt */}
              <div className="visual-enlarge-overlay" aria-hidden="true">
                <div className="visual-zoom-badge">
                  <ZoomIn size={16} />
                  <span>Click to Enlarge (HD View)</span>
                </div>
              </div>

              {/* Quick Image Zoom Button */}
              <button
                type="button"
                className="visual-zoom-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenPrototypeModal();
                }}
                aria-label="Enlarge prototype setup image in medium size box"
              >
                <Maximize2 size={13} />
                <span>Enlarge</span>
              </button>
            </div>

            {/* Restrained Metric Cards Grid (Demonstration Data) */}
            <div className="hero-metrics-grid">
              <div className="metric-box">
                <div className="metric-icon-wrap icon-blue">
                  <Scan size={18} />
                </div>
                <div className="metric-text">
                  <span className="metric-value">~92.4%</span>
                  <span className="metric-label">Defect Confidence</span>
                </div>
              </div>

              <div className="metric-box">
                <div className="metric-icon-wrap icon-saffron">
                  <Cpu size={18} />
                </div>
                <div className="metric-text">
                  <span className="metric-value">1.0 m</span>
                  <span className="metric-label">Fabric Test Bed</span>
                </div>
              </div>

              <div className="metric-box">
                <div className="metric-icon-wrap icon-green">
                  <ShieldCheck size={18} />
                </div>
                <div className="metric-text">
                  <span className="metric-value">Active</span>
                  <span className="metric-label">Multi-Class Scan</span>
                </div>
              </div>
            </div>

            {/* Prototype Evaluation Note */}
            <div className="demo-data-note">
              <span>* Labeled demonstration data from prototype laboratory evaluation.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
