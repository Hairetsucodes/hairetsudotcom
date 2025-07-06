import { useState } from "react";
import {
  Image,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function ImageViewerApp() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);

  // Sample images for the demo
  const images = [
    {
      id: 1,
      name: "Mountain Landscape",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      size: "1920x1080",
      type: "JPEG",
    },
    {
      id: 2,
      name: "Ocean Sunset",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      size: "1680x1050",
      type: "JPEG",
    },
    {
      id: 3,
      name: "Forest Path",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      size: "2048x1536",
      type: "JPEG",
    },
    {
      id: 4,
      name: "City Skyline",
      url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      size: "1920x1200",
      type: "JPEG",
    },
  ];

  const currentImage = images[currentImageIndex];

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(300, prev + 25));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(25, prev - 25));
  };

  const handleRotateLeft = () => {
    setRotation((prev) => prev - 90);
  };

  const handleRotateRight = () => {
    setRotation((prev) => prev + 90);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setZoomLevel(100);
    setRotation(0);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setZoomLevel(100);
    setRotation(0);
  };

  const handleDownload = () => {
    alert(`Downloaded ${currentImage.name}`);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${currentImage.name}?`)) {
      alert(`Deleted ${currentImage.name}`);
    }
  };

  return (
    <div className="h-full bg-slate-900/50 text-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-600/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image size={24} className="text-purple-400" />
            <span className="text-lg font-semibold">Image Viewer</span>
          </div>
          <div className="text-sm text-slate-400">
            {currentImageIndex + 1} of {images.length}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-4 border-b border-slate-600/30 bg-slate-800/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevImage}
              className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
              title="Previous Image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNextImage}
              className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
              title="Next Image"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-sm font-medium min-w-[60px] text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRotateLeft}
              className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
              title="Rotate Left"
            >
              <RotateCcw size={18} />
            </button>
            <button
              onClick={handleRotateRight}
              className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
              title="Rotate Right"
            >
              <RotateCw size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 bg-blue-600/80 hover:bg-blue-700/80 rounded-lg transition-colors"
              title="Download"
            >
              <Download size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 bg-red-600/80 hover:bg-red-700/80 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Image Display Area */}
      <div className="flex-1 p-4 flex items-center justify-center bg-slate-800/20 overflow-hidden">
        <div className="relative">
          <img
            src={currentImage.url}
            alt={currentImage.name}
            className="max-w-full max-h-full object-contain transition-transform duration-300 shadow-2xl"
            style={{
              transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
            }}
          />
        </div>
      </div>

      {/* Image Info Footer */}
      <div className="p-4 border-t border-slate-600/30 bg-slate-800/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{currentImage.name}</div>
            <div className="text-sm text-slate-400">
              {currentImage.size} • {currentImage.type}
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex gap-2">
            {images.map((img, index) => (
              <button
                key={img.id}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setZoomLevel(100);
                  setRotation(0);
                }}
                className={`w-12 h-12 rounded border-2 transition-all overflow-hidden ${
                  index === currentImageIndex
                    ? "border-blue-500 opacity-100"
                    : "border-slate-600 opacity-60 hover:opacity-80"
                }`}
              >
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
