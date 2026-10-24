import { Laptop, Camera, Eye, Network, Terminal, Cpu, Wrench, Sun } from 'lucide-react';
import { HARDWARE_COMPONENTS } from '../data/websiteContent';

export function ResourceGrid() {
  const iconMap = {
    Laptop: <Laptop size={22} />,
    Camera: <Camera size={22} />,
    Eye: <Eye size={22} />,
    Network: <Network size={22} />,
    Terminal: <Terminal size={22} />,
    Cpu: <Cpu size={22} />,
    Wrench: <Wrench size={22} />,
    Sun: <Sun size={22} />,
  };

  return (
    <section className="section resources-section" id="resources" aria-labelledby="resources-title">
      <div className="page-grid">
        <div className="section-head text-center">
          <span className="section-eyebrow">PRACTICAL & FRUGAL ENGINEERING</span>
          <h2 id="resources-title" className="section-title">
            Innovation Without Expensive Infrastructure
          </h2>
          <p className="section-lead max-w-760 mx-auto">
            Industrial inspection systems routinely cost lakhs, demanding specialized air-conditioned enclosures and
            proprietary hardware. Weave Kiran explores an alternative: high-accuracy edge vision built with widely
            accessible, off-the-shelf components.
          </p>
        </div>

        {/* Central Brand Highlight Quote */}
        <div className="resources-highlight-banner">
          <p className="banner-quote">
            “Designed around accessible hardware and open-source software, with the goal of exploring a more affordable
            approach to fabric inspection.”
          </p>
        </div>

        {/* Components Grid */}
        <div className="resource-components-grid">
          {HARDWARE_COMPONENTS.map((item, idx) => {
            const isPlanned = item.status.includes('Planned');
            return (
              <div key={idx} className={`resource-card ${isPlanned ? 'status-planned' : 'status-implemented'}`}>
                <div className="resource-card-top">
                  <div className="resource-icon-wrap">{iconMap[item.icon] || <Cpu size={22} />}</div>
                  <span className={`status-pill ${isPlanned ? 'pill-planned' : 'pill-implemented'}`}>
                    {item.status}
                  </span>
                </div>

                <div className="resource-body">
                  <span className="resource-category">{item.category}</span>
                  <h3 className="resource-name">{item.name}</h3>
                  <p className="resource-purpose">{item.purpose}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Public Disclosure & IP Protection Notice */}
        <div className="ip-notice-bar">
          <p>
            <strong>Intellectual Property & Academic Notice:</strong> High-level system overview displayed for Sanrachna
            IQTSX 2026 innovation evaluation. Detailed internal model weights, training datasets, and proprietary trigger
            schematics remain protected.
          </p>
        </div>
      </div>
    </section>
  );
}
