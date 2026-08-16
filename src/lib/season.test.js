import { describe, it, expect } from 'vitest';
import feed from './__fixtures__/feed.sample.json';
import {
  aggregateStats,
  daysUntil,
  feedSeasons,
  isExhibition,
  latestSeason,
  matchesForSeason,
  nextCountingMatch,
  nextMatch,
  normalizeTeam,
  perSetRates,
  pollFor,
  pollRank,
  rpiRank,
  seasonSummary,
  splitSeason,
  standingsFor,
  teamRecord,
} from './season.js';

const TODAY = '2026-08-16';

describe('team name normalization', () => {
  it('matches the upstream scraper on the cases that bite', () => {
    expect(normalizeTeam('Arizona State')).toBe(normalizeTeam('Arizona St.'));
    expect(normalizeTeam('Creighton (Exh.)')).toBe('creighton');
    expect(normalizeTeam('Kansas  State')).toBe('kansas st');
    expect(normalizeTeam('Ohio St. (12)')).toBe('ohio st');
    expect(normalizeTeam(null)).toBe('');
  });

  it('spots exhibitions', () => {
    expect(isExhibition({ opponent: 'Creighton (Exh.)' })).toBe(true);
    expect(isExhibition({ opponent: 'Pittsburgh' })).toBe(false);
  });
});

describe('season slicing', () => {
  it('lists seasons oldest first', () => {
    expect(feedSeasons(feed)).toEqual(['2025', '2026']);
    expect(latestSeason(feed)).toBe('2026');
  });

  it('sorts matches by date', () => {
    const dates = matchesForSeason(feed, '2026').map((m) => m.date);
    expect(dates).toEqual([...dates].sort());
  });

  it('separates played from scheduled by the presence of stats', () => {
    const s2026 = splitSeason(feed, '2026');
    expect(s2026.played).toHaveLength(0);
    expect(s2026.scheduled.length).toBeGreaterThan(0);

    const s2025 = splitSeason(feed, '2025');
    expect(s2025.played.length).toBeGreaterThan(0);
    expect(s2025.scheduled).toHaveLength(0);
  });

  it('handles a season nobody has heard of', () => {
    expect(splitSeason(feed, '1999').all).toEqual([]);
    expect(standingsFor(feed, '1999')).toEqual([]);
    expect(pollFor(feed, '1999')).toBeNull();
  });

  it('survives an empty feed', () => {
    expect(feedSeasons(null)).toEqual([]);
    expect(latestSeason({})).toBeNull();
    expect(teamRecord([])).toEqual({ wins: 0, losses: 0, setsFor: 0, setsAgainst: 0 });
  });
});

describe('records and rates', () => {
  it('counts a win as more sets than the opponent', () => {
    const record = teamRecord([
      { teamSets: 3, opponentSets: 1 },
      { teamSets: 0, opponentSets: 3 },
      { teamSets: 3, opponentSets: 2 },
    ]);
    expect(record).toEqual({ wins: 2, losses: 1, setsFor: 6, setsAgainst: 6 });
  });

  it('sums the twelve counting stats', () => {
    const totals = aggregateStats([
      { teamStats: { sp: 3, k: 10, e: 2, ta: 30, a: 9, sa: 1, se: 2, d: 20, bs: 1, ba: 4, re: 1, bhe: 0 } },
      { teamStats: { sp: 4, k: 20, e: 8, ta: 70, a: 18, sa: 3, se: 4, d: 40, bs: 2, ba: 6, re: 2, bhe: 1 } },
      { /* scheduled match, no stats */ },
    ]);
    expect(totals.sp).toBe(7);
    expect(totals.k).toBe(30);
    expect(totals.ta).toBe(100);
    expect(totals.ba).toBe(10);
  });

  it('derives per-set rates the NCAA way', () => {
    const rates = perSetRates({ sp: 10, k: 130, e: 30, ta: 400, a: 120, sa: 15, se: 20, d: 140, bs: 10, ba: 20, re: 5, bhe: 0 });
    expect(rates.hittingPct).toBeCloseTo(0.25, 5); // (130 - 30) / 400
    expect(rates.killsPerSet).toBeCloseTo(13.0, 5);
    // Block assists count as a half.
    expect(rates.blocksPerSet).toBeCloseTo(2.0, 5); // (10 + 20/2) / 10
    expect(rates.pointsPerSet).toBeCloseTo(16.5, 5); // (130 + 15 + 10 + 10) / 10
  });

  it('does not divide by zero before the season starts', () => {
    const rates = perSetRates(aggregateStats([]));
    expect(rates.setsPlayed).toBe(0);
    expect(rates.killsPerSet).toBe(0);
    expect(rates.hittingPct).toBe(0);
    expect(Number.isFinite(rates.blocksPerSet)).toBe(true);
  });
});

