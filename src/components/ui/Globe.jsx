import React, { useRef, useEffect, useState } from "react";
import GlobeGl from "react-globe.gl";

const MARKERS = [
  { lat: 41.0082, lng: 28.9784, size: 0.4, color: "#888" },
  { lat: 40.7128, lng: -74.006, size: 0.4, color: "#888" },
  { lat: 34.6937, lng: 135.5022, size: 0.4, color: "#888" },
  { lat: -23.5505, lng: -46.6333, size: 0.4, color: "#888" },
  { lat: -6.2, lng: 106.8166, size: 0.5, color: "#555" },
];

export function Globe({ className = "", size = 200, style = {} }) {
  const globeEl = useRef();
  const [ready, setReady] = useState(false);

  useEffect(() => {
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
    // Center on Asia/Indonesia
    globeEl.current.pointOfView({ lat: 10, lng: 118, altitude: 2.2 });
  }, [ready]);

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: "relative",
        // CSS filter: convert earth-topology to white sphere with dark continent lines
        filter: "grayscale(1) brightness(5) contrast(0.6) invert(1)",
        ...style,
      }}
    >
      {ready && (
        <GlobeGl
          ref={globeEl}
          width={size}
          height={size}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          showAtmosphere={false}
          pointsData={MARKERS}
          pointAltitude="size"
          pointColor="color"
          pointRadius={0.5}
        />
      )}
    </div>
  );
}
