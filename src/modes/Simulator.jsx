// Rotation simulator: court, offensive system picker, overlay toggles and scenario mode.
import React from 'react';
import { systemRoles, rotationPositions } from '../data/systems.js';
import { scenarios } from '../data/scenarios.js';
import { defensiveFormations } from '../data/formations.js';
import CourtDisplay from '../components/CourtDisplay.jsx';
import { ChevronRight, RotateCw, Info, CheckCircle, XCircle, Eye } from '../components/Icons.jsx';

export default function Simulator({
  currentRotation, offensiveSystem, setOffensiveSystem,
  showAttackZones, setShowAttackZones,
  showBlockingIndicators, setShowBlockingIndicators,
  showSystemConnections, setShowSystemConnections,
  scenarioMode, setScenarioMode,
  currentScenario, setCurrentScenario, scenarioResult,
  showRotationPreview, setShowRotationPreview,
  showDefenseFormation, setShowDefenseFormation,
  defenseType, setDefenseType,
  showServeReceive, setShowServeReceive,
  selectedPlayerInfo, setSelectedPlayerInfo,
  roles, nextRotation, resetRotation, getExplanation,
  validateScenario, resetScenario,
  courtProps,
}) {
  return (
    <>
      <div role="tablist" aria-label="Offensive system" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
        {['5-1', '6-2', '4-2'].map(system => (
          <button key={system} type="button" role="tab" aria-selected={offensiveSystem === system} className={`tab-btn ${offensiveSystem === system ? 'active' : ''}`} onClick={() => setOffensiveSystem(system)} style={{ padding: '0.75rem 2rem', background: offensiveSystem === system ? '#E8000D' : 'rgba(255, 255, 255, 0.1)', border: '2px solid', borderColor: offensiveSystem === system ? '#E8000D' : 'rgba(255, 255, 255, 0.2)', borderRadius: '0', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', letterSpacing: '0.1em', color: offensiveSystem === system ? '#ffffff' : '#eee' }}>
            {system}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Tier 1 Feature Toggle Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setShowAttackZones(!showAttackZones)}
            style={{
              padding: '0.75rem 1.5rem',
              background: showAttackZones ? 'rgba(149, 225, 211, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              border: '2px solid',
              borderColor: showAttackZones ? '#95E1D3' : 'rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              color: showAttackZones ? '#95E1D3' : '#eee',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '0.95rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '700'
            }}
          >
            {showAttackZones ? '✓' : '○'} ATTACK ZONES
          </button>

          <button 
            onClick={() => setShowBlockingIndicators(!showBlockingIndicators)}
            style={{
              padding: '0.75rem 1.5rem',
              background: showBlockingIndicators ? 'rgba(149, 225, 211, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              border: '2px solid',
              borderColor: showBlockingIndicators ? '#95E1D3' : 'rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              color: showBlockingIndicators ? '#95E1D3' : '#eee',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '0.95rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '700'
            }}
          >
            {showBlockingIndicators ? '✓' : '○'} BLOCKING RULES
          </button>

          <button 
            onClick={() => setShowSystemConnections(!showSystemConnections)}
            style={{
              padding: '0.75rem 1.5rem',
              background: showSystemConnections ? 'rgba(78, 205, 196, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              border: '2px solid',
              borderColor: showSystemConnections ? '#4ECDC4' : 'rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              color: showSystemConnections ? '#4ECDC4' : '#eee',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '0.95rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '700'
            }}
          >
            {showSystemConnections ? '✓' : '○'} SETTER CONNECTIONS
          </button>
        </div>

        {/* Tier 2 Feature Toggle Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setShowRotationPreview(!showRotationPreview)}
            style={{
              padding: '0.75rem 1.5rem',
              background: showRotationPreview ? 'rgba(255, 217, 61, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              border: '2px solid',
              borderColor: showRotationPreview ? '#FFD93D' : 'rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              color: showRotationPreview ? '#FFD93D' : '#eee',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '0.95rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '700'
            }}
          >
            {showRotationPreview ? '✓' : '○'} ROTATION PREVIEW
          </button>

          <button 
            onClick={() => setShowDefenseFormation(!showDefenseFormation)}
            style={{
              padding: '0.75rem 1.5rem',
              background: showDefenseFormation ? 'rgba(255, 165, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              border: '2px solid',
              borderColor: showDefenseFormation ? '#FFA500' : 'rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              color: showDefenseFormation ? '#FFA500' : '#eee',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '0.95rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '700'
            }}
          >
            {showDefenseFormation ? '✓' : '○'} DEFENSE ZONES
          </button>
        </div>

        {/* Serve Receive Formation Toggle - Added after Defense Zones */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-1rem', marginBottom: '2rem' }}>
          <button 
            onClick={() => setShowServeReceive(!showServeReceive)}
            style={{
              padding: '0.75rem 1.5rem',
              background: showServeReceive ? 'rgba(149, 225, 211, 0.3)' : 'rgba(255, 255, 255, 0.1)',
              border: '2px solid',
              borderColor: showServeReceive ? '#95E1D3' : 'rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              color: showServeReceive ? '#95E1D3' : '#eee',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '0.95rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '700'
            }}
          >
            {showServeReceive ? '✓' : '◯'} SERVE RECEIVE
          </button>
        </div>

        {/* Defense Formation Selector */}
        {showDefenseFormation && (
          <div style={{ marginBottom: '2rem', background: 'rgba(255, 165, 0, 0.1)', border: '2px solid rgba(255, 165, 0, 0.3)', borderRadius: '8px', padding: '1.5rem' }}>
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', color: '#FFB84D', marginBottom: '1rem', letterSpacing: '0.1em', textAlign: 'center' }}>
              SELECT DEFENSE FORMATION
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              {Object.entries(defensiveFormations).map(([key, formation]) => (
                <button
                  key={key}
                  onClick={() => setDefenseType(key)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: defenseType === key ? '#FFA500' : 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid',
                    borderColor: defenseType === key ? '#FFA500' : 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    color: defenseType === key ? '#0f0f23' : '#eee',
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: '700'
                  }}
                >
                  {formation.name}
                </button>
              ))}
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#e0e0e0', textAlign: 'center', lineHeight: '1.6' }}>
              {defensiveFormations[defenseType].description}
            </div>
          </div>
        )}

        {/* Serve Receive Player Info Tooltip */}
        {showServeReceive && selectedPlayerInfo && (
          <div style={{ marginBottom: '2rem', background: 'rgba(149, 225, 211, 0.1)', border: '3px solid rgba(149, 225, 211, 0.5)', borderRadius: '8px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: '#95E1D3', letterSpacing: '0.1em', margin: 0 }}>
                Position {selectedPlayerInfo.position} - {selectedPlayerInfo.data.role}
              </h3>
              <button 
                onClick={() => setSelectedPlayerInfo(null)}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(243, 129, 129, 0.3)',
                  border: '2px solid #F38181',
                  borderRadius: '4px',
                  color: '#F38181',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  fontWeight: '700'
                }}
              >
                ✕ CLOSE
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: '4px', padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#b0b0b0', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Role
                </div>
                <div style={{ fontSize: '1.2rem', color: '#95E1D3', fontWeight: '700', fontFamily: '"Bebas Neue", sans-serif' }}>
                  {selectedPlayerInfo.data.role}
                </div>
              </div>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: '4px', padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#b0b0b0', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Passing Priority
                </div>
                <div style={{ 
                  fontSize: '1.2rem', 
                  color: selectedPlayerInfo.data.priority === 'primary' ? '#95E1D3' : selectedPlayerInfo.data.priority === 'secondary' ? '#FFD93D' : '#F38181',
                  fontWeight: '700',
                  fontFamily: '"Bebas Neue", sans-serif',
                  textTransform: 'uppercase'
                }}>
                  {selectedPlayerInfo.data.passing}
                </div>
              </div>

              <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: '4px', padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#b0b0b0', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Zone Coverage
                </div>
                <div style={{ fontSize: '0.95rem', color: '#eee', lineHeight: '1.5' }}>
                  {selectedPlayerInfo.data.zone}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1rem', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '4px', padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#b0b0b0', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Responsibility
              </div>
              <div style={{ fontSize: '1rem', color: '#eee', lineHeight: '1.7' }}>
                {selectedPlayerInfo.data.responsibility}
              </div>
            </div>

            <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#95E1D3', textAlign: 'center', fontStyle: 'italic' }}>
              {selectedPlayerInfo.data.priority === 'primary' && 'âœ" Primary passer - expected to take majority of serves'}
              {selectedPlayerInfo.data.priority === 'secondary' && '⚡ Secondary passer - covers seams and helps primary passers'}
              {selectedPlayerInfo.data.priority === 'off' && '⚠ OFF - Will not pass, positioning to set the second ball'}
            </div>
          </div>
        )}

        {/* Scenario Mode Toggle */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <button 
            onClick={() => {
              setScenarioMode(!scenarioMode);
              if (!scenarioMode) {
                setShowAttackZones(false);
                setShowBlockingIndicators(false);
                setShowSystemConnections(false);
              }
              resetScenario();
            }}
            style={{
              padding: '1rem 2rem',
              background: scenarioMode ? 'linear-gradient(135deg, #FFD93D 0%, #FFA500 100%)' : 'linear-gradient(135deg, #FF6B35 0%, #F38181 100%)',
              border: '3px solid',
              borderColor: scenarioMode ? '#FFD93D' : '#FF6B35',
              borderRadius: '8px',
              color: '#0f0f23',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.2rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '700',
              boxShadow: scenarioMode ? '0 8px 24px rgba(255, 217, 61, 0.5)' : '0 8px 24px rgba(255, 107, 53, 0.5)',
              transform: scenarioMode ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            {scenarioMode ? '⚡ SCENARIO MODE ACTIVE' : '🎮 ENABLE SCENARIO MODE'}
          </button>
          {scenarioMode && (
            <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#FFD93D', fontWeight: '700' }}>
              ↓ Click a scenario below to begin ↓
            </div>
          )}
        </div>

        {/* Scenario Selector */}
        {scenarioMode && !currentScenario && (
          <div style={{ marginBottom: '2rem', background: 'rgba(255, 217, 61, 0.1)', border: '2px solid rgba(255, 217, 61, 0.3)', borderRadius: '8px', padding: '1.5rem' }}>
            <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: '#FFE766', marginBottom: '1rem', letterSpacing: '0.1em', textAlign: 'center' }}>
              🎯 SELECT A SCENARIO
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {scenarios.map(scenario => (
                <div 
                  key={scenario.id}
                  onClick={() => setCurrentScenario(scenario)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 217, 61, 0.3)',
                    borderRadius: '8px',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  className="rule-card"
                >
                  <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', color: '#FFE766', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                    {scenario.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#e0e0e0', lineHeight: '1.5' }}>
                    {scenario.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Scenario Display */}
        {scenarioMode && currentScenario && (
          <div style={{ marginBottom: '2rem', background: 'rgba(255, 217, 61, 0.15)', border: '3px solid rgba(255, 217, 61, 0.5)', borderRadius: '8px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: '#FFE766', letterSpacing: '0.1em', margin: 0 }}>
                🎯 {currentScenario.title}
              </h3>
              <button 
                onClick={resetScenario}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(243, 129, 129, 0.3)',
                  border: '2px solid #F38181',
                  borderRadius: '4px',
                  color: '#F38181',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  fontWeight: '700'
                }}
              >
                ✕ EXIT
              </button>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: '4px', padding: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '1.1rem', color: '#eee', lineHeight: '1.6', marginBottom: '1rem' }}>
                <strong style={{ color: '#FFD93D' }}>SCENARIO:</strong> {currentScenario.description}
              </div>
            </div>

            {!scenarioResult && (
              <div>
                <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', color: '#5FFAEE', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                  CHOOSE YOUR ANSWER:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {currentScenario.zones.map(zone => (
                    <button
                      key={zone.id}
                      onClick={() => validateScenario(currentScenario.id, zone.id)}
                      style={{
                        padding: '1.25rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '8px',
                        color: '#eee',
                        fontSize: '1rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontWeight: '600'
                      }}
                      className="quiz-option"
                    >
                      {zone.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {scenarioResult && (
              <div style={{ background: scenarioResult.correct ? 'rgba(149, 225, 211, 0.2)' : 'rgba(243, 129, 129, 0.2)', border: `3px solid ${scenarioResult.correct ? '#95E1D3' : '#F38181'}`, borderRadius: '8px', padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  {scenarioResult.correct ? (
                    <CheckCircle size={48} color="#95E1D3" />
                  ) : (
                    <XCircle size={48} color="#F38181" />
                  )}
                  <div>
                    <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: scenarioResult.correct ? '#95E1D3' : '#F38181', letterSpacing: '0.1em' }}>
                      {scenarioResult.correct ? 'CORRECT!' : 'INCORRECT'}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#e0e0e0', marginTop: '0.25rem' }}>
                      You selected: {scenarioResult.selectedZone}
                    </div>
                  </div>
                </div>

                <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: '4px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.85rem', color: '#b0b0b0', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    EXPLANATION:
                  </div>
                  <div style={{ fontSize: '1.05rem', color: '#eee', lineHeight: '1.7' }}>
                    {scenarioResult.explanation}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button 
                    onClick={resetScenario}
                    style={{
                      padding: '1rem 2rem',
                      background: '#4ECDC4',
                      border: '2px solid #4ECDC4',
                      borderRadius: '4px',
                      color: '#0f0f23',
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      fontWeight: '700',
                      letterSpacing: '0.1em'
                    }}
                  >
                    ↩ TRY ANOTHER SCENARIO
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1rem', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', color: '#4D9FFF', letterSpacing: '0.1em', textAlign: 'center' }}>
            Home Team - Rotation {currentRotation}
          </div>
          <CourtDisplay rotation={currentRotation} isOpponent={false} {...courtProps} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button onClick={resetRotation} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 255, 255, 0.3)', borderRadius: '0', color: '#eee', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.1em', cursor: 'pointer' }}>
            <RotateCw size={20} /> RESET
          </button>
          <button onClick={nextRotation} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: '#E8000D', border: '2px solid #E8000D', borderRadius: '0', color: '#ffffff', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.1em', fontWeight: '700', cursor: 'pointer' }}>
            NEXT ROTATION <ChevronRight size={20} />
          </button>
        </div>

        <div style={{ marginTop: '2rem', background: 'rgba(232, 0, 13, 0.1)', border: '2px solid rgba(232, 0, 13, 0.3)', borderRadius: '4px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Info size={20} color="#E8000D" />
            <h3 style={{ margin: 0, fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', color: '#FF4444', letterSpacing: '0.1em' }}>WHAT'S HAPPENING</h3>
          </div>
          <p style={{ margin: 0, lineHeight: '1.8', fontSize: '0.95rem', color: '#e0e0e0' }}>{getExplanation()}</p>
        </div>

        {/* Defensive Responsibilities Panel */}
        {showDefenseFormation && (
          <div style={{ marginTop: '2rem', background: 'rgba(255, 165, 0, 0.1)', border: '2px solid rgba(255, 165, 0, 0.3)', borderRadius: '4px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Eye size={20} color="#FFA500" />
              <h3 style={{ margin: 0, fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', color: '#FFB84D', letterSpacing: '0.1em' }}>DEFENSIVE COVERAGE</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {Object.entries(defensiveFormations[defenseType].zones).map(([pos, zone]) => {
                const playerIndex = rotationPositions[currentRotation].indexOf(parseInt(pos));
                const originalPosition = playerIndex + 1;
                const player = roles[originalPosition];

                return (
                  <div key={pos} style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '4px', border: '1px solid rgba(255, 165, 0, 0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: player.color, border: '2px solid rgba(255, 255, 255, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#0f0f23', fontFamily: '"Bebas Neue", sans-serif', fontSize: '0.9rem', flexShrink: 0 }}>{player.role}</div>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#FFB84D' }}>Position {pos}</div>
                        <div style={{ fontSize: '0.7rem', color: '#b0b0b0' }}>Player #{originalPosition}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#FFD93D', fontWeight: '700', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {zone.area}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#e0e0e0', lineHeight: '1.5' }}>
                      {zone.responsibility}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {Object.entries(systemRoles[offensiveSystem]).map(([pos, info]) => (
            <div key={pos} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: info.color, border: '2px solid rgba(255, 255, 255, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#0f0f23', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1rem', flexShrink: 0 }}>{info.role}</div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>Player {pos}</div>
                <div style={{ fontSize: '0.75rem', color: '#b0b0b0' }}>{info.fullRole}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
