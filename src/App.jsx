// Top-level state container and mode router.
//
// The pre-Vite app was a single 3,700-line component. The state and the
// handlers that mutate it stay here; everything they feed now lives in
// src/data, src/lib, src/components and src/modes.
import React, { useState, useEffect } from 'react';

import { systemRoles } from './data/systems.js';
import { matchData } from './data/matchData.js';
import { rulesData, ruleCategories, is2026Rule, NEW_2026 } from './data/rules.js';
import { allQuestions } from './data/questions.js';
import { scenarios } from './data/scenarios.js';
import { big12TeamsData } from './data/big12Teams.js';
import { advanceRotation, buildExplanation } from './lib/rotation.js';
import { loadSeasonFeed } from './lib/seasonFeed.js';
import { latestSeason } from './lib/season.js';

import Simulator from './modes/Simulator.jsx';
import PlayAlong from './modes/PlayAlong.jsx';
import RulesHub from './modes/RulesHub.jsx';
import Big12 from './modes/Big12.jsx';
import Season from './modes/Season.jsx';

const MODES = [
  ['simulator', 'SIMULATOR'],
  ['playalong', 'PLAY-ALONG'],
  ['rules', 'RULES HUB'],
  ['big12', 'BIG 12 STATS'],
  ['season', '2026 SEASON'],
];

