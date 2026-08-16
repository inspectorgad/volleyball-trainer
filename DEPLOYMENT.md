# Deployment

The app is a Vite build. GitHub Actions tests, builds and publishes it.

## One-time setup

1. **Settings → Pages → Source → GitHub Actions.**

   This is required. The previous "Deploy from a branch" setting served the
   repo root directly, which no longer works: root `index.html` is a module
   entry (`<script type="module" src="/src/main.jsx">`) that only resolves
   after bundling. Left on the branch setting, the site serves a blank page.

2. Push to `main`. `.github/workflows/deploy-pages.yml` runs `npm ci`,
   `npm test`, `npm run build`, and publishes `dist/`.

3. The site appears at `https://<user>.github.io/volleyball-trainer/`.

## Base path

`vite.config.js` sets `base: '/volleyball-trainer/'`. Everything — asset URLs,
the manifest `start_url`, `scope` and `id`, and the service worker's navigation
fallback — is derived from it. Update that one constant if the repo is renamed
or moved to a custom domain.

## Local verification

```bash
npm run build
npm run preview
```

`preview` serves the real built output on the real base path, which is what
Pages will serve. Use it rather than `npm run dev` when checking PWA install,
offline behaviour or asset paths.

## Updating content

Edit the relevant file under `src/data/` and push:

| Content | File |
|---|---|
| Rules reference | `src/data/rules.js` |
| Quiz questions | `src/data/questions.js` |
| Referee signals | `src/data/refereeSignals.js` |
| Scenario drills | `src/data/scenarios.js` |
| Play-Along rallies | `src/data/matchData.js` |
| Big 12 team stats | `src/data/big12Teams.js` |
| Defensive / serve-receive overlays | `src/data/formations.js` |

Tournament bracket markup still lives in `src/modes/Ncaa.jsx`.

## Service worker

Workbox generates it at build time and revisions each asset by content hash.
There is no `CACHE_NAME` to bump by hand any more; a deploy is enough.

## Installing on a device

- **Android / desktop Chrome:** install prompt, or menu → Install app.
- **iOS Safari:** Share → Add to Home Screen.

A packaged Android app via Bubblewrap / Trusted Web Activity is planned
separately, and needs `/.well-known/assetlinks.json` served from the domain
root before the browser URL bar will disappear.

## Troubleshooting

**Blank page after deploy.** Pages is probably still on "Deploy from a branch".
Switch the source to GitHub Actions.

**Assets 404 with a doubled path.** `base` in `vite.config.js` disagrees with
the repo name.

**Stale content.** The service worker serves the last cached build until the
new one activates; reload once more, or check Application → Service Workers in
DevTools.
