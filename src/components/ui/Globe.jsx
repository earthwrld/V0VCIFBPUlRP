import createGlobe from "cobe";
import { useCallback, useEffect, useRef } from "react";

const GLOBE_CONFIG = {
  width: 600,
  height: 600,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1, // Changed to 1 so it renders properly on your dark background
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.8, 0.8, 0.8], // Bright dots
  markerColor: [242 / 255, 95 / 255, 92 / 255], // Coral markers matching your theme
  glowColor: [0.2, 0.2, 0.2], // Soft cosmic glow
  markers: [
    { location: [41.0082, 28.9784], size: 0.06 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [-23.5505, -46.6333], size: 0.1 },
  ],
};

export function Globe({ className = "", config = GLOBE_CONFIG }) {
  const canvasRef = useRef(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);

  const onRender = useCallback((state) => {
    phiRef.current += 0.005; 
    state.phi = phiRef.current;
    state.width = widthRef.current * 2;
    state.height = widthRef.current * 2;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      widthRef.current = canvas.offsetWidth;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const globe = createGlobe(canvas, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender,
      // Use exactly the config colors requested for the cosmic look
      dark: config.dark,
      glowColor: config.glowColor,
      baseColor: config.baseColor,
      markerColor: config.markerColor,
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, [config, onRender]);

  return (
    <div 
      className={`globe-wrapper ${className}`}
      style={{
        position: 'relative',
        aspectRatio: '1 / 1',
        width: '100%',
        maxWidth: '28rem',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          contain: 'layout paint size'
        }}
      />
    </div>
  );
}