export default function App() {
  const [mainMode, setMainMode] = useState('simulator');

  // Simulator state
  const [currentRotation, setCurrentRotation] = useState(1);
  const [offensiveSystem, setOffensiveSystem] = useState('5-1');
  const [showAttackZones, setShowAttackZones] = useState(false);
  const [showBlockingIndicators, setShowBlockingIndicators] = useState(false);
  const [showSystemConnections, setShowSystemConnections] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [scenarioMode, setScenarioMode] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [scenarioResult, setScenarioResult] = useState(null);
  const [showRotationPreview, setShowRotationPreview] = useState(false);
  const [showDefenseFormation, setShowDefenseFormation] = useState(false);
  const [defenseType, setDefenseType] = useState('perimeter'); // perimeter, rotational, middle-back
  const [showServeReceive, setShowServeReceive] = useState(false);
  const [selectedPlayerInfo, setSelectedPlayerInfo] = useState(null);

  // Play-along state
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [score, setScore] = useState({ team: 0, opponent: 0 });
  const [servingTeam, setServingTeam] = useState('team');
  const [opponentRotation, setOpponentRotation] = useState(1);

  // Rules Hub state
  const [rulesTab, setRulesTab] = useState('reference');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentQuiz, setCurrentQuiz] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [studiedRules, setStudiedRules] = useState(new Set());
  const [quizHistory, setQuizHistory] = useState([]);
  const [selectedDemo, setSelectedDemo] = useState(null);

  // Big 12 Stats state
  const [big12Data, setBig12Data] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState(['Kansas', 'Iowa State']);
  const [comparisonMetric, setComparisonMetric] = useState('confWinPct');
  const [ncaaTab, setNcaaTab] = useState('overview');

  // Season feed state
  const [seasonTab, setSeasonTab] = useState('schedule');
  const [big12View, setBig12View] = useState('live');
  const [feed, setFeed] = useState(null);
  const [feedStatus, setFeedStatus] = useState('loading');
  const [feedCachedAt, setFeedCachedAt] = useState(null);
  const [feedError, setFeedError] = useState(null);
  const [feedRefreshing, setFeedRefreshing] = useState(false);

  // Load Big 12 data
  useEffect(() => {
    setBig12Data(big12TeamsData);
  }, []);

  // Season feed: paints from cache immediately, then revalidates. Never
  // throws — a failure just leaves the season screens in their empty state.
  const applyFeed = (result) => {
    if (result.data) setFeed(result.data);
    setFeedStatus(result.status);
    setFeedCachedAt(result.cachedAt);
    setFeedError(result.error);
  };

  useEffect(() => {
    let live = true;
    loadSeasonFeed({ onUpdate: (r) => { if (live) applyFeed(r); } });
    return () => { live = false; };
  }, []);

  const refreshFeed = async () => {
    setFeedRefreshing(true);
    try {
      applyFeed(await loadSeasonFeed({ onUpdate: () => {} }));
    } finally {
      setFeedRefreshing(false);
    }
  };

  // Whichever season the feed knows about last; falls back to the tab label.
  const currentSeason = latestSeason(feed) ?? '2026';
  const today = new Date().toISOString().slice(0, 10);

  const roles = systemRoles[offensiveSystem];
  // Derived from the rules themselves, so a rule in a new category shows up in
  // the filter row without a second edit here.
  const categories = ruleCategories;

  // Functions
  const nextRotation = () => {
    setCurrentRotation((prev) => advanceRotation(prev));
  };

  const resetRotation = () => {
    setCurrentRotation(1);
  };

  const getExplanation = () =>
    buildExplanation({ rotation: currentRotation, system: offensiveSystem, roles });

  const nextPoint = () => {
    if (currentPointIndex < matchData.points.length) {
      const point = matchData.points[currentPointIndex];

      if (point.winner === 'team') {
        setScore(prev => ({ ...prev, team: prev.team + 1 }));
      } else {
        setScore(prev => ({ ...prev, opponent: prev.opponent + 1 }));
      }

      setCurrentRotation(point.teamRotation);
      setOpponentRotation(point.opponentRotation);

      if (currentPointIndex < matchData.points.length - 1) {
        const currentWinner = point.winner;
        const wasServing = servingTeam;

        if (currentWinner !== wasServing) {
          setServingTeam(currentWinner);
        }
      }

      setCurrentPointIndex(prev => prev + 1);
    }
  };

  const resetMatch = () => {
    setCurrentPointIndex(0);
    setScore({ team: 0, opponent: 0 });
    setCurrentRotation(1);
    setOpponentRotation(1);
    setServingTeam('team');
  };

  const currentPoint = matchData.points[currentPointIndex - 1];
  const isMatchComplete = currentPointIndex >= matchData.points.length;

  const filteredRules = rulesData.filter(rule => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === NEW_2026 ? is2026Rule(rule) : rule.category === selectedCategory);
    const matchesSearch = rule.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         rule.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const generateQuiz = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);
    setCurrentQuiz(selected);
    setQuizAnswers({});
    setShowResults(false);
  };

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answerIndex });
  };

  const submitQuiz = () => {
    let correct = 0;
    currentQuiz.forEach(q => {
      if (quizAnswers[q.id] === q.correct) correct++;
    });
    const score = Math.round((correct / currentQuiz.length) * 100);
    setQuizHistory([...quizHistory, { date: new Date(), score, total: currentQuiz.length, correct }]);
    setShowResults(true);
  };

  const resetQuiz = () => {
    generateQuiz();
  };

  const markRuleStudied = (ruleId) => {
    setStudiedRules(new Set([...studiedRules, ruleId]));
  };

  const getRecommendations = () => {
    const missedCategories = new Set();
    if (showResults) {
      currentQuiz.forEach(q => {
        if (quizAnswers[q.id] !== q.correct) {
          missedCategories.add(q.category);
        }
      });
    }
    return Array.from(missedCategories);
  };

  // Big 12 helper functions
  const toggleTeamSelection = (teamName) => {
    if (selectedTeams.includes(teamName)) {
      if (selectedTeams.length > 1) {
        setSelectedTeams(selectedTeams.filter(t => t !== teamName));
      }
    } else {
      if (selectedTeams.length < 4) {
        setSelectedTeams([...selectedTeams, teamName]);
      }
    }
  };

  const getComparisonData = () => {
    return big12Data
      .filter(team => selectedTeams.includes(team.name))
      .map(team => ({
        name: team.name,
        value: comparisonMetric === 'confWinPct' ? team.confWinPct :
               comparisonMetric === 'overallWinPct' ? team.overallWinPct :
               comparisonMetric === 'killsPerSet' ? team.statistics.killsPerSet :
               comparisonMetric === 'blocksPerSet' ? team.statistics.blocksPerSet :
               comparisonMetric === 'hittingPct' ? team.statistics.hittingPct * 100 :
               comparisonMetric === 'acesPerSet' ? team.statistics.acesPerSet :
               comparisonMetric === 'assistsPerSet' ? team.statistics.assistsPerSet :
               team.statistics.digsPerSet
      }))
      .sort((a, b) => b.value - a.value);
  };

  const formatMetricValue = (value) => {
    if (comparisonMetric === 'confWinPct' || comparisonMetric === 'overallWinPct' || comparisonMetric === 'hittingPct') {
      return value.toFixed(1) + '%';
    }
    return value.toFixed(2);
  };

  const getMaxValue = () => {
    const data = getComparisonData();
    return data.length > 0 ? data[0].value : 100;
  };

  const validateScenario = (scenarioId, zoneId) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    const zone = scenario.zones.find(z => z.id === zoneId);

    setScenarioResult({
      correct: zone.legal,
      explanation: zone.explanation,
      selectedZone: zone.name
    });
  };

  const resetScenario = () => {
    setCurrentScenario(null);
    setScenarioResult(null);
    setSelectedPlayer(null);
  };

  // Everything CourtDisplay needs, bundled once so the two modes that render
  // a court can pass it straight through.
  const courtProps = {
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
    mainMode,
    servingTeam,
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0051BA 0%, #001A57 100%)', fontFamily: '"Space Mono", "Courier New", monospace', color: '#eee', padding: 'clamp(0.75rem, 4vw, 2rem)' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '3.5rem', margin: 0, color: '#FFFFFF', letterSpacing: '0.1em', textShadow: '0 0 30px rgba(232, 0, 13, 0.6), 0 0 60px rgba(0, 81, 186, 0.4), 0 4px 8px rgba(0, 0, 0, 0.5)' }}>
          VOLLEYBALL TRAINER
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#b0b0b0', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '0.5rem' }}>
          Complete Learning System
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {MODES.map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`mode-toggle ${mainMode === id ? 'active' : ''}`}
            aria-pressed={mainMode === id}
            onClick={() => setMainMode(id)}
            style={{
              padding: '0.75rem 1.5rem',
              background: mainMode === id ? '#0051BA' : 'rgba(255, 255, 255, 0.1)',
              border: '2px solid',
              borderColor: mainMode === id ? '#0051BA' : 'rgba(255, 255, 255, 0.2)',
              borderRadius: '0',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.1rem',
              letterSpacing: '0.1em',
              color: mainMode === id ? '#ffffff' : '#eee',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {mainMode === 'simulator' && (
        <Simulator
          currentRotation={currentRotation}
          offensiveSystem={offensiveSystem}
          setOffensiveSystem={setOffensiveSystem}
          showAttackZones={showAttackZones}
          setShowAttackZones={setShowAttackZones}
          showBlockingIndicators={showBlockingIndicators}
          setShowBlockingIndicators={setShowBlockingIndicators}
          showSystemConnections={showSystemConnections}
          setShowSystemConnections={setShowSystemConnections}
          scenarioMode={scenarioMode}
          setScenarioMode={setScenarioMode}
          currentScenario={currentScenario}
          setCurrentScenario={setCurrentScenario}
          scenarioResult={scenarioResult}
          showRotationPreview={showRotationPreview}
          setShowRotationPreview={setShowRotationPreview}
          showDefenseFormation={showDefenseFormation}
          setShowDefenseFormation={setShowDefenseFormation}
          defenseType={defenseType}
          setDefenseType={setDefenseType}
          showServeReceive={showServeReceive}
          setShowServeReceive={setShowServeReceive}
          selectedPlayerInfo={selectedPlayerInfo}
          setSelectedPlayerInfo={setSelectedPlayerInfo}
          roles={roles}
          nextRotation={nextRotation}
          resetRotation={resetRotation}
          getExplanation={getExplanation}
          validateScenario={validateScenario}
          resetScenario={resetScenario}
          courtProps={courtProps}
        />
      )}

      {mainMode === 'playalong' && (
        <PlayAlong
          currentRotation={currentRotation}
          offensiveSystem={offensiveSystem}
          setOffensiveSystem={setOffensiveSystem}
          currentPointIndex={currentPointIndex}
          score={score}
          servingTeam={servingTeam}
          opponentRotation={opponentRotation}
          nextPoint={nextPoint}
          resetMatch={resetMatch}
          currentPoint={currentPoint}
          isMatchComplete={isMatchComplete}
          courtProps={courtProps}
        />
      )}

      {mainMode === 'rules' && (
        <RulesHub
          setMainMode={setMainMode}
          setShowAttackZones={setShowAttackZones}
          setShowBlockingIndicators={setShowBlockingIndicators}
          setShowSystemConnections={setShowSystemConnections}
          setScenarioMode={setScenarioMode}
          setShowRotationPreview={setShowRotationPreview}
          setShowDefenseFormation={setShowDefenseFormation}
          rulesTab={rulesTab}
          setRulesTab={setRulesTab}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentQuiz={currentQuiz}
          setCurrentQuiz={setCurrentQuiz}
          quizAnswers={quizAnswers}
          showResults={showResults}
          studiedRules={studiedRules}
          quizHistory={quizHistory}
          selectedDemo={selectedDemo}
          setSelectedDemo={setSelectedDemo}
          categories={categories}
          filteredRules={filteredRules}
          generateQuiz={generateQuiz}
          handleQuizAnswer={handleQuizAnswer}
          submitQuiz={submitQuiz}
          resetQuiz={resetQuiz}
          markRuleStudied={markRuleStudied}
          getRecommendations={getRecommendations}
        />
      )}

      {mainMode === 'big12' && (
        <Big12
          big12Data={big12Data}
          selectedTeams={selectedTeams}
          comparisonMetric={comparisonMetric}
          setComparisonMetric={setComparisonMetric}
          toggleTeamSelection={toggleTeamSelection}
          getComparisonData={getComparisonData}
          formatMetricValue={formatMetricValue}
          getMaxValue={getMaxValue}
          big12View={big12View}
          setBig12View={setBig12View}
          feed={feed}
          today={today}
          season={currentSeason}
        />
      )}

      {mainMode === 'season' && (
        <Season
          seasonTab={seasonTab}
          setSeasonTab={setSeasonTab}
          ncaaTab={ncaaTab}
          setNcaaTab={setNcaaTab}
          feed={feed}
          feedStatus={feedStatus}
          feedCachedAt={feedCachedAt}
          feedError={feedError}
          refreshFeed={refreshFeed}
          feedRefreshing={feedRefreshing}
          today={today}
          season={currentSeason}
        />
      )}
    </div>
  );
}
