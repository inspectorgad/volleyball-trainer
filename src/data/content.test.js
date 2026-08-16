import { describe, it, expect } from 'vitest';
import { rulesData, ruleCategories, is2026Rule, rules2026Count, NEW_2026 } from './rules.js';
import { allQuestions } from './questions.js';
import { scenarios } from './scenarios.js';
import { refereeSignals } from './refereeSignals.js';

const byTitle = (title) => rulesData.find((r) => r.title === title);
const byId = (id) => allQuestions.find((q) => q.id === id);

describe('rules integrity', () => {
  it('has unique ids', () => {
    const ids = rulesData.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has every required field populated', () => {
    for (const rule of rulesData) {
      expect(rule.title, `rule ${rule.id}`).toBeTruthy();
      expect(rule.content, `rule ${rule.id}`).toBeTruthy();
      expect(rule.category, `rule ${rule.id}`).toBeTruthy();
      expect(['Basic', 'Intermediate', 'Advanced']).toContain(rule.difficulty);
    }
  });

  it('gives every 2026-touched rule a "was" line so the change is legible', () => {
    for (const rule of rulesData.filter(is2026Rule)) {
      expect(rule.was, `rule ${rule.id} (${rule.title})`).toBeTruthy();
    }
  });

  it('never marks a rule both new and revised', () => {
    for (const rule of rulesData) {
      expect(Boolean(rule.new2026 && rule.changed2026), rule.title).toBe(false);
    }
  });

  it('exposes every rule category as a filter chip', () => {
    for (const rule of rulesData) expect(ruleCategories).toContain(rule.category);
    expect(ruleCategories[0]).toBe('all');
    expect(ruleCategories[1]).toBe(NEW_2026);
  });

  it('counts the 2026 rules for the filter badge', () => {
    expect(rules2026Count).toBe(rulesData.filter(is2026Rule).length);
    expect(rules2026Count).toBeGreaterThan(0);
  });
});

// These pin the facts researched against the NCAA 2026-27 rules-change
// documents. They exist so a later content edit cannot quietly restore the
// pre-2026 numbers.
describe('2026 rule facts', () => {
  it('limits the centre line fault to the foot or feet', () => {
    const rule = byTitle('Center Line Fault');
    expect(rule.new2026).toBe(true);
    expect(rule.content).toMatch(/foot or feet/i);
    // Other body parts crossing completely is still allowed.
    expect(rule.content).toMatch(/other body parts is still permitted/i);
  });

  it('splits substitutions by division: D-I 15, D-II/III 18', () => {
    const rule = byTitle('Substitution Limits');
    expect(rule.changed2026).toBe(true);
    expect(rule.content).toMatch(/Division I allows 15/);
    expect(rule.content).toMatch(/Divisions II and III allow 18/);
  });

  it('has timeouts at 75 seconds, not the pre-2026 30', () => {
    const rule = byTitle('Timeout Rules');
    expect(rule.content).toMatch(/75 seconds/);
    expect(rule.content).not.toMatch(/30 seconds/);
    // The quiz answer has to agree with the rule.
    const q = byId(22);
    expect(q.options[q.correct]).toBe('75 seconds');
  });

  it('describes the technical timeout trigger', () => {
    expect(byTitle('Timeout Rules').content).toMatch(/15 points in sets 1-4/);
  });

  it('describes the challenge request signal', () => {
    expect(byTitle('Requesting a Challenge').content).toMatch(/"C" with both hands/);
    expect(refereeSignals.some((s) => s.new2026 && /Challenge Request/.test(s.name))).toBe(true);
  });

  it('carries misconduct sanctions across the whole match', () => {
    expect(byTitle('Misconduct Carries the Match').content).toMatch(/entire match/i);
  });
});

describe('quiz bank integrity', () => {
  it('has unique ids', () => {
    const ids = allQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('points every answer at a real option', () => {
    for (const q of allQuestions) {
      expect(q.options.length, `q${q.id}`).toBeGreaterThan(1);
      expect(q.correct, `q${q.id}`).toBeGreaterThanOrEqual(0);
      expect(q.correct, `q${q.id}`).toBeLessThan(q.options.length);
      expect(q.explanation, `q${q.id}`).toBeTruthy();
    }
  });

  it('gives true/false questions exactly two options', () => {
    for (const q of allQuestions.filter((q) => q.type === 'truefalse')) {
      expect(q.options, `q${q.id}`).toEqual(['True', 'False']);
    }
  });

  it('keeps at least 10 questions so a full quiz can be drawn', () => {
    expect(allQuestions.length).toBeGreaterThanOrEqual(10);
  });

  it('asks about the 2026 changes', () => {
    expect(allQuestions.filter((q) => q.new2026).length).toBeGreaterThanOrEqual(5);
  });
});

describe('scenario integrity', () => {
  it('has unique ids', () => {
    const ids = scenarios.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  // `legal` on a zone means "this is the correct answer", not "this action is
  // lawful" — scenario 2 asks "can they block?" and marks the "no" zone legal.
  // Scenario mode only reveals one, so two would be unanswerable.
  it('gives every scenario exactly one correct answer', () => {
    for (const s of scenarios) {
      const legal = s.zones.filter((z) => z.legal);
      expect(legal.length, `scenario ${s.id} (${s.title})`).toBe(1);
    }
  });

  it('explains every zone', () => {
    for (const s of scenarios) {
      for (const z of s.zones) {
        expect(z.name, `scenario ${s.id}`).toBeTruthy();
        expect(z.explanation, `scenario ${s.id} / ${z.id}`).toBeTruthy();
      }
    }
  });

  it('places every scenario player in a real court position', () => {
    for (const s of scenarios) expect([1, 2, 3, 4, 5, 6]).toContain(s.playerPosition);
  });

  it('drills the 2026 changes', () => {
    expect(scenarios.filter((s) => s.new2026).length).toBeGreaterThanOrEqual(2);
  });
});

describe('referee signals integrity', () => {
  it('has unique ids and populated fields', () => {
    const ids = refereeSignals.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const s of refereeSignals) {
      expect(s.name, `signal ${s.id}`).toBeTruthy();
      expect(s.description, `signal ${s.id}`).toBeTruthy();
      expect(s.category, `signal ${s.id}`).toBeTruthy();
    }
  });
});
