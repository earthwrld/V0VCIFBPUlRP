import React, { useRef, useEffect, useState } from "react";
import GlobeGl from "react-globe.gl";

export function Globe({ className = "" }) {
  const globeEl = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef();

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 1.5;
      globeEl.current.controls().enableZoom = false;
      globeEl.current.pointOfView({ lat: 0, lng: 118, altitude: 2 });
    }
  }, [dimensions.width]); // Run when globe renders

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight || containerRef.current.offsetWidth
        });
      }
    };
    
    handleResize();
    const timer = setTimeout(handleResize, 100);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const markers = [
    { lat: 41.0082, lng: 28.9784, size: 0.1, color: '#F25F5C' },
    { lat: 40.7128, lng: -74.006, size: 0.1, color: '#F25F5C' },
    { lat: 34.6937, lng: 135.5022, size: 0.1, color: '#F25F5C' },
    { lat: -23.5505, lng: -46.6333, size: 0.1, color: '#F25F5C' },
    { lat: -6.2000, lng: 106.8166, size: 0.15, color: '#FFE066' }, // Jakarta
  ];

  return (
    <div 
      ref={containerRef}
      className={`globe-wrapper ${className}`}
      style={{
        position: 'relative',
        aspectRatio: '1 / 1',
        width: '100%',
        maxWidth: '28rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {dimensions.width > 0 && (
        <GlobeGl
          ref={globeEl}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          pointsData={markers}
          pointAltitude="size"
          pointColor="color"
          pointRadius={0.4}
        />
      )}
    </div>
  );
}
