# Branch: react-interactive

React + Vite + Framer Motion. Same content as `vanilla-static`, but with
component-based architecture + interactive polaroid drag.

## Stack

- **React 19** + **Vite 6** (zero-config dev server, fast HMR)
- **Framer Motion 12** for spring physics, gestures, scroll reveals
- **anime.js** not used (replaced with pure CSS keyframes for SVG reveal)
- **canvas-confetti** for celebration
- Custom **canvas2d** floating hearts (no tsParticles dep)

## Quick start

```bash
# from project root
npm install
npm run dev          # http://localhost:5173/love-website/
npm run build        # → dist/
npm run preview      # preview built dist/
```

## File structure

```
love-website/
├── public/
│   └── customize.json    # shared content (no code edit needed)
├── src/
│   ├── main.jsx          # React entry
│   ├── App.jsx           # root: loads customize.json, composes sections
│   ├── styles.css        # all styles (Rose Gold & Blush palette)
│   ├── lib/
│   │   └── letterPaths.js   # SVG path data per uppercase letter
│   └── components/
│       ├── Hero.jsx          # SVG letter-by-letter reveal
│       ├── LetterSection.jsx # typewriter multi-paragraph
│       ├── MemoryTimeline.jsx# polaroid cards + drag-to-rearrange
│       ├── ConfessionCTA.jsx # growing Yes + confetti
│       ├── MusicPlayer.jsx   # autoplay-muted + click-to-unmute
│       └── BackgroundHearts.jsx  # floating hearts canvas
├── index.html          # Vite entry
├── vite.config.js      # base: '/love-website/' for GitHub Pages
└── package.json
```

## Customization

Edit `public/customize.json`. The same schema as `vanilla-static` works
without code edit. App fetches it at runtime via `import.meta.env.BASE_URL`.

## Deploy options

### Option A: GitHub Pages (Actions workflow)

`.github/workflows/deploy-react.yml`:

```yaml
name: Deploy React
on:
  push:
    branches: [react-interactive]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
      - id: deploy
        uses: actions/deploy-pages@v4
```

Then Settings → Pages → Source: GitHub Actions, branch: `gh-pages` (auto).

### Option B: Vercel (1-click)
1. https://vercel.com/new
2. Import `qoely/love-website`, branch `react-interactive`
3. Framework: Vite, Build: `npm run build`, Output: `dist`
4. Custom domain opsional di Vercel dashboard

### Option C: Netlify
1. https://app.netlify.com/start
2. Connect GitHub → `qoely/love-website`, branch `react-interactive`
3. Build cmd: `npm run build`, Publish dir: `dist`

## Component customization

### Add new hero word
Edit `src/lib/letterPaths.js`:
```js
export const LETTER_PATHS = {
  U: 'M5,5 L5,55 ...',
  // add your letter here
};
```

Supported letters: U N T K R M I L O V E S A C H P Y G D B

### Customize animation
- **Hero reveal timing:** adjust `animationDelay` in `Hero.jsx`
- **Polaroid rotation range:** edit `ROTATIONS` array in `MemoryTimeline.jsx`
- **Confetti particle count:** `particleCount` in `ConfessionCTA.jsx`

## Bundle size

| File | Size | Gzipped |
|------|------|---------|
| index.html | 1.1 KB | 0.5 KB |
| CSS | 8.6 KB | 2.7 KB |
| React | 3.9 KB | 1.5 KB |
| Framer Motion | 136 KB | 45 KB |
| App + components | 204 KB | 65 KB |
| **Total** | **~354 KB** | **~115 KB** |

Cacheable + lazy-loadable. First load: ~115KB gzipped over wire.

## Testing

```bash
npm run build && npm run preview
# open http://localhost:4173/love-website/
```

Test checklist sama dengan vanilla branch (mobile responsive, confetti, polaroid drag, etc).

## Browser support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+ (iOS 14+)
