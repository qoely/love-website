# Love Website — Personal Romantic Letter (React branch)

This is the **react-interactive** branch. See [main README](../README.md) for full docs.

## Stack

- React 19 + Vite 6
- Framer Motion 12 (spring physics, drag, scroll reveals)
- canvas-confetti 1.9
- Pure CSS keyframes for SVG letter reveal
- Custom canvas2d for floating hearts background

## Develop

```bash
npm install
npm run dev    # http://localhost:5173/love-website/
npm run build  # → dist/
```

## Deploy to GitHub Pages

Already configured via `.github/workflows/deploy-react.yml` on push to `react-interactive`.

Live URL: `https://qoely.github.io/love-website/`

## Bundle

- React 19: 3.9 KB gz
- Framer Motion 12: 45 KB gz
- App + components: 65 KB gz
- CSS: 2.7 KB gz
- **Total: ~115 KB gzipped**

## Customize

Edit `public/customize.json`. Same schema as vanilla branch.
