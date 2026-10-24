import { CheckCircle2, Recycle, Building2, Sprout } from 'lucide-react';
import { SUSTAINABILITY_PILLARS } from '../data/websiteContent';

export function SustainabilitySection() {
  const iconMap = {
    CheckCircle2: <CheckCircle2 size={24} className="sustain-icon" />,
    Recycle: <Recycle size={24} className="sustain-icon" />,
    Building2: <Building2 size={24} className="sustain-icon" />,
    Sprout: <Sprout size={24} className="sustain-icon" />,
  };

  return (
    <section className="section sustainability-section" id="sustainability" aria-labelledby="sustainability-title">
      <div className="page-grid">
        <div className="sustainability-container">
          {/* Top Two-Column Overview */}
          <div className="sustainability-hero-row">
            <div className="sustainability-copy">
              <span className="section-eyebrow text-green">RESPONSIBLE MANUFACTURING</span>
              <h2 id="sustainability-title" className="section-title">
                Better Inspection. Less Avoidable Waste.
              </h2>
              <p className="section-lead">
                In traditional textile supply chains, unnoticed yarn imperfections and chemical spots travel downstream
                through scouring, bleaching, dyeing, and garment cutting — where discarding flawed finished garments
                multiplies water, energy, and material waste.
              </p>
              <p className="sustainability-sublead">
                Weave Kiran is designed to support decentralized textile units with earlier flaw detection, aiming to reduce
                avoidable material discard and foster more resource-conscious manufacturing across India.
              </p>
            </div>

            <div className="sustainability-image-card">
              <img
                src="/assets/textile_sustainability.jpg"
                alt="Natural cotton yarn spools, handwoven khadi fabric, and raw cotton bolls representing sustainable Indian textile heritage"
                className="sustainability-img"
              />
              <div className="sustainability-image-tag">
                <span>Indian Textile Craftsmanship & Sustainable Innovation</span>
              </div>
            </div>
          </div>

          {/* 4 Impact Pillars Grid */}
          <div className="sustainability-pillars-grid">
            {SUSTAINABILITY_PILLARS.map((pillar, idx) => (
              <div key={idx} className="pillar-card">
                <div className="pillar-icon-box">{iconMap[pillar.icon]}</div>
                <h3 className="pillar-title">{pillar.title}</h3>
                <p className="pillar-desc">{pillar.description}</p>
              </div>
            ))}
          </div>

          {/* Environmental Scope Notice */}
          <div className="sustainability-footer-box">
            <div className="footer-box-content">
              <h4>Objective Evaluation & Sustainability Impact</h4>
              <p>
                As an early-stage prototype for Sanrachna IQTSX 2026, sustainability outcomes represent targeted impact
                goals rather than verified commercial lifecycle assessments. Controlled pilot trials in local weaving clusters
                are currently being planned to measure exact material savings and scrap reduction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
