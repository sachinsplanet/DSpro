import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

const DATA_PALETTE = [
  '215, 255, 84',  // #d7ff54 Electric Lime (primary accent)
  '56, 189, 248',  // #38bdf8 Data Cyan
  '165, 243, 252', // #a5f3fc Soft Ice Cyan
];

export const CursorParticleTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect reduced motion & skip on touch-only devices
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)');
    if (reducedMotionQuery.matches || coarsePointerQuery.matches) {
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const updateSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateSize();

    const particles: Particle[] = [];
    const maxParticles = 48;
    let lastX = -100;
    let lastY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let cursorGlowAlpha = 0;
    let rafId: number | null = null;

    const spawnParticles = (x: number, y: number, dx: number, dy: number) => {
      const dist = Math.hypot(dx, dy);
      const count = dist > 18 ? 2 : 1;

      for (let i = 0; i < count; i++) {
        if (particles.length >= maxParticles) {
          particles.shift();
        }

        const t = count > 1 ? i / count : 0;
        const px = x - dx * t + (Math.random() - 0.5) * 6;
        const py = y - dy * t + (Math.random() - 0.5) * 6;

        // Weighted palette: mostly lime and cyan data nodes
        const colorIndex = Math.random() < 0.55 ? 0 : Math.random() < 0.8 ? 1 : 2;

        particles.push({
          x: px,
          y: py,
          vx: (dx * 0.025) + (Math.random() - 0.5) * 0.45,
          vy: (dy * 0.025) + (Math.random() - 0.5) * 0.45 - 0.15,
          size: Math.random() * 1.8 + 1.1,
          alpha: Math.random() * 0.35 + 0.45,
          decay: Math.random() * 0.014 + 0.014,
          color: DATA_PALETTE[colorIndex],
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Soft ambient data halo around the cursor
      if (cursorGlowAlpha > 0.005) {
        const haloRadius = 44;
        const gradient = ctx.createRadialGradient(
          cursorX,
          cursorY,
          0,
          cursorX,
          cursorY,
          haloRadius
        );
        gradient.addColorStop(0, `rgba(215, 255, 84, ${cursorGlowAlpha * 0.14})`);
        gradient.addColorStop(0.45, `rgba(56, 189, 248, ${cursorGlowAlpha * 0.06})`);
        gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cursorX, cursorY, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        cursorGlowAlpha *= 0.92;
      } else {
        cursorGlowAlpha = 0;
      }

      // Update and render glowing data particles + subtle telemetry links
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.alpha -= p.decay;

        if (p.alpha <= 0.01) {
          particles.splice(i, 1);
          continue;
        }

        // Draw faint network edges between consecutive close nodes for a data-constellation feel
        if (i > 0) {
          const prev = particles[i - 1];
          const linkDist = Math.hypot(p.x - prev.x, p.y - prev.y);
          if (linkDist < 48) {
            const lineAlpha = Math.min(p.alpha, prev.alpha) * (1 - linkDist / 48) * 0.28;
            ctx.strokeStyle = `rgba(${p.color}, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }

        // Outer soft glow
        const glowRadius = p.size * 3.6;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        glow.addColorStop(0, `rgba(${p.color}, ${p.alpha * 0.55})`);
        glow.addColorStop(1, `rgba(${p.color}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Crisp core node
        ctx.fillStyle = `rgba(${p.color}, ${Math.min(1, p.alpha * 1.15)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (particles.length > 0 || cursorGlowAlpha > 0.005) {
        rafId = window.requestAnimationFrame(render);
      } else {
        rafId = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;

      cursorX = e.clientX;
      cursorY = e.clientY;
      cursorGlowAlpha = 1;

      if (lastX < 0 && lastY < 0) {
        lastX = cursorX;
        lastY = cursorY;
      }

      const dx = cursorX - lastX;
      const dy = cursorY - lastY;
      const dist = Math.hypot(dx, dy);

      if (dist >= 4) {
        spawnParticles(cursorX, cursorY, dx, dy);
        lastX = cursorX;
        lastY = cursorY;
      }

      if (rafId === null) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    window.addEventListener('resize', updateSize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-40"
    />
  );
};
