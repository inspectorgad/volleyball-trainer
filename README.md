# 🏐 Volleyball Trainer

A Progressive Web App for learning volleyball rules, rotations and offensive
systems, with Big 12 and NCAA tournament reference data.

## Modes

1. **Simulator** — interactive court with 5-1, 6-2 and 4-2 systems. Attack
   zones, blocking indicators, setter connections, rotation preview, defensive
   and serve-receive formations, plus 8 scenario-based violation drills.
2. **Play-Along** — step through a scripted 25-rally set and watch both teams'
   rotations change with each side-out.
3. **Rules Hub** — 20 rules by category, a 30-question quiz bank, 25 referee
   signals, guided simulator demos and progress tracking.
4. **Big 12 Stats** — compare up to four teams across eight metrics.
5. **NCAA 2025** — tournament bracket, host sites and results.

## Tech

- **React 18** bundled by **Vite** — no CDN, no in-browser Babel
- **vite-plugin-pwa** (Workbox) for the offline service worker and manifest
- **Vitest** for the rotation logic
- Self-hosted Bebas Neue and Space Mono

## Develop

```bash
npm install
npm run dev      # dev server with HMR
npm test         # rotation unit tests
npm run build    # production build into dist/
npm run preview  # serve the built output
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy-pages.yml`, which tests,
builds and publishes `dist/` to GitHub Pages.

**One-time setup:** Settings → Pages → Source → **GitHub Actions**. The old
"deploy from a branch" setting will not work any more — the repo root
`index.html` is a module entry that only resolves after bundling.

The app is served from `/volleyball-trainer/`, set as `base` in
`vite.config.js`. Change it there if the repo is renamed or moved to a custom
domain.

## Layout

```
index.html              module entry (~25 lines)
vite.config.js          base path, PWA manifest, Vitest config
public/                 icons, referee signal chart — copied verbatim
src/
  main.jsx              React root
  App.jsx               state container and mode router
  styles.css            globals, animations, @font-face
  assets/fonts/         self-hosted woff2
  data/                 rules, questions, signals, scenarios, formations,
                        systems, Big 12 teams, the Play-Along set
  lib/rotation.js       rotation maths (unit tested)
  components/           Icons, CourtDisplay
  modes/                Simulator, PlayAlong, RulesHub, Big12, Ncaa
```

Content lives in `src/data/` — editing a rule, question or scenario no longer
means scrolling a 3,700-line HTML file.

## Updating the service worker

Nothing to do. Workbox revisions every asset by content hash on each build, so
the old routine of hand-bumping a `CACHE_NAME` constant is gone.

## Notes

- `src/lib/rotation.js` documents one deliberate behaviour change against the
  pre-Vite app: the 5-1 explanation used to report the setter as back row in
  every rotation. It now reads the setter's court position, so rotations 4, 5
  and 6 correctly say front row.
- Big 12 figures are the 2025 final season. Wiring these to the live feed is
  planned separately.

## License

MIT
