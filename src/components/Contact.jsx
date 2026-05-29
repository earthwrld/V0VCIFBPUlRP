import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Mail, Github, Linkedin } from 'lucide-react';

const MediumIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.1-.53 5.61-1.19 5.61-.66 0-1.2-.25-1.2-5.61 0-5.35.54-5.6 1.2-5.6.66 0 1.19.25 1.19 5.6" />
  </svg>
);

const TerminalPrompt = ({ path, cmd }) => (
  <div className="contact-elem terminal-prompt" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
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

const Contact = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-elem', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="contact" style={{ 
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 1rem'
    }}>
      <div className="contact-elem" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
        <TerminalPrompt path="~/network" cmd="nc -zv boemi 433" />
        
        <h2 style={{ 
          fontSize: 'clamp(3rem, 6vw, 5rem)', 
          fontWeight: 'bold', 
          marginBottom: '1.5rem',
          background: 'linear-gradient(to right, var(--vibrant-coral), var(--royal-gold), var(--cerulean))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}>
          Connect <span style={{ color: 'var(--text-primary)', WebkitTextFillColor: 'var(--text-primary)' }}>With Me</span>
        </h2>
        
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Let's connect! Whether you have a question, a security challenge, or just want to chat, I'd love to hear from you. I'll try my best to get back to you!
        </p>
      </div>

      {/* 3D Glowing Container */}
      <div className="contact-elem glowing-container" style={{
        position: 'relative',
        width: '100%',
        maxWidth: '700px',
        borderRadius: '1.5rem',
        background: 'linear-gradient(to bottom right, rgba(30, 34, 38, 0.8), rgba(20, 22, 24, 0.9))',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '3.5rem 2rem',
        backdropFilter: 'blur(20px)',
        transition: 'transform 0.5s ease',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.5rem' }}>
          
          {/* Email */}
          <a href="mailto:aryadirangga89@gmail.com" className="social-icon email">
            <div className="icon-container">
              <Mail size={32} color="white" />
            </div>
            <span className="icon-label">Email</span>
          </a>

          {/* LinkedIn */}
          <a href="https://linkedin.com/in/bumiarya" target="_blank" rel="noreferrer" className="social-icon linkedin">
            <div className="icon-container">
              <Linkedin size={32} color="white" />
            </div>
            <span className="icon-label">LinkedIn</span>
          </a>

          {/* GitHub */}
          <a href="https://github.com/earthwrld" target="_blank" rel="noreferrer" className="social-icon github">
            <div className="icon-container">
              <Github size={32} color="white" />
            </div>
            <span className="icon-label">GitHub</span>
          </a>

          {/* Medium */}
          <a href="https://medium.com/@boemi" target="_blank" rel="noreferrer" className="social-icon medium">
            <div className="icon-container">
              <MediumIcon size={32} color="white" />
            </div>
            <span className="icon-label">Medium</span>
          </a>

        </div>
      </div>

      <div className="contact-elem" style={{ marginTop: '6rem', color: 'var(--text-secondary)' }}>
        <p className="cyber-text">© 2026 Bumi Aryadirangga.</p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .glowing-container {
          box-shadow: 0 0 50px rgba(36, 123, 160, 0.2), 0 0 80px rgba(112, 193, 179, 0.1);
        }
        .glowing-container:hover {
          transform: scale(1.02);
        }

        .social-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }
        
        .icon-container {
          display: inline-flex;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          transition: all 0.3s ease;
          position: relative;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .social-icon:hover .icon-container {
          transform: translateY(-10px) scale(1.1);
        }
        
        .social-icon:hover .icon-label {
          opacity: 1;
          transform: translateY(5px);
        }
        
        .icon-label {
          margin-top: 12px;
          color: white;
          font-weight: 500;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        
        .social-icon.email:hover .icon-container {
          background: #EA4335;
          box-shadow: 0 0 20px rgba(234, 67, 53, 0.6);
        }
        
        .social-icon.linkedin:hover .icon-container {
          background: #0077b5;
          box-shadow: 0 0 20px rgba(0, 119, 181, 0.6);
        }
        
        .social-icon.github:hover .icon-container {
          background: #333;
          box-shadow: 0 0 20px rgba(51, 51, 51, 0.6);
        }
        
        .social-icon.medium:hover .icon-container {
          background: #000;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }
        
        .social-icon:hover svg {
          animation: shake 0.5s;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0); }
          20% { transform: translateX(-4px) rotate(-5deg); }
          40% { transform: translateX(4px) rotate(5deg); }
          60% { transform: translateX(-4px) rotate(-5deg); }
          80% { transform: translateX(4px) rotate(5deg); }
        }
        
        .icon-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        
        .social-icon:hover .icon-container::before {
          opacity: 1;
        }
      `}} />
    </section>
  );
};

export default Contact;
