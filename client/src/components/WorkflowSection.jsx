import { useState } from 'react';
import { Camera, Cpu, Scan, LayoutDashboard, ArrowRight, CheckCircle2 } from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/websiteContent';

export function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);

  const iconMap = {
    Camera: <Camera size={26} />,
    Cpu: <Cpu size={26} />,
    Scan: <Scan size={26} />,
    LayoutDashboard: <LayoutDashboard size={26} />,
  };

  const current = WORKFLOW_STEPS[activeStep];

  return (
    <section className="section workflow-section" id="how-it-works" aria-labelledby="workflow-title">
      <div className="page-grid">
        <div className="section-head text-center">
          <span className="section-eyebrow">SYSTEM ARCHITECTURE</span>
          <h2 id="workflow-title" className="section-title">
            From Fabric to Insight
          </h2>
          <p className="section-lead max-w-720 mx-auto">
            A clean, edge-friendly four-stage inspection workflow that turns continuous optical fabric feed into actionable
            quality classifications without expensive server hardware.
          </p>
        </div>

        {/* 4 Connected Cards Grid */}
        <div className="workflow-grid">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <div
                key={step.step}
                className={`workflow-card ${isCurrent ? 'active' : ''}`}
                onClick={() => setActiveStep(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveStep(idx);
                }}
                aria-label={`Step ${step.step}: ${step.title}`}
              >
                <div className="wf-card-top">
                  <span className="wf-number">Step {step.step}</span>
                  <div className={`wf-icon-box ${isCurrent ? 'active-icon' : ''}`}>
                    {iconMap[step.icon]}
                  </div>
                </div>

                <h3 className="wf-title">{step.title}</h3>
                <span className="wf-sub">{step.subtitle}</span>
                <p className="wf-desc">{step.description}</p>

                <div className="wf-tech-tag">
                  <span>{step.technicalNote}</span>
                </div>

                {idx < WORKFLOW_STEPS.length - 1 && (
                  <div className="wf-connector" aria-hidden="true">
                    <ArrowRight size={18} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Interactive Deep-Dive Detail Box */}
        <div className="workflow-detail-box">
          <div className="detail-box-badge">
            <CheckCircle2 size={16} />
            <span>Active Stage: Step {current.step} — {current.title}</span>
          </div>
          <div className="detail-box-content">
            <div className="detail-left">
              <h4>{current.subtitle}</h4>
              <p>{current.description}</p>
            </div>
            <div className="detail-right">
              <span className="detail-meta-label">Technical Specification</span>
              <p className="detail-spec-text">{current.technicalNote}</p>
              <div className="step-switcher">
                <button
                  type="button"
                  className="step-switch-btn"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                >
                  Previous
                </button>
                <span className="step-count">
                  {activeStep + 1} of {WORKFLOW_STEPS.length}
                </span>
                <button
                  type="button"
                  className="step-switch-btn"
                  disabled={activeStep === WORKFLOW_STEPS.length - 1}
                  onClick={() => setActiveStep((prev) => Math.min(WORKFLOW_STEPS.length - 1, prev + 1))}
                >
                  Next Stage
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
