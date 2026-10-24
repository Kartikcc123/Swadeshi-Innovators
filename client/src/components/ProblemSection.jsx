import { Clock, EyeOff, Sliders, AlertTriangle } from 'lucide-react';
import { PROBLEM_CARDS } from '../data/websiteContent';

export function ProblemSection() {
  const iconMap = {
    Clock: <Clock size={22} className="problem-icon" />,
    EyeOff: <EyeOff size={22} className="problem-icon" />,
    Sliders: <Sliders size={22} className="problem-icon" />,
    AlertTriangle: <AlertTriangle size={22} className="problem-icon" />,
  };

  return (
    <section className="section problem-section" id="problem" aria-labelledby="problem-title">
      <div className="page-grid">
        <div className="section-head text-center">
          <span className="section-eyebrow">THE TEXTILE CHALLENGE</span>
          <h2 id="problem-title" className="section-title">
            Why Fabric Inspection Needs Innovation
          </h2>
          <p className="section-lead max-w-720 mx-auto">
            Textile manufacturing relies heavily on human visual examination. While skilled weavers and inspectors bring
            deep craft knowledge, the physical nature of high-volume fabric screening presents continuous practical
            hurdles.
          </p>
        </div>

        <div className="problem-grid">
          {PROBLEM_CARDS.map((card, idx) => (
            <div key={card.id} className="problem-card">
              <div className="problem-card-header">
                <div className="problem-icon-wrapper">{iconMap[card.icon]}</div>
                <span className="problem-idx">Issue 0{idx + 1}</span>
              </div>
              <h3 className="problem-card-title">{card.title}</h3>
              <p className="problem-card-desc">{card.description}</p>
              <div className="problem-impact-pill">
                <span className="impact-dot" />
                <span className="impact-text">{card.impact}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="problem-disclaimer">
          <p>
            <strong>Note on Scope:</strong> Weave Kiran does not replace skilled textile craftsmanship or claim to solve
            every manufacturing variation. It explores an accessible, supplementary tool to assist operators and catch
            visible surface flaws early in production.
          </p>
        </div>
      </div>
    </section>
  );
}
