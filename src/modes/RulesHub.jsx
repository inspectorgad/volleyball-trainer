// Rules Hub: reference, quiz, referee signals and guided simulator demos.
import React from 'react';
import { rulesData, NEW_2026, rules2026Count } from '../data/rules.js';
import { allQuestions } from '../data/questions.js';
import { refereeSignals } from '../data/refereeSignals.js';
import { demonstrations } from '../data/demonstrations.js';
import { scenarios } from '../data/scenarios.js';
import { Play, Award, AlertCircle, BookOpen, Trophy, CheckCircle, XCircle, TrendingUp, RefreshCw, Eye } from '../components/Icons.jsx';

export default function RulesHub({
  setMainMode,
  setShowAttackZones, setShowBlockingIndicators, setShowSystemConnections,
  setScenarioMode, setShowRotationPreview, setShowDefenseFormation,
  rulesTab, setRulesTab, selectedCategory, setSelectedCategory,
  searchTerm, setSearchTerm,
  currentQuiz, setCurrentQuiz, quizAnswers, showResults,
  studiedRules, quizHistory, selectedDemo, setSelectedDemo,
  categories, filteredRules,
  generateQuiz, handleQuizAnswer, submitQuiz, resetQuiz,
  markRuleStudied, getRecommendations,
}) {
  // The category chips are shared with the rules list, so the signals tab has
  // to understand the 2026 sentinel too — otherwise picking it showed nothing.
  const matchesSignalFilter = (signal) =>
    selectedCategory === 'all' ||
    (selectedCategory === NEW_2026
      ? Boolean(signal.new2026 || signal.changed2026)
      : signal.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div className={`tab-btn ${rulesTab === 'reference' ? 'active' : ''}`} onClick={() => setRulesTab('reference')} style={{ padding: '0.75rem 2rem', background: rulesTab === 'reference' ? '#FF6B35' : 'rgba(255, 255, 255, 0.1)', border: '2px solid', borderColor: rulesTab === 'reference' ? '#FF6B35' : 'rgba(255, 255, 255, 0.2)', borderRadius: '0', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.1em', color: rulesTab === 'reference' ? '#0f0f23' : '#eee' }}>
          <BookOpen size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} /> REFERENCE
        </div>
        <div className={`tab-btn ${rulesTab === 'quiz' ? 'active' : ''}`} onClick={() => setRulesTab('quiz')} style={{ padding: '0.75rem 2rem', background: rulesTab === 'quiz' ? '#FF6B35' : 'rgba(255, 255, 255, 0.1)', border: '2px solid', borderColor: rulesTab === 'quiz' ? '#FF6B35' : 'rgba(255, 255, 255, 0.2)', borderRadius: '0', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.1em', color: rulesTab === 'quiz' ? '#0f0f23' : '#eee' }}>
          <Trophy size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} /> QUIZ
        </div>
        <div className={`tab-btn ${rulesTab === 'demos' ? 'active' : ''}`} onClick={() => setRulesTab('demos')} style={{ padding: '0.75rem 2rem', background: rulesTab === 'demos' ? '#FF6B35' : 'rgba(255, 255, 255, 0.1)', border: '2px solid', borderColor: rulesTab === 'demos' ? '#FF6B35' : 'rgba(255, 255, 255, 0.2)', borderRadius: '0', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.1em', color: rulesTab === 'demos' ? '#0f0f23' : '#eee' }}>
          <Eye size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} /> VISUAL GUIDES
        </div>
        <div className={`tab-btn ${rulesTab === 'signals' ? 'active' : ''}`} onClick={() => setRulesTab('signals')} style={{ padding: '0.75rem 2rem', background: rulesTab === 'signals' ? '#FF6B35' : 'rgba(255, 255, 255, 0.1)', border: '2px solid', borderColor: rulesTab === 'signals' ? '#FF6B35' : 'rgba(255, 255, 255, 0.2)', borderRadius: '0', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.1em', color: rulesTab === 'signals' ? '#0f0f23' : '#eee' }}>
          <AlertCircle size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} /> REF SIGNALS
        </div>
      </div>

      {rulesTab === 'reference' && (
        <>
          <div style={{ marginBottom: '2rem' }}>
            <input type="text" placeholder="Search rules..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 255, 255, 0.2)', borderRadius: '4px', color: '#eee', fontSize: '1rem', fontFamily: 'inherit' }} />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <div key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: '0.5rem 1rem', background: selectedCategory === cat ? (cat === NEW_2026 ? '#FFC92D' : '#4ECDC4') : (cat === NEW_2026 ? 'rgba(255, 201, 45, 0.12)' : 'rgba(255, 255, 255, 0.1)'), border: '2px solid', borderColor: selectedCategory === cat ? (cat === NEW_2026 ? '#FFC92D' : '#4ECDC4') : (cat === NEW_2026 ? 'rgba(255, 201, 45, 0.5)' : 'rgba(255, 255, 255, 0.2)'), borderRadius: '20px', fontSize: '0.85rem', cursor: 'pointer', color: selectedCategory === cat ? '#0f0f23' : (cat === NEW_2026 ? '#FFD866' : '#eee'), fontWeight: selectedCategory === cat || cat === NEW_2026 ? '700' : '400' }}>
                {cat.toUpperCase()}{cat === NEW_2026 ? ` · ${rules2026Count}` : ''}
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(78, 205, 196, 0.1)', border: '2px solid rgba(78, 205, 196, 0.3)', borderRadius: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <TrendingUp size={24} color="#4ECDC4" />
              <div>
                <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', color: '#5FFAEE' }}>PROGRESS TRACKER</div>
                <div style={{ fontSize: '0.85rem', color: '#e0e0e0' }}>Studied: {studiedRules.size} / {rulesData.length} rules ({Math.round((studiedRules.size / rulesData.length) * 100)}%)</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {filteredRules.map(rule => (
              <div key={rule.id} className="rule-card" onClick={() => markRuleStudied(rule.id)} style={{ background: rule.new2026 || rule.changed2026 ? 'rgba(255, 201, 45, 0.07)' : 'rgba(255, 255, 255, 0.05)', border: '2px solid', borderColor: rule.new2026 || rule.changed2026 ? 'rgba(255, 201, 45, 0.45)' : 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '1.5rem', position: 'relative' }}>
                {studiedRules.has(rule.id) && <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}><CheckCircle size={24} color="#95E1D3" /></div>}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(255, 140, 90, 0.25)', border: '1px solid rgba(255, 140, 90, 0.6)', borderRadius: '12px', fontSize: '0.75rem', color: '#FF8C5A', fontWeight: '700' }}>{rule.category}</span>
                  {(rule.new2026 || rule.changed2026) && (
                    <span style={{ display: 'inline-block', padding: '0.25rem 0.6rem', background: '#FFC92D', borderRadius: '3px', fontSize: '0.7rem', color: '#3B2A00', fontWeight: '700', letterSpacing: '0.08em' }}>
                      {rule.new2026 ? 'NEW 2026' : 'REVISED 2026'}
                    </span>
                  )}
                  {rule.experimental && (
                    <span style={{ display: 'inline-block', padding: '0.25rem 0.6rem', background: 'rgba(255, 201, 45, 0.18)', border: '1px solid rgba(255, 201, 45, 0.5)', borderRadius: '3px', fontSize: '0.7rem', color: '#FFD866', fontWeight: '700', letterSpacing: '0.08em' }}>EXPERIMENTAL</span>
                  )}
                </div>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', color: '#5FE0D8', margin: '0.5rem 0', letterSpacing: '0.05em' }}>{rule.title}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#e0e0e0', margin: '1rem 0' }}>{rule.content}</p>
                {rule.was && (
                  <p style={{ fontSize: '0.8rem', lineHeight: '1.55', color: '#FFD866', margin: '0 0 1rem', paddingTop: '0.75rem', borderTop: '1px dashed rgba(255, 201, 45, 0.35)' }}>
                    <strong style={{ letterSpacing: '0.06em' }}>BEFORE 2026: </strong>{rule.was}
                  </p>
                )}
                <div style={{ fontSize: '0.75rem', color: '#b0b0b0', fontStyle: 'italic' }}>Difficulty: {rule.difficulty}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {rulesTab === 'quiz' && (
        <>
          {currentQuiz.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(78, 205, 196, 0.1)', border: '2px solid rgba(78, 205, 196, 0.3)', borderRadius: '8px' }}>
              <Trophy size={64} color="#4ECDC4" style={{ marginBottom: '1rem' }} />
              <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2.5rem', color: '#5FFAEE', marginBottom: '1rem' }}>READY TO TEST YOUR KNOWLEDGE?</h2>
              <p style={{ fontSize: '1.1rem', color: '#e0e0e0', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>Each quiz contains 10 random questions from a bank of {allQuestions.length} questions. Every quiz is different!</p>
              {quizHistory.length > 0 && (
                <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
                  <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', color: '#FF9B6B', fontSize: '1.3rem', marginBottom: '0.5rem' }}>YOUR STATS</h3>
                  <div style={{ fontSize: '0.9rem', color: '#e0e0e0' }}>
                    Quizzes Taken: {quizHistory.length}<br />
                    Average Score: {Math.round(quizHistory.reduce((sum, q) => sum + q.score, 0) / quizHistory.length)}%<br />
                    Best Score: {Math.max(...quizHistory.map(q => q.score))}%
                  </div>
                </div>
              )}
              <button onClick={generateQuiz} style={{ padding: '1.5rem 3rem', background: '#4ECDC4', border: '2px solid #4ECDC4', borderRadius: '0', color: '#0f0f23', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', letterSpacing: '0.1em', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                <RefreshCw size={24} /> START NEW QUIZ
              </button>
            </div>
          ) : !showResults ? (
            <>
              <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(255, 107, 53, 0.1)', border: '2px solid rgba(255, 107, 53, 0.3)', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', color: '#FF9B6B', marginBottom: '0.5rem' }}>QUIZ PROGRESS</div>
                    <div style={{ fontSize: '0.9rem', color: '#e0e0e0' }}>Answered: {Object.keys(quizAnswers).length} / {currentQuiz.length} questions</div>
                  </div>
                  <button onClick={() => setCurrentQuiz([])} style={{ padding: '0.5rem 1rem', background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 255, 255, 0.2)', borderRadius: '4px', color: '#eee', fontFamily: '"Bebas Neue", sans-serif', fontSize: '0.9rem', cursor: 'pointer' }}>EXIT QUIZ</button>
                </div>
              </div>

              {currentQuiz.map((question, idx) => (
                <div key={question.id} style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', border: '2px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#4ECDC4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', color: '#0f0f23' }}>{idx + 1}</div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#b0b0b0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{question.type === 'multiple' ? 'Multiple Choice' : question.type === 'truefalse' ? 'True/False' : 'Scenario'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#FF8C5A', fontWeight: '700' }}>{question.category}</div>
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#eee', marginBottom: '1.5rem' }}>{question.question}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {question.options.map((option, optIdx) => (
                      <div key={optIdx} className={`quiz-option ${quizAnswers[question.id] === optIdx ? 'selected' : ''}`} onClick={() => handleQuizAnswer(question.id, optIdx)} style={{ padding: '1rem', background: quizAnswers[question.id] === optIdx ? '#4ECDC4' : 'rgba(255, 255, 255, 0.05)', border: '2px solid', borderColor: quizAnswers[question.id] === optIdx ? '#4ECDC4' : 'rgba(255, 255, 255, 0.2)', borderRadius: '4px', color: quizAnswers[question.id] === optIdx ? '#0f0f23' : '#eee', fontWeight: quizAnswers[question.id] === optIdx ? '700' : '400' }}>{option}</div>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <button onClick={submitQuiz} disabled={Object.keys(quizAnswers).length < currentQuiz.length} style={{ padding: '1rem 3rem', background: Object.keys(quizAnswers).length === currentQuiz.length ? '#4ECDC4' : 'rgba(78, 205, 196, 0.3)', border: '2px solid #4ECDC4', borderRadius: '0', color: '#0f0f23', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.1em', cursor: Object.keys(quizAnswers).length === currentQuiz.length ? 'pointer' : 'not-allowed', opacity: Object.keys(quizAnswers).length === currentQuiz.length ? 1 : 0.5 }}>SUBMIT QUIZ</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '2rem', background: 'rgba(78, 205, 196, 0.1)', border: '2px solid rgba(78, 205, 196, 0.3)', borderRadius: '8px' }}>
                <Award size={64} color="#4ECDC4" style={{ marginBottom: '1rem' }} />
                <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '3rem', color: '#5FFAEE', margin: '0 0 1rem 0', letterSpacing: '0.1em' }}>QUIZ COMPLETE!</h2>
                <div style={{ fontSize: '1.2rem', color: '#eee', marginBottom: '0.5rem' }}>Your Score: {quizHistory[quizHistory.length - 1].correct} / {quizHistory[quizHistory.length - 1].total}</div>
                <div style={{ fontSize: '2rem', fontFamily: '"Bebas Neue", sans-serif', color: '#FF9B6B' }}>{quizHistory[quizHistory.length - 1].score}%</div>
              </div>

              {currentQuiz.map((question, idx) => {
                const userAnswer = quizAnswers[question.id];
                const isCorrect = userAnswer === question.correct;

                return (
                  <div key={question.id} style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', border: '2px solid', borderColor: isCorrect ? 'rgba(149, 225, 211, 0.5)' : 'rgba(243, 129, 129, 0.5)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      {isCorrect ? <CheckCircle size={32} color="#95E1D3" /> : <XCircle size={32} color="#F38181" />}
                      <h3 style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#eee', margin: 0 }}>{question.question}</h3>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      {question.options.map((option, optIdx) => (
                        <div key={optIdx} style={{ padding: '0.75rem', marginBottom: '0.5rem', background: optIdx === question.correct ? '#95E1D3' : userAnswer === optIdx ? '#F38181' : 'rgba(255, 255, 255, 0.05)', border: '2px solid', borderColor: optIdx === question.correct ? '#95E1D3' : userAnswer === optIdx ? '#F38181' : 'rgba(255, 255, 255, 0.2)', borderRadius: '4px', color: optIdx === question.correct || userAnswer === optIdx ? '#0f0f23' : '#eee' }}>
                          {option} {optIdx === question.correct && <span style={{ marginLeft: '0.5rem' }}>✓ Correct</span>} {userAnswer === optIdx && optIdx !== question.correct && <span style={{ marginLeft: '0.5rem' }}>✗ Your answer</span>}
                        </div>
                      ))}
                    </div>
                    <div style={{ padding: '1rem', background: 'rgba(255, 107, 53, 0.1)', border: '1px solid rgba(255, 107, 53, 0.3)', borderRadius: '4px', fontSize: '0.9rem', color: '#e0e0e0', lineHeight: '1.6' }}>
                      <strong style={{ color: '#FF9B6B' }}>Explanation:</strong> {question.explanation}
                    </div>
                  </div>
                );
              })}

              {getRecommendations().length > 0 && (
                <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(255, 107, 53, 0.1)', border: '2px solid rgba(255, 107, 53, 0.3)', borderRadius: '8px' }}>
                  <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', color: '#FF9B6B', marginBottom: '1rem', letterSpacing: '0.05em' }}>RECOMMENDED STUDY TOPICS</h3>
                  <p style={{ fontSize: '0.9rem', color: '#e0e0e0', marginBottom: '1rem' }}>Based on your quiz results, we recommend reviewing these categories:</p>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {getRecommendations().map(cat => (
                      <div key={cat} onClick={() => { setRulesTab('reference'); setSelectedCategory(cat); }} style={{ padding: '0.5rem 1rem', background: '#FF6B35', border: '2px solid #FF6B35', borderRadius: '20px', fontSize: '0.85rem', cursor: 'pointer', color: '#0f0f23', fontWeight: '700' }}>{cat} â†’</div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
                <button onClick={resetQuiz} style={{ padding: '1rem 2rem', background: '#4ECDC4', border: '2px solid #4ECDC4', borderRadius: '0', color: '#0f0f23', fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.1em', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <RefreshCw size={20} /> NEW QUIZ
                </button>
              </div>
            </>
          )}
        </>
      )}

      {rulesTab === 'demos' && (
        <>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: '#4A9EFF', marginBottom: '1rem', letterSpacing: '0.05em' }}>VISUAL RULE GUIDES</h2>
            <p style={{ fontSize: '0.95rem', color: '#e0e0e0', lineHeight: '1.6' }}>Click any guide to launch an interactive demonstration in the Simulator.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {demonstrations.map(demo => (
              <div key={demo.id} onClick={() => setSelectedDemo(demo.id === selectedDemo ? null : demo.id)} style={{ padding: '1.5rem', background: selectedDemo === demo.id ? 'rgba(0, 81, 186, 0.2)' : 'rgba(255, 255, 255, 0.05)', border: '2px solid', borderColor: selectedDemo === demo.id ? '#0051BA' : 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s ease' }} className="rule-card">
                <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(255, 68, 68, 0.25)', border: '1px solid rgba(255, 68, 68, 0.6)', borderRadius: '12px', fontSize: '0.75rem', marginBottom: '0.75rem', color: '#FF4444', fontWeight: '700' }}>{demo.category}</div>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', color: '#4A9EFF', margin: '0.5rem 0', letterSpacing: '0.05em' }}>{demo.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#e0e0e0', lineHeight: '1.6', marginBottom: '0.5rem' }}>{demo.description}</p>
                <div style={{ fontSize: '0.8rem', color: '#4A9EFF', fontFamily: '"Bebas Neue", sans-serif' }}>{selectedDemo === demo.id ? '▼ HIDE DETAILS' : '▶ VIEW DETAILS'}</div>
              </div>
            ))}
          </div>

          {selectedDemo && (
            <div style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(0, 81, 186, 0.1)', border: '2px solid rgba(0, 81, 186, 0.3)', borderRadius: '8px' }}>
              <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: '#4A9EFF', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                {demonstrations.find(d => d.id === selectedDemo)?.title}
              </h3>
              <p style={{ fontSize: '1rem', color: '#e0e0e0', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {demonstrations.find(d => d.id === selectedDemo)?.instructions}
              </p>
              <button
                onClick={() => {
                  const demo = demonstrations.find(d => d.id === selectedDemo);
                  setMainMode('simulator');

                  // Reset all features first
                  setShowAttackZones(false);
                  setShowBlockingIndicators(false);
                  setShowSystemConnections(false);
                  setShowRotationPreview(false);
                  setShowDefenseFormation(false);
                  setScenarioMode(false);

                  // Enable the specific feature for this demo
                  if (demo.simulatorFeature === 'attackZones') {
                    setShowAttackZones(true);
                  } else if (demo.simulatorFeature === 'rotationPreview') {
                    setShowRotationPreview(true);
                  } else if (demo.simulatorFeature === 'blockingRules') {
                    setShowBlockingIndicators(true);
                  } else if (demo.simulatorFeature === 'scenarios') {
                    setScenarioMode(true);
                  }

                  // Scroll to top
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  background: '#E8000D',
                  border: '2px solid #E8000D',
                  borderRadius: '4px',
                  color: '#ffffff',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.2rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  fontWeight: '700'
                }}
              >
                <Play size={20} />
                LAUNCH IN SIMULATOR
              </button>
            </div>
          )}
        </>
      )}

      {rulesTab === 'signals' && (
        <>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: '#4A9EFF', marginBottom: '1rem', letterSpacing: '0.05em' }}>REFEREE SIGNALS REFERENCE</h2>
            <p style={{ fontSize: '0.95rem', color: '#e0e0e0', lineHeight: '1.6' }}>Quick reference guide for common volleyball referee hand signals used in college and international play.</p>
          </div>

          {/* Official Chart Reference */}
          <div style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(232, 0, 13, 0.15) 0%, rgba(0, 81, 186, 0.15) 100%)', border: '3px solid rgba(255, 255, 255, 0.2)', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '3rem' }}>📋</div>
              <div>
                <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: '#FFFFFF', margin: 0, letterSpacing: '0.05em' }}>
                  OFFICIAL REFEREE SIGNALS CHART
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#FFB84D', margin: '0.25rem 0 0 0', fontWeight: '700' }}>
                  NCAA / FIVB CERTIFIED ILLUSTRATIONS
                </p>
              </div>
            </div>
            <p style={{ fontSize: '0.95rem', color: '#f0f0f0', lineHeight: '1.7', marginBottom: '1rem' }}>
              The signals below are based on the official NCAA and FIVB referee hand signals chart. Each signal includes detailed illustrations showing proper referee positioning, hand gestures, and when to use each signal during match play.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏐</div>
                <div style={{ fontSize: '1.5rem', fontFamily: '"Bebas Neue", sans-serif', color: '#70E8FF', marginBottom: '0.25rem' }}>25</div>
                <div style={{ fontSize: '0.8rem', color: '#c0c0c0' }}>Official Signals</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📂</div>
                <div style={{ fontSize: '1.5rem', fontFamily: '"Bebas Neue", sans-serif', color: '#70E8FF', marginBottom: '0.25rem' }}>7</div>
                <div style={{ fontSize: '0.8rem', color: '#c0c0c0' }}>Categories</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✋</div>
                <div style={{ fontSize: '1.5rem', fontFamily: '"Bebas Neue", sans-serif', color: '#70E8FF', marginBottom: '0.25rem' }}>100%</div>
                <div style={{ fontSize: '0.8rem', color: '#c0c0c0' }}>Illustrated</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {['all', 'Service', 'Ball Status', 'Ball Contact', 'Violations', 'Timeouts', 'Substitutions', 'Administrative'].map(cat => (
              <div 
                key={cat} 
                onClick={() => setSelectedCategory(cat)} 
                style={{ 
                  padding: '0.5rem 1rem', 
                  background: selectedCategory === cat ? '#4ECDC4' : 'rgba(255, 255, 255, 0.1)', 
                  border: '2px solid', 
                  borderColor: selectedCategory === cat ? '#4ECDC4' : 'rgba(255, 255, 255, 0.2)', 
                  borderRadius: '20px', 
                  fontSize: '0.85rem', 
                  cursor: 'pointer', 
                  color: selectedCategory === cat ? '#0f0f23' : '#eee', 
                  fontWeight: selectedCategory === cat ? '700' : '400' 
                }}
              >
                {cat.toUpperCase()}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {refereeSignals
              .filter(matchesSignalFilter)
              .map(signal => (
                <div 
                  key={signal.id} 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    border: '2px solid rgba(255, 255, 255, 0.1)', 
                    borderRadius: '8px', 
                    padding: '1.5rem',
                    transition: 'all 0.3s ease'
                  }}
                  className="rule-card"
                >
                  <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(95, 250, 238, 0.25)', border: '1px solid rgba(95, 250, 238, 0.6)', borderRadius: '12px', fontSize: '0.75rem', marginBottom: '0.75rem', color: '#70E8FF', fontWeight: '700' }}>
                    {signal.category}
                  </div>
                  <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.4rem', color: '#70E8FF', margin: '0.5rem 0', letterSpacing: '0.05em' }}>
                    {signal.name}
                  </h3>

                  <div style={{ background: 'rgba(95, 250, 238, 0.1)', border: '2px solid rgba(95, 250, 238, 0.3)', borderRadius: '6px', padding: '1rem', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.7rem', color: '#70E8FF', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700' }}>
                      📋 ILLUSTRATION:
                    </div>
                    <div style={{ fontSize: '0.95rem', color: '#f0f0f0', fontWeight: '600', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                      {signal.illustration}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#70E8FF', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700' }}>
                      ✋ GESTURE:
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#e0e0e0', fontStyle: 'italic', lineHeight: '1.6' }}>
                      {signal.gesture}
                    </div>
                  </div>

                  <div style={{ fontSize: '0.7rem', color: '#c0c0c0', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    WHEN TO USE:
                  </div>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#f0f0f0', margin: 0 }}>
                    {signal.description}
                  </p>
                </div>
              ))}
          </div>

          {refereeSignals.filter(matchesSignalFilter).length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#b0b0b0' }}>
              <AlertCircle size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>No signals found in this category.</p>
            </div>
          )}

          {/* Official Chart Reference with Image Viewer */}
          <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(255, 255, 255, 0.03)', border: '2px dashed rgba(255, 255, 255, 0.15)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📥</div>
            <h3 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: '#70E8FF', marginBottom: '1rem', letterSpacing: '0.1em' }}>
              OFFICIAL ILLUSTRATED CHART
            </h3>
            <p style={{ fontSize: '1rem', color: '#ccc', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto 2rem auto' }}>
              Complete official NCAA/FIVB illustrated referee signals chart with visual diagrams showing proper body positioning and hand signals for all 25 official calls.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <div style={{ padding: '0.75rem 1.5rem', background: 'rgba(112, 232, 255, 0.1)', border: '2px solid rgba(112, 232, 255, 0.3)', borderRadius: '6px', fontSize: '0.85rem', color: '#70E8FF', fontWeight: '600' }}>
                ✓ 25 Signals Covered
              </div>
              <div style={{ padding: '0.75rem 1.5rem', background: 'rgba(112, 232, 255, 0.1)', border: '2px solid rgba(112, 232, 255, 0.3)', borderRadius: '6px', fontSize: '0.85rem', color: '#70E8FF', fontWeight: '600' }}>
                ✓ Full Illustrations
              </div>
              <div style={{ padding: '0.75rem 1.5rem', background: 'rgba(112, 232, 255, 0.1)', border: '2px solid rgba(112, 232, 255, 0.3)', borderRadius: '6px', fontSize: '0.85rem', color: '#70E8FF', fontWeight: '600' }}>
                ✓ Downloadable
              </div>
            </div>

            {/* Referee Signals Chart Image */}
            <div style={{ 
              background: 'white', 
              borderRadius: '12px', 
              padding: '2rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              maxWidth: '1200px',
              margin: '0 auto 2rem auto'
            }}>
              <img 
                src="./referee-signals-chart.png" 
                alt="Official Volleyball Referee Signals Chart - 25 NCAA/FIVB Hand Signals" 
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  borderRadius: '8px',
                  display: 'block'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div style="padding: 3rem; text-align: center; color: #E8000D;"><h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #E8000D;">⚠️ Chart Image Not Found</h3><p style="color: #666; font-size: 1rem; line-height: 1.6;">Please upload <strong>referee-signals-chart.png</strong> to your repository<br/>in the same directory as index.html</p></div>';
                }}
              />
            </div>

            <a 
              href="./referee-signals-chart.png" 
              download="volleyball-referee-signals.png"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2.5rem',
                background: 'linear-gradient(135deg, #E8000D 0%, #c70000 100%)',
                border: '3px solid #E8000D',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.3rem',
                letterSpacing: '0.1em',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(232, 0, 13, 0.4)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 32px rgba(232, 0, 13, 0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 24px rgba(232, 0, 13, 0.4)';
              }}
            >
              📥 DOWNLOAD CHART
            </a>
          </div>
        </>
      )}
    </div>
  );
}
