import { useEffect, useRef } from 'react';

/**
 * Lightweight floating-hearts background using a canvas2d animation.
 * Avoids pulling the full tsParticles bundle (~80KB) for a simple
 * decorative effect. Particles drift upward, fading out.
 */
export default function BackgroundHearts() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const COLORS = ['#F4ACB7', '#FFD1DC', '#E5B299'];
    const COUNT = reduce ? 8 : 22;
    const hearts = Array.from({ length: COUNT }, () => spawn());

    function spawn() {
      return {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + Math.random() * 60,
        size: 6 + Math.random() * 14,
        speed: 0.3 + Math.random() * 0.6,
        drift: (Math.random() - 0.5) * 0.4,
        alpha: 0.4 + Math.random() * 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot: (Math.random() - 0.5) * 0.6,
      };
    }

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const h of hearts) {
        h.y -= h.speed;
        h.x += h.drift;
        h.rot += 0.002;
        if (h.y < -20) Object.assign(h, spawn(), { y: window.innerHeight + 20 });
        drawHeart(ctx, h.x, h.y, h.size, h.color, h.alpha, h.rot);
      }
      raf = requestAnimationFrame(tick);
    };
    if (!reduce) raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="bg-hearts" aria-hidden="true" />;
}

function drawHeart(ctx, x, y, size, color, alpha, rot) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.scale(size / 30, size / 30);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 8);
  ctx.bezierCurveTo(-12, -8, -22, 4, 0, 22);
  ctx.bezierCurveTo(22, 4, 12, -8, 0, 8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
