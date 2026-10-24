import { useState } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle, FileText, Sparkles, Eye } from 'lucide-react';
import { SAMPLE_SIMULATIONS } from '../data/websiteContent';

export function InteractiveSimulator() {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_SIMULATIONS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(true);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [auditLog, setAuditLog] = useState([
    {
      time: '11:14:02 AM',
      sample: 'Khadi Cotton — Sample A',
      result: '2 Defects (Stain: 0.94, Thread: 0.88)',
      status: 'Review Required',
    },
    {
      time: '11:13:45 AM',
      sample: 'Organic Cotton — Sample C',
      result: '0 Defects Detected',
      status: 'Passed (Grade A)',
    },
  ]);

  const handleRunScan = () => {
    setIsScanning(true);
    setScanCompleted(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanCompleted(true);
      setShowBoundingBoxes(true);

      // Add to audit log
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const newEntry = {
        time: timeStr,
        sample: selectedSample.name,
        result:
          selectedSample.defects[0]?.type === 'Clean Weave'
            ? '0 Defects Detected'
            : `${selectedSample.defects.length} Defect(s) (${selectedSample.defects.map((d) => `${d.type}: ${d.confidence}`).join(', ')})`,
        status: selectedSample.status,
      };
      setAuditLog((prev) => [newEntry, ...prev.slice(0, 4)]);
    }, 1200);
  };

  const handleSelectSample = (sample) => {
    setSelectedSample(sample);
    setScanCompleted(true);
    setShowBoundingBoxes(true);
  };

  return (
    <div className="simulator-container" aria-label="Weave Kiran Interactive Inspection Simulator">
      {/* Workbench Toolbar */}
      <div className="simulator-toolbar">
        <div className="toolbar-left">
          <span className="live-camera-tag">
            <span className="rec-dot" />
            <span>OPTICAL WORKBENCH SIMULATOR</span>
          </span>
          <span className="sample-name-tag">{selectedSample.fabricType}</span>
        </div>

        <div className="toolbar-controls">
          <button
            type="button"
            className="sim-btn sim-btn-toggle"
            onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
            aria-pressed={showBoundingBoxes}
          >
            <Eye size={15} />
            <span>{showBoundingBoxes ? 'Hide AI Bounding' : 'Show AI Bounding'}</span>
          </button>

          <button
            type="button"
            className="sim-btn sim-btn-run"
            onClick={handleRunScan}
            disabled={isScanning}
          >
            {isScanning ? (
              <>
                <RotateCcw size={15} className="spin-icon" />
                <span>Scanning Frame…</span>
              </>
            ) : (
              <>
                <Play size={15} />
                <span>Run Inspection Scan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Simulator Viewport */}
      <div className="simulator-workspace">
        {/* Sample Selection Sidebar */}
        <div className="sample-selector-col">
          <span className="selector-title">Select Fabric Test Sample (1m)</span>
          <div className="sample-pill-list">
            {SAMPLE_SIMULATIONS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                className={`sample-pill ${selectedSample.id === sample.id ? 'active' : ''}`}
                onClick={() => handleSelectSample(sample)}
              >
                <div className="pill-head">
                  <strong className="pill-name">{sample.name}</strong>
                  <span
                    className={`pill-status-dot ${
                      sample.defects[0]?.type === 'Clean Weave' ? 'dot-clean' : 'dot-flawed'
                    }`}
                  />
                </div>
                <small className="pill-type">{sample.fabricType}</small>
              </button>
            ))}
          </div>

          <div className="eval-disclaimer-card">
            <Sparkles size={16} className="eval-icon" />
            <p>
              Pre-calibrated evaluation datasets representative of Weave Kiran prototype test runs.
            </p>
          </div>
        </div>

        {/* Live Feed Canvas */}
        <div className="camera-viewport-col">
          <div className="viewport-stage">
            <img
              src={selectedSample.image}
              alt={`Inspected fabric: ${selectedSample.name}`}
              className="viewport-img"
            />

            {/* Scanning Laser Line Effect during scan */}
            {isScanning && <div className="scanning-laser-line" />}

            {/* Bounding Box Overlays */}
            {scanCompleted &&
              showBoundingBoxes &&
              selectedSample.defects.map((defect, i) => (
                <div
                  key={i}
                  className="defect-bounding-box"
                  style={{
                    left: `${defect.x}%`,
                    top: `${defect.y}%`,
                    width: `${defect.width}%`,
                    height: `${defect.height}%`,
                    borderColor: defect.color,
                  }}
                >
                  <span className="bounding-tag" style={{ backgroundColor: defect.color }}>
                    {defect.type} {(defect.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              ))}

            {/* Watermark / HUD */}
            <div className="viewport-hud">
              <span className="hud-line">FOV: 1000mm × 800mm • USB CAM 1080p</span>
              <span className="hud-line">Lighting: 5500K Ring Diffused</span>
            </div>
          </div>

          {/* Real-time Quality Summary Card */}
          <div className="viewport-footer-summary">
            <div className="summary-left">
              <div className="status-indicator-badge">
                {selectedSample.defects[0]?.type === 'Clean Weave' ? (
                  <CheckCircle size={18} className="text-green" />
                ) : (
                  <AlertTriangle size={18} className="text-saffron" />
                )}
                <strong>{selectedSample.status}</strong>
              </div>
              <p className="summary-note">{selectedSample.summary}</p>
            </div>

            <div className="summary-right">
              <div className="stat-pair">
                <span className="stat-label">Calculated Grade</span>
                <span className="stat-val">{selectedSample.grade}</span>
              </div>
              <div className="stat-pair">
                <span className="stat-label">Model Confidence</span>
                <span className="stat-val">{selectedSample.overallConfidence}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operator Inspection Audit Log Table */}
      <div className="simulator-audit-table">
        <div className="table-header-row">
          <div className="th-left">
            <FileText size={16} />
            <span>Operator Inspection Audit Log (Recent Runs)</span>
          </div>
          <span className="table-count">{auditLog.length} Records</span>
        </div>

        <div className="table-responsive">
          <table className="audit-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Inspected Sample</th>
                <th>Identified Classifications</th>
                <th>Quality Decision</th>
              </tr>
            </thead>
            <tbody>
              {auditLog.map((row, idx) => (
                <tr key={idx}>
                  <td className="font-mono text-muted">{row.time}</td>
                  <td><strong>{row.sample}</strong></td>
                  <td>{row.result}</td>
                  <td>
                    <span
                      className={`audit-status-tag ${
                        row.status.includes('Passed') ? 'tag-pass' : 'tag-alert'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
