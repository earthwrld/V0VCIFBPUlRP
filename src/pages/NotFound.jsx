import React from "react";

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Globe } from "../components/ui/Globe";
import GridBackground from "../components/GridBackground";



export default function NotFound({
  title = "Ups! Lost in space",
  description = "Looks like you've drifted out of orbit. This page doesn't exist — but the rest of the portfolio is still here, waiting to be explored.",
  backText = "Go Back 🚀",
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 1rem',
      minHeight: '100vh',
      background: 'var(--background)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <GridBackground />
      
      <div style={{ textAlign: 'center', zIndex: 10 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            <span
              style={{
                fontSize: 'clamp(4.5rem, 8vw, 6rem)',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                userSelect: 'none',
                opacity: 0.9
              }}

            >
              4
            </span>

            <div
              style={{
                position: 'relative',
                width: 'clamp(4.5rem, 8vw, 6rem)',
                height: 'clamp(4.5rem, 8vw, 6rem)',
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              <Globe size={150} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }} />
            </div>

            <span
              style={{
                fontSize: 'clamp(4.5rem, 8vw, 6rem)',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                userSelect: 'none',
                opacity: 0.9
              }}

            >
              4
            </span>
          </div>
        
          <h1
            style={{
              marginBottom: '1rem',
              fontSize: 'clamp(1.875rem, 5vw, 3rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)'
            }}
          >
            {title}
          </h1>

          <p
            style={{
              margin: '0 auto 2.5rem',
              maxWidth: '28rem',
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}
          >
            {description}
          </p>

          <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  padding: '0.8rem 2rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ArrowLeft size={20} />
                {backText}
              </button>
            </Link>
          </div>
        </div>
    </div>
  );
}
