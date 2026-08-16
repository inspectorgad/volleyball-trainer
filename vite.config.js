import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub Pages serves this repo from /volleyball-trainer/. Everything the
// manifest and service worker emit has to agree with that prefix, so it is
// declared once here rather than hardcoded per-file.
const BASE = '/volleyball-trainer/';

const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

export default defineConfig({
  base: BASE,
  build: {
    outDir: 'dist',
    // The app is one screen; a single bundle beats a waterfall of chunk
    // requests on a phone, which is the target device.
    chunkSizeWarningLimit: 900,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Replaces the hand-written service-worker.js, whose cache name had to
      // be bumped by hand on every deploy or users kept the stale build.
      // Workbox revisions each asset by content hash instead.
      includeAssets: ['icons/*.png', 'referee-signals-chart.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
        cleanupOutdatedCaches: true,
        navigateFallback: `${BASE}index.html`,
      },
      manifest: {
        // `id` and `scope` are what a Trusted Web Activity matches against;
        // without them Android treats a start_url change as a different app.
        id: BASE,
        scope: BASE,
        start_url: BASE,
        name: 'Volleyball Trainer - Complete Learning System',
        short_name: 'Volleyball Trainer',
        description:
          'Volleyball training app with rotation simulator, play-along mode, rules hub, Big 12 stats and season tracker',
        display: 'standalone',
        orientation: 'any',
        background_color: '#0051BA',
        theme_color: '#0051BA',
        categories: ['sports', 'education'],
        icons: ICON_SIZES.map((size) => ({
          src: `icons/icon-${size}x${size}.png`,
          sizes: `${size}x${size}`,
          type: 'image/png',
          purpose: size === 192 || size === 512 ? 'any maskable' : 'any',
        })),
      },
    }),
  ],
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
});
