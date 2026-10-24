import { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize2, Sparkles } from 'lucide-react';

export function ImageModal({ data, onClose }) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setZoom(1);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(Number((z + 0.25).toFixed(2)), 2.2));
      if (e.key === '-' || e.key === '_') setZoom((z) => Math.max(Number((z - 0.25).toFixed(2)), 1));
      if (e.key === '0') setZoom(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [data, onClose]);

  if (!data) return null;

  const toggleZoom = (e) => {
    // Prevent zoom toggle when clicking specific controls
    if (e.target.closest('.modal-zoom-controls') || e.target.closest('.modal-close-btn')) return;
    setZoom((z) => (z > 1 ? 1 : 1.5));
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={data.title || 'Image Inspection View'}
    >
      <div className="image-modal-card medium-box" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-head">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <Sparkles size={16} className="text-saffron" />
            </div>
            <div className="modal-title-text-wrap">
              <h3 id="modal-image-title">{data.title || 'Prototype Optical View'}</h3>
              {data.subtitle && <span className="modal-subtitle-tag">{data.subtitle}</span>}
            </div>
          </div>

          <div className="modal-head-actions">
            {/* Zoom Controls */}
            <div className="modal-zoom-controls" role="group" aria-label="Image Zoom Controls">
              <button
                type="button"
                className="zoom-ctrl-btn"
                onClick={() => setZoom((z) => Math.max(Number((z - 0.25).toFixed(2)), 1))}
                disabled={zoom <= 1}
                title="Zoom Out (-)"
                aria-label="Zoom Out"
              >
                <ZoomOut size={15} />
              </button>
              <span className="zoom-level-text">{Math.round(zoom * 100)}%</span>
              <button
                type="button"
                className="zoom-ctrl-btn"
                onClick={() => setZoom((z) => Math.min(Number((z + 0.25).toFixed(2)), 2.2))}
                disabled={zoom >= 2.2}
                title="Zoom In (+)"
                aria-label="Zoom In"
              >
                <ZoomIn size={15} />
              </button>
              {zoom > 1 && (
                <button
                  type="button"
                  className="zoom-ctrl-btn reset-btn"
                  onClick={() => setZoom(1)}
                  title="Reset Zoom to 100% (0)"
                  aria-label="Reset Zoom to 100%"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Close Button */}
            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close dialog (Escape)"
              title="Close (Esc)"
            >
              <X size={18} />
              <span className="esc-key-badge">Esc</span>
            </button>
          </div>
        </div>

        {/* Modal Image Body with Studio Lighting & Clear Crisp Rendering */}
        <div
          className={`modal-image-body ${zoom > 1 ? 'is-zoomed' : ''}`}
          onClick={toggleZoom}
          title={zoom > 1 ? 'Click to reset view (100%)' : 'Click image to zoom in closer'}
          style={{ cursor: zoom > 1 ? 'zoom-out' : 'zoom-in' }}
        >
          <div className="modal-image-container">
            <img
              src={data.src}
              alt={data.title || 'Expanded View'}
              className="modal-expanded-img"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'center center',
                transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
            />
          </div>

          <div className="modal-zoom-hint-pill" aria-hidden="true">
            <Maximize2 size={12} />
            <span>{zoom > 1 ? 'Click to return to 100%' : 'Click image or use +/- to zoom'}</span>
          </div>
        </div>

        {/* Modal Caption and Detail Callout Chips */}
        <div className="modal-caption-foot">
          {data.caption && <p className="modal-caption-text">{data.caption}</p>}

          {data.tags && data.tags.length > 0 && (
            <div className="modal-tags-grid">
              {data.tags.map((tag, idx) => (
                <div key={idx} className="modal-tag-chip">
                  <span className="tag-chip-label">{tag.label}:</span>
                  <span className="tag-chip-desc">{tag.desc}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
