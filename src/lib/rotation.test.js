import { describe, it, expect } from 'vitest';
import { systemRoles } from '../data/systems.js';
import {
  advanceRotation,
  buildExplanation,
  courtPositionOfRole,
  getNextRotationPositions,
  getRotationPositions,
  getServer,
  getSetterCourtPosition,
  isFrontRow,
  lineupNumberAt,
} from './rotation.js';

const ALL_ROTATIONS = [1, 2, 3, 4, 5, 6];

describe('rotation cycling', () => {
  it('advances 1..6 and wraps', () => {
    expect(ALL_ROTATIONS.map(advanceRotation)).toEqual([2, 3, 4, 5, 6, 1]);
  });

  it('returns the following rotation positions', () => {
    expect(getNextRotationPositions(6)).toEqual(getRotationPositions(1));
  });

  it('every rotation is a permutation of the six court positions', () => {
    for (const r of ALL_ROTATIONS) {
      expect([...getRotationPositions(r)].sort()).toEqual([1, 2, 3, 4, 5, 6]);
    }
  });

  it('moves every player exactly one position clockwise', () => {
    // Clockwise means court position n becomes n-1, wrapping 1 -> 6.
    for (const r of ALL_ROTATIONS) {
      const now = getRotationPositions(r);
      const next = getRotationPositions(advanceRotation(r));
      for (let lineup = 0; lineup < 6; lineup++) {
        const expected = now[lineup] === 1 ? 6 : now[lineup] - 1;
        expect(next[lineup]).toBe(expected);
      }
    }
  });
});

describe('court geography', () => {
  it('puts 2, 3 and 4 at the net', () => {
    expect([1, 2, 3, 4, 5, 6].filter(isFrontRow)).toEqual([2, 3, 4]);
  });

  it('resolves who stands in a court position', () => {
    // Rotation 2 is [6,1,2,3,4,5]: lineup player 2 stands in court position 1.
    expect(lineupNumberAt(2, 1)).toBe(2);
    expect(lineupNumberAt(1, 1)).toBe(1);
    expect(lineupNumberAt(6, 1)).toBe(6);
  });
});

describe('serving order', () => {
  it('serves from court position 1, cycling the lineup in order', () => {
    const roles = systemRoles['5-1'];
    expect(ALL_ROTATIONS.map((r) => getServer(r, roles).lineupNumber)).toEqual([
      1, 2, 3, 4, 5, 6,
    ]);
  });

  it('names the serving role', () => {
    const roles = systemRoles['5-1'];
    expect(getServer(1, roles).fullRole).toBe('Setter');
    expect(getServer(4, roles).fullRole).toBe('Opposite');
  });
});

describe('setter position', () => {
  // A 5-1 runs one setter, so they are front row for exactly three rotations.
  it('tracks the 5-1 setter around the court', () => {
    const roles = systemRoles['5-1'];
    expect(ALL_ROTATIONS.map((r) => getSetterCourtPosition(r, roles))).toEqual([
      1, 6, 5, 4, 3, 2,
    ]);
  });

  it('has the 5-1 setter in the back row for exactly three rotations', () => {
    const roles = systemRoles['5-1'];
    const front = ALL_ROTATIONS.filter((r) =>
      isFrontRow(getSetterCourtPosition(r, roles))
    );
    expect(front).toEqual([4, 5, 6]);
  });

  it('finds a setter in every rotation of every system', () => {
    for (const system of ['5-1', '6-2', '4-2']) {
      for (const r of ALL_ROTATIONS) {
        expect(getSetterCourtPosition(r, systemRoles[system])).toBeDefined();
      }
    }
  });

  it('returns undefined for a role nobody plays', () => {
    expect(courtPositionOfRole(1, systemRoles['4-2'], 'MB')).toBeUndefined();
  });
});

describe('buildExplanation', () => {
  it('names the server and rotation', () => {
    const text = buildExplanation({
      rotation: 4,
      system: '5-1',
      roles: systemRoles['5-1'],
    });
    expect(text).toContain('Rotation 4');
    expect(text).toContain('Player 4 (Opposite) is serving from position 1');
  });

  // Regression: the pre-Vite app resolved the setter to lineup number rather
  // than court position, so this said "back row" in all six rotations. The
  // setter is at court position 4 here, which is at the net.
  it('reports the 5-1 setter as front row in rotations 4, 5 and 6', () => {
    for (const rotation of [4, 5, 6]) {
      const text = buildExplanation({
        rotation,
        system: '5-1',
        roles: systemRoles['5-1'],
      });
      expect(text).toContain('setter in the front row, you have 2 attackers');
    }
  });

  it('reports the 5-1 setter as back row in rotations 1, 2 and 3', () => {
    for (const rotation of [1, 2, 3]) {
      const text = buildExplanation({
        rotation,
        system: '5-1',
        roles: systemRoles['5-1'],
      });
      expect(text).toContain('setter in the back row, you have 3 attackers');
    }
  });

  it('uses the fixed blurb for 6-2 and 4-2', () => {
    for (const rotation of ALL_ROTATIONS) {
      expect(
        buildExplanation({ rotation, system: '6-2', roles: systemRoles['6-2'] })
      ).toContain('3 front row attackers at all times');
      expect(
        buildExplanation({ rotation, system: '4-2', roles: systemRoles['4-2'] })
      ).toContain('2 front row attackers');
    }
  });
});
