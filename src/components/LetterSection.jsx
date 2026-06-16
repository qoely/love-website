import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Multi-paragraph typewriter that triggers when scrolled into view.
 * Uses char-by-char setInterval (no extra dep, framer-motion handles reveal-once).
 */
export default function LetterSection({ paragraphs = [] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [revealed, setRevealed] = useState(0);
  const [text, setText] = useState(paragraphs.map(() => ''));

  useEffect(() => {
    if (!inView) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setText(paragraphs.map((p) => p));
      setRevealed(paragraphs.length);
      return;
    }
    let cancelled = false;
    let pIdx = 0;
    let cIdx = 0;
    const speed = 18;
    const tick = () => {
      if (cancelled) return;
      if (pIdx >= paragraphs.length) return;
      const current = paragraphs[pIdx];
      if (cIdx < current.length) {
        setText((prev) => {
          const next = [...prev];
          next[pIdx] = current.slice(0, cIdx + 1);
          return next;
        });
        cIdx++;
        setTimeout(tick, speed);
      } else {
        setText((prev) => {
          const next = [...prev];
          next[pIdx] = current;
          return next;
        });
        pIdx++;
        cIdx = 0;
        setRevealed(pIdx);
        setTimeout(tick, 350);
      }
    };
    tick();
    return () => { cancelled = true; };
  }, [inView, paragraphs]);

  return (
    <section className="letter" id="letter" aria-label="Surat untukmu" ref={ref}>
      <motion.div
        className="letter-card"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8 }}
      >
        <p className="letter-eyebrow">Untukmu, dengan pelan-pelan</p>
        <div className="letter-body">
          {paragraphs.map((_, i) => (
            <p key={i}>
              {text[i]}
              {i === revealed - 1 && i === paragraphs.length - 1 ? null : (
                <span className="letter-caret" aria-hidden="true" />
              )}
            </p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
