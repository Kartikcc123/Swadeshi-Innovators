import { useEffect } from 'react';
import { X, Play, MonitorPlay, Info, Sparkles } from 'lucide-react';

export function VideoModal({ config, onClose, onLaunchSimulator }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!config) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={config.title}>
      <div className="video-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-title-group">
            <Sparkles size={18} className="text-saffron" />
            <h3>{config.title || 'Prototype Demonstration'}</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>

        <div className="modal-video-body">
          {config.videoUrl ? (
            <div className="video-iframe-wrap">
              <iframe
                src={config.videoUrl}
                title={config.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="video-preview-standin">
              <img
                src={config.placeholderPoster || '/assets/image.png'}
                alt="Weave Kiran Video Demonstration Preview"
                className="modal-poster-img"
              />
              <div className="video-standin-overlay">
                <div className="standin-message">
                  <div className="standin-play-circle">
                    <Play size={28} />
                  </div>
                  <h4>Benchtop Prototype Demonstration</h4>
                  <p>
                    {config.caption ||
                      '1-meter fabric sample continuous optical scan under 5500K ring illumination and YOLO defect inference.'}
                  </p>
                  <span className="standin-tag">Recorded at Innovation Workbench • Sanrachna IQTSX 2026</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-video-foot">
          <div className="foot-note">
            <Info size={16} className="text-muted flex-shrink-0" />
            <small>
              {config.videoUrl
                ? 'Streaming laboratory video recording.'
                : 'Prototype video placeholder ready. You can also explore our live interactive optical simulator right now.'}
            </small>
          </div>

          <div className="foot-actions">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                onClose();
                if (onLaunchSimulator) onLaunchSimulator();
              }}
            >
              <MonitorPlay size={15} />
              <span>Launch Live Simulator</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
