import { useEffect, useState } from 'react';
import Hero from './components/Hero.jsx';
import LetterSection from './components/LetterSection.jsx';
import MemoryTimeline from './components/MemoryTimeline.jsx';
import ClosingNote from './components/ClosingNote.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import BackgroundHearts from './components/BackgroundHearts.jsx';

/**
 * Loads customize.json from public/ at runtime so the same
 * content file works for both vanilla-static and react-interactive
 * branches without code edit.
 */
async function loadConfig() {
  const res = await fetch(`${import.meta.env.BASE_URL}customize.json`, {
    cache: 'no-cache',
  });
  if (!res.ok) throw new Error(`customize.json not found (${res.status})`);
  return res.json();
}

export default function App() {
  const [cfg, setCfg] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    loadConfig().then(setCfg).catch(setErr);
  }, []);

  if (err) {
    return (
      <p style={{ padding: '2rem', fontFamily: 'system-ui' }}>
        customize.json tidak ditemukan. Jalankan dari folder love-website.
      </p>
    );
  }
  if (!cfg) {
    return (
      <div className="loader" aria-hidden="true">
        <div className="loader-heart" />
      </div>
    );
  }

  return (
    <>
      <BackgroundHearts />
      <MusicPlayer src={cfg.music?.src} title={cfg.music?.title} />
      <Hero hero={cfg.hero} />
      <LetterSection paragraphs={cfg.letter} />
      <MemoryTimeline items={cfg.timeline} />
      <ClosingNote closing={cfg.closing} />
      <footer className="site-footer">
        <p>dibuat dengan sayang, khusus untuk kamu.</p>
        <p className="site-footer-meta">
          fork &amp; customizable via <code>customize.json</code>
        </p>
      </footer>
    </>
  );
}
