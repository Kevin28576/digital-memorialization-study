import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const ParticlesBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const createParticles = () => {
    const particles: Particle[] = [];
    if (!containerRef.current) return particles;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const particleCount = Math.min(Math.max(width, height) / 12, 100); // Responsive count

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 1,
        speedX: Math.random() * 0.4 - 0.2,
        speedY: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    return particles;
  };

  const updateParticles = (time: number) => {
    if (!containerRef.current || !particlesRef.current.length) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    particlesRef.current = particlesRef.current.map(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Boundary check
      if (particle.x < 0 || particle.x > width) {
        particle.speedX *= -1;
      }
      if (particle.y < 0 || particle.y > height) {
        particle.speedY *= -1;
      }

      return particle;
    });

    renderParticles();
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(updateParticles);
  };

  const renderParticles = () => {
    if (!containerRef.current) return;
    
    // Clear existing particles
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    
    // Create and append new particle elements
    particlesRef.current.forEach(particle => {
      const element = document.createElement('div');
      element.className = 'particle';
      element.style.left = `${particle.x}px`;
      element.style.top = `${particle.y}px`;
      element.style.width = `${particle.size}px`;
      element.style.height = `${particle.size}px`;
      element.style.opacity = particle.opacity.toString();
      element.style.animationDelay = `${Math.random() * 5}s`;
      containerRef.current?.appendChild(element);
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        particlesRef.current = createParticles();
        renderParticles();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    requestRef.current = requestAnimationFrame(updateParticles);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return <div ref={containerRef} className="particles-container" />;
};

export default ParticlesBackground;