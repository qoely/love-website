/* ============================================
   Love Website — Vanilla App
   Loads customize.json, renders sections, wires interactions.
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

/** SVG letter paths for the word "UNTUKMU" (uppercased). Each letter
 *  is a hand-tuned path that can be stroked + filled by anime.js. */
const LETTER_PATHS = {
  U: 'M5,5 L5,55 Q5,75 25,75 Q45,75 45,55 L45,5',
  N: 'M5,5 L5,75 L45,5 L45,75',
  T: 'M5,5 L45,5 M25,5 L25,75',
  K: 'M5,5 L5,75 M5,40 L40,5 M5,40 L40,75',
  R: 'M5,5 L5,75 M5,5 L35,5 Q45,5 45,20 Q45,35 35,35 L5,35 M25,35 L45,75',
  M: 'M5,75 L5,5 L25,45 L45,5 L45,75',
};

function renderHeroSvg(word) {
  const svg = $('.hero-svg');
  if (!svg) return;
  const upper = word.toUpperCase();
  const viewBoxWidth = 600;
  const viewBoxHeight = 160;
  const letterW = 70;
  const total = upper.length * letterW;
  const startX = (viewBoxWidth - total) / 2 + letterW / 2;
  svg.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);

  upper.split('').forEach((char, i) => {
    const path = LETTER_PATHS[char];
    if (!path) return;
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
    // fallback: just show letters filled
    $$('.lttr-fill').forEach((el) => (el.style.opacity = 1));
    $$('.lttr-stroke').forEach((el) => (el.style.opacity = 0));
    return;
  }
  // stroke draw, then fill
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
  paragraphs.forEach((para) => {
    const p = document.createElement('p');
    p.textContent = '';
    target.appendChild(p);
  });

  // Trigger via IntersectionObserver
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
  const speed = 18; // ms per char
  const caret = '<span class="letter-caret" aria-hidden="true"></span>';

  function tick() {
    if (pIdx >= paragraphs.length) {
      // remove caret from last paragraph
      const last = ps[pIdx - 1];
      if (last) last.innerHTML = last.innerHTML.replace(caret, '');
      return;
    }
    const text = paragraphs[pIdx];
    if (cIdx < text.length) {
      // clear all but last, then update
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
        src="${item.image}"
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
    const src = card.getAttribute('data-pswp-src');
    const items = $$('.polaroid').map((el) => ({
      src: el.getAttribute('data-pswp-src'),
      w: 1200,
      h: 900,
    }));
    const index = $$('.polaroid').indexOf(card);
    const pswpEl = $('.pswp');
    const gallery = new window.PhotoSwipe({
      dataSource: items,
      index,
      pswpModule: () => import('https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe.esm.min.js'),
    });
    gallery.init();
  });
}

/* ============================================
   CTA — growing Yes button + confetti
   ============================================ */
function setupCta(cta) {
  const yesBtn = $('#cta-yes');
  const noBtn = $('#cta-no');
  const success = $('#cta-success');
  if (!yesBtn || !noBtn) return;

  yesBtn.textContent = cta.yesLabel;
  $('#cta-question').textContent = cta.question;

  let yesScale = 1;
  let noIdx = 0;
  let answered = false;

  noBtn.addEventListener('click', () => {
    if (answered) return;
    yesScale = Math.min(yesScale * 1.35, 3.2);
    yesBtn.style.transform = `scale(${yesScale})`;
    noBtn.classList.add('is-shrinking');
    setTimeout(() => noBtn.classList.remove('is-shrinking'), 400);

    const messages = cta.noMessages || [];
    noBtn.textContent = messages[noIdx % messages.length] || '...';
    noIdx++;
  });

  yesBtn.addEventListener('click', () => {
    if (answered) return;
    answered = true;
    fireConfetti();
    success.textContent = cta.successMessage || '';
    success.hidden = false;
    noBtn.style.opacity = '0.4';
    noBtn.disabled = true;
    yesBtn.style.transform = 'scale(1.3)';
  });
}

function fireConfetti() {
  if (typeof window.confetti !== 'function') return;
  // Burst from both sides
  const heart = window.confetti.shapeFromPath({
    path: 'M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 11c0 5.5-7 10-7 10z',
  });
  const colors = ['#F4ACB7', '#FFD1DC', '#E5B299', '#D4AF37'];
  const defaults = { spread: 70, ticks: 80, gravity: 0.7, decay: 0.92, startVelocity: 35, shapes: [heart], colors };
  window.confetti({ ...defaults, particleCount: 60, origin: { x: 0.2, y: 0.6 } });
  window.confetti({ ...defaults, particleCount: 60, origin: { x: 0.8, y: 0.6 } });
  setTimeout(() => window.confetti({ ...defaults, particleCount: 100, origin: { x: 0.5, y: 0.4 } }), 200);
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

  // try autoplay-muted (browsers allow muted)
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
   Background particles (floating hearts)
   ============================================ */
function setupParticles() {
  if (typeof window.tsParticles === 'undefined') return;
  // tsParticles confetti bundle supports a basic load; we use a tiny
  // manual canvas confetti to avoid pulling full bundle. Skipped if absent.
  // (We rely on canvas-confetti for celebrations; background uses CSS only.)
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
    document.body.innerHTML = `<p style="padding:2rem;font-family:system-ui">customize.json tidak ditemukan. Jalankan dari folder love-website, atau cek path.</p>`;
    return;
  }

  // Hero
  renderHeroSvg(cfg.hero.title);
  $('.hero-subtitle').textContent = cfg.hero.subtitle;
  $('.hero-signature').textContent = `— ${cfg.hero.signature}`;

  // Letter
  renderLetter(cfg.letter);

  // Timeline
  renderTimeline(cfg.timeline);

  // CTA
  setupCta(cfg.cta);

  // Music
  setupMusic(cfg.music);

  // Hero SVG animation (after a small delay so letters are mounted)
  setTimeout(animateHeroSvg, 250);

  // Reveal animations for hero text
  setupRevealAnimations();

  // Hide loader
  setTimeout(() => $('#loader')?.classList.add('is-hidden'), 300);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
