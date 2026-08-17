// Kill switch for the pre-Vite service worker.
//
// The old app registered THIS path and used an unconditional cache-first fetch
// handler: it returned its stored copy and never revalidated. Anyone who opened
// the old build still has it, and it keeps serving the December app forever —
// the new index.html is never fetched, so nothing shipped inside the new bundle
// can rescue them.
//
// Restoring this file is what reaches them. The browser re-fetches a registered
// worker's own script on update checks, bypassing the worker's fetch handler.
// It sees bytes that differ from the cached copy, installs this instead, and
// this wipes every cache, unregisters itself, and reloads open tabs onto the
// real site. After that vite-plugin-pwa's sw.js takes over normally.
//
// Do not delete: the old registration outlives any single deploy, so this has
// to stay for as long as anyone might still be carrying it.

self.addEventListener('install', () => {
  // Skip the waiting phase — the old worker is actively serving stale content,
  // so there is nothing worth preserving.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(names.map((name) => caches.delete(name)));

      await self.registration.unregister();

      // Reload anything currently open so the user lands on the new build
      // rather than staring at the stale one until they happen to reopen.
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) {
        if ('navigate' in client) client.navigate(client.url);
      }
    })()
  );
});

// No fetch handler on purpose. Without one the browser goes straight to the
// network, so even before activation completes nothing is served from the old
// cache.
