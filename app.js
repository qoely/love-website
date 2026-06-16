/* ============================================
   Love Website — Vanilla App
   Loads customize.json, renders sections, wires interactions.
   Theme: surat cinta sebagai tanda terima kasih (no proposal).
   ============================================ */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/** Load customize.json (served from same origin). */
async function loadConfig() {
  const res = await fetch('./customize.json', { cache: 'no-cache' });
  if (!res.ok) throw new Error(`customize.json not found (${res.status})`);
  return res.json();
}

/** Reveal helper for data-anim elements using IntersectionObserver. */
function setupRevealAnimations() {
  const els = $$('[data-anim]');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number(entry.target.dataset.animDelay || 0);
          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  els.forEach((el) => io.observe(el));
}

/** SVG letter paths. Each key is one uppercase character.
 *  Coordinates are roughly 0-50 wide, 0-80 tall, scaled to letterW.
 *  Covers: TERIMA KASIH, MAKASIH YA, BUAT KAMU, BERSYUKUR, dll. */
const LETTER_PATHS = {
  U: 'M5,5 L5,55 Q5,75 25,75 Q45,75 45,55 L45,5',
  N: 'M5,5 L5,75 L45,5 L45,75',
  T: 'M5,5 L45,5 M25,5 L25,75',
  E: 'M5,5 L5,75 L40,75 M5,5 L35,5 M5,40 L30,40',
  R: 'M5,5 L5,75 M5,5 L30,5 Q42,5 42,20 Q42,32 30,32 L5,32 M22,32 L42,75',
  I: 'M25,5 L25,75',
  M: 'M5,75 L5,5 L25,40 L45,5 L45,75',
  A: 'M5,75 L25,5 L45,75 M13,50 L37,50',
  K: 'M5,5 L5,75 M5,40 L40,5 M5,40 L40,75',
  S: 'M40,15 Q35,5 22,5 Q5,5 5,20 Q5,35 22,38 Q40,40 40,55 Q40,75 22,75 Q10,75 5,65',
  H: 'M5,5 L5,75 M45,5 L45,75 M5,40 L45,40',
  Y: 'M5,5 L25,40 L45,5 M25,40 L25,75',
  G: 'M40,15 Q30,5 18,5 Q5,5 5,40 Q5,75 18,75 Q35,75 40,60 L40,40 L20,40',
  B: 'M5,5 L5,75 M5,5 L30,5 Q40,5 40,20 Q40,30 30,32 L5,32 M5,32 L32,32 Q45,32 45,52 Q45,75 32,75 L5,75',
  D: 'M5,5 L5,75 L25,75 Q45,75 45,40 Q45,5 25,5 Z',
  P: 'M5,5 L5,75 M5,5 L30,5 Q42,5 42,20 Q42,35 30,35 L5,35',
  O: 'M25,5 Q5,5 5,40 Q5,75 25,75 Q45,75 45,40 Q45,5 25,5 Z',
  L: 'M5,5 L5,75 L40,75',
  C: 'M40,15 Q30,5 18,5 Q5,5 5,40 Q5,75 18,75 Q30,75 40,65',
  W: 'M5,5 L15,75 L25,30 L35,75 L45,5',
  F: 'M5,5 L5,75 M5,5 L40,5 M5,40 L30,40',
  V: 'M5,5 L25,75 L45,5',
  J: 'M40,5 L40,55 Q40,75 25,75 Q15,75 10,68',
  Q: 'M25,5 Q5,5 5,40 Q5,75 25,75 Q40,75 43,68 M30,55 L45,75',
  X: 'M5,5 L45,75 M45,5 L5,75',
  Z: 'M5,5 L45,5 L5,75 L45,75',
};

