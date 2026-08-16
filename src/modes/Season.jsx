// 2026 season tracker, driven by the ku-volleyball feed.
//
// Replaces the hardcoded "NCAA 2025" tab. The 2025 tournament content it used
// to show is still here, under the Archive sub-tab.
import React from 'react';
import Archive2025 from './Archive2025.jsx';
import { Trophy, Award, RefreshCw, AlertCircle, TrendingUp, CheckCircle } from '../components/Icons.jsx';
import {
  daysUntil,
  isExhibition,
  pollRank,
  seasonSummary,
  standingsFor,
} from '../lib/season.js';

// 2026 Division I championship. Announced venue and dates; the field is not
// drawn until December, so the bracket stays a placeholder until then.
const CHAMPIONSHIP = {
  venue: 'Alamodome',
  city: 'San Antonio, Texas',
  dates: 'December 17-20, 2026',
};

const SUB_TABS = [
  ['schedule', 'SCHEDULE'],
  ['polls', 'POLLS'],
  ['championship', 'CHAMPIONSHIP'],
  ['archive', '2025 ARCHIVE'],
];

const card = {
  background: 'rgba(255, 255, 255, 0.05)',
  border: '2px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  padding: '1.5rem',
};
const heading = {
  fontFamily: '"Bebas Neue", sans-serif',
  letterSpacing: '0.1em',
  color: '#5FE0D8',
  margin: 0,
};
const label = {
  fontSize: '0.7rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#93A5C0',
};

function formatSynced(iso) {
  if (!iso) return 'unknown';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? 'unknown' : d.toUTCString().replace(' GMT', ' UTC');
}

/** Where the data came from, and how to force a refetch. */
function FeedStatus({ status, cachedAt, error, generatedAt, onRefresh, refreshing }) {
  const tone =
    status === 'live'
      ? { dot: '#95E1D3', text: '#95E1D3', label: 'LIVE' }
      : status === 'cached'
        ? { dot: '#FFC92D', text: '#FFD866', label: 'CACHED' }
        : { dot: '#E8000D', text: '#FF8A90', label: 'UNAVAILABLE' };

  return (
    <div style={{ ...card, padding: '0.85rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: tone.text, fontSize: '0.75rem', letterSpacing: '0.12em', fontWeight: 700 }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: tone.dot, display: 'inline-block' }} />
        {tone.label}
      </span>
      <span style={{ fontSize: '0.8rem', color: '#c9d3e5', flex: 1, minWidth: '240px' }}>
        {status === 'empty'
          ? 'Could not reach the season feed. Rules, Simulator and Play-Along still work offline.'
          : <>Scraped {generatedAt ? formatSynced(generatedAt) : 'unknown'}{status === 'cached' && ' · showing a stored copy'}</>}
        {error && status !== 'live' && (
          <span style={{ display: 'block', color: '#FF8A90', fontSize: '0.72rem', marginTop: '0.25rem' }}>{error}</span>
        )}
      </span>
      <button
        type="button"
        onClick={onRefresh}
        disabled={refreshing}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem', background: 'rgba(0, 81, 186, 0.35)', border: '1px solid rgba(76, 143, 240, 0.6)', borderRadius: '4px', color: '#dbe6f7', fontFamily: 'inherit', fontSize: '0.75rem', letterSpacing: '0.08em', cursor: refreshing ? 'wait' : 'pointer', opacity: refreshing ? 0.6 : 1 }}
      >
        <RefreshCw size={14} /> {refreshing ? 'REFRESHING' : 'REFRESH'}
      </button>
    </div>
  );
}

function Stat({ k, v, accent }) {
  return (
    <div style={{ ...card, padding: '1rem 1.2rem' }}>
      <div style={label}>{k}</div>
      <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', lineHeight: 1.05, color: accent || '#ffffff', marginTop: '0.2rem' }}>{v}</div>
    </div>
  );
}

function ScheduleRow({ match, rank, today }) {
  const played = Boolean(match.teamStats);
  const won = played && (match.teamSets ?? 0) > (match.opponentSets ?? 0);
  const away = daysUntil(match.date, today);
  const isNext = !played && away !== null && away >= 0;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(84px, auto) 1fr auto', gap: '1rem', alignItems: 'center', padding: '0.7rem 0.9rem', borderBottom: '1px solid rgba(255, 255, 255, 0.07)', background: isNext && away <= 7 ? 'rgba(0, 81, 186, 0.16)' : 'transparent', boxShadow: isNext && away <= 7 ? 'inset 3px 0 0 #4C8FF0' : 'none' }}>
      <span style={{ fontSize: '0.78rem', color: '#93A5C0' }}>{match.date}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', color: '#e2e9f5' }}>
        <span style={{ fontSize: '0.72rem', color: '#7E90AE' }}>{match.home ? 'vs' : 'at'}</span>
        <span style={{ fontWeight: 700 }}>{match.opponent}</span>
        {rank && (
          <span style={{ fontSize: '0.66rem', fontWeight: 700, background: 'rgba(232, 0, 13, 0.2)', border: '1px solid rgba(232, 0, 13, 0.5)', color: '#FF8A90', padding: '1px 6px', borderRadius: '3px' }}>#{rank}</span>
        )}
        {isExhibition(match) && (
          <span style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: '#7E90AE' }}>EXHIBITION</span>
        )}
      </span>
      <span style={{ textAlign: 'right', fontSize: '0.8rem', minWidth: '92px' }}>
        {played ? (
          <>
            <strong style={{ color: won ? '#95E1D3' : '#FF8A90' }}>{won ? 'W' : 'L'} {match.teamSets}-{match.opponentSets}</strong>
            {match.setScores && <div style={{ fontSize: '0.66rem', color: '#7E90AE' }}>{match.setScores}</div>}
          </>
        ) : (
          <span style={{ color: '#7E90AE' }}>{away === null ? '' : away === 0 ? 'today' : away > 0 ? `in ${away}d` : ''}</span>
        )}
      </span>
    </div>
  );
}

