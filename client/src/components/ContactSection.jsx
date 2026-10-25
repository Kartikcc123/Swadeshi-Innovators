import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Building, Handshake, Lightbulb } from 'lucide-react';
import { BRAND_CONFIG } from '../data/websiteContent';
import { apiUrl } from '../data/api';

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', category: 'collaboration', message: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' }); // 'idle' | 'loading' | 'success' | 'error'

  const categories = [
    { value: 'collaboration', label: 'Academic & Tech Collaboration' },
    { value: 'textile-industry', label: 'Textile Industry & Mill Feedback' },
    { value: 'sponsorship', label: 'Competition Sponsorship & Support' },
    { value: 'pilot-testing', label: 'Fabric Pilot Testing Enquiry' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    setStatus({ state: 'loading', message: 'Submitting enquiry…' });

    try {
      const response = await fetch(apiUrl('/api/inquiries'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: `[Category: ${form.category}] ${form.message.trim()}`,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus({
          state: 'success',
          message: data.message || 'Thank you! Your enquiry has been received by Swadeshi Innovators.',
        });
        setForm({ name: '', email: '', category: 'collaboration', message: '' });
      } else {
        setStatus({
          state: 'error',
          message: data.message || 'Unable to submit enquiry at this time. Please email us directly.',
        });
      }
    } catch {
      // Backend is either offline or proxying isn't available
      setStatus({
        state: 'error',
        message: `Network error reaching API. Please write directly to ${BRAND_CONFIG.contactEmail}.`,
      });
    }
  };

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="page-grid">
        <div className="contact-grid">
          {/* Left Column: Context & Direct Channels */}
          <div className="contact-info-col">
            <span className="section-eyebrow">GET IN TOUCH</span>
            <h2 id="contact-title" className="section-title">
              Connect with Swadeshi Innovators
            </h2>
            <p className="contact-lead">
              We welcome dialogue with textile mills, weaving cooperatives, academic researchers, and industry mentors
              interested in practical computer vision for sustainable textile inspection.
            </p>

            <div className="contact-purposes-list">
              <div className="purpose-item">
                <div className="purpose-icon"><Handshake size={18} /></div>
                <div>
                  <strong>Collaboration & Partnerships</strong>
                  <p>Explore academic research or joint technology development.</p>
                </div>
              </div>

              <div className="purpose-item">
                <div className="purpose-icon"><Building size={18} /></div>
                <div>
                  <strong>Textile Industry Feedback</strong>
                  <p>Share shopfloor quality insights and fabric defect datasets.</p>
                </div>
              </div>

              <div className="purpose-item">
                <div className="purpose-icon"><Lightbulb size={18} /></div>
                <div>
                  <strong>Sanrachna IQTSX 2026 Mentorship</strong>
                  <p>Engage with our student team for competition guidance.</p>
                </div>
              </div>
            </div>

            {/* Direct Email Card */}
            <div className="direct-email-card">
              <div className="direct-email-head">
                <Mail size={18} className="text-saffron" />
                <span>Official Project Enquiry</span>
              </div>
              <a href={`mailto:${BRAND_CONFIG.contactEmail}`} className="direct-email-link">
                {BRAND_CONFIG.contactEmail}
              </a>
              <small className="direct-email-sub">Monitored by the Swadeshi Innovators core project team.</small>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-form-col">
            <div className="form-card">
              <div className="form-head">
                <MessageSquare size={20} className="text-saffron" />
                <h3>Send an Enquiry</h3>
              </div>

              {status.state === 'success' ? (
                <div className="alert-box alert-success" role="alert">
                  <CheckCircle2 size={24} className="alert-icon" />
                  <div>
                    <strong>Enquiry Transmitted</strong>
                    <p>{status.message}</p>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm mt-3"
                      onClick={() => setStatus({ state: 'idle', message: '' })}
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                  {status.state === 'error' && (
                    <div className="alert-box alert-error" role="alert">
                      <AlertCircle size={20} className="alert-icon" />
                      <div>
                        <strong>Notice:</strong>
                        <p>{status.message}</p>
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="contact-name">
                      Your Name <span className="req">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">
                      Work / Personal Email <span className="req">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. rajesh@textiles.in"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-category">Enquiry Purpose</label>
                    <select
                      id="contact-category"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="form-select"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">
                      Message / Discussion Topics
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Tell us about your mill requirements, evaluation questions, or partnership ideas…"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="form-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={status.state === 'loading'}
                  >
                    {status.state === 'loading' ? (
                      <span>Sending Message…</span>
                    ) : (
                      <>
                        <span>Submit Enquiry</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <small className="form-privacy-note">
                    Your details will only be used to reply to your inquiry regarding Weave Kiran and Swadeshi Innovators.
                  </small>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
