import { useEffect, useRef } from 'react';

export default function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particles representing zero-g celestial dust and micro-orbs
    const numParticles = Math.min(65, Math.floor(width / 25));
    const particles = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        color: i % 3 === 0 ? '#00f2fe' : i % 3 === 1 ? '#7f00ff' : '#ffffff',
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulseVal: Math.random() * Math.PI
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw celestial particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulseVal += p.pulseSpeed;

        // Wrap around screen in zero-g
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle zero-g repulsion from cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulseVal));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep cosmic gradient backdrop */}
      <div className="absolute inset-0 bg-[#030712] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(127,0,255,0.18),rgba(255,255,255,0))]" />
      
      {/* Floating spatial aura nebulas */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/3 -right-48 w-[28rem] h-[28rem] bg-purple-600/15 rounded-full blur-[100px] animate-float-reverse" />
      <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow" />
      
      {/* Perspective grid overlay */}
      <div className="absolute inset-0 perspective-grid opacity-25" />

      {/* Zero-G Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
