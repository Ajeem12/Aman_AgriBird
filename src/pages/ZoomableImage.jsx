import React, { useRef, useState } from "react";

const ZoomableImage = ({ src, alt }) => {
  const containerRef = useRef(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const x = (offsetX / rect.width) * 100;
    const y = (offsetY / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div className="relative w-full flex flex-col md:flex-row ">
      {/* Main Image */}
      <div
        ref={containerRef}
        className="w-full h-auto overflow-hidden cursor-crosshair"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-[300px] md:h-auto object-contain rounded-sm "
        />
      </div>

      {/* Zoomed Image (Floating with z-index) */}
      {isZooming && (
        <div className="hidden md:block absolute z-10 left-[calc(100%+24px)] w-[600px] h-[400px] border rounded-sm shadow-lg overflow-hidden  ">
          <div
            className="w-full h-full bg-no-repeat"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "300% 300%",
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ZoomableImage;
