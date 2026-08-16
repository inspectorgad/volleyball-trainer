// Big 12 comparison.
//
// Two views. "Live" reads the ku-volleyball feed: conference records and
// national/RPI ranks for every team, plus Kansas per-set rates derived from
// box scores. "2025 final" is the hand-entered season archive, which is the
// only place per-set numbers exist for the other fourteen teams — the feed
// does not carry them.
import React from 'react';
import { metricNames } from '../data/metrics.js';
import { StandingsTable } from './Season.jsx';
import { seasonSummary, standingsFor } from '../lib/season.js';
import { Trophy, CheckCircle, BarChart2, Users, AlertCircle } from '../components/Icons.jsx';

const VIEWS = [
  ['live', 'LIVE'],
  ['2025', '2025 FINAL'],
];

const card = {
  background: 'rgba(255, 255, 255, 0.05)',
  border: '2px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  padding: '1.5rem',
};
const heading = { fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.1em', color: '#5FE0D8', margin: 0 };
const label = { fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#93A5C0' };

export default function Big12({
  big12Data, selectedTeams, comparisonMetric, setComparisonMetric,
  toggleTeamSelection, getComparisonData, formatMetricValue, getMaxValue,
  big12View, setBig12View, feed, today, season = '2026',
}) {
  const table = feed ? standingsFor(feed, season) : [];
  const summary = feed ? seasonSummary(feed, season, today) : null;
  const kuRates = summary && summary.hasStarted ? summary.rates : null;

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {VIEWS.map(([id, text]) => (
          <button
            key={id}
            type="button"
            className={`tab-btn ${big12View === id ? 'active' : ''}`}
            aria-pressed={big12View === id}
            onClick={() => setBig12View(id)}
            style={{ padding: '0.7rem 1.8rem', background: big12View === id ? '#E8000D' : 'rgba(255, 255, 255, 0.1)', border: '2px solid', borderColor: big12View === id ? '#E8000D' : 'rgba(255, 255, 255, 0.2)', borderRadius: 0, fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em', color: big12View === id ? '#ffffff' : '#eee' }}
          >
            {text}{id === 'live' ? ` ${season}` : ''}
          </button>
        ))}
      </div>

      {big12View === 'live' && (
        <>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ ...heading, fontSize: '3rem', color: '#E8000D' }}>BIG 12 · {season}</h2>
            <p style={{ fontSize: '1rem', color: '#ccc', maxWidth: '820px', margin: '0.4rem auto 0' }}>
              Conference records and rankings straight from the nightly scrape.
            </p>
          </div>

          {!feed && (
            <div style={{ ...card, textAlign: 'center', padding: '3rem 1.5rem' }}>
              <AlertCircle size={36} color="#FFC92D" />
              <h3 style={{ ...heading, fontSize: '1.6rem', marginTop: '1rem' }}>NO LIVE DATA</h3>
              <p style={{ color: '#b6c2d6', fontSize: '0.9rem', marginTop: '0.6rem' }}>
                The season feed is not loaded. Switch to 2025 Final for the archived comparison.
              </p>
            </div>
          )}

          {feed && table.length === 0 && (
            <div style={{ ...card, borderColor: 'rgba(255, 201, 45, 0.45)', background: 'rgba(255, 201, 45, 0.07)', marginBottom: '1.5rem' }}>
              <h3 style={{ ...heading, fontSize: '1.5rem', color: '#FFD866' }}>NO CONFERENCE RESULTS YET</h3>
              <p style={{ color: '#e4d9b8', fontSize: '0.88rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
                Standings are computed from finished matches, and no {season} Big 12 match has been played. The table fills in on its own once conference play starts. The 2025 Final tab has last season's full comparison.
              </p>
            </div>
          )}

          {feed && table.length > 0 && (
            <div style={{ ...card, marginBottom: '1.5rem' }}>
              <h3 style={{ ...heading, fontSize: '1.5rem', marginBottom: '0.9rem' }}>STANDINGS</h3>
              <StandingsTable rows={table} />
            </div>
          )}

          <div style={card}>
            <h3 style={{ ...heading, fontSize: '1.5rem', marginBottom: '0.4rem' }}>KANSAS · PER SET</h3>
            {kuRates ? (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                  {[
                    ['Hitting %', kuRates.hittingPct.toFixed(3).replace(/^0/, '')],
                    ['Kills', kuRates.killsPerSet.toFixed(2)],
                    ['Assists', kuRates.assistsPerSet.toFixed(2)],
                    ['Aces', kuRates.acesPerSet.toFixed(2)],
                    ['Digs', kuRates.digsPerSet.toFixed(2)],
                    ['Blocks', kuRates.blocksPerSet.toFixed(2)],
                    ['Points', kuRates.pointsPerSet.toFixed(2)],
                    ['Sets played', kuRates.setsPlayed],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div style={label}>{k}</div>
                      <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.7rem', color: '#fff' }}>{v}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.72rem', color: '#7E90AE', marginTop: '1rem', lineHeight: 1.55 }}>
                  Derived from {summary.played.length} box scores. Block assists count as a half, matching NCAA convention.
                </p>
              </>
            ) : (
              <p style={{ color: '#93A5C0', fontSize: '0.88rem', marginTop: '0.6rem', lineHeight: 1.6 }}>
                No {season} box scores yet. These rates are computed from finished matches, so they appear after the first one.
              </p>
            )}
          </div>

          <p style={{ fontSize: '0.75rem', color: '#7E90AE', marginTop: '1.5rem', lineHeight: 1.6, textAlign: 'center', maxWidth: '760px', marginInline: 'auto' }}>
            The feed carries records and rankings for all fifteen teams, but per-set stats only for Kansas — they are computed from box scores, and the scrape only captures those for Kansas matches. For a per-set comparison across the conference, see 2025 Final.
          </p>
        </>
      )}

      {big12View === '2025' && (
        <>
          <div style={{ ...card, padding: '0.85rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
            <CheckCircle size={18} color="#95E1D3" />
            <span style={{ fontSize: '0.82rem', color: '#c9d3e5' }}>
              Final 2025 season figures, entered by hand. Not live — see the Live tab for {season}.
            </span>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '3rem', color: '#E8000D', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>
              BIG 12 VOLLEYBALL COMPARISON
            </h2>
            <p style={{ fontSize: '1rem', color: '#ccc', maxWidth: '800px', margin: '0 auto' }}>
              Compare statistics from the 2025 Big 12 Conference season. Select up to 4 teams to analyze their performance across key metrics.
            </p>
          </div>

          <div style={{ background: 'rgba(0, 81, 186, 0.1)', border: '2px solid rgba(0, 81, 186, 0.3)', borderRadius: '8px', padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Users size={28} color="#0051BA" />
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: '#0051BA', letterSpacing: '0.1em', margin: 0 }}>
                SELECT TEAMS TO COMPARE
              </h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '1.5rem' }}>
              Choose 1-4 teams • {selectedTeams.length} of 4 selected
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {big12Data.map(team => (
                <div
                  key={team.name}
                  onClick={() => toggleTeamSelection(team.name)}
                  className="rule-card"
                  style={{
                    padding: '1rem',
                    background: selectedTeams.includes(team.name) 
                      ? (team.name === 'Kansas' ? 'rgba(0, 81, 186, 0.3)' : 'rgba(78, 205, 196, 0.2)')
                      : 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid',
                    borderColor: selectedTeams.includes(team.name)
                      ? (team.name === 'Kansas' ? '#0051BA' : '#4ECDC4')
                      : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  {selectedTeams.includes(team.name) && (
                    <CheckCircle 
                      size={20} 
                      color={team.name === 'Kansas' ? '#0051BA' : '#4ECDC4'} 
                      style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
                    />
                  )}
                  <div style={{ 
                    fontFamily: '"Bebas Neue", sans-serif', 
                    fontSize: '1.3rem', 
                    color: team.name === 'Kansas' ? '#0051BA' : '#eee',
                    marginBottom: '0.5rem',
                    letterSpacing: '0.05em'
                  }}>
                    {team.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#b0b0b0', marginBottom: '0.25rem' }}>
                    Conference: {team.conferenceRecord}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#b0b0b0' }}>
                    Overall: {team.overallRecord}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: team.conferenceRank === 1 ? '#FFD93D' : '#888', marginTop: '0.5rem', fontWeight: '700' }}>
                    #{team.conferenceRank} in Conference
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(232, 0, 13, 0.1)', border: '2px solid rgba(232, 0, 13, 0.3)', borderRadius: '8px', padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <BarChart2 size={28} color="#E8000D" />
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: '#E8000D', letterSpacing: '0.1em', margin: 0 }}>
                COMPARISON METRIC
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {Object.entries(metricNames).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setComparisonMetric(key)}
                  style={{
                    padding: '1rem',
                    background: comparisonMetric === key ? '#E8000D' : 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid',
                    borderColor: comparisonMetric === key ? '#E8000D' : 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    color: comparisonMetric === key ? '#ffffff' : '#eee',
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '0.95rem',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: '700'
                  }}
                  className="mode-toggle"
                >
                  {label}
                </button>
              ))}
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: '8px', padding: '2rem' }}>
              <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', color: '#4ECDC4', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>
                {metricNames[comparisonMetric]}
              </h4>

              {getComparisonData().map((team, index) => (
                <div key={team.name} style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ 
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: '1.1rem',
                        color: team.name === 'Kansas' ? '#0051BA' : '#eee',
                        fontWeight: '700',
                        letterSpacing: '0.05em'
                      }}>
                        {team.name}
                      </span>
                      {index === 0 && (
                        <Trophy size={20} color="#FFD93D" />
                      )}
                    </div>
                    <span style={{ 
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.2rem',
                      color: team.name === 'Kansas' ? '#E8000D' : '#4ECDC4',
                      fontWeight: '700'
                    }}>
                      {formatMetricValue(team.value)}
                    </span>
                  </div>

                  <div style={{ 
                    height: '12px', 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '6px', 
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      height: '100%',
                      width: `${(team.value / getMaxValue()) * 100}%`,
                      background: team.name === 'Kansas' 
                        ? 'linear-gradient(90deg, #0051BA 0%, #E8000D 100%)'
                        : index === 0 
                          ? 'linear-gradient(90deg, #FFD93D 0%, #FFA500 100%)'
                          : 'linear-gradient(90deg, #4ECDC4 0%, #95E1D3 100%)',
                      borderRadius: '6px',
                      transition: 'width 0.5s ease',
                      boxShadow: team.name === 'Kansas' 
                        ? '0 2px 8px rgba(0, 81, 186, 0.5)'
                        : '0 2px 8px rgba(78, 205, 196, 0.3)'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: '#4ECDC4', marginBottom: '1.5rem', letterSpacing: '0.1em', textAlign: 'center' }}>
              DETAILED TEAM STATISTICS
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {big12Data.filter(team => selectedTeams.includes(team.name)).map(team => (
                <div 
                  key={team.name}
                  style={{
                    background: team.name === 'Kansas' 
                      ? 'linear-gradient(135deg, rgba(0, 81, 186, 0.2) 0%, rgba(232, 0, 13, 0.1) 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid',
                    borderColor: team.name === 'Kansas' ? '#0051BA' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '1.5rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <h4 style={{ 
                      fontFamily: '"Bebas Neue", sans-serif', 
                      fontSize: '1.8rem', 
                      color: team.name === 'Kansas' ? '#0051BA' : '#4ECDC4',
                      margin: 0,
                      letterSpacing: '0.05em'
                    }}>
                      {team.name}
                    </h4>
                    {team.conferenceRank === 1 && (
                      <Trophy size={28} color="#FFD93D" />
                    )}
                  </div>

                  <div style={{ 
                    background: 'rgba(0, 0, 0, 0.2)', 
                    borderRadius: '4px', 
                    padding: '1rem', 
                    marginBottom: '1rem' 
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#b0b0b0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Conference</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#eee' }}>{team.conferenceRecord}</div>
                        <div style={{ fontSize: '0.8rem', color: '#4ECDC4' }}>{team.confWinPct.toFixed(1)}%</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#b0b0b0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Overall</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#eee' }}>{team.overallRecord}</div>
                        <div style={{ fontSize: '0.8rem', color: '#4ECDC4' }}>{team.overallWinPct.toFixed(1)}%</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#FFD93D', fontWeight: '700', textAlign: 'center', padding: '0.5rem', background: 'rgba(255, 217, 61, 0.1)', borderRadius: '3px' }}>
                      #{team.conferenceRank} IN CONFERENCE
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#b0b0b0', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      KEY STATISTICS
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.5rem', borderRadius: '4px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#b0b0b0' }}>Kills/Set</div>
                        <div style={{ fontSize: '1rem', fontWeight: '700', color: '#E8000D' }}>{team.statistics.killsPerSet.toFixed(2)}</div>
                      </div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.5rem', borderRadius: '4px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#b0b0b0' }}>Hitting %</div>
                        <div style={{ fontSize: '1rem', fontWeight: '700', color: '#E8000D' }}>{(team.statistics.hittingPct * 100).toFixed(1)}%</div>
                      </div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.5rem', borderRadius: '4px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#b0b0b0' }}>Blocks/Set</div>
                        <div style={{ fontSize: '1rem', fontWeight: '700', color: '#4ECDC4' }}>{team.statistics.blocksPerSet.toFixed(2)}</div>
                      </div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.5rem', borderRadius: '4px' }}>
                        <div style={{ fontSize: '0.7rem', color: '#b0b0b0' }}>Digs/Set</div>
                        <div style={{ fontSize: '1rem', fontWeight: '700', color: '#4ECDC4' }}>{team.statistics.digsPerSet.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ 
                    background: 'rgba(255, 107, 53, 0.1)', 
                    border: '1px solid rgba(255, 107, 53, 0.3)', 
                    borderRadius: '4px', 
                    padding: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ fontSize: '0.7rem', color: '#FF6B35', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      OFFENSIVE SYSTEM
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#eee' }}>
                      {team.offensiveSystem}
                    </div>
                  </div>

                  {team.seasonNotes && (
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: '#d0d0d0', 
                      lineHeight: '1.5',
                      padding: '0.75rem',
                      background: 'rgba(0, 0, 0, 0.2)',
                      borderRadius: '4px',
                      borderLeft: '3px solid #4ECDC4'
                    }}>
                      {team.seasonNotes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
