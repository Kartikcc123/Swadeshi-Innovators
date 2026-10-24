import { useState } from 'react';
import { Check, ZoomIn, AlertCircle, Sparkles } from 'lucide-react';
import { DEFECT_CATEGORIES } from '../data/websiteContent';

export function ProductShowcase({ onOpenDemo, onOpenImageModal }) {
  const [selectedCategory, setSelectedCategory] = useState(DEFECT_CATEGORIES[0]);

  const capabilities = [
    {
      title: 'Real-Time Macro Frame Capture',
      desc: 'Acquires 1080p continuous optical frames under calibrated LED illumination across a 1-meter fabric inspection bed.',
    },
    {
      title: 'Multi-Class Anomaly Localization',
      desc: 'Predicts precise bounding box coordinates separating localized defects from standard woven fabric patterns.',
    },
    {
      title: 'Probabilistic Confidence Scoring',
      desc: 'Generates confidence metrics per detected region to distinguish definitive flaws from ambient yarn variations.',
    },
    {
      title: 'Accessible Edge Computing',
      desc: 'Runs locally on standard PC/laptop hardware without requiring cloud latency, data exposure, or expensive servers.',
    },
  ];

  const handleOpenDefectModal = () => {
    onOpenImageModal({
      src: selectedCategory.image,
      title: `${selectedCategory.name} — AI Inspection View`,
      subtitle: `${selectedCategory.category} • Severity: ${selectedCategory.severity}`,
      caption: `${selectedCategory.description} Evaluated under prototype laboratory optical capture with estimated confidence of ${selectedCategory.typicalConfidence}. Visual analysis: ${selectedCategory.visualDetail}`,
      tags: [
        { label: 'Defect Class', desc: selectedCategory.name },
        { label: 'Classification', desc: selectedCategory.category },
        { label: 'Severity Rating', desc: selectedCategory.severity },
        { label: 'Est. Confidence', desc: selectedCategory.typicalConfidence },
      ],
    });
  };

  return (
    <section className="section product-section" id="product" aria-labelledby="product-title">
      <div className="page-grid">
        {/* Section Header */}
        <div className="section-head text-center">
          <div className="prototype-status-tag">
            <Sparkles size={14} className="tag-sparkle" />
            <span>SANRACHNA IQTSX 2026 PROTOTYPE SHOWCASE</span>
          </div>
          <h2 id="product-title" className="section-title">
            Meet Weave Kiran
          </h2>
          <p className="section-lead max-w-760 mx-auto">
            Weave Kiran explores the use of AI-powered computer vision to identify visible defects in fabric samples and
            display their classifications and confidence scores through an inspection interface.
          </p>
        </div>

        {/* Product Overview Layout: Visual & Capabilities */}
        <div className="showcase-grid">
          {/* Left: Interactive Defect & Setup Visual */}
          <div className="showcase-visual-col">
            <div className="showcase-image-card">
              <div className="image-header">
                <div className="header-meta">
                  <span className="live-dot" />
                  <strong>Computer Vision Detection View</strong>
                </div>
                <button
                  type="button"
                  className="enlarge-btn"
                  onClick={handleOpenDefectModal}
                  aria-label="Enlarge current defect inspection view in medium size box"
                >
                  <ZoomIn size={15} />
                  <span>Enlarge View</span>
                </button>
              </div>

              <div
                className="showcase-image-wrap clickable-image-card"
                onClick={handleOpenDefectModal}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenDefectModal();
                  }
                }}
                aria-label={`Click to enlarge ${selectedCategory.name} inspection view in medium size box`}
              >
                <img
                  src={selectedCategory.image}
                  alt={`Weave Kiran inspection view showing ${selectedCategory.name}`}
                  className="showcase-img"
                />

                {/* Overlaid Detection Badge */}
                <div className="floating-detection-badge" style={{ borderColor: selectedCategory.color }}>
                  <div className="badge-tag-row">
                    <span className="badge-dot" style={{ backgroundColor: selectedCategory.color }} />
                    <span className="badge-name">{selectedCategory.name}</span>
                  </div>
                  <div className="badge-sub-row">
                    <span>Est. Confidence: {selectedCategory.typicalConfidence}</span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="visual-enlarge-overlay" aria-hidden="true">
                  <div className="visual-zoom-badge">
                    <ZoomIn size={15} />
                    <span>Click to Enlarge</span>
                  </div>
                </div>
              </div>

              <div className="image-caption-bar">
                <p>
                  <strong>Current View:</strong> {selectedCategory.visualDetail}
                </p>
                <small className="caption-disclaimer">* Demonstration evaluation visual</small>
              </div>
            </div>

            {/* Quick Category Selector Tabs */}
            <div className="defect-tab-selector" role="tablist" aria-label="Supported Defect Categories">
              {DEFECT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory.id === cat.id}
                  className={`defect-tab-btn ${selectedCategory.id === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <span className="tab-indicator" style={{ backgroundColor: cat.color }} />
                  <span className="tab-title">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Technical Capabilities & Defect Deep Dive */}
          <div className="showcase-info-col">
            <div className="prototype-notice-box">
              <AlertCircle size={18} className="notice-icon" />
              <div className="notice-content">
                <strong>Prototype Status:</strong>
                <p>
                  Currently in functional prototype stage. Model predictions represent laboratory evaluation samples and
                  are subject to continuous refinement.
                </p>
              </div>
            </div>

            <div className="active-category-details">
              <span className="cat-eyebrow">SELECTED DEFECT CLASS</span>
              <h3 className="cat-heading" style={{ color: selectedCategory.color }}>
                {selectedCategory.name}
              </h3>
              <p className="cat-desc">{selectedCategory.description}</p>

              <div className="cat-meta-grid">
                <div className="cat-meta-item">
                  <span className="cat-meta-label">Classification</span>
                  <strong className="cat-meta-val">{selectedCategory.category}</strong>
                </div>
                <div className="cat-meta-item">
                  <span className="cat-meta-label">Shopfloor Severity</span>
                  <strong className="cat-meta-val">{selectedCategory.severity}</strong>
                </div>
              </div>
            </div>

            {/* Core Capabilities */}
            <div className="capabilities-block">
              <h4 className="capabilities-title">Core System Capabilities</h4>
              <ul className="capabilities-list">
                {capabilities.map((cap, i) => (
                  <li key={i} className="capability-item">
                    <div className="cap-check">
                      <Check size={16} />
                    </div>
                    <div>
                      <strong>{cap.title}</strong>
                      <p>{cap.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="showcase-cta-row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onOpenDemo}
                aria-label="Launch Interactive Prototype Demo"
              >
                <span>Launch Interactive Demo</span>
              </button>
              <a href="#how-it-works" className="btn btn-outline">
                <span>View 4-Step Pipeline</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
