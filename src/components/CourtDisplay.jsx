// The court: player markers, attack zones, blocking indicators, rotation
// preview arrows, and the defensive / serve-receive overlays.
//
// Everything it used to close over in the single-file app now arrives as a
// prop under the same name, so the body below is unchanged apart from one
// fix noted inline.
import React from 'react';
import { courtPositions, rotationPositions } from '../data/systems.js';
import { defensiveFormations, serveReceiveFormations } from '../data/formations.js';
import { getNextRotationPositions } from '../lib/rotation.js';

export default function CourtDisplay({
  rotation,
  isOpponent,
  roles,
  showRotationPreview,
  showAttackZones,
  showBlockingIndicators,
  showSystemConnections,
  showDefenseFormation,
  defenseType,
  showServeReceive,
  scenarioMode,
  selectedPlayer,
  setSelectedPlayer,
  setSelectedPlayerInfo,
  // Only Play-Along marks a server, and only for whichever side has the ball.
  mainMode,
  servingTeam,
}) {
const displayPositions = rotationPositions[rotation];
  const nextDisplayPositions = showRotationPreview ? getNextRotationPositions(rotation) : null;

  // Determine which players are in front row (positions 2, 3, 4) and back row (positions 1, 5, 6)
  const frontRowPositions = [2, 3, 4];
  const backRowPositions = [1, 5, 6];

  // Find the setter position for connection lines
  const setterCourtPos = Object.entries(courtPositions).find(([courtPos]) => {
    const playerIndex = displayPositions.indexOf(parseInt(courtPos));
    const originalPosition = playerIndex + 1;
    return roles[originalPosition].role === 'S';
  });

  // Find attacker positions (not setter)
  const attackerPositions = Object.entries(courtPositions).filter(([courtPos]) => {
    const playerIndex = displayPositions.indexOf(parseInt(courtPos));
    const originalPosition = playerIndex + 1;
    const isFrontRow = frontRowPositions.includes(parseInt(courtPos));
    return isFrontRow && roles[originalPosition].role !== 'S';
  });

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #001A57 0%, #0051BA 100%)',
      aspectRatio: '1',
      border: '4px solid #E8000D',
      borderRadius: '8px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 0 100px rgba(232, 0, 13, 0.1)',
      overflow: 'hidden'
    }}>
      {/* Defensive Formation Overlay */}
      {showDefenseFormation && (
        <>
          {defensiveFormations[defenseType].coverage.map((zone, idx) => (
            <div
              key={`zone-${idx}`}
              style={{
                position: 'absolute',
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.size}px`,
                height: `${zone.size}px`,
                transform: 'translate(-50%, -50%)',
                background: zone.color,
                border: `2px dashed ${zone.color.replace('0.2', '0.6')}`,
                borderRadius: '50%',
                zIndex: 2,
                pointerEvents: 'none'
              }}
            />
          ))}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            zIndex: 5,
            pointerEvents: 'none'
          }}>
            <div style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '0.9rem',
              color: '#FFD93D',
              letterSpacing: '0.1em',
              textAlign: 'center'
            }}>
              {defensiveFormations[defenseType].name}
            </div>
          </div>
        </>
      )}

      {/* Serve Receive Formation Overlay */}
      {showServeReceive && (
        <>
          {serveReceiveFormations[rotation].coverage.map((zone, idx) => (
            <div
              key={`sr-zone-${idx}`}
              style={{
                position: 'absolute',
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.size}px`,
                height: `${zone.size}px`,
                transform: 'translate(-50%, -50%)',
                background: zone.color,
                border: `2px dashed ${zone.color.replace('0.3', '0.6').replace('0.2', '0.5')}`,
                borderRadius: '50%',
                zIndex: 2,
                pointerEvents: 'none'
              }}
            />
          ))}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.9)',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            zIndex: 5,
            pointerEvents: 'none'
          }}>
            <div style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '0.9rem',
              color: '#95E1D3',
              letterSpacing: '0.1em',
              textAlign: 'center'
            }}>
              {serveReceiveFormations[rotation].name}
            </div>
            <div style={{
              fontSize: '0.7rem',
              color: '#e0e0e0',
              textAlign: 'center',
              marginTop: '0.25rem'
            }}>
              Click players for details
            </div>
          </div>
        </>
      )}

      {/* Attack Zones Overlay */}
      {showAttackZones && (
        <>
          {/* Front Row Attack Zone (entire front court) */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '33.33%',
            background: 'linear-gradient(135deg, rgba(149, 225, 211, 0.3) 0%, rgba(78, 205, 196, 0.3) 100%)',
            border: '3px solid rgba(149, 225, 211, 0.6)',
            borderRadius: '4px',
            zIndex: 2,
            pointerEvents: 'none'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(149, 225, 211, 0.9)',
              color: '#0f0f23',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '0.9rem',
              fontWeight: '700',
              letterSpacing: '0.1em',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}>
              ✓ FRONT ROW - CAN ATTACK FROM ANYWHERE
            </div>
          </div>

          {/* 10-Foot Line Highlight */}
          <div style={{
            position: 'absolute',
            top: '33.33%',
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #FFD93D 0%, #FFA500 50%, #FFD93D 100%)',
            zIndex: 3,
            boxShadow: '0 0 20px rgba(255, 217, 61, 0.8), 0 0 40px rgba(255, 165, 0, 0.5)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#FFD93D',
              color: '#0f0f23',
              padding: '0.3rem 0.8rem',
              borderRadius: '3px',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '0.7rem',
              fontWeight: '700',
              letterSpacing: '0.1em',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              whiteSpace: 'nowrap'
            }}>
              10-FOOT / ATTACK LINE
            </div>
          </div>

          {/* Back Row Attack Zone (behind 10-foot line) */}
          <div style={{
            position: 'absolute',
            top: '33.33%',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(243, 129, 129, 0.25) 0%, rgba(255, 107, 53, 0.25) 100%)',
            border: '3px solid rgba(243, 129, 129, 0.5)',
            borderTop: 'none',
            borderRadius: '4px',
            zIndex: 2,
            pointerEvents: 'none'
          }}>
            <div style={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(243, 129, 129, 0.9)',
              color: '#0f0f23',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '0.9rem',
              fontWeight: '700',
              letterSpacing: '0.1em',
              textAlign: 'center',
              lineHeight: '1.4',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}>
              âš  BACK ROW PLAYERS<br/>
              <span style={{ fontSize: '0.75rem' }}>Must jump behind this line to attack</span>
            </div>
          </div>
        </>
      )}

      {/* System Connections (Setter to Hitters) */}
      {showSystemConnections && setterCourtPos && (
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 4, pointerEvents: 'none' }}>
          {attackerPositions.map(([attackerPos]) => {
            const setterCoords = courtPositions[setterCourtPos[0]];
            const attackerCoords = courtPositions[attackerPos];
            return (
              <g key={`connection-${attackerPos}`}>
                <line
                  x1={`${setterCoords.x}%`}
                  y1={`${setterCoords.y}%`}
                  x2={`${attackerCoords.x}%`}
                  y2={`${attackerCoords.y}%`}
                  stroke="#4ECDC4"
                  strokeWidth="3"
                  strokeDasharray="8,4"
                  opacity="0.7"
                />
                <circle
                  cx={`${(setterCoords.x + attackerCoords.x) / 2}%`}
                  cy={`${(setterCoords.y + attackerCoords.y) / 2}%`}
                  r="8"
                  fill="#4ECDC4"
                  opacity="0.8"
                >
                  <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}
        </svg>
      )}

      {/* Rotation Preview Arrows */}
      {showRotationPreview && nextDisplayPositions && (
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 4, pointerEvents: 'none' }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#FFD93D" />
            </marker>
          </defs>
          {Object.entries(courtPositions).map(([courtPos, coords]) => {
            const currentPlayerIndex = displayPositions.indexOf(parseInt(courtPos));
            const nextCourtPos = Object.entries(courtPositions).find(([pos]) => {
              const nextPlayerIndex = nextDisplayPositions.indexOf(parseInt(pos));
              return nextPlayerIndex === currentPlayerIndex;
            });

            if (nextCourtPos) {
              const nextCoords = courtPositions[nextCourtPos[0]];
              const dx = nextCoords.x - coords.x;
              const dy = nextCoords.y - coords.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance > 5) { // Only show arrow if significant movement
                return (
                  <g key={`arrow-${courtPos}`}>
                    <line
                      x1={`${coords.x}%`}
                      y1={`${coords.y}%`}
                      x2={`${nextCoords.x}%`}
                      y2={`${nextCoords.y}%`}
                      stroke="#FFD93D"
                      strokeWidth="4"
                      markerEnd="url(#arrowhead)"
                      opacity="0.8"
                      strokeDasharray="6,3"
                    >
                      <animate attributeName="stroke-dashoffset" values="0;-9" dur="1s" repeatCount="indefinite" />
                    </line>
                  </g>
                );
              }
            }
            return null;
          })}
        </svg>
      )}

      {/* Court Lines */}
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '3px', background: 'rgba(255, 255, 255, 0.3)', transform: 'translateY(-50%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: '2px', background: 'rgba(255, 255, 255, 0.2)', zIndex: 1 }} />

      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" style={{ opacity: 0.15 }} />
      </svg>

      {Object.entries(courtPositions).map(([pos, coords]) => (
        <div key={`label-${pos}`} style={{ position: 'absolute', left: `${coords.x}%`, top: `${coords.y}%`, transform: 'translate(-50%, -50%)', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.3)', fontWeight: '700', zIndex: 1, pointerEvents: 'none' }}>
          POS {pos}
        </div>
      ))}

      {Object.entries(courtPositions).map(([courtPos, coords]) => {
        const playerIndex = displayPositions.indexOf(parseInt(courtPos));
        const originalPosition = playerIndex + 1;
        const player = { position: parseInt(courtPos), originalPosition, ...roles[originalPosition] };
        const isServer = parseInt(courtPos) === 1 && mainMode === 'playalong' && ((isOpponent && servingTeam === 'opponent') || (!isOpponent && servingTeam === 'team'));
        const isFrontRow = frontRowPositions.includes(parseInt(courtPos));
        const canBlock = isFrontRow;
        const isPrimarySetter = showSystemConnections && player.role === 'S';
        const isPrimaryAttacker = showSystemConnections && isFrontRow && player.role !== 'S';

        return (
          <div 
            key={`player-${courtPos}`} 
            className="player-marker" 
            onClick={() => {
              if (scenarioMode) {
                setSelectedPlayer(parseInt(courtPos));
              } else if (showServeReceive) {
                setSelectedPlayerInfo({
                  position: parseInt(courtPos),
                  data: serveReceiveFormations[rotation].zones[courtPos]
                });
              }
            }}
            style={{ 
              position: 'absolute', 
              left: `${coords.x}%`, 
              top: `${coords.y}%`, 
              transform: 'translate(-50%, -50%)', 
              width: '80px', 
              height: '80px', 
              zIndex: 10,
              cursor: scenarioMode || showServeReceive ? 'pointer' : 'default'
            }}
          >
            {isServer && (
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#FFD93D', color: '#0f0f23', padding: '2px 6px', fontSize: '0.65rem', fontWeight: '700', borderRadius: '3px', letterSpacing: '0.05em', animation: 'pulse 2s ease-in-out infinite', boxShadow: '0 0 20px rgba(255, 217, 61, 0.6)', whiteSpace: 'nowrap' }}>
                SERVE
              </div>
            )}

            {/* Blocking Indicator */}
            {showBlockingIndicators && (
              <div style={{
                position: 'absolute',
                bottom: '-24px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: canBlock ? 'rgba(149, 225, 211, 0.95)' : 'rgba(243, 129, 129, 0.95)',
                color: '#0f0f23',
                padding: '3px 8px',
                fontSize: '0.6rem',
                fontWeight: '700',
                borderRadius: '3px',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
                border: `2px solid ${canBlock ? '#95E1D3' : '#F38181'}`,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
              }}>
                {canBlock ? '✓ CAN BLOCK' : '✗ NO BLOCK'}
              </div>
            )}

            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: player.color,
              border: `${isPrimarySetter ? '4px' : isPrimaryAttacker ? '4px' : selectedPlayer === parseInt(courtPos) ? '5px' : '3px'} solid ${selectedPlayer === parseInt(courtPos) ? '#FFD93D' : isPrimarySetter ? '#FF6B35' : isPrimaryAttacker ? '#4ECDC4' : 'rgba(255, 255, 255, 0.9)'}`,
              boxShadow: `0 4px 20px ${player.color}80, inset 0 2px 10px rgba(255, 255, 255, 0.3)${isPrimarySetter ? ', 0 0 30px rgba(255, 107, 53, 0.8)' : ''}${isPrimaryAttacker ? ', 0 0 30px rgba(78, 205, 196, 0.8)' : ''}${selectedPlayer === parseInt(courtPos) ? ', 0 0 40px rgba(255, 217, 61, 1), 0 0 60px rgba(255, 217, 61, 0.6)' : ''}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'rotateIn 0.6s ease backwards',
              animationDelay: `${parseInt(courtPos) * 0.1}s`,
              transform: selectedPlayer === parseInt(courtPos) ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f0f23', fontFamily: '"Bebas Neue", sans-serif', letterSpacing: '0.05em' }}>{player.role}</div>
              <div style={{ fontSize: '0.7rem', color: '#0f0f23', opacity: 0.8, marginTop: '-2px' }}>#{player.originalPosition}</div>

              {/* Primary Attacker Badge */}
              {isPrimaryAttacker && (
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#4ECDC4',
                  color: '#0f0f23',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: '700',
                  border: '2px solid #0f0f23',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                }}>
                  ⚡
                </div>
              )}

              {/* Setter Badge */}
              {isPrimarySetter && (
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#FF6B35',
                  color: '#0f0f23',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: '700',
                  border: '2px solid #0f0f23',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
                }}>
                  🎯
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div style={{ position: 'absolute', top: '16.5%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0, 81, 186, 0.2)', color: '#85C1E9', padding: '4px 12px', fontSize: '0.7rem', fontWeight: '700', borderRadius: '3px', letterSpacing: '0.1em', border: '1px solid rgba(0, 81, 186, 0.4)', zIndex: 5 }}>FRONT ROW</div>
      <div style={{ position: 'absolute', top: '58.5%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0, 81, 186, 0.2)', color: '#85C1E9', padding: '4px 12px', fontSize: '0.7rem', fontWeight: '700', borderRadius: '3px', letterSpacing: '0.1em', border: '1px solid rgba(0, 81, 186, 0.4)', zIndex: 5 }}>BACK ROW</div>
    </div>
  );
}
