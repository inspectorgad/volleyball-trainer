// Loads the season feed published by the ku-volleyball nightly scrape.
//
// That repo's GitHub Action discovers Kansas matches through the NCAA API,
// captures box scores, pulls the roster and schedule from kuathletics.com, and
// commits a parsed seed. We read that seed directly rather than running a
// second scraper here.
//
// Serves cache-first so the screen paints immediately, then revalidates in the
// background. raw.githubusercontent.com sends `access-control-allow-origin: *`
// and a five-minute cache-control, so a plain fetch from the browser is fine.

const RAW_URL =
  'https://raw.githubusercontent.com/inspectorgad/ku-volleyball/main/app/src/main/assets/seed.json';
// The same seed is copied to the ku-volleyball GitHub Pages site by CI. Kept as
// a fallback in case the raw host is unavailable.
const PAGES_URL = 'https://inspectorgad.github.io/ku-volleyball/season-data.json';

export const FEED_URLS = [RAW_URL, PAGES_URL];

const CACHE_KEY = 'volleyball-trainer.season-feed.v1';
const FETCH_TIMEOUT_MS = 12000;

/** A feed we can actually render: right version, and at least some matches. */
export function isUsableFeed(data) {
  return Boolean(
    data &&
      typeof data === 'object' &&
      Array.isArray(data.matches) &&
      data.matches.length > 0 &&
      data.generatedAt
  );
}

export function readCache(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isUsableFeed(parsed?.data) ? parsed : null;
  } catch {
    // Corrupt or unavailable storage is not worth surfacing; just refetch.
    return null;
  }
}

export function writeCache(data, cachedAt, storage = globalThis.localStorage) {
  try {
    storage?.setItem(CACHE_KEY, JSON.stringify({ data, cachedAt }));
    return true;
  } catch {
    // Quota exceeded or private mode. The app still works, just without a
    // warm start next visit.
    return false;
  }
}

export function clearCache(storage = globalThis.localStorage) {
  try {
    storage?.removeItem(CACHE_KEY);
  } catch {
    /* nothing useful to do */
  }
}

async function fetchOnce(url, fetchImpl) {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS) : null;
  try {
    const resp = await fetchImpl(url, {
      signal: controller?.signal,
      headers: { accept: 'application/json' },
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    if (!isUsableFeed(data)) throw new Error('feed missing matches or generatedAt');
    return data;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/** Try each mirror in turn; throw only if all of them fail. */
export async function fetchFeed({ fetchImpl = globalThis.fetch, urls = FEED_URLS } = {}) {
  const failures = [];
  for (const url of urls) {
    try {
      return await fetchOnce(url, fetchImpl);
    } catch (err) {
      failures.push(`${url}: ${err.message}`);
    }
  }
  throw new Error(failures.join(' | '));
}

/**
 * Cache-first load.
 *
 * Calls `onUpdate` at most twice: once immediately with the cached feed when
 * there is one, and again with the network copy if it turns out to be newer.
 * Resolves once the network attempt has settled.
 *
 * Status is one of:
 *   'live'    fetched this session
 *   'cached'  showing a stored copy, revalidation failed
 *   'empty'   nothing cached and the network failed
 */
export async function loadSeasonFeed({
  onUpdate = () => {},
  fetchImpl = globalThis.fetch,
  storage = globalThis.localStorage,
  urls = FEED_URLS,
  now = () => new Date().toISOString(),
} = {}) {
  const cached = readCache(storage);
  if (cached) {
    onUpdate({ data: cached.data, status: 'cached', cachedAt: cached.cachedAt, error: null });
  }

  try {
    const data = await fetchFeed({ fetchImpl, urls });
    const cachedAt = now();
    // Only rewrite storage and re-render when the scrape actually moved on.
    if (!cached || cached.data.generatedAt !== data.generatedAt) {
      writeCache(data, cachedAt, storage);
      const result = { data, status: 'live', cachedAt, error: null };
      onUpdate(result);
      return result;
    }
    const result = { data: cached.data, status: 'live', cachedAt: cached.cachedAt, error: null };
    onUpdate(result);
    return result;
  } catch (err) {
    const result = cached
      ? { data: cached.data, status: 'cached', cachedAt: cached.cachedAt, error: err.message }
      : { data: null, status: 'empty', cachedAt: null, error: err.message };
    onUpdate(result);
    return result;
  }
}
