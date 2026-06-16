import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function ConfessionCTA({ cta }) {
  const [yesScale, setYesScale] = useState(1);
  const [noIdx, setNoIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [shrinking, setShrinking] = useState(false);
  const yesRef = useRef(null);

  const noMessages = cta?.noMessages || [];

  const onNo = () => {
    if (answered) return;
    setYesScale((s) => Math.min(s * 1.35, 3.2));
    setShrinking(true);
    setTimeout(() => setShrinking(false), 400);
    setNoIdx((i) => i + 1);
  };

  const onYes = () => {
    if (answered) return;
    setAnswered(true);
    fireConfetti();
  };

  return (
    <section className="cta" id="cta" aria-label="Pertanyaan">
      <motion.div
        className="cta-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="cta-question">{cta?.question}</h2>
        <p className="cta-sub">Tekan "Mau" kalau kamu masih mau di sini. 💕</p>
        <div className="cta-buttons">
          <motion.button
            ref={yesRef}
            id="cta-yes"
            className="cta-yes"
            type="button"
            onClick={onYes}
            animate={{ scale: yesScale }}
            transition={{ type: 'spring', stiffness: 240, damping: 18 }}
          >
            {cta?.yesLabel || 'Mau'}
          </motion.button>
          <button
            id="cta-no"
            className={`cta-no${shrinking ? ' is-shrinking' : ''}`}
            type="button"
            onClick={onNo}
            disabled={answered}
          >
            {noMessages[noIdx % Math.max(noMessages.length, 1)] || 'Nanti dulu'}
          </button>
        </div>
        <AnimatePresence>
          {answered && (
            <motion.p
              className="cta-success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {cta?.successMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function fireConfetti() {
  if (typeof window.confetti !== 'function') return;
  const heart = window.confetti.shapeFromPath({
    path: 'M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 11c0 5.5-7 10-7 10z',
  });
  const colors = ['#F4ACB7', '#FFD1DC', '#E5B299', '#D4AF37'];
  const defaults = {
    spread: 70, ticks: 80, gravity: 0.7, decay: 0.92,
    startVelocity: 35, shapes: [heart], colors,
  };
  window.confetti({ ...defaults, particleCount: 60, origin: { x: 0.2, y: 0.6 } });
  window.confetti({ ...defaults, particleCount: 60, origin: { x: 0.8, y: 0.6 } });
  setTimeout(
    () => window.confetti({ ...defaults, particleCount: 100, origin: { x: 0.5, y: 0.4 } }),
    200
  );
}
