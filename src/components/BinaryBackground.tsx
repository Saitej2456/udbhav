import { useEffect, useRef, useCallback, memo } from 'react';

interface Particle {
  x: number;
  y: number;
  char: string;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
}

const BinaryBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const particles: Particle[] = [];
    const cols = Math.floor(canvas.width / 40);
    const rows = Math.floor(canvas.height / 40);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * 40 + 20;
        const y = j * 40 + 20;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          char: Math.random() > 0.5 ? '1' : '0',
          vx: 0,
          vy: 0,
          opacity: 0.1 + Math.random() * 0.2,
          size: 12 + Math.random() * 4,
        });
      }
    }
    return particles;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mouse = mouseRef.current;
    const particles = particlesRef.current;

    particles.forEach((p) => {
      // Calculate distance from mouse
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 100;

      if (dist < maxDist) {
        // Gentle repel from cursor
        const force = (maxDist - dist) / maxDist;
        const angle = Math.atan2(dy, dx);
        p.vx -= Math.cos(angle) * force * 1.2;
        p.vy -= Math.sin(angle) * force * 1.2;
        
        // Increase opacity near cursor
        p.opacity = Math.min(0.8, 0.1 + force * 0.7);
      } else {
        // Fade back to base opacity
        p.opacity += (0.1 + Math.random() * 0.1 - p.opacity) * 0.05;
      }

      // Apply velocity with damping
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.92;
      p.vy *= 0.92;

      // Spring back to base position
      const returnForce = 0.03;
      p.vx += (p.baseX - p.x) * returnForce;
      p.vy += (p.baseY - p.y) * returnForce;

      // Randomly change character
      if (Math.random() < 0.002) {
        p.char = Math.random() > 0.5 ? '1' : '0';
      }

      // Draw particle
      const glowIntensity = Math.max(0, (maxDist - dist) / maxDist);
      
      if (glowIntensity > 0.2) {
        ctx.shadowColor = 'hsl(185, 100%, 50%)';
        ctx.shadowBlur = 15 * glowIntensity;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.font = `${p.size}px "JetBrains Mono", monospace`;
      ctx.fillStyle = `hsla(185, 100%, 50%, ${p.opacity})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.char, p.x, p.y);
      ctx.shadowBlur = 0;
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = initParticles(canvas);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
});

BinaryBackground.displayName = 'BinaryBackground';

export default BinaryBackground;
