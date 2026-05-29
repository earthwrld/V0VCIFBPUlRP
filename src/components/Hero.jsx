import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Github, Linkedin, Mail } from 'lucide-react';

const MediumIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.1-.53 5.61-1.19 5.61-.66 0-1.2-.25-1.2-5.61 0-5.35.54-5.6 1.2-5.6.66 0 1.19.25 1.19 5.6" />
  </svg>
);

const BinaryText = ({ originalText }) => {
  const [text, setText] = useState(originalText);
  const chars = originalText.split('');
  
  useEffect(() => {
    let animationId;
    
    const animate = () => {
      const idx = Math.floor(Math.random() * chars.length);
      const originalChar = chars[idx];
      
      if (originalChar === ' ') return setTimeout(animate, 800);

      const binaryChar = Math.random() > 0.5 ? '1' : '0';
      
      setText(prev => {
        const arr = prev.split('');
        arr[idx] = binaryChar;
        return arr.join('');
      });
      
      setTimeout(() => {
        setText(prev => {
          const arr = prev.split('');
          arr[idx] = originalChar;
          return arr.join('');
        });
      }, 500);

      animationId = setTimeout(animate, 800);
    };

    animate();
    return () => clearTimeout(animationId);
  }, [originalText]);

  return <span style={{ fontFamily: '"JetBrains Mono", monospace' }}>{text}</span>;
};

const TerminalPrompt = ({ path, cmd }) => (
  <div className="terminal-prompt" style={{ margin: 0 }}>
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

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.anim-header', { opacity: 0, y: -20, duration: 0.6, delay: 0.1 });
      gsap.from('.anim-text-left', { opacity: 0, x: -30, duration: 0.8, delay: 0.2 });
      gsap.from('.anim-circle', { scale: 0.5, opacity: 0, duration: 1, ease: 'back.out(1.2)', delay: 0.4 });
      gsap.from('.anim-img', { opacity: 0, y: 50, duration: 1.2, ease: 'power3.out', delay: 0.6 });
      gsap.from('.anim-text-right', { opacity: 0, x: 30, duration: 0.8, delay: 0.8 });
      gsap.from('.anim-footer', { opacity: 0, y: 20, duration: 0.5, delay: 1 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="home" style={{ 
      height: '100vh', 
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '4rem',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Console Header */}
      <header className="anim-header" style={{ position: 'absolute', top: '3rem', left: '10rem', zIndex: 30 }}>
        <TerminalPrompt path="~" cmd="" />
      </header>
      
      {/* Main Grid: 3 Equal Columns */}
      <div className="hero-responsive-grid" style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        width: '100%',
        display: 'grid', 
        alignItems: 'center', 
        flexGrow: 1, 
        position: 'relative', 
        zIndex: 10 
      }}>
        
        {/* LEFT COLUMN */}
        <div className="anim-text-left hero-text-box" style={{ zIndex: 20 }}>
          <p style={{ maxWidth: '280px', fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 500 }}>
            Cybersecurity enthusiast & lifelong learner. Have built hands-on expertise in both defensive and offensive security.
          </p>
          <a href="#projects" style={{ marginTop: '1.5rem', display: 'inline-block', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'underline', textDecorationColor: 'var(--vibrant-coral)', textUnderlineOffset: '6px' }}>
            See Projects
          </a>
        </div>

        {/* CENTER COLUMN */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} className="hero-image-box">
          <div className="anim-circle" style={{
            position: 'absolute',
            width: 'clamp(280px, 35vw, 500px)',
            height: 'clamp(280px, 35vw, 500px)',
            borderRadius: '50%',
            background: 'var(--cerulean)',
            opacity: 0.85,
            zIndex: 0
          }}></div>
          <img className="anim-img" src="/assets/bumi2.png" alt="Bumi" style={{
            position: 'relative',
            zIndex: 10,
            height: 'auto',
            width: 'clamp(260px, 32vw, 420px)',
            transform: 'scale(1.2)'
          }} 
          onError={(e) => { e.target.src = '/assets/profile.jpg'; e.target.style.borderRadius = '50%'; }}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="anim-text-right hero-title-box" style={{ zIndex: 20, width: '100%', wordBreak: 'break-word' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 4.5vw, 5rem)', fontWeight: 800, lineHeight: 1.1, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            <span style={{ display: 'block', color: 'var(--tropical-teal)', fontSize: '1rem', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.5rem' }}>CYBERSECURITY ENGINEER</span>
            <BinaryText originalText="Bumi Arya Dirangga" />
          </h1>
        </div>
      </div>

      {/* Footer */}
      <footer className="anim-footer" style={{ zIndex: 30, display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '1400px', margin: '0 auto', alignItems: 'center', position: 'absolute', bottom: '2rem', left: '0', right: '0', padding: '0 4rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="https://github.com/earthwrld" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }} className="hover:text-primary"><Github /></a>
          <a href="https://linkedin.com/in/bumiarya" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }} className="hover:text-primary"><Linkedin /></a>
          <a href="https://medium.com/@boemi" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }} className="hover:text-primary"><MediumIcon size={24} /></a>
          <a href="mailto:aryadirangga89@gmail.com" style={{ color: 'var(--text-secondary)' }} className="hover:text-primary"><Mail /></a>
        </div>
        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--cerulean)', letterSpacing: '0.05em' }}>
          BATAM, ID
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        .hero-responsive-grid {
          grid-template-columns: 1fr;
          text-align: center;
          gap: 3rem;
        }
        .hero-text-box { order: 2; margin: 0 auto; justify-self: center; }
        .hero-image-box { order: 1; margin: 0; justify-self: center; }
        .hero-title-box { order: 3; justify-self: center; text-align: center; }

        @media (min-width: 1024px) {
          .hero-responsive-grid {
            /* Force exact 3 equal columns to prevent overflow/shifting */
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            text-align: left;
            gap: 2rem;
          }
          .hero-text-box { order: 1; margin: 0; justify-self: start; }
          .hero-image-box { order: 2; margin: 0; justify-self: center; }
          .hero-title-box { order: 3; justify-self: end; text-align: right; }
        }
        
        @media (max-width: 768px) {
          .anim-header {
            top: 2rem !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
        }
      `}} />
    </section>
  );
};

export default Hero;
