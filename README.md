# 🏐 Volleyball Trainer

A Progressive Web App for learning volleyball rules, rotations and offensive
systems, with Big 12 and NCAA tournament reference data.

## Modes

1. **Simulator** — interactive court with 5-1, 6-2 and 4-2 systems. Attack
   zones, blocking indicators, setter connections, rotation preview, defensive
   and serve-receive formations, plus 8 scenario-based violation drills.
2. **Play-Along** — step through a scripted 25-rally set and watch both teams'
   rotations change with each side-out.
3. **Rules Hub** — 29 rules by category, a 38-question quiz bank, 26 referee
   signals, guided simulator demos and progress tracking. A "New for 2026"
   filter isolates the 11 entries the 2026 rules changes touched, each showing
   a **Before 2026** line with the previous position and the NCAA rule number.
4. **Big 12 Stats** — live conference standings and rankings from the feed,
   plus Kansas per-set rates derived from box scores. The hand-entered 2025
   season, the only place per-set numbers exist for all fifteen teams, stays
   available as an archive with the four-team comparison chart.
5. **2026 Season** — Kansas schedule and results, national polls and the
   championship placeholder, synced from the ku-volleyball feed. The 2025
   tournament bracket, host sites and results are kept under its Archive tab.

## Tech

- **React 18** bundled by **Vite** — no CDN, no in-browser Babel
- **vite-plugin-pwa** (Workbox) for the offline service worker and manifest
- **Vitest** for the rotation logic, the season selectors and the feed loader
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
  lib/season.js         pure selectors over the season feed (unit tested)
  lib/seasonFeed.js     cache-first fetch of the feed (unit tested)
  components/           Icons, CourtDisplay
  modes/                Simulator, PlayAlong, RulesHub, Big12, Season,
                        Archive2025
```

Content lives in `src/data/` — editing a rule, question or scenario no longer
means scrolling a 3,700-line HTML file.

## Updating the service worker

Nothing to do. Workbox revisions every asset by content hash on each build, so
the old routine of hand-bumping a `CACHE_NAME` constant is gone.

## 2026 rules

Content is current to the NCAA 2026 and 2027 women's volleyball rules changes,
taken from the Division I and the Divisions II/III change documents. Thirteen
changes apply to all divisions; the one divisional difference is substitutions,
where Division I stays at 15 per set and Divisions II and III moved to 18.

Headline changes carried into the app: the centre line fault (a foot
*completely* across is now a fault on its own), centre line becoming
challengeable, the "C" hand signal replacing the challenge card, the pursuit
rule, the screening restriction, misconduct sanctions lasting the whole match,
75-second timeouts with an optional 15-point technical timeout, and the
end-of-second-set side switch.

`src/data/content.test.js` pins these facts so a later edit cannot quietly
restore the pre-2026 numbers.

## Notes

- `src/lib/rotation.js` documents one deliberate behaviour change against the
  pre-Vite app: the 5-1 explanation used to report the setter as back row in
  every rotation. It now reads the setter's court position, so rotations 4, 5
  and 6 correctly say front row.
- The 2025 tournament archive had seven round labels reading 2024 inside a
  section headed 2025. Corrected.

## Season data

Live data comes from the nightly scrape in
[inspectorgad/ku-volleyball](https://github.com/inspectorgad/ku-volleyball),
read straight from its published seed:

```
https://raw.githubusercontent.com/inspectorgad/ku-volleyball/main/app/src/main/assets/seed.json
```

That host sends `access-control-allow-origin: *`, so the browser fetches it
directly — there is no scraper and no proxy in this repo. The GitHub Pages copy
of the same file is a fallback if the raw host is unreachable.

Loading is cache-first: the last copy is mirrored into `localStorage` and
painted immediately, then revalidated in the background and only rewritten when
`generatedAt` moves. The service worker also keeps the response under a
`NetworkFirst` rule, so the season screens work offline after one visit. If
there is neither cache nor network the season screens say so plainly, and
Simulator, Play-Along and Rules Hub are unaffected — none of them touch the
network.

The feed carries records and rankings for all fifteen Big 12 teams but per-set
stats only for Kansas, because the scrape captures box scores for Kansas
matches. The Big 12 tab is built around that limit rather than hiding it.

## License

MIT
