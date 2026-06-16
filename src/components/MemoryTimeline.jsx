import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const ROTATIONS = [-3, 2, -1.5, 3, -2.5, 1, -2, 2.5];
const STORAGE_KEY = 'love-website:shuffled';

/**
 * Polaroid memory timeline with random rotation and drag-to-rearrange.
 * State persists to localStorage; reset by clearing the key.
 */
export default function MemoryTimeline({ items = [] }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Shuffle order once per session (or per user if no storage)
  const [order, setOrder] = useState(() => {
    if (typeof window === 'undefined') return items.map((_, i) => i);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === items.length) return parsed;
      }
    } catch { /* ignore */ }
    const shuffled = items.map((_, i) => i);
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(shuffled)); } catch { /* ignore */ }
    return shuffled;
  });

  useEffect(() => {
    return () => {
      // intentionally keep storage across navigations so user can rearrange
    };
  }, []);

  const move = (fromIdx, toIdx) => {
    setOrder((prev) => {
      const next = [...prev];
      const [m] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, m);
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  return (
    <section className="timeline" id="timeline" aria-label="Kenangan kita" ref={sectionRef}>
      <header className="section-header">
        <p className="section-eyebrow">keping-keping kenangan</p>
        <h2 className="section-title">Waktu-waktu kecil yang aku simpan</h2>
      </header>
      <div className="timeline-grid">
        {order.map((itemIdx, posIdx) => {
          const item = items[itemIdx];
          if (!item) return null;
          const rot = ROTATIONS[posIdx % ROTATIONS.length];
          return (
            <Polaroid
              key={`${itemIdx}-${posIdx}`}
              item={item}
              rot={rot}
              index={posIdx}
              inView={inView}
              onDragEnd={(info) => {
                // simple swap by drag distance: if dragged far enough, swap with neighbor
                if (Math.abs(info.offset.x) > 60) {
                  const dir = info.offset.x > 0 ? 1 : -1;
                  const target = posIdx + dir;
                  if (target >= 0 && target < order.length) move(posIdx, target);
                }
              }}
            />
          );
        })}
      </div>
    </section>
  );
}

function Polaroid({ item, rot, index, inView, onDragEnd }) {
  return (
    <motion.article
      className="polaroid"
      initial={{ opacity: 0, y: 40, rotate: rot }}
      animate={inView ? { opacity: 1, y: 0, rotate: rot } : { opacity: 0, y: 40, rotate: rot }}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.3 } }}
      whileTap={{ cursor: 'grabbing' }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.3}
      onDragEnd={(_, info) => onDragEnd(info)}
      role="img"
      aria-label={`${item.title} - ${item.caption}`}
    >
      <img
        className="polaroid-img"
        src={item.image}
        alt={item.title}
        loading="lazy"
        decoding="async"
        onError={(e) => { e.currentTarget.style.background = 'var(--bg-deep)'; e.currentTarget.removeAttribute('src'); }}
      />
      <span className="polaroid-date">{item.date}</span>
      <h3 className="polaroid-title">{item.title}</h3>
      <p className="polaroid-caption-text">{item.caption}</p>
    </motion.article>
  );
}
