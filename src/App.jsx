import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import GridBackground from './components/GridBackground';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Prevent browser from jumping to hash on reload by removing the hash
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Initialize smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Force to top to override any cached scroll position
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      lenis.scrollTo(0, { immediate: true });
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <GridBackground />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
