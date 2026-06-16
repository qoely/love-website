# Love Website — Personal Romantic Letter

Personal romantic letter website untuk pure appreciation ("terima kasih sudah menemani"), bukan anniversary/proposal/valentine formal. Bahasa Indonesia. Two branches dengan **shared `customize.json` schema** — no code edit untuk personalization.

## Branches

| Branch | Status | Use |
|--------|--------|-----|
| `main` | live | Docs + branch READMEs + GitHub Actions workflow |
| `vanilla-static` | pushed, deploy-ready | Pure HTML/CSS/JS, GitHub Pages, zero build. [README](./BRANCH-README-vanilla.md) |
| `react-interactive` | pushed, deploy-ready | React + Vite + Framer Motion, drag-to-rearrange polaroids. [README](./BRANCH-README-react.md) |

## Live demo

| Branch | URL |
|--------|-----|
| `vanilla-static` | `https://<user>.github.io/love-website/` (after Pages enable) |
| `react-interactive` | Vercel/Netlify recommended (1-click) |

## Quick start

### Vanilla (no install)
```bash
git checkout vanilla-static
python3 -m http.server 8080
# open http://localhost:8080
```

### React (dev)
```bash
git checkout react-interactive
npm install
npm run dev    # http://localhost:5173/love-website/
```

## Customization (both branches)

Edit `customize.json`:

```json
{
  "hero": { "title": "Untukmu", "subtitle": "...", "signature": "..." },
  "timeline": [
    { "date": "...", "title": "...", "caption": "...", "image": "https://..." }
  ],
  "letter": [ "Paragraf 1...", "Paragraf 2..." ],
  "cta": {
    "question": "Kamu mau terus bareng aku?",
    "yesLabel": "Mau 💕",
    "noMessages": [ "Yakin?", "Aku mikir lho..." ],
    "successMessage": "Aku seneng banget 🤍"
  },
  "music": { "src": "./assets/music/lagu-kita.mp3", "title": "Lagu kita" }
}
```

| Field | Type | Notes |
|-------|------|-------|
| `hero.title` | string | SVG letter reveal. Letters: `U N T K R M I L O V E S A C H P Y G D B` |
| `timeline[].image` | URL/string | Unsplash URL recommended, or `./assets/images/x.jpg` |
| `letter[]` | string[] | Multi-paragraph. Typewriter reveal saat scroll. |
| `cta.noMessages` | string[] | Cycle setiap click di No button |
| `music.src` | URL | Local path or full URL. MP3 max 2MB. |

## Color palette

Rose Gold & Blush:
- `#F4ACB7` rose gold pink (primary)
- `#FFD1DC` light blush (secondary)
- `#E5B299` warm tan (accent)
- `#FFEEEE` soft cream pink (background)
- `#5C3A3A` warm dark brown (text)
- `#D4AF37` gold (CTA highlight)

Edit CSS variables di top of `styles.css` (vanilla) atau `src/styles.css` (react) untuk rebrand.

## Tech stack

- **vanilla-static:** HTML5 + CSS3 + Vanilla JS, CDN libs (anime.js, Swiper, PhotoSwipe, tsParticles, canvas-confetti)
- **react-interactive:** React 19 + Vite 6 + Framer Motion 12 + canvas-confetti

## Research source

`HermesVault/Research/Topics/love-website-prd-final-20260616.md` — PRD aggregating 2 research runs (Animation + Photo Gallery), 16 templates, 12 repos, 19 video tutorials.

## Issues

| # | Title |
|---|-------|
| [#1](https://github.com/qoely/love-website/issues/1) | Project init + customize.json pattern |
| [#2](https://github.com/qoely/love-website/issues/2) | Build react-interactive branch (✅ done) |
| [#3](https://github.com/qoely/love-website/issues/3) | Expand research: 10 missing sub-themes |
| [#4](https://github.com/qoely/love-website/issues/4) | P1 features: 3D heart, AI letter, voice, real-time |
| [#5](https://github.com/qoely/love-website/issues/5) | Deploy vanilla-static ke GitHub Pages |

## License

MIT — fork, customize, share freely.
