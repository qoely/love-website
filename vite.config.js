import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config for love-website React branch.
// For GitHub Pages at /love-website/ subpath, base is set to repo name.
// For custom domain or user/org site, change base to '/'.
const repoBase = '/love-website/';

export default defineConfig({
  plugins: [react()],
  base: repoBase,
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          framer: ['framer-motion'],
        },
      },
    },
  },
});
