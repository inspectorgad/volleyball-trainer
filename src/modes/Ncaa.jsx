// Tournament tracker: bracket, host sites, results and the referee signal chart.
import React from 'react';

export default function Ncaa({
  ncaaTab, setNcaaTab,
}) {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Tournament Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(232, 0, 13, 0.2), rgba(0, 81, 186, 0.2))', padding: '2rem', borderRadius: '12px', border: '3px solid #E8000D' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏐</div>
        <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '3rem', color: '#FFFFFF', marginBottom: '0.5rem', letterSpacing: '0.1em', textShadow: '0 0 20px rgba(232, 0, 13, 0.8)' }}>
          2025 NCAA TOURNAMENT
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#FFD93D', fontWeight: '700', marginBottom: '1rem' }}>
          Kansas Jayhawks in the Sweet 16!
        </p>
        <div style={{ fontSize: '0.9rem', color: '#DDDDDD' }}>
          64 Teams • 16 Host Sites • Road to Kansas City
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {['overview', 'hosts', 'brackets', 'results'].map(tab => (
          <div 
            key={tab}
            className={`tab-btn ${ncaaTab === tab ? 'active' : ''}`} 
            onClick={() => setNcaaTab(tab)} 
            style={{ 
              padding: '0.75rem 2rem', 
              background: ncaaTab === tab ? '#E8000D' : 'rgba(255, 255, 255, 0.1)', 
              border: '2px solid', 
              borderColor: ncaaTab === tab ? '#E8000D' : 'rgba(255, 255, 255, 0.2)', 
              borderRadius: '0', 
              fontFamily: '"Bebas Neue", sans-serif', 
              fontSize: '1.1rem', 
              letterSpacing: '0.1em', 
              color: ncaaTab === tab ? '#ffffff' : '#eee', 
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {tab === 'overview' && 'KANSAS PATH'}
            {tab === 'hosts' && '16 HOST SITES'}
            {tab === 'brackets' && 'REGIONALS'}
            {tab === 'results' && '🏆 RESULTS'}
          </div>
        ))}
      </div>

      {/* TAB 1: KANSAS PATH */}
      {ncaaTab === 'overview' && (
        <div>
          {/* Kansas Sweet 16 Celebration */}
          <div style={{ background: 'linear-gradient(135deg, #0051BA 0%, #001A57 100%)', padding: '2rem', borderRadius: '12px', border: '4px solid #E8000D', marginBottom: '2rem', boxShadow: '0 0 30px rgba(232, 0, 13, 0.5)' }}>
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.5rem', color: '#FFD93D', marginBottom: '1rem', letterSpacing: '0.05em', textAlign: 'center' }}>
              🏐 KANSAS SWEET 16! 🏐
            </div>
            <div style={{ fontSize: '1.2rem', color: '#FFFFFF', textAlign: 'center', marginBottom: '2rem', lineHeight: '1.6' }}>
              Defeated #5 Miami 3-1 (25-17, 25-22, 22-25, 27-25)<br/>
              <span style={{ color: '#85C1E9', fontSize: '0.95rem', fontStyle: 'italic' }}>4th Sweet 16 in program history • First since 2021</span>
            </div>

            {/* Top Performers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(232, 0, 13, 0.3)', padding: '1rem', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#DDDDDD', marginBottom: '0.25rem' }}>Rhian Swanson</div>
                <div style={{ fontSize: '1.5rem', color: '#FFD93D', fontFamily: '"Bebas Neue", sans-serif' }}>15 KILLS</div>
              </div>
              <div style={{ background: 'rgba(0, 81, 186, 0.3)', padding: '1rem', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#DDDDDD', marginBottom: '0.25rem' }}>Katie Dalton</div>
                <div style={{ fontSize: '1.3rem', color: '#FFD93D', fontFamily: '"Bebas Neue", sans-serif' }}>39 AST, 7 BLK</div>
              </div>
              <div style={{ background: 'rgba(232, 0, 13, 0.3)', padding: '1rem', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#DDDDDD', marginBottom: '0.25rem' }}>Selena Leban</div>
                <div style={{ fontSize: '1.3rem', color: '#FFD93D', fontFamily: '"Bebas Neue", sans-serif' }}>10 K, 11 DIG</div>
              </div>
            </div>

            {/* Next Game */}
            <div style={{ background: 'linear-gradient(135deg, #E8000D 0%, #0051BA 100%)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
              <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', color: '#FFD93D', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                SEASON ENDED - SWEET 16
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', fontSize: '0.95rem', color: '#FFFFFF' }}>
                <div><strong style={{ color: '#FFD93D' }}>Final Game:</strong> vs #1 Nebraska</div>
                <div><strong style={{ color: '#FFD93D' }}>Result:</strong> L 0-3</div>
                <div><strong style={{ color: '#FFD93D' }}>Location:</strong> Lincoln, NE</div>
                <div><strong style={{ color: '#FFD93D' }}>Round:</strong> Sweet 16</div>
              </div>

            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 217, 61, 0.1)', border: '2px solid rgba(255, 217, 61, 0.3)', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.85rem', color: '#FFD93D', fontWeight: '700', marginBottom: '0.5rem' }}>
                🏐 TOURNAMENT POD INFORMATION
              </div>
              <div style={{ fontSize: '0.8rem', color: '#DDDDDD', lineHeight: '1.6' }}>
                Kansas competed in the <strong style={{ color: '#4ECDC4' }}>Lincoln (Nebraska) Pod</strong> for the first two rounds.
                The Sweet 16 matchup pits #8 Kansas against #1 seed Nebraska at Nebraska's home court in Lincoln.
                See the <strong>16 Host Sites</strong> tab for complete pod assignments.
              </div>
            </div>
            </div>

            {/* Path to Championship */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1.5rem', borderRadius: '8px' }}>
              <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', color: '#FFD93D', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                PATH TO CHAMPIONSHIP
              </h4>
              {[
                {r: 'R1', opp: 'High Point', res: 'W 3-0', done: true, loc: 'Lawrence'},
                {r: 'R2', opp: 'Miami', res: 'W 3-1', done: true, loc: 'Lawrence'},
                {r: 'S16', opp: 'Nebraska', res: 'L 0-3', done: true, loc: 'Lincoln'},
                {r: 'E8', opp: '---', res: 'DNQ', done: false, loc: '---'},
                {r: 'F4', opp: '---', res: 'DNQ', done: false, loc: '---'},
                {r: 'Final', opp: '---', res: 'DNQ', done: false, loc: '---'}
              ].map((g, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.75rem', background: g.done ? 'rgba(0, 81, 186, 0.2)' : 'rgba(255, 255, 255, 0.05)', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid', borderColor: g.done ? '#0051BA' : 'rgba(255, 255, 255, 0.2)' }}>
                  <div style={{ fontSize: '1.5rem' }}>{g.done ? '✅' : '⏳'}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', color: '#FFFFFF' }}>{g.r}: vs {g.opp}</div>
                    <div style={{ fontSize: '0.85rem', color: '#85C1E9' }}>📍 {g.loc}</div>
                  </div>
                  <div style={{ fontSize: '1.2rem', fontFamily: '"Bebas Neue", sans-serif', color: g.done ? '#FFD93D' : '#888', minWidth: '60px', textAlign: 'right' }}>{g.res}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tournament Schedule */}
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', color: '#FFD93D', marginBottom: '1rem' }}>
              TOURNAMENT SCHEDULE
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {[
                {round: 'First Round', dates: 'Dec 4-5, 2025', status: 'Complete ✅'},
                {round: 'Second Round', dates: 'Dec 6-7, 2025', status: 'Complete ✅'},
                {round: 'Sweet 16', dates: 'Dec 11-13, 2025', status: 'Upcoming'},
                {round: 'Elite 8', dates: 'Dec 13-14, 2025', status: 'Upcoming'},
                {round: 'Final Four', dates: 'Dec 18, 2025 (ESPN)', status: 'KC'},
                {round: 'Championship', dates: 'Dec 21, 3:30pm (ABC)', status: 'KC'}
              ].map((r, i) => (
                <div key={i} style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '6px' }}>
                  <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                    {r.round}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#85C1E9', marginBottom: '0.25rem' }}>{r.dates}</div>
                  <div style={{ fontSize: '0.85rem', color: '#FFD93D', fontWeight: '700' }}>{r.status}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Four Venue */}
          <div style={{ background: 'linear-gradient(135deg, #E8000D, #0051BA)', padding: '2rem', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏆</div>
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: '#FFF', marginBottom: '1rem' }}>FINAL FOUR</div>
            <div style={{ fontSize: '1.1rem', color: '#FFD93D', marginBottom: '0.5rem' }}>T-Mobile Center, Kansas City, MO</div>
            <div style={{ fontSize: '0.95rem', color: '#FFF' }}>Just 45 miles from Lawrence!</div>
          </div>
        </div>
      )}

      {/* TAB 2: HOST SITES */}
      {ncaaTab === 'hosts' && (
        <div>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: '#FFD93D', marginBottom: '0.5rem' }}>
              16 TOURNAMENT HOST SITES
            </h3>
            <p style={{ color: '#DDDDDD', fontSize: '0.95rem' }}>First & Second Round Venues (Dec 4-7, 2025)</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              {seed: 1, team: 'Pittsburgh', location: 'Pittsburgh, PA', venue: 'Petersen Events Center', cap: '12,508'},
              {seed: 2, team: 'Nebraska', location: 'Lincoln, NE', venue: 'Bob Devaney Sports Center', cap: '8,309', regional: true},
              {seed: 3, team: 'Penn State', location: 'University Park, PA', venue: 'Rec Hall', cap: '6,846'},
              {seed: 4, team: 'Wisconsin', location: 'Madison, WI', venue: 'UW Field House', cap: '7,700'},
              {seed: 5, team: 'Creighton', location: 'Omaha, NE', venue: 'D.J. Sokol Arena', cap: '2,350'},
              {seed: 6, team: 'Stanford', location: 'Stanford, CA', venue: 'Maples Pavilion', cap: '7,329'},
              {seed: 7, team: 'Kentucky', location: 'Lexington, KY', venue: 'Memorial Coliseum', cap: '8,500'},
              {seed: 8, team: 'Kansas', location: 'Lawrence, KS', venue: 'Horejsi Family Volleyball Arena', cap: '1,300', ku: true},
              {seed: 9, team: 'Minnesota', location: 'Minneapolis, MN', venue: 'Maturi Pavilion', cap: '3,596'},
              {seed: 10, team: 'Purdue', location: 'West Lafayette, IN', venue: 'Holloway Gymnasium', cap: '2,500'},
              {seed: 11, team: 'Marquette', location: 'Milwaukee, WI', venue: 'Al McGuire Center', cap: '2,783'},
              {seed: 12, team: 'Arizona State', location: 'Tempe, AZ', venue: 'Desert Financial Arena', cap: '14,198'},
              {seed: 13, team: 'Florida', location: 'Gainesville, FL', venue: 'Exactech Arena', cap: '10,133'},
              {seed: 14, team: 'Tennessee', location: 'Knoxville, TN', venue: 'Thompson-Boling Arena', cap: '21,678'},
              {seed: 15, team: 'Missouri', location: 'Columbia, MO', venue: 'Hearnes Center', cap: '13,611'},
              {seed: 16, team: 'SMU', location: 'Dallas, TX', venue: 'Moody Coliseum', cap: '8,998'}
            ].map((site, i) => (
              <div key={i} style={{ 
                background: site.ku ? 'linear-gradient(135deg, rgba(0, 81, 186, 0.3), rgba(232, 0, 13, 0.3))' : site.regional ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.2))' : 'rgba(255, 255, 255, 0.05)', 
                padding: '1.5rem', 
                borderRadius: '8px', 
                border: site.ku ? '3px solid #E8000D' : site.regional ? '2px solid #FFD700' : '2px solid rgba(255, 255, 255, 0.2)',
                boxShadow: site.ku ? '0 0 20px rgba(232, 0, 13, 0.4)' : 'none',
                position: 'relative'
              }}>
                {site.ku && (
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#E8000D', color: '#FFF', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700' }}>
                    ROCK CHALK!
                  </div>
                )}
                {site.regional && (
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#FFD700', color: '#000', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700' }}>
                    REGIONAL HOST
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    background: site.ku ? '#0051BA' : site.regional ? '#FFD700' : '#4ECDC4', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontFamily: '"Bebas Neue", sans-serif', 
                    fontSize: '1.5rem', 
                    color: site.regional ? '#000' : '#FFF',
                    fontWeight: '700',
                    border: site.ku ? '3px solid #E8000D' : 'none'
                  }}>
                    #{site.seed}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', color: site.ku ? '#FFD93D' : '#FFFFFF', lineHeight: '1.2' }}>
                      {site.team}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#85C1E9' }}>
                      📍 {site.location}
                    </div>
                  </div>
                </div>
                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.75rem', borderRadius: '4px', marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '0.9rem', color: '#DDDDDD', marginBottom: '0.25rem' }}>
                    <strong style={{ color: '#FFD93D' }}>Venue:</strong> {site.venue}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#AAA' }}>
                    <strong>Capacity:</strong> {site.cap}
                  </div>
                {site.podTeams && (
                  <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 217, 61, 0.2)' }}>
                    <div style={{ fontSize: '0.75rem', color: '#FFD93D', fontWeight: '700', marginBottom: '0.25rem' }}>
                      Pod Teams:
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#DDDDDD', lineHeight: '1.5' }}>
                      {site.podTeams}
                    </div>
                  </div>
                )}
                </div>
                {site.regional && (
                  <div style={{ fontSize: '0.8rem', color: '#FFD700', fontWeight: '700', textAlign: 'center', marginTop: '0.5rem' }}>
                    🏆 Hosts Sweet 16 & Elite 8
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Regional Venues Section */}
          <div style={{ marginTop: '3rem', background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.1))', padding: '2rem', borderRadius: '10px', border: '2px solid #FFD700' }}>
            <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: '#FFD700', marginBottom: '1.5rem', textAlign: 'center' }}>
              🏆 REGIONAL CHAMPIONSHIPS
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌽</div>
                <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', color: '#FFD700', marginBottom: '0.5rem' }}>
                  NEBRASKA REGIONAL
                </div>
                <div style={{ fontSize: '0.9rem', color: '#DDDDDD', marginBottom: '0.25rem' }}>
                  Bob Devaney Sports Center
                </div>
                <div style={{ fontSize: '0.85rem', color: '#85C1E9' }}>Lincoln, NE</div>
                <div style={{ fontSize: '0.85rem', color: '#FFD93D', marginTop: '0.75rem', fontWeight: '700' }}>
                  Sweet 16: Dec 11-13<br/>Elite 8: Dec 13-14
                </div>
                <div style={{ fontSize: '0.8rem', color: '#FFF', marginTop: '0.5rem', fontStyle: 'italic' }}>
                  ⚡ Kansas plays here!
                </div>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏙️</div>
                <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', color: '#DDDDDD', marginBottom: '0.5rem' }}>
                  Other Regionals
                </div>
                <div style={{ fontSize: '0.85rem', color: '#AAA' }}>
                  TBD - To be announced
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BRACKETS - REGIONALS */}
      {ncaaTab === 'brackets' && (
        <div>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: '#FFD93D', marginBottom: '0.5rem' }}>
              REGIONAL CHAMPIONSHIPS
            </h3>
            <p style={{ color: '#DDDDDD', fontSize: '0.95rem' }}>Sweet 16 & Elite 8 - Path to Kansas City</p>
          </div>

          {/* Nebraska Regional - Kansas is here! */}
          <div style={{ background: 'linear-gradient(135deg, rgba(232, 0, 13, 0.2), rgba(0, 81, 186, 0.2))', padding: '2rem', borderRadius: '12px', border: '3px solid #E8000D', marginBottom: '2rem', boxShadow: '0 0 30px rgba(232, 0, 13, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '2rem' }}>🌽</div>
              <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.2rem', color: '#FFD700', letterSpacing: '0.1em' }}>
                NEBRASKA REGIONAL
              </h4>
              <div style={{ fontSize: '2rem' }}>🌽</div>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '0.25rem' }}>Bob Devaney Sports Center, Lincoln, NE</div>
              <div style={{ fontSize: '0.9rem', color: '#85C1E9' }}>December 11-14, 2025</div>
            </div>

            {/* Sweet 16 Matchups */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', color: '#FFD93D', marginBottom: '1rem', textAlign: 'center' }}>
                SWEET 16 MATCHES
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {[
                  {match: 1, t1: '#8 Kansas', t2: '#1 Nebraska', date: 'Dec 11-14', highlight: true, location: 'Lincoln, NE (Nebraska home court)'},
                  {match: 2, t1: 'TBD Regional #1', t2: 'TBD Regional #2', date: 'Dec 11-14', highlight: false, location: 'Various Regional Sites'}
                ].map((m, i) => (
                  <div key={i} style={{ background: m.highlight ? 'linear-gradient(135deg, #0051BA, #E8000D)' : 'rgba(0, 0, 0, 0.4)', padding: '1.5rem', borderRadius: '8px', border: m.highlight ? '2px solid #FFD93D' : '2px solid rgba(255, 255, 255, 0.2)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.85rem', color: '#FFD93D', fontWeight: '700', marginBottom: '0.5rem' }}>
                        SWEET 16 - MATCH {m.match}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#DDDDDD' }}>{m.date}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.75rem', borderRadius: '4px', textAlign: 'center' }}>
                        <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', color: m.highlight && m.t1.includes('Kansas') ? '#FFD93D' : '#FFFFFF' }}>
                          {m.t1}
                        </div>
                      </div>
                      <div style={{ textAlign: 'center', fontSize: '1.2rem', color: '#FFD93D', fontWeight: '700' }}>VS</div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.75rem', borderRadius: '4px', textAlign: 'center' }}>
                        <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', color: '#FFFFFF' }}>
                          {m.t2}
                        </div>
                      </div>
                    </div>
                    {m.highlight && (
                      <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#FFD93D', fontWeight: '700' }}>
                        🏐 JAYHAWKS GAME!
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Elite 8 */}
            <div style={{ background: 'rgba(255, 215, 0, 0.1)', padding: '1.5rem', borderRadius: '8px', border: '2px solid #FFD700' }}>
              <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', color: '#FFD700', marginBottom: '1rem', textAlign: 'center' }}>
                ELITE EIGHT
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                  Winner of Kansas/Nebraska vs Winner of KSU/Nebraska
                </div>
                <div style={{ fontSize: '0.9rem', color: '#85C1E9', marginBottom: '0.25rem' }}>December 13-14, 2025</div>
                <div style={{ fontSize: '0.85rem', color: '#FFD93D', fontWeight: '700' }}>🏆 Winner advances to Final Four in Kansas City</div>
              </div>
            </div>
          </div>

          {/* Tournament Path Visualization */}
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2rem', borderRadius: '10px', marginBottom: '2rem' }}>
            <h4 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: '#FFD93D', marginBottom: '1.5rem', textAlign: 'center' }}>
              TOURNAMENT STRUCTURE
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {
                  [
                    {matchup: 'Creighton Bluejays vs Texas Longhorns', site: 'University Park, Pennsylvania', status: 'Completed', ku: false, winner: 'Creighton Bluejays'},
                    {matchup: 'Penn State Nittany Lions vs Marquette Golden Eagles', site: 'University Park, Pennsylvania', status: 'Completed', ku: false, winner: 'Penn State Nittany Lions'},
                    {matchup: 'Wisconsin Badgers vs Texas A&M Aggies', site: 'Lincoln, Nebraska', status: 'Completed', ku: false, winner: 'Wisconsin Badgers'},
                    {matchup: 'Nebraska Cornhuskers vs Dayton Flyers', site: 'Lincoln, Nebraska', status: 'Completed', ku: false, winner: 'Nebraska Cornhuskers'},
                    {matchup: 'Pittsburgh Panthers vs Kentucky Wildcats', site: 'Pittsburgh, Pennsylvania', status: 'Completed', ku: false, winner: 'Pittsburgh Panthers'},
                    {matchup: 'Louisville Cardinals vs Stanford Cardinal', site: 'Louisville, Kentucky', status: 'Completed', ku: false, winner: 'Louisville Cardinals'}
                  ].map((game, i) => (
                    <div key={i} style={{ 
                      background: game.ku ? 'rgba(0, 81, 186, 0.2)' : 'rgba(255, 255, 255, 0.05)', 
                      border: game.ku ? '2px solid #0051BA' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px', 
                      padding: '1rem' 
                    }}>
                      <div style={{ fontSize: '0.75rem', color: '#FFD93D', marginBottom: '0.5rem' }}>{game.site}</div>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: game.ku ? '#0051BA' : '#eee' }}>
                        {game.ku && '🎯 '}{game.winner} def. {game.loser}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#888' }}>{game.score}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Second Round Results */}
              <div style={{ marginBottom: '2rem', background: 'rgba(255, 107, 53, 0.1)', border: '2px solid rgba(255, 107, 53, 0.3)', borderRadius: '8px', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: '#FF6B35', marginBottom: '1rem' }}>
                  SECOND ROUND (Dec 6-7, 2024)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                  {
                  [
                    {site: '', winner: 'Pacific Tigers', loser: 'Weber State Wildcats', score: '3-2', ku: false},
                    {site: '', winner: 'Northern Colorado Bears', loser: 'App State Mountaineers', score: '3-1', ku: false},
                    {site: 'Pittsburgh, Pennsylvania', winner: 'Oklahoma Sooners', loser: 'UTEP Miners', score: '3-2', ku: false},
                    {site: 'Louisville, Kentucky', winner: 'Northern Iowa Panthers', loser: 'Illinois Fighting Illini', score: '3-1', ku: false},
                    {site: 'Lawrence, Kansas', winner: 'Florida Gators', loser: 'NC State Wolfpack', score: '3-0', ku: false},
                    {site: 'University Park, Pennsylvania', winner: 'North Carolina Tar Heels', loser: 'Yale Bulldogs', score: '3-1', ku: false},
                    {site: 'Lincoln, Nebraska', winner: 'Miami Hurricanes', loser: 'South Dakota State Jackrabbits', score: '3-0', ku: false},
                    {site: 'West Lafayette, Indiana', winner: 'Purdue Boilermakers', loser: 'Loyola Chicago Ramblers', score: '3-0', ku: false},
                    {site: '', winner: 'UConn Huskies', loser: 'East Carolina Pirates', score: '3-1', ku: false},
                    {site: '', winner: 'Georgia Southern Eagles', loser: 'Southeast Missouri State Redhawks', score: '3-0', ku: false},
                    {site: 'Tempe, Arizona', winner: 'Texas A&M Aggies', loser: 'Colorado State Rams', score: '3-1', ku: false},
                    {site: 'Pittsburgh, Pennsylvania', winner: 'Pittsburgh Panthers', loser: 'Morehead State Eagles', score: '3-0', ku: false},
                    {site: 'Louisville, Kentucky', winner: 'Louisville Cardinals', loser: 'Chicago State Cougars', score: '3-0', ku: false},
                    {site: 'Lexington, Kentucky', winner: 'Kentucky Wildcats', loser: 'Minnesota Golden Gophers', score: '3-1', ku: false},
                    {site: 'Lawrence, Kansas', winner: 'Kansas Jayhawks', loser: 'Colgate Raiders', score: '3-0', ku: true},
                    {site: 'Stanford, California', winner: 'Loyola Marymount Lions', loser: 'Washington Huskies', score: '3-2', ku: false},
                    {site: 'University Park, Pennsylvania', winner: 'Penn State Nittany Lions', loser: 'Delaware State Hornets', score: '3-0', ku: false},
                    {site: 'Austin, Texas', winner: 'Texas Longhorns', loser: 'USC Trojans', score: '3-0', ku: false},
                    {site: 'Lincoln, Nebraska', winner: 'Nebraska Cornhuskers', loser: 'Florida A&M Rattlers', score: '3-0', ku: false},
                    {site: 'Dallas, Texas', winner: 'Missouri Tigers', loser: 'SMU Mustangs', score: '3-1', ku: false},
                    {site: 'Omaha, Nebraska', winner: 'Creighton Bluejays', loser: 'Ole Miss Rebels', score: '3-0', ku: false},
                    {site: 'Madison, Wisconsin', winner: 'Wisconsin Badgers', loser: 'Georgia Tech Yellow Jackets', score: '3-1', ku: false},
                    {site: 'Waco, Texas', winner: 'Dayton Flyers', loser: 'Baylor Bears', score: '3-2', ku: false},
                    {site: 'Eugene, Oregon', winner: 'Oregon Ducks', loser: 'TCU Horned Frogs', score: '3-1', ku: false},
                    {site: 'Salt Lake City, Utah', winner: 'Marquette Golden Eagles', loser: 'Utah Utes', score: '3-2', ku: false},
                    {site: 'Tempe, Arizona', winner: 'Arizona State Sun Devils', loser: 'New Hampshire Wildcats', score: '3-0', ku: false},
                    {site: 'Stanford, California', winner: 'Stanford Cardinal', loser: 'Sacramento State Hornets', score: '3-0', ku: false},
                    {site: 'Louisville, Kentucky', winner: 'Louisville Cardinals', loser: 'Northern Iowa Panthers', score: '3-2', ku: false},
                    {site: '', winner: 'St. John\'s Red Storm', loser: 'North Carolina A&T Aggies', score: '3-0', ku: false},
                    {site: 'University Park, Pennsylvania', winner: 'Penn State Nittany Lions', loser: 'North Carolina Tar Heels', score: '3-1', ku: false},
                    {site: 'Pittsburgh, Pennsylvania', winner: 'Pittsburgh Panthers', loser: 'Oklahoma Sooners', score: '3-0', ku: false},
                    {site: 'Lawrence, Kansas', winner: 'Florida Gators', loser: 'Kansas Jayhawks', score: '3-2', ku: true},
                    {site: 'Tempe, Arizona', winner: 'Texas A&M Aggies', loser: 'Arizona State Sun Devils', score: '3-1', ku: false},
                    {site: 'Lincoln, Nebraska', winner: 'Nebraska Cornhuskers', loser: 'Miami Hurricanes', score: '3-0', ku: false},
                    {site: 'Stanford, California', winner: 'Stanford Cardinal', loser: 'Loyola Marymount Lions', score: '3-0', ku: false}
                  ].map((game, i) => (
                    <div key={i} style={{ 
                      background: game.ku ? 'rgba(0, 81, 186, 0.2)' : 'rgba(255, 255, 255, 0.05)', 
                      border: game.ku ? '2px solid #0051BA' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px', 
                      padding: '1rem' 
                    }}>
                      <div style={{ fontSize: '0.75rem', color: '#FFD93D', marginBottom: '0.5rem' }}>{game.site}</div>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: game.ku ? '#0051BA' : '#eee' }}>
                        {game.ku && '🎯 '}{game.winner} def. {game.loser}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#888' }}>{game.score}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sweet 16 */}
              <div style={{ marginBottom: '2rem', background: 'rgba(255, 217, 61, 0.1)', border: '2px solid rgba(255, 217, 61, 0.3)', borderRadius: '8px', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: '#FFD93D', marginBottom: '1rem' }}>
                  SWEET 16 (Dec 11-14, 2024)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                  {
                  [
                    {regional: 'Nebraska', team1: 'Nebraska Cornhuskers', team2: 'Dayton Flyers', site: 'Lincoln, NE', status: 'Completed', ku: false, winner: 'Nebraska Cornhuskers'},
                    {regional: 'Louisville', team1: 'Louisville Cardinals', team2: 'Stanford Cardinal', site: 'Louisville, KY', status: 'Completed', ku: false, winner: 'Louisville Cardinals'},
                    {regional: 'Pittsburgh', team1: 'Pittsburgh Panthers', team2: 'Kentucky Wildcats', site: 'Pittsburgh, PA', status: 'Completed', ku: false, winner: 'Pittsburgh Panthers'},
                    {regional: 'Stanford', team1: 'TBD', team2: '#4 Stanford', site: 'Palo Alto, CA', status: 'TBD', ku: false, winner: null}
                  ].map((game, i) => (
                    <div key={i} style={{ 
                      background: game.ku ? 'rgba(0, 81, 186, 0.2)' : 'rgba(255, 255, 255, 0.05)', 
                      border: game.ku ? '3px solid #E8000D' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px', 
                      padding: '1rem' 
                    }}>
                      <div style={{ fontSize: '0.75rem', color: '#FFD93D', marginBottom: '0.5rem', fontWeight: '700' }}>
                        {game.regional} Regional
                      </div>
                      {game.winner ? (
                        <div>
                          <div style={{ fontSize: '1rem', fontWeight: '700', color: game.ku ? '#E8000D' : '#4ECDC4' }}>
                            {game.ku && '🎯 '}✅ {game.winner} advances
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#888' }}>def. {game.winner === game.team1 ? game.team2 : game.team1}</div>
                        </div>
                      ) : (
                        <div style={{ fontSize: '1rem', fontWeight: '700', color: game.ku ? '#E8000D' : '#eee' }}>
                          {game.ku && '🏐 '}{game.team1} vs {game.team2}
                        </div>
                      )}
                      <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>📍 {game.site}</div>
                      <div style={{ fontSize: '0.75rem', color: game.status === 'Completed' ? '#4ECDC4' : game.status === 'Upcoming' ? '#FFD93D' : '#666', marginTop: '0.25rem' }}>
                        {game.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Elite 8 */}
              <div style={{ marginBottom: '2rem', background: 'rgba(232, 0, 13, 0.1)', border: '2px solid rgba(232, 0, 13, 0.3)', borderRadius: '8px', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: '#E8000D', marginBottom: '1rem' }}>
                  ELITE 8 (Dec 13-14, 2024)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem' }}>
                  {[
                    {matchup: 'Nebraska Regional Winner vs Louisville Regional Winner', site: 'Higher Seed Site', status: 'TBD', ku: false, winner: null},
                    {matchup: 'Pittsburgh Regional Winner vs Stanford Regional Winner', site: 'Higher Seed Site', status: 'TBD', ku: false, winner: null},
                  ].map((game, i) => (
                    <div key={i} style={{ 
                      background: game.ku ? 'rgba(0, 81, 186, 0.2)' : 'rgba(255, 255, 255, 0.05)', 
                      border: game.ku ? '3px solid #0051BA' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px', 
                      padding: '1rem' 
                    }}>
                      <div style={{ fontSize: '0.75rem', color: '#E8000D', marginBottom: '0.5rem', fontWeight: '700' }}>
                        Elite 8 - Game {i + 1}
                      </div>
                      {game.winner ? (
                        <div>
                          <div style={{ fontSize: '1rem', fontWeight: '700', color: game.ku ? '#0051BA' : '#4ECDC4' }}>
                            {game.ku && '🎯 '}✅ {game.winner} advances to Final Four
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.25rem' }}>{game.matchup}</div>
                        </div>
                      ) : (
                        <div style={{ fontSize: '1rem', fontWeight: '700', color: game.ku ? '#0051BA' : '#eee' }}>
                          {game.ku && '🏐 '}{game.matchup}
                        </div>
                      )}
                      <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>📍 {game.site}</div>
                      <div style={{ fontSize: '0.75rem', color: game.status === 'Completed' ? '#4ECDC4' : game.status === 'Upcoming' ? '#FFD93D' : '#666', marginTop: '0.25rem' }}>
                        {game.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Four & Championship */}
              <div style={{ marginBottom: '2rem', background: 'rgba(133, 193, 233, 0.1)', border: '2px solid rgba(133, 193, 233, 0.3)', borderRadius: '8px', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: '#85C1E9', marginBottom: '1rem' }}>
                  FINAL FOUR (Dec 18, 2024) & CHAMPIONSHIP (Dec 21, 2024)
                </h3>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '1.2rem', color: '#FFD93D', fontWeight: '700', marginBottom: '1rem' }}>
                    🏆 T-Mobile Center, Kansas City, MO
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#888' }}>
                    45 miles from Lawrence, Kansas • Championship on ABC at 3:30pm CT
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '1rem' }}>
                    Winners from Elite 8 advance to Final Four
                  </div>
                </div>
              </div>

              <div style={{ padding: '1rem', background: 'rgba(255, 217, 61, 0.1)', border: '2px solid rgba(255, 217, 61, 0.3)', borderRadius: '4px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: '#FFD93D', fontWeight: '700' }}>
                  🔄 RESULTS UPDATE AUTOMATICALLY
                </div>
                <div style={{ fontSize: '0.8rem', color: '#DDDDDD', marginTop: '0.5rem' }}>
                  Run the Python updater script to fetch latest scores from ESPN and update this page!
                </div>
              </div>
            </div>
          )}

      {/* TAB 4: RESULTS */}
      {ncaaTab === 'results' && (
        <div>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: '#FFD93D', marginBottom: '0.5rem' }}>
              TOURNAMENT RESULTS
            </h3>
            <p style={{ color: '#DDDDDD', fontSize: '0.95rem' }}>Complete scores from all rounds</p>
          </div>

          <div>
              {/* First Round Results */}
              <div style={{ marginBottom: '2rem', background: 'rgba(0, 81, 186, 0.1)', border: '2px solid rgba(0, 81, 186, 0.3)', borderRadius: '8px', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: '#0051BA', marginBottom: '1rem' }}>
                  FIRST ROUND (Dec 4-5, 2024)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                  {[
                    {site: 'Lawrence, KS', winner: 'Kansas Jayhawks', loser: 'Colgate Raiders', score: '3-0', ku: true},
                    {site: 'Lincoln, NE', winner: 'Nebraska Cornhuskers', loser: 'Florida A&M Rattlers', score: '3-0', ku: false},
                    {site: 'Louisville, KY', winner: 'Louisville Cardinals', loser: 'Morehead State Eagles', score: '3-0', ku: false},
                    {site: 'Pittsburgh, PA', winner: 'Pittsburgh Panthers', loser: 'Cleveland State Vikings', score: '3-0', ku: false},
                    {site: 'Palo Alto, CA', winner: 'Stanford Cardinal', loser: 'Cal State Fullerton Titans', score: '3-0', ku: false},
                  ].map((game, i) => (
                    <div key={i} style={{ 
                      background: game.ku ? 'rgba(0, 81, 186, 0.2)' : 'rgba(255, 255, 255, 0.05)', 
                      border: game.ku ? '3px solid #E8000D' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px', 
                      padding: '1rem' 
                    }}>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: game.ku ? '#E8000D' : '#4ECDC4', marginBottom: '0.5rem' }}>
                        {game.ku && '🎯 '}✅ {game.winner}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.25rem' }}>def. {game.loser}</div>
                      <div style={{ fontSize: '0.9rem', color: '#FFD93D', fontWeight: '700' }}>{game.score}</div>
                      <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>📍 {game.site}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Second Round Results */}
              <div style={{ marginBottom: '2rem', background: 'rgba(78, 205, 196, 0.1)', border: '2px solid rgba(78, 205, 196, 0.3)', borderRadius: '8px', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: '#4ECDC4', marginBottom: '1rem' }}>
                  SECOND ROUND (Dec 6-7, 2024)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                  {[
                    {site: 'Lawrence, KS', winner: 'Kansas Jayhawks', loser: 'Miami Hurricanes', score: '3-1', ku: true},
                    {site: 'Lincoln, NE', winner: 'Nebraska Cornhuskers', loser: 'Texas A&M Aggies', score: '3-0', ku: false},
                    {site: 'Louisville, KY', winner: 'Louisville Cardinals', loser: 'Western Kentucky Hilltoppers', score: '3-0', ku: false},
                    {site: 'Pittsburgh, PA', winner: 'Pittsburgh Panthers', loser: 'Oregon Ducks', score: '3-1', ku: false},
                    {site: 'Palo Alto, CA', winner: 'Stanford Cardinal', loser: 'Minnesota Golden Gophers', score: '3-0', ku: false},
                  ].map((game, i) => (
                    <div key={i} style={{ 
                      background: game.ku ? 'rgba(0, 81, 186, 0.2)' : 'rgba(255, 255, 255, 0.05)', 
                      border: game.ku ? '3px solid #E8000D' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px', 
                      padding: '1rem' 
                    }}>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: game.ku ? '#E8000D' : '#4ECDC4', marginBottom: '0.5rem' }}>
                        {game.ku && '🎯 '}✅ {game.winner}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.25rem' }}>def. {game.loser}</div>
                      <div style={{ fontSize: '0.9rem', color: '#FFD93D', fontWeight: '700' }}>{game.score}</div>
                      <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.5rem' }}>📍 {game.site}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sweet 16 */}
              <div style={{ marginBottom: '2rem', background: 'rgba(255, 217, 61, 0.1)', border: '2px solid rgba(255, 217, 61, 0.3)', borderRadius: '8px', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: '#FFD93D', marginBottom: '1rem' }}>
                  SWEET 16 (Dec 11-14, 2024)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                  {[
                    {regional: 'Nebraska', team1: '#8 Kansas', team2: '#1 Nebraska', site: 'Lincoln, NE', status: 'Completed', ku: true, winner: 'Nebraska', score: '3-0'},
                    {regional: 'Louisville', team1: '#5 Dayton', team2: '#2 Louisville', site: 'Louisville, KY', status: 'Upcoming', ku: false, winner: null},
                    {regional: 'Pittsburgh', team1: 'TBD', team2: '#3 Pittsburgh', site: 'Pittsburgh, PA', status: 'TBD', ku: false, winner: null},
                    {regional: 'Stanford', team1: 'TBD', team2: '#4 Stanford', site: 'Palo Alto, CA', status: 'TBD', ku: false, winner: null},
                  ].map((game, i) => (
                    <div key={i} style={{ 
                      background: game.ku ? 'rgba(0, 81, 186, 0.2)' : 'rgba(255, 255, 255, 0.05)', 
                      border: game.ku ? '3px solid #E8000D' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px', 
                      padding: '1rem' 
                    }}>
                      <div style={{ fontSize: '0.75rem', color: '#FFD93D', marginBottom: '0.5rem', fontWeight: '700' }}>
                        {game.regional} Regional
                      </div>
                      {game.winner ? (
                        <div>
                          <div style={{ fontSize: '1rem', fontWeight: '700', color: game.ku ? '#E8000D' : '#4ECDC4' }}>
                            {game.ku && '🎯 '}✅ {game.winner} advances
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#888' }}>def. {game.winner === game.team1 ? game.team2 : game.team1}</div>
                        </div>
                      ) : (
                        <div style={{ fontSize: '1rem', fontWeight: '700', color: game.ku ? '#E8000D' : '#eee' }}>
                          {game.ku && '🏐 '}{game.team1} vs {game.team2}
                        </div>
                      )}
                      <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>📍 {game.site}</div>
                      <div style={{ fontSize: '0.75rem', color: game.status === 'Completed' ? '#4ECDC4' : game.status === 'Upcoming' ? '#FFD93D' : '#666', marginTop: '0.25rem' }}>
                        {game.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Elite 8 */}
              <div style={{ marginBottom: '2rem', background: 'rgba(232, 0, 13, 0.1)', border: '2px solid rgba(232, 0, 13, 0.3)', borderRadius: '8px', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: '#E8000D', marginBottom: '1rem' }}>
                  ELITE 8 (Dec 13-14, 2025)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem' }}>
                  {[
                    {team1: 'Texas A&M', team2: 'Nebraska', winner: 'Texas A&M', score: '3-2 (25-23, 22-25, 25-23, 20-25, 15-12)', site: 'Lincoln, NE', ku: false},
                    {team1: 'Wisconsin', team2: 'Texas', winner: 'Wisconsin', score: '3-1 (25-23, 25-21, 22-25, 25-20)', site: 'Austin, TX', ku: false},
                    {team1: 'Stanford', team2: 'Oregon', winner: 'Stanford', score: '3-0 (25-20, 25-18, 25-19)', site: 'Palo Alto, CA', ku: false},
                    {team1: 'Louisville', team2: 'Penn State', winner: 'Louisville', score: '3-1 (25-21, 21-25, 25-23, 25-22)', site: 'Louisville, KY', ku: false},
                  ].map((game, i) => (
                    <div key={i} style={{ 
                      background: game.ku ? 'rgba(0, 81, 186, 0.2)' : 'rgba(255, 255, 255, 0.05)', 
                      border: game.ku ? '3px solid #E8000D' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px', 
                      padding: '1rem' 
                    }}>
                      <div style={{ fontSize: '0.75rem', color: '#E8000D', marginBottom: '0.5rem', fontWeight: '700' }}>
                        Elite 8 - Game {i + 1}
                      </div>
                      {game.winner ? (
                        <div>
                          <div style={{ fontSize: '1rem', fontWeight: '700', color: '#4ECDC4', marginBottom: '0.25rem' }}>
                            ✅ {game.winner} advances to Final Four
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#888' }}>def. {game.winner === game.team1 ? game.team2 : game.team1}</div>
                          <div style={{ fontSize: '0.85rem', color: '#FFD93D', marginTop: '0.25rem' }}>{game.score}</div>
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontSize: '1rem', fontWeight: '700', color: '#eee' }}>
                            {game.team1} vs {game.team2}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>Game TBD</div>
                        </div>
                      )}
                      <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.5rem' }}>📍 {game.site}</div>
                      <div style={{ fontSize: '0.75rem', color: game.winner ? '#4ECDC4' : '#666', marginTop: '0.25rem' }}>
                        {game.winner ? 'Completed' : 'Upcoming'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </div>
      )}

    </div>
  );
}
