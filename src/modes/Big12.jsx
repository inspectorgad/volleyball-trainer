// Big 12 comparison: pick up to four teams and chart them on one metric.
import React from 'react';
import { metricNames } from '../data/metrics.js';
import { Trophy, CheckCircle, BarChart2, Users } from '../components/Icons.jsx';

export default function Big12({
  big12Data, selectedTeams, comparisonMetric, setComparisonMetric,
  toggleTeamSelection, getComparisonData, formatMetricValue, getMaxValue,
}) {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
    </div>
  );
}