function renderHeroSvg(word) {
  const svg = $('.hero-svg');
  if (!svg) return;
  const upper = (word || '').toUpperCase();
  // Detect approximate width: viewBox grows with character count
  const viewBoxWidth = Math.max(600, upper.length * 70);
  const viewBoxHeight = 160;
  const letterW = 70;
  const total = upper.length * letterW;
  const startX = (viewBoxWidth - total) / 2 + letterW / 2;
  svg.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);

  upper.split('').forEach((char, i) => {
    const path = LETTER_PATHS[char];
    if (!path) return; // skip unknown (spaces etc.)
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${startX + i * letterW - 35}, 30)`);

    const stroke = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    stroke.setAttribute('d', path);
    stroke.setAttribute('class', 'lttr-stroke');
    stroke.setAttribute('data-letter-index', String(i));

    const fill = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    fill.setAttribute('d', path);
    fill.setAttribute('class', 'lttr-fill');
    fill.setAttribute('data-letter-index', String(i));

    g.append(stroke, fill);
    svg.appendChild(g);
  });
}

function animateHeroSvg() {
  if (typeof window.anime === 'undefined') {
    $$('.lttr-fill').forEach((el) => (el.style.opacity = 1));
    $$('.lttr-stroke').forEach((el) => (el.style.opacity = 0));
    return;
  }
  window.anime
    .timeline({ easing: 'easeInOutQuad' })
    .add({
      targets: '.lttr-stroke',
      strokeDashoffset: [window.anime.setDashoffset, 0],
      duration: 1200,
      delay: window.anime.stagger(120),
    })
    .add(
      {
        targets: '.lttr-fill',
        opacity: [0, 1],
        duration: 600,
        delay: window.anime.stagger(80),
      },
      '-=600'
    )
    .add(
      {
        targets: '.lttr-stroke',
        opacity: [1, 0],
        duration: 400,
        delay: window.anime.stagger(60),
      },
      '-=400'
    );
}

/* ============================================
   Letter — typewriter (multi-paragraph)
   ============================================ */
function renderLetter(paragraphs) {
  const target = $('#letter-body');
  if (!target) return;
  target.innerHTML = '';
  paragraphs.forEach(() => {
    const p = document.createElement('p');
    p.textContent = '';
    target.appendChild(p);
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          io.disconnect();
          typewrite(paragraphs, target);
        }
      });
    },
    { threshold: 0.4 }
  );
  io.observe(target);
}

function typewrite(paragraphs, container) {
  const ps = $$('p', container);
  let pIdx = 0;
  let cIdx = 0;
  const speed = 18;
  const caret = '<span class="letter-caret" aria-hidden="true"></span>';

  function tick() {
    if (pIdx >= paragraphs.length) {
      const last = ps[pIdx - 1];
      if (last) last.innerHTML = last.innerHTML.replace(caret, '');
      return;
    }
    const text = paragraphs[pIdx];
    if (cIdx < text.length) {
      ps.forEach((p, i) => {
        if (i < pIdx) return;
        if (i > pIdx) p.textContent = '';
      });
      const shown = text.slice(0, cIdx + 1).replace(/\n/g, '<br>');
      ps[pIdx].innerHTML = shown + caret;
      cIdx++;
      setTimeout(tick, speed);
    } else {
      ps[pIdx].innerHTML = text + caret;
      pIdx++;
      cIdx = 0;
      setTimeout(tick, 350);
    }
  }
  tick();
}

/* ============================================
   Timeline — polaroid cards with scroll reveal
   ============================================ */
function renderTimeline(items) {
  const grid = $('#timeline-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const rotations = [-3, 2, -1.5, 3, -2.5, 1, -2, 2.5];

  items.forEach((item, i) => {
    const rot = rotations[i % rotations.length];
    const card = document.createElement('article');
    card.className = 'polaroid';
    card.style.setProperty('--rot', `${rot}deg`);
    card.style.position = 'relative';
    card.setAttribute('data-pswp-src', item.image);
    card.setAttribute('data-cropped', 'true');
    card.innerHTML = `
      <img
        class="polaroid-img"
        src="${escapeAttr(item.image)}"
        alt="${escapeAttr(item.title)}"
        loading="lazy"
        decoding="async"
        onerror="this.style.background='var(--bg-deep)';this.removeAttribute('src')"
      />
      <span class="polaroid-date">${escapeHtml(item.date)}</span>
      <h3 class="polaroid-title">${escapeHtml(item.title)}</h3>
      <p class="polaroid-caption-text">${escapeHtml(item.caption)}</p>
    `;
    grid.appendChild(card);
  });

  setupPolaroidReveal();
  setupPhotoSwipe();
}

function setupPolaroidReveal() {
  if (!('IntersectionObserver' in window)) {
    $$('.polaroid').forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const idx = Array.from(el.parentElement.children).indexOf(el);
          setTimeout(() => el.classList.add('is-visible'), idx * 90);
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.15 }
  );
  $$('.polaroid').forEach((el) => io.observe(el));
}

function setupPhotoSwipe() {
  if (typeof window.PhotoSwipe === 'undefined') return;
  const grid = $('#timeline-grid');
  if (!grid) return;

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.polaroid');
    if (!card) return;
    const items = $$('.polaroid').map((el) => ({
      src: el.getAttribute('data-pswp-src'),
      w: 1200,
      h: 900,
    }));
    const index = $$('.polaroid').indexOf(card);
    new window.PhotoSwipe({
      dataSource: items,
      index,
      pswpModule: () => import('https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe.esm.min.js'),
    }).init();
  });
}

/* ============================================
   Closing — thank-you section (no buttons, no pressure)
   Just text reveal + optional "replay" button.
   ============================================ */
function setupClosing(closing) {
  if (!closing) return;
  const card = $('.closing-card');
  if (!card) return;
  $('.closing-eyebrow').textContent = closing.eyebrow || '';
  $('.closing-headline').textContent = closing.headline || '';
  $('.closing-sub').textContent = closing.sub || '';
  $('.closing-footnote').textContent = closing.footnote || '';

  const replay = $('.closing-replay');
  if (replay) {
    replay.addEventListener('click', () => {
      // Soft restart: scroll to top + re-trigger animations
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Optional: fire a gentle confetti for "you finished reading"
      if (typeof window.confetti === 'function') {
        const heart = window.confetti.shapeFromPath({
          path: 'M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 11c0 5.5-7 10-7 10z',
        });
        const colors = ['#F4ACB7', '#FFD1DC', '#E5B299', '#D4AF37'];
        window.confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.5 },
          shapes: [heart],
          colors,
          startVelocity: 25,
        });
      }
    });
  }
}

/* ============================================
   Music player — autoplay-muted + click-to-unmute
   ============================================ */
function setupMusic(musicCfg) {
  const audio = $('#bg-music');
  const btn = $('#music-toggle');
  const icon = btn.querySelector('.music-icon');
  if (!audio || !btn || !musicCfg?.src) {
    btn.hidden = true;
    return;
  }
  audio.src = musicCfg.src;
  btn.hidden = false;

  audio.muted = true;
  audio.play().catch(() => { /* user must click */ });

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.muted = false;
      audio.play();
      icon.setAttribute('data-icon', 'pause');
      btn.classList.add('is-playing');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      audio.pause();
      icon.setAttribute('data-icon', 'play');
      btn.classList.remove('is-playing');
      btn.setAttribute('aria-pressed', 'false');
    }
  });
}

/* ============================================
   Util
   ============================================ */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function escapeAttr(s) { return escapeHtml(s); }

/* ============================================
   Boot
   ============================================ */
async function boot() {
  let cfg;
  try {
    cfg = await loadConfig();
  } catch (err) {
    console.error(err);
    document.body.innerHTML = `<p style="padding:2rem;font-family:system-ui">customize.json tidak ditemukan. Jalankan dari folder love-website.</p>`;
    return;
  }

  renderHeroSvg(cfg.hero.title);
  $('.hero-subtitle').textContent = cfg.hero.subtitle;
  $('.hero-signature').textContent = `— ${cfg.hero.signature}`;

  renderLetter(cfg.letter);
  renderTimeline(cfg.timeline);
  setupClosing(cfg.closing);
  setupMusic(cfg.music);

  setTimeout(animateHeroSvg, 250);
  setupRevealAnimations();
  setTimeout(() => $('#loader')?.classList.add('is-hidden'), 300);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
