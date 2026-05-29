import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

const TerminalPrompt = ({ path, cmd }) => (
  <div className="terminal-prompt" style={{ marginBottom: '2rem' }}>
    <span className="terminal-user">root</span>
    <span className="terminal-at">@</span>
    <span className="terminal-host">boemi</span>
    <span className="terminal-colon">:</span>
    <span className="terminal-dir">{path}</span>
    <span className="terminal-hash">#</span>
    <span>{cmd}</span>
    <span className="animate-blink">█</span>
  </div>
);

function calculateGap(width) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

const Projects = () => {
  const projects = [
    {
      title: "VAPT - Government Assets",
      image: "/assets/posterpbl5.jpg",
      desc: "Conducted Vulnerability Assessment and Penetration Testing on government web assets using OWASP methodology. Identified critical vulnerabilities with full PoC.",
      tech: ["Nmap", "Burp Suite", "OWASP"],
      link: "https://polibatam.id/PBL-RKS517"
    },
    {
      title: "SIEM Dev for Attack & Defense",
      image: "/assets/soc3.png",
      desc: "Built and deployed a SIEM pipeline using Wazuh, MISP, and TheHive on VMs. Configured log ingestion, alert rules, and correlation for threat detection.",
      tech: ["Wazuh", "MISP", "TheHive"],
      link: "https://polibatam.id/PBL-RKS413"
    },
    {
      title: "Brmbox (MikroTik Bruteforce)",
      image: "/assets/brmbox2.png",
      desc: "Developed a Bash-based Layer 2 brute-force tool targeting MikroTik Winbox (MAC auth) for authorized pentesting engagements.",
      tech: ["Bash", "Layer 2", "Offensive Tooling"],
      link: "https://github.com/earthwrld/mac-winbox-bruteforce"
    },
    {
      title: "Well Architect SIEM",
      image: "/assets/POSTER-PBL-RKS307.png",
      desc: "Implemented a SIEM solution across simulated VMs to enhance organizational security monitoring, real-time event tracking, and incident response.",
      tech: ["SIEM", "Virtual Machines", "Incident Response"],
      link: "https://github.com/Merpatipatipati/PBL307FINAL"
    },
    {
      title: "DDoS Defend Matrix",
      image: "/assets/POSTER-PBLRKS-213.png",
      desc: "Built a defense system to counteract DDoS attacks utilizing traffic analysis, filtering, and rate-limiting techniques.",
      tech: ["Traffic Analysis", "Filtering", "Network Security"],
      link: "https://github.com/earthwrld/PBL-RKS213-DDoS-Defend-Matrix"
    },
    {
      title: "Classic Cryptography App",
      image: "/assets/otp3.png",
      desc: "Programmed a secure application designed to encrypt and protect text messages utilizing classic cryptographic methods.",
      tech: ["Cryptography", "AppSec", "Development"],
      link: "https://polibatam.id/PBL-RKS118"
    },
    {
      title: "LaporMBG (Project Hackathon)",
      image: "/assets/lapormbg.png",
      desc: "Platform pengaduan publik interaktif untuk mengawal program Makan Bergizi Gratis (MBG), dilengkapi live preview dan penyimpanan real-time.",
      tech: ["Next.js 16", "Vanilla CSS", "LocalStorage"],
      link: "https://github.com/earthwrld/lapor-mbg"
    },
    {
      title: "Bot Keuangan Ojek Online",
      image: "/assets/botojol.png",
      desc: "Bot Telegram berbasis Google Apps Script untuk mencatat pendapatan, pengeluaran, dan komisi harian ojol secara otomatis menggunakan input bahasa alami.",
      tech: ["Telegram API", "Google Apps Script", "Google Sheets"],
      link: "https://github.com/earthwrld/telegram_bot_ojol"
    },
    {
      title: "DesCaptcha (reCAPTCHA Solver)",
      image: "/assets/descaptha.png",
      desc: "Browser extension aman yang secara otomatis memecahkan tantangan audio Google reCAPTCHA di latar belakang menggunakan Wit.ai Speech-to-Text API.",
      tech: ["Browser Extension", "Wit.ai API", "JavaScript"],
      link: "https://github.com/earthwrld/recaptcha-auto-solver"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef(null);
  const length = projects.length;
  const activeProject = projects[activeIndex];

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % length);
  }, [length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  function getImageStyle(index) {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + length) % length === index;
    const isRight = (activeIndex + 1) % length === index;
    
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "auto",
        cursor: "pointer",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "auto",
        cursor: "pointer",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transform: `translateX(0px) translateY(-${maxStickUp * 2}px) scale(0.7)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section id="projects" style={{ padding: '8rem 0', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ width: '100%' }}>
        <TerminalPrompt path="~/projects" cmd="ls" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '5rem',
          alignItems: 'center',
          '@media (min-width: 1024px)': {
            gridTemplateColumns: '1fr 1fr'
          }
        }} className="projects-grid">
          
          {/* Images Coverflow */}
          <div ref={imageContainerRef} className="glowing-container" style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '9/16',
            maxHeight: '90vh',
            perspective: '1000px',
            marginTop: '2rem',
            borderRadius: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            {projects.map((project, index) => {
              const isLeft = (activeIndex - 1 + length) % length === index;
              const isRight = (activeIndex + 1) % length === index;
              
              return (
                <img
                  key={index}
                  src={project.image}
                  alt={project.title}
                  onClick={() => {
                    if (isLeft) handlePrev();
                    if (isRight) handleNext();
                  }}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top',
                    borderRadius: '1.5rem',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                    border: '1px solid var(--surface-border)',
                    ...getImageStyle(index)
                  }}
                />
              )
            })}
          </div>

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={quoteVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ background: 'var(--surface)', padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid var(--surface-border)' }}
                className="glowing-container"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                    {activeProject.title}
                  </h3>
                  <a href={activeProject.link} target="_blank" rel="noreferrer" style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.5rem', 
                    padding: '0.5rem 1rem', background: 'var(--vibrant-coral)', color: '#fff', 
                    borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600 
                  }}>
                    View Detail <ExternalLink size={16} />
                  </a>
                </div>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                  {activeProject.desc}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {activeProject.tech.map((t, i) => (
                    <span key={i} className="cyber-text" style={{ 
                      background: 'rgba(255,255,255,0.05)', 
                      padding: '0.4rem 0.8rem', 
                      borderRadius: '6px',
                      color: 'var(--tropical-teal)',
                      border: '1px solid var(--surface-border)'
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div style={{ display: 'flex', gap: '1.5rem', paddingTop: '2rem', marginLeft: '1rem' }}>
              <button
                onClick={handlePrev}
                style={{
                  width: '3.5rem', height: '3.5rem', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: hoverPrev ? 'var(--vibrant-coral)' : 'var(--surface)',
                  border: '1px solid var(--surface-border)',
                  cursor: 'pointer', transition: 'all 0.3s',
                  color: hoverPrev ? '#fff' : 'var(--text-primary)'
                }}
                onMouseEnter={() => setHoverPrev(true)}
                onMouseLeave={() => setHoverPrev(false)}
              >
                <ArrowLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                style={{
                  width: '3.5rem', height: '3.5rem', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: hoverNext ? 'var(--cerulean)' : 'var(--surface)',
                  border: '1px solid var(--surface-border)',
                  cursor: 'pointer', transition: 'all 0.3s',
                  color: hoverNext ? '#fff' : 'var(--text-primary)'
                }}
                onMouseEnter={() => setHoverNext(true)}
                onMouseLeave={() => setHoverNext(false)}
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        .glowing-container {
          box-shadow: 0 0 50px rgba(36, 123, 160, 0.2), 0 0 80px rgba(112, 193, 179, 0.1);
          transition: box-shadow 0.3s ease;
        }
        .glowing-container:hover {
          box-shadow: 0 0 60px rgba(36, 123, 160, 0.4), 0 0 100px rgba(112, 193, 179, 0.3);
        }
      `}} />
    </section>
  );
};

export default Projects;
