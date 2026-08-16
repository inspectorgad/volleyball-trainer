// Pure selectors over the ku-volleyball season feed.
//
// Feed shape (formatVersion 1):
//   { generatedAt, team, players[], matches[], standings[], polls[], opponentRosters[] }
//
// A match that has been played carries teamStats/opponentStats/setScores; one
// that is only scheduled carries just date, opponent, season and home. That
// distinction is the whole basis of "results so far" versus "what's coming".
//
// Nothing here touches the network or the DOM, so it is all unit tested.

/** Mirrors norm_team() in the upstream scraper so our joins match theirs. */
export function normalizeTeam(name) {
  return (name || '')
    .replace(/\s*\((?:\d+|exh\.?|exhibition)\)\s*$/i, '')
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/\bstate\b/g, 'st')
    .replace(/\s+/g, ' ')
    .trim();
}

/** True when a scheduled match is an exhibition, which does not count to the record. */
export function isExhibition(match) {
  return /\((?:exh\.?|exhibition)\)/i.test(match?.opponent || '');
}

export const hasResult = (match) => Boolean(match && match.teamStats);

export function feedSeasons(feed) {
  const seasons = new Set((feed?.matches || []).map((m) => m.season));
  return [...seasons].sort();
}

/** Latest season the feed knows about. */
export function latestSeason(feed) {
  return feedSeasons(feed).at(-1) ?? null;
}

export function matchesForSeason(feed, season) {
  return (feed?.matches || [])
    .filter((m) => m.season === season)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Split a season into what has been played and what is still to come. */
export function splitSeason(feed, season) {
  const all = matchesForSeason(feed, season);
  return { played: all.filter(hasResult), scheduled: all.filter((m) => !hasResult(m)), all };
}

export function teamRecord(played) {
  let wins = 0;
  let losses = 0;
  let setsFor = 0;
  let setsAgainst = 0;
  for (const m of played) {
    setsFor += m.teamSets ?? 0;
    setsAgainst += m.opponentSets ?? 0;
    if ((m.teamSets ?? 0) > (m.opponentSets ?? 0)) wins++;
    else losses++;
  }
  return { wins, losses, setsFor, setsAgainst };
}

const STAT_KEYS = ['sp', 'k', 'e', 'ta', 'a', 'sa', 'se', 'd', 'bs', 'ba', 're', 'bhe'];

/** Sum the twelve counting stats across a set of matches. */
export function aggregateStats(played, key = 'teamStats') {
  const total = Object.fromEntries(STAT_KEYS.map((s) => [s, 0]));
  for (const m of played) {
    const line = m[key];
    if (!line) continue;
    for (const s of STAT_KEYS) total[s] += line[s] ?? 0;
  }
  return total;
}

/**
 * Derived per-set rates. Blocks count assists as a half, and points likewise,
 * which is the NCAA convention.
 */
export function perSetRates(totals) {
  const sp = totals.sp || 0;
  const rate = (n) => (sp ? n / sp : 0);
  return {
    setsPlayed: sp,
    hittingPct: totals.ta ? (totals.k - totals.e) / totals.ta : 0,
    killsPerSet: rate(totals.k),
    assistsPerSet: rate(totals.a),
    acesPerSet: rate(totals.sa),
    digsPerSet: rate(totals.d),
    blocksPerSet: rate(totals.bs + totals.ba / 2),
    pointsPerSet: rate(totals.k + totals.sa + totals.bs + totals.ba / 2),
  };
}

/** Conference standings for a season, best conference record first. */
export function standingsFor(feed, season) {
  return (feed?.standings || [])
    .filter((s) => s.season === season)
    .map((s) => ({
      ...s,
      confPct: s.confW + s.confL ? s.confW / (s.confW + s.confL) : 0,
      overallPct: s.overallW + s.overallL ? s.overallW / (s.overallW + s.overallL) : 0,
    }))
    .sort((a, b) => b.confPct - a.confPct || b.confW - a.confW || a.confL - b.confL);
}

export function pollFor(feed, season, name = 'AVCA Coaches Poll') {
  return (feed?.polls || []).find((p) => p.season === season && p.name === name) ?? null;
}

/** Poll rank for a team, matching on the normalized name. Null if unranked. */
export function pollRank(poll, teamName) {
  if (!poll) return null;
  const target = normalizeTeam(teamName);
  const row = (poll.rows || []).find((r) => normalizeTeam(r.team) === target);
  return row ? row.rank : null;
}

/** RPI rank from the standings table, for conference teams only. */
export function rpiRank(feed, season, teamName) {
  const target = normalizeTeam(teamName);
  const row = (feed?.standings || []).find(
    (s) => s.season === season && normalizeTeam(s.team) === target
  );
  return row?.rpiRank ?? null;
}

/** Whole days from `today` to `date`, both YYYY-MM-DD. Negative once past. */
export function daysUntil(date, today) {
  const a = Date.parse(`${date}T00:00:00Z`);
  const b = Date.parse(`${today}T00:00:00Z`);
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return Math.round((a - b) / 86400000);
}

/** The next match on or after `today`. */
export function nextMatch(scheduled, today) {
  return scheduled.find((m) => m.date >= today) ?? null;
}

/** Next match that counts, i.e. skipping exhibitions. */
export function nextCountingMatch(scheduled, today) {
  return scheduled.find((m) => m.date >= today && !isExhibition(m)) ?? null;
}

export function activeRoster(feed) {
  return (feed?.players || [])
    .filter((p) => p.active)
    .sort((a, b) => Number(a.jerseyNumber) - Number(b.jerseyNumber));
}

/** One-call summary for the season screen. */
export function seasonSummary(feed, season, today) {
  const { played, scheduled, all } = splitSeason(feed, season);
  const totals = aggregateStats(played);
  return {
    season,
    played,
    scheduled,
    all,
    record: teamRecord(played),
    totals,
    rates: perSetRates(totals),
    next: nextMatch(scheduled, today),
    nextCounting: nextCountingMatch(scheduled, today),
    hasStarted: played.length > 0,
    poll: pollFor(feed, season),
  };
}