describe('standings', () => {
  it('orders by conference win percentage', () => {
    const table = standingsFor(feed, '2025');
    const pcts = table.map((r) => r.confPct);
    expect(pcts).toEqual([...pcts].sort((a, b) => b - a));
    expect(table[0].confW).toBeGreaterThanOrEqual(table.at(-1).confW);
  });

  it('computes percentages', () => {
    const row = standingsFor(feed, '2025').find((r) => r.team === 'Arizona St.');
    expect(row.confPct).toBeCloseTo(17 / 18, 5);
  });
});

describe('polls', () => {
  it('finds the poll for a season', () => {
    expect(pollFor(feed, '2026').updated).toMatch(/AUG\. 10, 2026/);
  });

  it('ranks a team regardless of name spelling', () => {
    const poll = pollFor(feed, '2026');
    expect(pollRank(poll, 'Pittsburgh')).toBe(4);
    expect(pollRank(poll, 'Nebraska')).toBe(1);
    expect(pollRank(poll, 'Not A Real Team')).toBeNull();
    expect(pollRank(null, 'Nebraska')).toBeNull();
  });

  it('reads RPI out of the standings table', () => {
    expect(rpiRank(feed, '2025', 'Arizona State')).toBe(6);
    expect(rpiRank(feed, '2025', 'Nobody')).toBeNull();
  });
});

describe('dates and the next match', () => {
  it('counts whole days forward', () => {
    expect(daysUntil('2026-08-28', TODAY)).toBe(12);
    expect(daysUntil('2026-08-22', TODAY)).toBe(6);
    expect(daysUntil(TODAY, TODAY)).toBe(0);
    expect(daysUntil('2026-08-10', TODAY)).toBe(-6);
    expect(daysUntil('nonsense', TODAY)).toBeNull();
  });

  it('crosses a month boundary correctly', () => {
    expect(daysUntil('2026-09-01', '2026-08-31')).toBe(1);
  });

  it('picks the next match, and the next one that counts', () => {
    const { scheduled } = splitSeason(feed, '2026');
    expect(nextMatch(scheduled, TODAY).opponent).toBe('Creighton (Exh.)');
    // The exhibition does not count, so the opener is Pittsburgh.
    expect(nextCountingMatch(scheduled, TODAY).opponent).toBe('Pittsburgh');
  });

  it('returns null once the schedule is exhausted', () => {
    const { scheduled } = splitSeason(feed, '2026');
    expect(nextMatch(scheduled, '2027-01-01')).toBeNull();
  });
});

describe('seasonSummary', () => {
  it('reports a pre-season state for 2026', () => {
    const s = seasonSummary(feed, '2026', TODAY);
    expect(s.hasStarted).toBe(false);
    expect(s.record).toEqual({ wins: 0, losses: 0, setsFor: 0, setsAgainst: 0 });
    expect(s.scheduled.length).toBeGreaterThan(0);
    expect(s.poll).not.toBeNull();
  });

  it('reports a played season for 2025', () => {
    const s = seasonSummary(feed, '2025', TODAY);
    expect(s.hasStarted).toBe(true);
    expect(s.rates.setsPlayed).toBeGreaterThan(0);
    expect(s.next).toBeNull();
  });
});
