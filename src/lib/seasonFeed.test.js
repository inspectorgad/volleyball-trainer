import { describe, it, expect, vi } from 'vitest';
import feed from './__fixtures__/feed.sample.json';
import {
  FEED_URLS,
  clearCache,
  fetchFeed,
  isUsableFeed,
  loadSeasonFeed,
  readCache,
  writeCache,
} from './seasonFeed.js';

/** Minimal localStorage stand-in. */
function memoryStorage(seed = {}) {
  const map = new Map(Object.entries(seed));
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
    get size() {
      return map.size;
    },
  };
}

const ok = (body) => ({ ok: true, status: 200, json: async () => body });
const status = (code) => ({ ok: false, status: code, json: async () => ({}) });

describe('feed validation', () => {
  it('accepts a real feed', () => {
    expect(isUsableFeed(feed)).toBe(true);
  });

  it('rejects anything without matches or a timestamp', () => {
    expect(isUsableFeed(null)).toBe(false);
    expect(isUsableFeed({})).toBe(false);
    expect(isUsableFeed({ matches: [], generatedAt: 'x' })).toBe(false);
    expect(isUsableFeed({ matches: [{}] })).toBe(false);
    expect(isUsableFeed('a string')).toBe(false);
  });
});

describe('cache', () => {
  it('round-trips', () => {
    const storage = memoryStorage();
    writeCache(feed, '2026-08-16T10:00:00Z', storage);
    const got = readCache(storage);
    expect(got.data.generatedAt).toBe(feed.generatedAt);
    expect(got.cachedAt).toBe('2026-08-16T10:00:00Z');
  });

  it('ignores corrupt entries rather than throwing', () => {
    const storage = memoryStorage({ 'volleyball-trainer.season-feed.v1': 'not json{' });
    expect(readCache(storage)).toBeNull();
  });

  it('ignores a cached payload that is no longer usable', () => {
    const storage = memoryStorage();
    writeCache({ matches: [], generatedAt: 'x' }, 'now', storage);
    expect(readCache(storage)).toBeNull();
  });

  it('survives storage being unavailable', () => {
    const hostile = {
      getItem() { throw new Error('denied'); },
      setItem() { throw new Error('quota'); },
      removeItem() { throw new Error('denied'); },
    };
    expect(readCache(hostile)).toBeNull();
    expect(writeCache(feed, 'now', hostile)).toBe(false);
    expect(() => clearCache(hostile)).not.toThrow();
  });
});

describe('fetchFeed', () => {
  it('returns the first mirror that works', async () => {
    const fetchImpl = vi.fn(async () => ok(feed));
    await expect(fetchFeed({ fetchImpl })).resolves.toMatchObject({ generatedAt: feed.generatedAt });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(fetchImpl.mock.calls[0][0]).toBe(FEED_URLS[0]);
  });

  it('falls through to the next mirror on failure', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(status(500))
      .mockResolvedValueOnce(ok(feed));
    await expect(fetchFeed({ fetchImpl })).resolves.toBeTruthy();
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it('rejects with every failure listed when all mirrors fail', async () => {
    const fetchImpl = vi.fn(async () => status(404));
    await expect(fetchFeed({ fetchImpl })).rejects.toThrow(/HTTP 404.*HTTP 404/s);
  });

  it('treats a 200 carrying junk as a failure', async () => {
    const fetchImpl = vi.fn(async () => ok({ hello: 'world' }));
    await expect(fetchFeed({ fetchImpl })).rejects.toThrow(/missing matches/);
  });
});

describe('loadSeasonFeed', () => {
  it('reports live on a cold start with a working network', async () => {
    const storage = memoryStorage();
    const updates = [];
    const result = await loadSeasonFeed({
      storage,
      fetchImpl: async () => ok(feed),
      onUpdate: (u) => updates.push(u.status),
      now: () => 'T0',
    });
    expect(result.status).toBe('live');
    expect(updates).toEqual(['live']);
    expect(readCache(storage).data.generatedAt).toBe(feed.generatedAt);
  });

  it('paints from cache first, then confirms', async () => {
    const storage = memoryStorage();
    writeCache(feed, 'T-1', storage);
    const updates = [];
    const result = await loadSeasonFeed({
      storage,
      fetchImpl: async () => ok(feed),
      onUpdate: (u) => updates.push(u.status),
    });
    // Same generatedAt, so the second update is a no-change confirmation.
    expect(updates).toEqual(['cached', 'live']);
    expect(result.cachedAt).toBe('T-1');
  });

  it('replaces the cache when the scrape has moved on', async () => {
    const storage = memoryStorage();
    writeCache({ ...feed, generatedAt: 'OLD' }, 'T-1', storage);
    const fresh = { ...feed, generatedAt: 'NEW' };
    const result = await loadSeasonFeed({
      storage,
      fetchImpl: async () => ok(fresh),
      now: () => 'T1',
    });
    expect(result.data.generatedAt).toBe('NEW');
    expect(result.cachedAt).toBe('T1');
    expect(readCache(storage).data.generatedAt).toBe('NEW');
  });

  it('falls back to cache when the network is down', async () => {
    const storage = memoryStorage();
    writeCache(feed, 'T-1', storage);
    const result = await loadSeasonFeed({
      storage,
      fetchImpl: async () => { throw new Error('offline'); },
    });
    expect(result.status).toBe('cached');
    expect(result.data.generatedAt).toBe(feed.generatedAt);
    expect(result.error).toMatch(/offline/);
  });

  it('reports empty when there is neither cache nor network', async () => {
    const result = await loadSeasonFeed({
      storage: memoryStorage(),
      fetchImpl: async () => { throw new Error('offline'); },
    });
    expect(result.status).toBe('empty');
    expect(result.data).toBeNull();
    expect(result.error).toBeTruthy();
  });

  it('never rejects, whatever happens', async () => {
    await expect(
      loadSeasonFeed({
        storage: memoryStorage(),
        fetchImpl: () => Promise.reject(new Error('boom')),
      })
    ).resolves.toMatchObject({ status: 'empty' });
  });
});
