import { Layers, Cpu, Leaf, ArrowRight } from 'lucide-react';
import { VALUE_PROPOSITIONS } from '../data/websiteContent';

export function Initiative() {
  const iconMap = {
    Layers: <Layers size={22} />,
    Cpu: <Cpu size={22} />,
    Leaf: <Leaf size={22} />,
  };

  return (
    <section className="section initiative-section" id="initiative" aria-labelledby="initiative-title">
      <div className="page-grid">
        {/* Section Header */}
        <div className="section-head text-center">
          <span className="section-eyebrow">OUR VISION & PURPOSE</span>
          <h2 id="initiative-title" className="section-title">
            Our Initiative
          </h2>
          <p className="section-lead max-w-720 mx-auto">
            Our initiative focuses on making fabric inspection smarter and more accessible. By combining computer vision
            with affordable hardware, we aim to explore practical ways to identify fabric defects, support quality
            awareness, and reduce avoidable textile waste.
          </p>
        </div>

        {/* 3 Value Propositions Grid */}
        <div className="value-props-grid">
          {VALUE_PROPOSITIONS.map((prop, idx) => (
            <div key={prop.id} className="value-card">
              <div className="card-top">
                <div className="value-icon-box">{iconMap[prop.icon] || <Cpu size={22} />}</div>
                <span className="value-badge">{prop.tag}</span>
              </div>
              <h3 className="value-title">{prop.title}</h3>
              <p className="value-description">{prop.description}</p>
              <div className="value-card-footer">
                <span className="value-number">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Sub-callout */}
        <div className="initiative-editorial-banner">
          <div className="banner-text">
            <span className="banner-quote-mark">“</span>
            <p>
              Small innovations built with intent, designed for Indian textile clusters to foster quality, self-reliance,
              and sustainable production.
            </p>
          </div>
          <a href="#product" className="banner-link">
            <span>Explore Weave Kiran</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
