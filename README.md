# Love Website — Personal Romantic Letter

Personal romantic letter website, built as reusable template. Use case: pure appreciation — "terima kasih sudah menemani sejauh ini", bukan anniversary/proposal/valentine formal. Bahasa Indonesia.

## Branches

| Branch | Stack | Use When |
|--------|-------|----------|
| `vanilla-static` | HTML/CSS/JS + CDN libs | Production deploy, fastest load, GitHub Pages. Zero build step. |
| `react-interactive` | React + Vite + Framer Motion | Dev iteration, hot reload, component reuse. Build step. |

Both branches share the same `customize.json` schema — copy `customize.json` between branches without editing.

## Features (MVP P0)

1. Hero section — SVG letter-by-letter "Untukmu" reveal (anime.js)
2. Polaroid Memory Timeline — 8-15 foto dengan random rotation, scroll-triggered fade
3. Typewriter Love Letter — multi-paragraph reveal saat scroll
4. Confession CTA — "Kamu mau terus bareng aku?" dengan growing Yes + heart confetti
5. Floating Music Player — autoplay-muted + click-to-unmute
6. Mobile responsive — tested iOS Safari + Android Chrome
7. AVIF-friendly image optimization

## Color Palette — Rose Gold & Blush

- `#F4ACB7` rose gold pink (primary)
- `#FFD1DC` light blush (secondary)
- `#E5B299` warm tan (accent)
- `#FFEEEE` soft cream pink (background)
- `#5C3A3A` warm dark brown (text)
- `#D4AF37` gold (CTA highlight)

## Font

- Heading: Playfair Display
- Body: Lato
- Accent: Great Vibes (calligraphy untuk quote)

## Customization (no code edit needed)

Edit `customize.json`:

```json
{
  "recipient": { "name": "...", "nickname": "..." },
  "hero": { "title": "Untukmu", "subtitle": "..." },
  "timeline": [
    { "date": "...", "title": "...", "caption": "...", "image": "..." }
  ],
  "letter": [ "Paragraf 1...", "Paragraf 2..." ],
  "cta": { "question": "Kamu mau terus bareng aku?", "yesLabel": "Mau", "noMessages": [...] },
  "music": { "src": "...", "title": "..." }
}
```

See branch README for branch-specific customization.

## Deploy

```bash
# Vanilla branch
git checkout vanilla-static
git push origin vanilla-static
# Enable GitHub Pages on vanilla-static branch, / (root)

# React branch
git checkout react-interactive
npm install
npm run build
# Deploy dist/ via Vercel/Netlify/GitHub Pages
```

## Credits

Design patterns & library inspiration:
- [abandon888/HappyBirthday](https://github.com/abandon888/HappyBirthday) — `customize.json` pattern
- [visibait/valentines](https://github.com/visibait/valentines) — polaroid heart shape
- [Ain-Crad/First-Anniversary-of-Love](https://github.com/Ain-Crad/First-Anniversary-of-Love) — timeline structure
- [CodeKageHQ/Ask-out-your-Valentine](https://github.com/CodeKageHQ/Ask-out-your-Valentine) — growing Yes button

Libraries: anime.js, Swiper.js, PhotoSwipe, tsParticles, canvas-confetti, Framer Motion.

Research source: `/HermesVault/Research/Topics/love-website-prd-final-20260616.md`
