import { Minus, Plus, ZoomIn } from "lucide-react";

export function ZoomControls({ zoom, onZoomIn, onZoomOut }) {
  return (
    <div className="zoom-controls" aria-label="Zoom controls">
      <button
        aria-label="Zoom out"
        disabled={zoom <= 80}
        onClick={onZoomOut}
        title="Zoom out"
        type="button"
      >
        <Minus size={18} />
      </button>
      <span className="zoom-value">
        <ZoomIn size={20} />
        {zoom}%
      </span>
      <button
        aria-label="Zoom in"
        disabled={zoom >= 150}
        onClick={onZoomIn}
        title="Zoom in"
        type="button"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
