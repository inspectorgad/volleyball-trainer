// Rotation maths, pulled out of the JSX so it can be tested on its own.
//
// Position model (unchanged from the original single-file app):
//   `rotationPositions[r]` is indexed by LINEUP number and holds the COURT
//   position that player currently stands in. So for rotation 2, [6,1,2,3,4,5]
//   means lineup player 1 is standing in court position 6, player 2 in court
//   position 1, and so on — players move clockwise (1→6→5→4→3→2→1).
//
//   To go the other way — "who is standing in court position N?" — take
//   `displayPositions.indexOf(N)` and add 1 to get their lineup number, which
//   is the key into `systemRoles[system]`.

import { rotationPositions } from '../data/systems.js';

export const FRONT_ROW = [2, 3, 4];
export const BACK_ROW = [1, 5, 6];

/** Court positions 2, 3 and 4 are at the net. */
export function isFrontRow(courtPosition) {
  return FRONT_ROW.includes(Number(courtPosition));
}

/** Rotations cycle 1..6 and wrap. */
export function advanceRotation(rotation) {
  return rotation === 6 ? 1 : rotation + 1;
}

export function getRotationPositions(rotation) {
  return rotationPositions[rotation];
}

export function getNextRotationPositions(rotation) {
  return rotationPositions[advanceRotation(rotation)];
}

/** Lineup number of whoever is standing in `courtPosition` this rotation. */
export function lineupNumberAt(rotation, courtPosition) {
  return getRotationPositions(rotation).indexOf(Number(courtPosition)) + 1;
}

/** Court position that the given role currently occupies, or undefined. */
export function courtPositionOfRole(rotation, roles, role) {
  const displayPositions = getRotationPositions(rotation);
  for (const courtPosition of [1, 2, 3, 4, 5, 6]) {
    const lineupNumber = displayPositions.indexOf(courtPosition) + 1;
    if (roles[lineupNumber].role === role) return courtPosition;
  }
  return undefined;
}

/** The setter's court position. In a 6-2 / 4-2 two setters exist; this is the
 *  first one found, matching what CourtDisplay draws its connection lines to. */
export function getSetterCourtPosition(rotation, roles) {
  return courtPositionOfRole(rotation, roles, 'S');
}

/** Whoever is in court position 1 serves. */
export function getServer(rotation, roles) {
  const lineupNumber = lineupNumberAt(rotation, 1);
  return { lineupNumber, ...roles[lineupNumber] };
}

/**
 * Teaching text under the court.
 *
 * NOTE — behaviour change against the pre-Vite app. The original computed the
 * setter's position as:
 *
 *   displayPositions.findIndex(pos => roles[displayPositions.indexOf(pos) + 1].role === 'S') + 1
 *
 * Because `displayPositions.indexOf(pos)` on a permutation just returns the
 * index already being visited, that predicate tested the LINEUP number rather
 * than the court position. The setter is lineup player 1 in all three systems,
 * so it always resolved to 1 — always "back row" — and the 5-1 blurb was wrong
 * in rotations 4, 5 and 6, where the setter is actually at the net. This uses
 * the court position, which is what CourtDisplay already did correctly.
 */
export function buildExplanation({ rotation, system, roles }) {
  const server = getServer(rotation, roles);

  let systemExplanation;
  if (system === '5-1') {
    const setterCourtPosition = getSetterCourtPosition(rotation, roles);
    systemExplanation = isFrontRow(setterCourtPosition)
      ? ' In a 5-1 system with the setter in the front row, you have 2 attackers in the front row.'
      : ' In a 5-1 system with the setter in the back row, you have 3 attackers in the front row.';
  } else if (system === '6-2') {
    systemExplanation =
      ' In a 6-2 system, the back row setter sets, giving you 3 front row attackers at all times.';
  } else {
    systemExplanation =
      ' In a 4-2 system, the front row setter sets, giving you 2 front row attackers.';
  }

  return (
    `Rotation ${rotation}: Player ${server.lineupNumber} (${server.fullRole}) is serving ` +
    `from position 1.${systemExplanation} Front row players must stay in front of their ` +
    `corresponding back row players until the serve is contacted.`
  );
}
