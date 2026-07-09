import createGlobe from "cobe";
import { useCallback, useEffect, useRef } from "react";

const GLOBE_CONFIG = {
  width: 600,
  height: 600,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [41.0082, 28.9784], size: 0.06 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [-23.5505, -46.6333], size: 0.1 },
  ],
};

// size: explicit pixel size of the globe canvas (avoids CSS sizing bugs)
export function Globe({ className = "", config = GLOBE_CONFIG, size = 300, style = {} }) {
  const canvasRef = useRef(null);
  const phiRef = useRef(0);
  const globeRef = useRef(null);

  const onRender = useCallback(
    (state) => {
      phiRef.current += 0.005;
      state.phi = phiRef.current;
      state.width = size * 2;
      state.height = size * 2;
    },
    [size]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const globe = createGlobe(canvas, {
      ...config,
      width: size * 2,
      height: size * 2,
      onRender,
    });
    globeRef.current = globe;

    return () => {
      globe.destroy();
    };
  }, [config, onRender, size]);

  return (
    <div
      className={className}
      style={{ width: size, height: size, position: "relative", ...style }}
    >
      <canvas
        ref={canvasRef}
        width={size * 2}
        height={size * 2}
        style={{ width: size, height: size }}
      />
    </div>
  );
}
