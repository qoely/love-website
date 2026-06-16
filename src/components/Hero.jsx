import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LETTER_PATHS } from '../lib/letterPaths.js';

const LETTER_W = 70;
const VIEWBOX_H = 160;

/**
 * Hero section with SVG letter-by-letter "stroke + fill" reveal.
 * Uses pure CSS keyframes (no external lib) for max reliability +
 * smaller bundle. Framer Motion handles the subtitle/signature/scroll
 * fade-up reveals.
 *
 * ViewBox width grows with character count so long words like
 * "TERIMA KASIH" (12 letters) fit naturally.
 */
export default function Hero({ hero }) {
  const upper = (hero?.title || 'TERIMA KASIH').toUpperCase();
  const viewBoxW = Math.max(600, upper.length * LETTER_W);

  useEffect(() => {
    const els = document.querySelectorAll('.hero-svg .lttr-stroke, .hero-svg .lttr-fill');
    els.forEach((el) => {
      el.style.animation = 'none';
      void el.getBoundingClientRect();
      el.style.animation = '';
    });
  }, [upper]);

  const total = upper.length * LETTER_W;
  const startX = (viewBoxW - total) / 2 + LETTER_W / 2;

  return (
    <section className="hero" id="hero" aria-label="Pembuka">
      <div className="hero-inner">
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          dari aku, untukmu
        </motion.p>

        <h1 className="hero-title" aria-label={hero?.title}>
          <svg
            className="hero-svg"
            viewBox={`0 0 ${viewBoxW} ${VIEWBOX_H}`}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
          >
            {upper.split('').map((char, i) => {
              const path = LETTER_PATHS[char];
              if (!path) return null;
              const tx = startX + i * LETTER_W - 35;
              return (
                <g key={`${char}-${i}`} transform={`translate(${tx}, 30)`}>
                  <path
                    d={path}
                    className="lttr-stroke"
                    data-letter-index={i}
                    fill="none"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                  <path
                    d={path}
                    className="lttr-fill"
                    data-letter-index={i}
                    style={{ animationDelay: `${i * 0.12 + 0.7}s` }}
                  />
                </g>
              );
            })}
          </svg>
        </h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {hero?.subtitle}
        </motion.p>

        <motion.p
          className="hero-signature"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          — {hero?.signature}
        </motion.p>

        <motion.a
          href="#letter"
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          aria-label="Gulir ke bawah"
        >
          <span>mulai dari sini</span>
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path
              d="M12 4v16M5 13l7 7 7-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </div>
    </section>
  );
}
