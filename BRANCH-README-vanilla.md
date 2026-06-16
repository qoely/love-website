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

## Theme

**Surat cinta sebagai tanda terima kasih** — bukan untuk nembak/propose.
Hero "Terima Kasih" + polaroid memory timeline + multi-paragraph typewriter letter + thank-you closing (no buttons, no pressure). Optional "ulang dari awal" button at the end.

## Quick start

```bash
# serve locally (any static server works)
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy to GitHub Pages

Auto-deployed via `.github/workflows/deploy-vanilla.yml` on push to `vanilla-static` branch. No manual step needed.

Live URL: `https://<user>.github.io/love-website/`

## Customization via customize.json

```json
{
  "hero": {
    "title": "Terima Kasih",
    "subtitle": "untuk kamu, yang sudah menemani hari-hariku",
    "signature": "dengan sayang"
  },
  "timeline": [
    { "date": "...", "title": "...", "caption": "...", "image": "https://..." }
  ],
  "letter": [ "Paragraf 1...", "Paragraf 2..." ],
  "closing": {
    "eyebrow": "kalau kamu baca sampai sini",
    "headline": "Makasih ya.",
    "sub": "Kamu udah sampai sini bersamaku. Itu sudah lebih dari cukup.",
    "footnote": "dengan sayang, untuk yang sudah di sini."
  },
  "music": {
    "src": "./assets/music/lagu-kita.mp3",
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
- **Hero word:** Change `hero.title` in `customize.json`. All letters in `LETTER_PATHS` in `app.js`

### Supported SVG hero letters

`U N T E R I M A K S I H B P Y G D B L O C W F V J Q X Z` — covers "TERIMA KASIH" + variants like "MAKASIH YA", "BUAT KAMU", "BERSYUKUR", "HARI INI", "BESOK", etc.

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
- [ ] Click "ulang dari awal" at end → smooth scroll to top + heart confetti
- [ ] Click polaroid → lightbox opens (PhotoSwipe)
- [ ] Music button works after first click
- [ ] All sections scroll-triggered

## Browser support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+ (iOS 14+)
- Falls back gracefully on older browsers
