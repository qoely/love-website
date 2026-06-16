# Branch: vanilla-static

Pure HTML/CSS/JS, no build step, deploy-ready for GitHub Pages.

## File structure

```
love-website/
├── index.html         # Single page
├── app.js             # Loads customize.json, renders all sections
├── styles.css         # All styles (Rose Gold & Blush palette)
├── customize.json     # ⭐ Edit this to personalize (no code edit needed)
├── assets/
│   ├── images/        # Optional local images
│   └── music/         # Optional local music (mp3)
└── README.md
```

## Quick start

```bash
# serve locally (any static server works)
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy to GitHub Pages

1. Push branch to GitHub (already done)
2. Settings → Pages → Source: `vanilla-static` branch, `/ (root)`
3. Wait 1-2 min, site live at `https://<user>.github.io/love-website/`

## Customization via customize.json

```json
{
  "recipient": { "name": "...", "nickname": "..." },
  "hero": {
    "title": "Untukmu",                  // shown as SVG letter reveal
    "subtitle": "yang sudah menemani hari-hariku",
    "signature": "dengan sayang"
  },
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
  "music": {
    "src": "./assets/music/lagu-kita.mp3",  // local path or full URL
    "title": "Lagu kita",
    "autoplayMuted": true
  }
}
```

### Image options
- **Recommended (easiest):** Use Unsplash URLs in `image` field. Fast, free, no upload.
- **Local:** Drop photos in `assets/images/`, reference as `"./assets/images/foto1.jpg"`.
- **Convert to AVIF** for 4× smaller size. Use `sharp` (npm) or Squoosh.app.

### Music options
- **Free tracks:** https://pixabay.com/music/ (search "romantic piano", no attribution)
- **Local:** Drop mp3 in `assets/music/`, reference in `customize.json`
- **Format:** MP3 192kbps, max 2-3MB, keep 1-3 min loopable
- **Autoplay note:** Modern browsers block autoplay with sound. Player auto-tries muted autoplay; user clicks to unmute.

## Customizing without touching code

- **Colors:** Edit CSS variables at top of `styles.css` (`--primary`, `--secondary`, etc.)
- **Fonts:** Change Google Fonts URL in `index.html` + update `--font-heading` / `--font-body` in `styles.css`
- **Hero word:** Change `hero.title` in `customize.json` (letters must exist in `LETTER_PATHS` in `app.js`)

### Supported SVG hero letters

`U N T K R M I L O V E S A C H P Y G D B` — covers "UNTUKMU" + variants like "UNTUK KAMU", "MURNI", "TRUKMU", "HALO", "SELAMAT", "PAGI".

For other words, add new paths to `LETTER_PATHS` in `app.js`.

## Bundle size

- HTML: ~5KB
- CSS: ~8KB
- JS: ~9KB
- CDN libs (cached): ~120KB gzipped (anime.js + Swiper + PhotoSwipe + confetti)
- **Total first load:** ~25KB + CDN libs

## Testing checklist

- [ ] Open in Chrome + Firefox + Safari
- [ ] Test on iPhone (iOS Safari) + Android Chrome via DevTools device mode
- [ ] Click Yes → heart confetti fires
- [ ] Click No 3-5× → Yes button grows, No text cycles
- [ ] Click polaroid → lightbox opens (PhotoSwipe)
- [ ] Music button works after first click
- [ ] All sections scroll-triggered

## Browser support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+ (iOS 14+)
- Falls back gracefully on older browsers
