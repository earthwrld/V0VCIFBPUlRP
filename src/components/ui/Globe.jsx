import createGlobe from "cobe";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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

export function Globe({ className, config = GLOBE_CONFIG }) {
  const canvasRef = useRef(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const globeRef = useRef(null);

  const onRender = useCallback((state) => {
    phiRef.current += 0.005;
    state.phi = phiRef.current;
    state.width = widthRef.current * 2;
    state.height = widthRef.current * 2;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globe = null;

    // Use ResizeObserver to wait until canvas actually has dimensions
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w > 0 && !globe) {
          widthRef.current = w;

          globe = createGlobe(canvas, {
            ...config,
            width: w * 2,
            height: w * 2,
            onRender,
          });
          globeRef.current = globe;

          // Stop observing once globe is created
          ro.disconnect();
        }
      }
    });

    ro.observe(canvas);

    const handleResize = () => {
      widthRef.current = canvas.offsetWidth;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ro.disconnect();
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [config, onRender]);

  return (
    <div className={cn("relative aspect-square w-full max-w-md", className)}>
      <canvas
        ref={canvasRef}
        className="size-full [contain:layout_paint_size]"
      />
    </div>
  );
}
