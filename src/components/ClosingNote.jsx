import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import confetti from 'canvas-confetti';

/**
 * Penutup: thank-you message + small "ulang dari awal" button.
 * No proposal, no Yes/No. Just words + a soft restart option.
 */
export default function ClosingNote({ closing }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  if (!closing) return null;

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof confetti === 'function') {
      const heart = confetti.shapeFromPath({
        path: 'M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 11c0 5.5-7 10-7 10z',
      });
      const colors = ['#F4ACB7', '#FFD1DC', '#E5B299', '#D4AF37'];
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 },
        shapes: [heart],
        colors,
        startVelocity: 25,
      });
    }
  };

  return (
    <section className="closing" id="closing" aria-label="Penutup" ref={ref}>
      <motion.div
        className="closing-card"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="closing-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {closing.eyebrow}
        </motion.p>

        <motion.h2
          className="closing-headline"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {closing.headline}
        </motion.h2>

        <motion.p
          className="closing-sub"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {closing.sub}
        </motion.p>

        <motion.p
          className="closing-footnote"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          {closing.footnote}
        </motion.p>

        <motion.button
          className="closing-replay"
          type="button"
          onClick={handleReplay}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>ulang dari awal</span>
        </motion.button>
      </motion.div>
    </section>
  );
}
