import React, { useId, useMemo } from 'react';

export function genRandomPattern(length = 15) {
	return Array.from({ length }, () => [
		Math.floor(Math.random() * 40) - 10,
		Math.floor(Math.random() * 40) - 10,
	]);
}

export function GridPattern({ width, height, x, y, squares, ...props }) {
	const patternId = useId();
	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
			{squares && (
				<svg x={x} y={y} style={{ overflow: 'visible' }}>
					{squares.map(([sqX, sqY], index) => (
						<rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={sqX * width} y={sqY * height} />
					))}
				</svg>
			)}
		</svg>
	);
}

export default function GridBackground() {
    const p = useMemo(() => genRandomPattern(50), []);
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 1, // Increased opacity
            WebkitMaskImage: 'radial-gradient(circle at center, white, transparent 80%)',
            maskImage: 'radial-gradient(circle at center, white, transparent 80%)',
        }}>
            <GridPattern
                width={40}
                height={40}
                x="-12"
                y="4"
                squares={p}
                style={{
                    position: 'absolute',
                    inset: 0,
                    height: '100%',
                    width: '100%',
                    fill: 'rgba(242, 95, 92, 0.04)', // Red/Coral tint fill
                    stroke: 'rgba(242, 95, 92, 0.15)', // Red/Coral tint stroke
                }}
            />
        </div>
    );
}
