import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Mail } from 'lucide-react';

const Navbar = () => {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // High threshold ensures the section is properly in view before switching
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          setActive(entry.target.id);
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(s => observer.observe(s));
    
    return () => {
      sections.forEach(s => observer.unobserve(s));
    };
  }, []);

  const links = [
    { id: 'home', icon: <Home size={22} />, label: 'Home' },
    { id: 'about', icon: <User size={22} />, label: 'About' },
    { id: 'projects', icon: <Briefcase size={22} />, label: 'Projects' },
    { id: 'contact', icon: <Mail size={22} />, label: 'Contact' }
  ];

  return (
    <nav className="side-navbar">
      {links.map(link => {
        const isActive = active === link.id;
        return (
          <a 
            key={link.id} 
            href={`#${link.id}`} 
            className="nav-item"
            style={{
              color: isActive ? 'var(--vibrant-coral)' : 'var(--text-secondary)',
              transform: isActive ? 'scale(1.2)' : 'scale(1)',
              background: isActive ? 'rgba(242, 95, 92, 0.1)' : 'transparent',
              borderRadius: '50%',
              padding: '12px'
            }}
            title={link.label}
          >
            {link.icon}
          </a>
        );
      })}

      <style dangerouslySetInnerHTML={{__html: `
        .side-navbar {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: rgba(30,34,38,0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 1.5rem 0.8rem;
          border-radius: 50px;
          border: 1px solid var(--surface-border);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .nav-item {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .nav-item:hover {
          color: var(--vibrant-coral) !important;
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .side-navbar {
            right: 50%;
            top: auto;
            bottom: 2rem;
            transform: translateX(50%);
            flex-direction: row;
            padding: 0.8rem 1.5rem;
          }
        }
      `}} />
    </nav>
  );
};

export default Navbar;
