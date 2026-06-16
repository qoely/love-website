# Branch: react-interactive

React + Vite + Framer Motion. Same content as `vanilla-static`, but with
component-based architecture + interactive polaroid drag.

## Stack

- **React 19** + **Vite 6** (zero-config dev server, fast HMR)
- **Framer Motion 12** for spring physics, gestures, scroll reveals
- **canvas-confetti 1.9** for celebration
- Custom **canvas2d** floating hearts (no tsParticles dep)

## Theme

**Surat cinta sebagai tanda terima kasih** — bukan untuk nembak/propose.
Hero "Terima Kasih" + polaroid memory timeline + multi-paragraph typewriter letter + thank-you closing (no buttons, no pressure). Optional "ulang dari awal" button at the end.

## Develop

```bash
npm install
npm run dev    # http://localhost:5173/love-website/
npm run build  # → dist/
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
│       ├── Hero.jsx           # SVG letter-by-letter reveal
│       ├── LetterSection.jsx # typewriter multi-paragraph
│       ├── MemoryTimeline.jsx# polaroid cards + drag-to-rearrange
│       ├── ClosingNote.jsx    # thank-you message (no buttons)
│       ├── MusicPlayer.jsx    # autoplay-muted + click-to-unmute
│       └── BackgroundHearts.jsx  # floating hearts canvas
├── index.html          # Vite entry
├── vite.config.js      # base: '/love-website/' for GitHub Pages
└── package.json
```

## Customization

Edit `public/customize.json`. Same schema as vanilla branch.

## Deploy options

### Option A: GitHub Pages (Actions workflow)

`.github/workflows/deploy-react.yml` already configured to:
1. Checkout `react-interactive` branch
2. Build with Vite
3. Deploy `dist/` to Pages

Auto-runs on push to `react-interactive`. Live URL: `https://<user>.github.io/love-website/`

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

Supported letters: `U N T E R I M A K S I H B P Y G D B L O C W F V J Q X Z`
Covers: "TERIMA KASIH" + variants like "MAKASIH YA", "BUAT KAMU", "BERSYUKUR".

### Customize animation
- **Hero reveal timing:** adjust `animationDelay` in `Hero.jsx`
- **Polaroid rotation range:** edit `ROTATIONS` array in `MemoryTimeline.jsx`
- **Closing card timing:** adjust `delay` props in `ClosingNote.jsx`

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

Test checklist sama dengan vanilla branch (mobile responsive, "ulang dari awal" button at end works, polaroid drag, dll).

## Browser support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+ (iOS 14+)
