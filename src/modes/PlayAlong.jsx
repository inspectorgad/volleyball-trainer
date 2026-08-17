// Play-Along: step through a scripted set and watch both rotations change.
import React from 'react';
import { matchData } from '../data/matchData.js';
import CourtDisplay from '../components/CourtDisplay.jsx';
import { ChevronRight, Info, Play, SkipBack, Award, AlertCircle } from '../components/Icons.jsx';

export default function PlayAlong({
  currentRotation, offensiveSystem, setOffensiveSystem,
  currentPointIndex, score, servingTeam, opponentRotation,
  nextPoint, resetMatch, currentPoint, isMatchComplete,
  courtProps,
}) {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', marginBottom: '2rem', background: 'rgba(255, 255, 255, 0.05)', padding: '1.5rem', borderRadius: '8px', border: '2px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', color: '#5FFAEE', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{matchData.teamName}</div>
          <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '4rem', color: '#eee', lineHeight: '1' }}>{score.team}</div>
          {servingTeam === 'team' && <div style={{ marginTop: '0.5rem', background: '#FFD93D', color: '#0f0f23', padding: '4px 12px', fontSize: '0.7rem', fontWeight: '700', borderRadius: '3px', letterSpacing: '0.05em', display: 'inline-block' }}>SERVING</div>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Award size={32} color="#FF6B35" />
          <div style={{ fontSize: '0.8rem', color: '#b0b0b0', letterSpacing: '0.1em' }}>SET {matchData.setNumber}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', color: '#F38181', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{matchData.opponentName}</div>
          <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '4rem', color: '#eee', lineHeight: '1' }}>{score.opponent}</div>
          {servingTeam === 'opponent' && <div style={{ marginTop: '0.5rem', background: '#FFD93D', color: '#0f0f23', padding: '4px 12px', fontSize: '0.7rem', fontWeight: '700', borderRadius: '3px', letterSpacing: '0.05em', display: 'inline-block' }}>SERVING</div>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ marginBottom: '1rem', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', color: '#5FFAEE', letterSpacing: '0.1em', textAlign: 'center' }}>{matchData.teamName} - Rotation {currentRotation}</div>
          <CourtDisplay rotation={currentRotation} isOpponent={false} {...courtProps} />
        </div>
        <div>
          <div style={{ marginBottom: '1rem', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', color: '#F38181', letterSpacing: '0.1em', textAlign: 'center' }}>{matchData.opponentName} - Rotation {opponentRotation}</div>
          <CourtDisplay rotation={opponentRotation} isOpponent={true} {...courtProps} />
        </div>
      </div>

      <div role="tablist" aria-label="Offensive system" style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        {['5-1', '6-2', '4-2'].map(system => (
          <button key={system} type="button" role="tab" aria-selected={offensiveSystem === system} className={`tab-btn ${offensiveSystem === system ? 'active' : ''}`} onClick={() => setOffensiveSystem(system)} style={{ padding: '0.5rem 1rem', background: offensiveSystem === system ? '#FF6B35' : 'rgba(255, 255, 255, 0.1)', border: '2px solid', borderColor: offensiveSystem === system ? '#FF6B35' : 'rgba(255, 255, 255, 0.2)', borderRadius: '0', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1rem', letterSpacing: '0.1em', color: offensiveSystem === system ? '#0f0f23' : '#eee' }}>
            {system}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {currentPoint && (
          <div style={{ background: 'rgba(78, 205, 196, 0.1)', border: '2px solid rgba(78, 205, 196, 0.3)', borderRadius: '4px', padding: '1.5rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Play size={20} color="#4ECDC4" />
              <h3 style={{ margin: 0, fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', color: '#5FFAEE', letterSpacing: '0.1em' }}>RALLY {currentPointIndex}</h3>
            </div>
            <p style={{ margin: 0, lineHeight: '1.8', fontSize: '1rem', color: '#eee', marginBottom: '1rem' }}>{currentPoint.rally}</p>
            <div style={{ padding: '0.75rem', background: currentPoint.winner === 'team' ? 'rgba(78, 205, 196, 0.2)' : 'rgba(243, 129, 129, 0.2)', borderRadius: '4px', fontSize: '0.9rem', fontWeight: '700', color: currentPoint.winner === 'team' ? '#4ECDC4' : '#F38181' }}>
              Point: {currentPoint.winner === 'team' ? matchData.teamName : matchData.opponentName}
            </div>
          </div>
        )}

        {currentPoint && currentPoint.ruleHighlight && (
          <div style={{ background: 'rgba(255, 107, 53, 0.1)', border: '2px solid rgba(255, 107, 53, 0.3)', borderRadius: '4px', padding: '1.5rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <AlertCircle size={20} color="#FF6B35" />
              <h3 style={{ margin: 0, fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', color: '#FF9B6B', letterSpacing: '0.1em' }}>RULE: {currentPoint.ruleHighlight}</h3>
            </div>
            <p style={{ margin: 0, lineHeight: '1.8', fontSize: '0.95rem', color: '#e0e0e0' }}>{currentPoint.explanation}</p>
          </div>
        )}

        {currentPoint && !currentPoint.ruleHighlight && (
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '2px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', padding: '1.5rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Info size={20} color="#888" />
              <h3 style={{ margin: 0, fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', color: '#b0b0b0', letterSpacing: '0.1em' }}>EXPLANATION</h3>
            </div>
            <p style={{ margin: 0, lineHeight: '1.8', fontSize: '0.95rem', color: '#e0e0e0' }}>{currentPoint.explanation}</p>
          </div>
        )}

        {isMatchComplete && (
          <div style={{ background: 'rgba(78, 205, 196, 0.2)', border: '2px solid rgba(78, 205, 196, 0.5)', borderRadius: '4px', padding: '2rem', textAlign: 'center', marginBottom: '1rem' }}>
            <Award size={48} color="#4ECDC4" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: '#5FFAEE', letterSpacing: '0.1em', margin: '0 0 0.5rem 0' }}>SET COMPLETE!</h2>
            <p style={{ fontSize: '0.9rem', color: '#e0e0e0', margin: 0 }}>You've learned {matchData.points.filter(p => p.ruleHighlight).length} rule situations in this set!</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={resetMatch} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 255, 255, 0.3)', borderRadius: '0', color: '#eee', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em', cursor: 'pointer' }}>
            <SkipBack size={20} /> RESTART SET
          </button>
          <button onClick={nextPoint} disabled={isMatchComplete} style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', background: isMatchComplete ? 'rgba(78, 205, 196, 0.3)' : '#4ECDC4', border: '2px solid', borderColor: isMatchComplete ? 'rgba(78, 205, 196, 0.5)' : '#4ECDC4', borderRadius: '0', color: '#0f0f23', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em', fontWeight: '700', cursor: isMatchComplete ? 'not-allowed' : 'pointer', opacity: isMatchComplete ? 0.5 : 1 }}>
            {isMatchComplete ? 'SET COMPLETE' : 'NEXT POINT'} {!isMatchComplete && <ChevronRight size={20} />}
          </button>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(currentPointIndex / matchData.points.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #4ECDC4 0%, #FF6B35 100%)', transition: 'width 0.3s ease' }} />
          </div>
          <div style={{ fontSize: '0.8rem', color: '#b0b0b0', minWidth: '60px', textAlign: 'right' }}>{currentPointIndex} / {matchData.points.length}</div>
        </div>
      </div>
    </div>
  );
}
