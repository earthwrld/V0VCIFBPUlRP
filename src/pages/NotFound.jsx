import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Globe } from "../components/ui/Globe";
import GridBackground from "../components/GridBackground";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const globeVariants = {
  hidden: { scale: 0.85, opacity: 0, y: 10 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
  floating: {
    y: [-4, 4],
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export default function NotFound({
  title = "Ups! Lost in space",
  description = "We couldn't find the page you're looking for. It might have been moved or deleted.",
  backText = "Go Back",
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
      
      <AnimatePresence mode="wait">
        <motion.div
          style={{ textAlign: 'center', zIndex: 10 }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeUp}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            <motion.span
              style={{
                fontSize: 'clamp(4.5rem, 8vw, 6rem)',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                userSelect: 'none',
                opacity: 0.9
              }}
              variants={fadeUp}
            >
              4
            </motion.span>

            <motion.div
              style={{
                position: 'relative',
                width: 'clamp(8rem, 20vw, 12rem)',
                height: 'clamp(8rem, 20vw, 12rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: '50%',
              }}
              variants={globeVariants}
              animate={["visible", "floating"]}
            >
              <Globe size={300} style={{ transform: 'scale(0.6)', transformOrigin: 'center center', position: 'absolute' }} />
              <div style={{
                pointerEvents: 'none',
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, rgba(0,0,0,0.05) 0%, transparent 70%)'
              }} />
            </motion.div>

            <motion.span
              style={{
                fontSize: 'clamp(4.5rem, 8vw, 6rem)',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                userSelect: 'none',
                opacity: 0.9
              }}
              variants={fadeUp}
            >
              4
            </motion.span>
          </div>
        
          <motion.h1
            style={{
              marginBottom: '1rem',
              fontSize: 'clamp(1.875rem, 5vw, 3rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)'
            }}
            variants={fadeUp}
          >
            {title}
          </motion.h1>

          <motion.p
            style={{
              margin: '0 auto 2.5rem',
              maxWidth: '28rem',
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}
            variants={fadeUp}
          >
            {description}
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button>
                <ArrowLeft size={20} />
                {backText}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