export default function Season({
  seasonTab, setSeasonTab,
  ncaaTab, setNcaaTab,
  feed, feedStatus, feedCachedAt, feedError, refreshFeed, feedRefreshing,
  today,
  season = '2026',
}) {
  const summary = feed ? seasonSummary(feed, season, today) : null;
  const poll = summary?.poll ?? null;
  const table = feed ? standingsFor(feed, season) : [];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ ...heading, fontSize: '3rem', color: '#E8000D' }}>{season} SEASON</h2>
        <p style={{ fontSize: '0.95rem', color: '#ccc', marginTop: '0.35rem' }}>
          Kansas schedule, results and national polls, synced from the nightly scrape.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {SUB_TABS.map(([id, text]) => (
          <button
            key={id}
            type="button"
            className={`tab-btn ${seasonTab === id ? 'active' : ''}`}
            aria-pressed={seasonTab === id}
            onClick={() => setSeasonTab(id)}
            style={{ padding: '0.7rem 1.6rem', background: seasonTab === id ? '#E8000D' : 'rgba(255, 255, 255, 0.1)', border: '2px solid', borderColor: seasonTab === id ? '#E8000D' : 'rgba(255, 255, 255, 0.2)', borderRadius: 0, fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em', color: seasonTab === id ? '#ffffff' : '#eee' }}
          >
            {text}
          </button>
        ))}
      </div>

      {seasonTab !== 'archive' && (
        <FeedStatus
          status={feedStatus}
          cachedAt={feedCachedAt}
          error={feedError}
          generatedAt={feed?.generatedAt}
          onRefresh={refreshFeed}
          refreshing={feedRefreshing}
        />
      )}

      {seasonTab !== 'archive' && !feed && (
        <div style={{ ...card, textAlign: 'center', padding: '3rem 1.5rem' }}>
          <AlertCircle size={36} color="#FFC92D" />
          <h3 style={{ ...heading, fontSize: '1.6rem', marginTop: '1rem' }}>NO SEASON DATA YET</h3>
          <p style={{ color: '#b6c2d6', fontSize: '0.9rem', marginTop: '0.6rem', maxWidth: '460px', marginInline: 'auto', lineHeight: 1.6 }}>
            {feedStatus === 'empty'
              ? 'The feed could not be reached. It will load automatically next time you are online.'
              : 'Loading the season feed…'}
          </p>
        </div>
      )}

      {/* ---------------- Schedule ---------------- */}
      {seasonTab === 'schedule' && feed && (
        <>
          {!summary.hasStarted && (
            <div style={{ ...card, borderColor: 'rgba(255, 201, 45, 0.45)', background: 'rgba(255, 201, 45, 0.07)', marginBottom: '1.5rem' }}>
              <h3 style={{ ...heading, fontSize: '1.5rem', color: '#FFD866' }}>SEASON HASN'T STARTED</h3>
              <p style={{ color: '#e4d9b8', fontSize: '0.88rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
                No {season} match has gone final yet, so there are no results or conference standings to show. Both fill in automatically as matches finish.
              </p>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {summary.next && (
              <Stat
                k={`Days to ${summary.next.opponent.replace(/\s*\(Exh\.\)/i, '')}`}
                v={Math.max(0, daysUntil(summary.next.date, today))}
                accent="#FFD866"
              />
            )}
            {summary.nextCounting && summary.nextCounting !== summary.next && (
              <Stat
                k={`Days to ${summary.nextCounting.opponent}`}
                v={Math.max(0, daysUntil(summary.nextCounting.date, today))}
                accent="#4C8FF0"
              />
            )}
            {summary.hasStarted && (
              <>
                <Stat k="Record" v={`${summary.record.wins}-${summary.record.losses}`} accent="#95E1D3" />
                <Stat k="Sets" v={`${summary.record.setsFor}-${summary.record.setsAgainst}`} />
                <Stat k="Hitting %" v={summary.rates.hittingPct.toFixed(3).replace(/^0/, '')} />
                <Stat k="Kills / set" v={summary.rates.killsPerSet.toFixed(2)} />
                <Stat k="Blocks / set" v={summary.rates.blocksPerSet.toFixed(2)} />
                <Stat k="Digs / set" v={summary.rates.digsPerSet.toFixed(2)} />
              </>
            )}
            {poll && pollRank(poll, 'Kansas') && (
              <Stat k="AVCA rank" v={`#${pollRank(poll, 'Kansas')}`} accent="#E8000D" />
            )}
          </div>

          <div style={card}>
            <h3 style={{ ...heading, fontSize: '1.5rem', marginBottom: '0.9rem' }}>SCHEDULE &amp; RESULTS</h3>
            {summary.all.length === 0 ? (
              <p style={{ color: '#93A5C0', fontSize: '0.88rem' }}>No {season} matches in the feed yet.</p>
            ) : (
              <div>
                {summary.all.map((m) => (
                  <ScheduleRow key={`${m.date}-${m.opponent}`} match={m} rank={pollRank(poll, m.opponent)} today={today} />
                ))}
              </div>
            )}
            <p style={{ fontSize: '0.7rem', color: '#7E90AE', marginTop: '0.9rem', lineHeight: 1.5 }}>
              Rank chips are the opponent's position in the AVCA poll above. Dates come from kuathletics.com; results from the NCAA box scores.
            </p>
          </div>

          {table.length > 0 && (
            <div style={{ ...card, marginTop: '1.5rem' }}>
              <h3 style={{ ...heading, fontSize: '1.5rem', marginBottom: '0.9rem' }}>BIG 12 STANDINGS</h3>
              <StandingsTable rows={table} />
            </div>
          )}
        </>
      )}

      {/* ---------------- Polls ---------------- */}
      {seasonTab === 'polls' && feed && (
        <div style={card}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <h3 style={{ ...heading, fontSize: '1.6rem' }}>
              <Trophy size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
              {poll ? poll.name.toUpperCase() : 'NATIONAL POLL'}
            </h3>
            {poll && <span style={label}>{poll.updated}</span>}
          </div>

          {!poll ? (
            <p style={{ color: '#93A5C0', fontSize: '0.9rem' }}>No poll for {season} in the feed yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr>
                  {['Rank', 'Team', 'Record', 'Points', 'First-place votes'].map((h, i) => (
                    <th key={h} style={{ textAlign: i > 1 ? 'right' : 'left', ...label, padding: '0 0.5rem 0.6rem', borderBottom: '1px solid rgba(255,255,255,0.16)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {poll.rows.map((row) => {
                  const isKU = /kansas$/i.test(row.team.trim());
                  return (
                    <tr key={`${row.rank}-${row.team}`} style={{ background: isKU ? 'rgba(232, 0, 13, 0.14)' : row.big12 ? 'rgba(255, 201, 45, 0.07)' : 'transparent' }}>
                      <td style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#c9d3e5', fontWeight: 700 }}>{row.rankLabel || row.rank}</td>
                      <td style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', color: isKU ? '#fff' : row.big12 ? '#FFD866' : '#e2e9f5', fontWeight: isKU ? 700 : 400 }}>
                        {row.team}{isKU && ' 🎯'}
                      </td>
                      <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#93A5C0' }}>{row.record || '—'}</td>
                      <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#c9d3e5' }}>{row.points || '—'}</td>
                      <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#93A5C0' }}>{row.firstPlaceVotes || ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <p style={{ fontSize: '0.72rem', color: '#7E90AE', marginTop: '0.9rem' }}>
            Kansas highlighted in crimson, other Big 12 teams in gold.
          </p>
        </div>
      )}

      {/* ---------------- Championship ---------------- */}
      {seasonTab === 'championship' && feed && (
        <div style={{ ...card, textAlign: 'center', padding: '3rem 1.5rem' }}>
          <Award size={44} color="#FFC92D" />
          <h3 style={{ ...heading, fontSize: '2.4rem', color: '#ffffff', marginTop: '1rem' }}>{CHAMPIONSHIP.venue}</h3>
          <p style={{ fontSize: '1.05rem', color: '#c9d3e5', marginTop: '0.3rem' }}>{CHAMPIONSHIP.city}</p>
          <p style={{ ...label, fontSize: '0.9rem', marginTop: '0.8rem', color: '#FFD866' }}>{CHAMPIONSHIP.dates}</p>
          <p style={{ color: '#93A5C0', fontSize: '0.88rem', maxWidth: '480px', margin: '1.6rem auto 0', lineHeight: 1.65 }}>
            The {season} Division I championship field is announced in December. The bracket will appear here once it is drawn — until then the 2025 bracket is under the Archive tab.
          </p>
          <div style={{ marginTop: '1.6rem', display: 'inline-flex', gap: '0.6rem', alignItems: 'center', color: '#7E90AE', fontSize: '0.78rem' }}>
            <TrendingUp size={16} />
            {summary?.scheduled?.length ?? 0} matches scheduled · {summary?.played?.length ?? 0} played
          </div>
        </div>
      )}

      {/* ---------------- 2025 archive ---------------- */}
      {seasonTab === 'archive' && (
        <>
          <div style={{ ...card, padding: '0.85rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
            <CheckCircle size={18} color="#95E1D3" />
            <span style={{ fontSize: '0.82rem', color: '#c9d3e5' }}>
              Final 2025 tournament, kept for reference. Round dates corrected — several read 2024 in earlier builds.
            </span>
          </div>
          <Archive2025 ncaaTab={ncaaTab} setNcaaTab={setNcaaTab} />
        </>
      )}
    </div>
  );
}

function StandingsTable({ rows }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', minWidth: '520px' }}>
        <thead>
          <tr>
            {['Team', 'Conf', 'Overall', 'Natl', 'RPI'].map((h, i) => (
              <th key={h} style={{ textAlign: i ? 'right' : 'left', ...label, padding: '0 0.5rem 0.6rem', borderBottom: '1px solid rgba(255,255,255,0.16)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const isKU = /^kansas$/i.test(r.team.trim());
            return (
              <tr key={r.team} style={{ background: isKU ? 'rgba(232, 0, 13, 0.14)' : 'transparent' }}>
                <td style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', color: isKU ? '#fff' : '#e2e9f5', fontWeight: isKU ? 700 : 400 }}>{r.team}{isKU && ' 🎯'}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#c9d3e5' }}>{r.confW}-{r.confL}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#c9d3e5' }}>{r.overallW}-{r.overallL}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#93A5C0' }}>{r.nationalRank || '—'}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#93A5C0' }}>{r.rpiRank || '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export { StandingsTable };
