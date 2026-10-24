import { useState } from 'react';
import { Play, Sparkles, MonitorPlay, Video, Info } from 'lucide-react';
import { DEMO_VIDEO_CONFIG } from '../data/websiteContent';
import { InteractiveSimulator } from './InteractiveSimulator';

export function DemoSection({ onOpenVideoModal }) {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'video'

  return (
    <section className="section demo-section" id="demo" aria-labelledby="demo-title">
      <div className="page-grid">
        <div className="section-head text-center">
          <div className="prototype-status-tag">
            <Sparkles size={14} className="tag-sparkle" />
            <span>LIVE INTERACTIVE TESTBENCH</span>
          </div>
          <h2 id="demo-title" className="section-title">
            See Weave Kiran in Action
          </h2>
          <p className="section-lead max-w-720 mx-auto">
            Experience how Weave Kiran processes 1-meter fabric feeds. Test our interactive optical inspection simulator
            or view our laboratory prototype demonstration recording.
          </p>

          {/* Mode Tabs */}
          <div className="demo-mode-switcher" role="tablist" aria-label="Demo view modes">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'simulator'}
              className={`mode-btn ${activeTab === 'simulator' ? 'active' : ''}`}
              onClick={() => setActiveTab('simulator')}
            >
              <MonitorPlay size={16} />
              <span>Interactive Inspection Workbench</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'video'}
              className={`mode-btn ${activeTab === 'video' ? 'active' : ''}`}
              onClick={() => setActiveTab('video')}
            >
              <Video size={16} />
              <span>Prototype Video Walkthrough</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Simulator */}
        {activeTab === 'simulator' && (
          <div className="simulator-tab-content">
            <InteractiveSimulator />
          </div>
        )}

        {/* Tab 2: Polished Video Container & Configuration Point */}
        {activeTab === 'video' && (
          <div className="video-tab-content">
            <div className="video-card-container">
              <div className="video-poster-box">
                <img
                  src={DEMO_VIDEO_CONFIG.placeholderPoster}
                  alt="Weave Kiran Prototype demonstration video thumbnail"
                  className="video-poster-img"
                />

                <div className="video-poster-overlay">
                  <button
                    type="button"
                    className="big-play-btn"
                    onClick={() => onOpenVideoModal(DEMO_VIDEO_CONFIG)}
                    aria-label="Play Weave Kiran Prototype Demo Video"
                  >
                    <Play size={28} className="play-icon" />
                  </button>
                  <span className="video-duration-badge">{DEMO_VIDEO_CONFIG.durationText}</span>
                </div>
              </div>

              <div className="video-info-box">
                <div className="video-meta-head">
                  <h3>{DEMO_VIDEO_CONFIG.title}</h3>
                  <span className="badge-demo-status">Laboratory Recording</span>
                </div>
                <p>{DEMO_VIDEO_CONFIG.caption}</p>

                <div className="video-config-note">
                  <Info size={16} className="text-saffron flex-shrink-0" />
                  <p>
                    <strong>Video Configuration:</strong> {DEMO_VIDEO_CONFIG.note} To embed a custom presentation or
                    hosted video URL, update <code>DEMO_VIDEO_CONFIG.videoUrl</code> in <code>websiteContent.js</code>.
                  </p>
                </div>

                <div className="video-actions-row">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onOpenVideoModal(DEMO_VIDEO_CONFIG)}
                  >
                    <Play size={16} />
                    <span>Watch Demonstration</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setActiveTab('simulator')}
                  >
                    <span>Switch to Interactive Simulator</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
