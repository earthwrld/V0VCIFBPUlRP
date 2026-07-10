import React, { useRef, useEffect, useState } from "react";
import GlobeGl from "react-globe.gl";

// Markers on the globe — white to match the page's font color
const MARKERS = [
  { lat: 41.0082, lng: 28.9784, size: 0.4, color: "#ffffff" },   // Istanbul
  { lat: 40.7128, lng: -74.006, size: 0.4, color: "#ffffff" },   // New York
  { lat: 34.6937, lng: 135.5022, size: 0.4, color: "#ffffff" },  // Osaka
  { lat: -23.5505, lng: -46.6333, size: 0.4, color: "#ffffff" }, // São Paulo
  { lat: -6.2, lng: 106.8166, size: 0.5, color: "#ffffff" },     // Jakarta
];

export function Globe({ className = "", size = 200 }) {
  const globeEl = useRef();
  const [ready, setReady] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    // Short delay to allow component to mount in DOM
    const timer = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!globeEl.current || !ready) return;
    const ctrl = globeEl.current.controls();
    ctrl.autoRotate = true;
    ctrl.autoRotateSpeed = 1.2;
    ctrl.enableZoom = false;
    ctrl.enablePan = false;
    globeEl.current.pointOfView({ lat: 20, lng: 118, altitude: 2 });
  }, [ready]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size, position: "relative", overflow: "hidden", borderRadius: "50%" }}
    >
      {ready && (
        <GlobeGl
          ref={globeEl}
          width={size}
          height={size}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          showAtmosphere={true}
          atmosphereColor="#ffffff"
          atmosphereAltitude={0.12}
          pointsData={MARKERS}
          pointAltitude="size"
          pointColor="color"
          pointRadius={0.5}
        />
      )}
    </div>
  );
}
