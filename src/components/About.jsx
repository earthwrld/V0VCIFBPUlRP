import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Terminal, Lock, Server, Network, Globe, Shield } from 'lucide-react';

const TerminalPrompt = ({ path, cmd }) => (
  <div className="terminal-prompt">
    <span className="terminal-user">root</span>
    <span className="terminal-at">@</span>
    <span className="terminal-host">boemi</span>
    <span className="terminal-colon">:</span>
    <span className="terminal-dir">{path}</span>
    <span className="terminal-hash">#</span>
    <span style={{ marginLeft: '0.5rem' }}>{cmd}</span>
    <span className="animate-blink">█</span>
  </div>
);

function genRandomPattern(length = 5) {
	return Array.from({ length }, () => [
		Math.floor(Math.random() * 4) + 7,
		Math.floor(Math.random() * 6) + 1,
	]);
}

function GridPattern({ width, height, x, y, squares, ...props }) {
	const patternId = React.useId();
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

function FeatureCard({ feature, style }) {
	const p = genRandomPattern();

	return (
		<div style={{
			position: 'relative',
			overflow: 'hidden',
			padding: '2.5rem 2rem',
			background: 'rgba(30, 34, 38, 0.6)',
			border: '1px solid var(--surface-border)',
			borderRadius: '16px',
      backdropFilter: 'blur(10px)',
      transition: 'transform 0.3s ease, border-color 0.3s ease',
      marginBottom: '1.5rem',
			...style
		}} className="feature-card-hover marquee-item">
			<div style={{
				pointerEvents: 'none',
				position: 'absolute',
				top: 0,
				left: '50%',
				marginTop: '-0.5rem',
				marginLeft: '-5rem',
				height: '100%',
				width: '100%',
				WebkitMaskImage: 'linear-gradient(white, transparent)',
				maskImage: 'linear-gradient(white, transparent)',
			}}>
				<div style={{
					position: 'absolute',
					inset: 0,
					background: 'linear-gradient(to right, rgba(242, 95, 92, 0.05), rgba(242, 95, 92, 0.01))',
					WebkitMaskImage: 'radial-gradient(farthest-side at top, white, transparent)',
					maskImage: 'radial-gradient(farthest-side at top, white, transparent)',
					opacity: 1
				}}>
					<GridPattern
						width={20}
						height={20}
						x="-12"
						y="4"
						squares={p}
						style={{
							position: 'absolute',
							inset: 0,
							height: '100%',
							width: '100%',
							fill: 'rgba(242, 95, 92, 0.1)',
							stroke: 'rgba(242, 95, 92, 0.2)',
							mixBlendMode: 'overlay'
						}}
					/>
				</div>
			</div>
			<div style={{ position: 'relative', zIndex: 10 }}>
				<feature.icon size={28} color="var(--vibrant-coral)" strokeWidth={1.5} />
				<h3 style={{ marginTop: '1.5rem', fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 600 }}>{feature.title}</h3>
				<p style={{ color: 'var(--text-secondary)', marginTop: '0.8rem', fontSize: '0.95rem', fontWeight: 400, lineHeight: 1.7 }}>{feature.description}</p>
			</div>
		</div>
	);
}

function VerticalMarquee({ children, speed = 1, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;

    const scrollLoop = () => {
      if (container) {
        // Automatically scroll down by 'speed' pixels per frame
        container.scrollTop += speed;
        // If we've scrolled past the first cloned set, snap back to top seamlessly
        if (container.scrollTop >= container.scrollHeight / 2) {
          container.scrollTop -= container.scrollHeight / 2;
        }
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`vertical-marquee-container ${className}`}
      data-lenis-prevent="true" /* Ensures lenis doesn't hijack wheel events here */
    >
      <div className="marquee-content">
        {children}
      </div>
      <div className="marquee-content" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}

const About = () => {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-elem', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll('.marquee-item');
      if (items.length === 0) return;
      
      const containerRect = marqueeContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = 1 - normalizedDistance * 0.85; // Fades out at edges
        item.style.opacity = opacity.toString();
      });
    };

    let frame;
    const animationFrame = () => {
      updateOpacity();
      frame = requestAnimationFrame(animationFrame);
    };

    frame = requestAnimationFrame(animationFrame);

    return () => cancelAnimationFrame(frame);
  }, []);

  const skills = [
    { icon: Network, title: "Networking", description: "Deep understanding of TCP/IP, routing, switching, and network protocols. Capable of analyzing PCAP files and securing enterprise networks." },
    { icon: Server, title: "System Administrator", description: "Proficient in managing Linux/Windows environments, configuring web servers, and hardening operating systems against attacks." },
    { icon: Terminal, title: "Vulnerability Assessment", description: "Following OWASP methodology for web app security testing and delivering complete PoC documentation to patch critical flaws." },
    { icon: Lock, title: "SIEM & SOC Operations", description: "Deploying and managing Wazuh, MISP, and TheHive pipelines for real-time threat detection and incident response workflows." },
    { icon: Shield, title: "Offensive Tooling", description: "Developing custom scripts in Python & Bash for automated scanning, reconnaissance, and simulating persistent threats." },
    { icon: Globe, title: "Web Security", description: "Analyzing web application architectures to find logic flaws, XSS, SQLi, and securing backend APIs from exploitation." }
  ];

  return (
    <section ref={containerRef} id="about" style={{ padding: '8rem 0' }}>
      <div className="container">
        <div className="about-elem" style={{ marginBottom: '4rem' }}>
          <TerminalPrompt path="~/about" cmd="whoami" />
        </div>
        
        <div className="about-grid" style={{ display: 'grid', gap: '6rem', alignItems: 'center' }}>
          
          {/* Left Column (Auto-scrolling Native Marquee of Feature Cards) */}
          <div ref={marqueeRef} className="about-elem" style={{ 
            position: 'relative', 
            height: '700px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            paddingRight: '1rem'
          }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <VerticalMarquee speed={0.5} className="h-full">
                {skills.map((skill, index) => (
                  <FeatureCard key={index} feature={skill} />
                ))}
              </VerticalMarquee>
              
              {/* Top Vignette */}
              <div style={{
                pointerEvents: 'none',
                position: 'absolute',
                top: -2, left: 0, right: 0, height: '150px',
                background: 'linear-gradient(to bottom, var(--bg-secondary) 10%, transparent)',
                zIndex: 10
              }}></div>
              
              {/* Bottom Vignette */}
              <div style={{
                pointerEvents: 'none',
                position: 'absolute',
                bottom: -2, left: 0, right: 0, height: '150px',
                background: 'linear-gradient(to top, var(--bg-secondary) 10%, transparent)',
                zIndex: 10
              }}></div>
            </div>
          </div>

          {/* Right Column (About Me) */}
          <div className="about-elem" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.2, marginBottom: 0 }}>
              About Me
            </h2>
            <div style={{ width: '60px', height: '3px', background: 'var(--vibrant-coral)' }}></div>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: 1.8 }}>
              I am a student at the State Polytechnic of Batam, majoring in Cybersecurity Engineering. 
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Currently exploring opportunity in Networking & System Administration, Pentesting, SIEM & SOC analysis, and application security. I've deployed SIEM with Wazuh, MISP, and TheHive, performed VAPT on government web assets, and develop custom tools for offensive security simulations.
            </p>
          </div>
          
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .about-grid {
          grid-template-columns: 1fr;
        }

        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* Marquee CSS */
        .vertical-marquee-container {
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          height: 100%;
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        .vertical-marquee-container::-webkit-scrollbar {
          display: none;
        }

        .marquee-content {
          display: flex;
          flex-shrink: 0;
          flex-direction: column;
        }

        .feature-card-hover:hover {
          transform: translateY(-5px);
          border-color: rgba(242, 95, 92, 0.5) !important;
        }
      `}} />
    </section>
  );
};

export default About;
