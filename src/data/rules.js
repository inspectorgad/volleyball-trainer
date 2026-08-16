// Rules reference shown in the Rules Hub.
//
// Entries touched by the 2026 and 2027 NCAA rules changes carry `new2026` or
// `changed2026`, plus a `was` line describing the previous position and citing
// the rule number, so a returning user can see exactly what moved.

export const rulesData = [
  { id: 1, category: 'Scoring', title: 'Rally Scoring', content: 'A point is scored on every rally, regardless of which team served. The team that wins the rally scores a point and gains or maintains the serve.', difficulty: 'Basic' },
  { id: 2, category: 'Scoring', title: 'Winning a Set', content: 'A team must win by at least 2 points. Sets 1-4 are played to 25 points. Set 5 (if necessary) is played to 15 points.', difficulty: 'Basic' },
  { id: 3, category: 'Violations', title: 'Net Violations', content: 'Players cannot touch the net during play. Contact with the net by a player between the antennae is a fault. Exception: Hair touching the net is not a violation.', difficulty: 'Basic' },
  { id: 4, category: 'Violations', title: 'Four Hits', content: 'A team is allowed a maximum of three successive contacts of the ball. A block touch does NOT count as one of the three touches.', difficulty: 'Basic' },
  { id: 5, category: 'Violations', title: 'Double Contact', content: 'A player may not hit the ball twice in succession except when blocking. First team contact (often a hard-driven spike) allows for some leniency on double contacts.', difficulty: 'Intermediate' },
  { id: 6, category: 'Violations', title: 'Lift/Carry', content: 'The ball must be hit cleanly and not caught, lifted, pushed, carried, or thrown. The ball cannot rest on the hands or arms.', difficulty: 'Intermediate' },
  { id: 7, category: 'Positions', title: 'Rotation Order', content: 'Players must maintain their rotational order throughout the set. When the receiving team wins a rally, they rotate clockwise before serving.', difficulty: 'Basic' },
  { id: 8, category: 'Positions', title: 'Overlap Violation', content: 'At the moment of serve, players must be in their correct rotational positions. Front row players must be in front of corresponding back row players.', difficulty: 'Intermediate' },
  { id: 9, category: 'Positions', title: 'Back Row Attack', content: 'Back row players may attack the ball from behind the 10-foot (3-meter) line. They must take off behind the line but may land in front of it.', difficulty: 'Intermediate' },
  { id: 10, category: 'Positions', title: 'Back Row Block', content: 'Back row players cannot participate in a block. A back row player may not block or attempt to block.', difficulty: 'Intermediate' },
  { id: 11, category: 'Libero', title: 'Libero Basics', content: 'The libero is a defensive specialist who wears a different colored jersey. They can replace any back row player without counting as a substitution.', difficulty: 'Basic' },
  { id: 12, category: 'Libero', title: 'Libero Restrictions', content: 'The libero cannot serve (NCAA allows one rotation), block, attack above net height, or set overhand in front of the 10-foot line for an attack above the net.', difficulty: 'Advanced' },
  { id: 13, category: 'Service', title: 'Let Serves', content: 'A serve that touches the net but still goes over into the opponent\'s court is legal and play continues. This is called a "let serve."', difficulty: 'Basic' },
  { id: 14, category: 'Service', title: 'Service Order', content: 'The player in position 1 (back right) serves. Teams must follow their serving order as listed on the lineup sheet.', difficulty: 'Basic' },
  { id: 15, category: 'Service', title: 'Foot Fault', content: 'When serving, the server cannot step on or over the end line before contacting the ball. The entire foot must be behind the line.', difficulty: 'Basic' },
  { id: 16, category: 'Blocking', title: 'Block Contact', content: 'A block contact does NOT count as one of the team\'s three allowed contacts. After a block, the team still has three touches.', difficulty: 'Intermediate' },
  { id: 17, category: 'Blocking', title: 'Reaching Over', content: 'Blockers may reach over the net after their opponent has completed their attack action. They cannot block a set or contact the ball on the opponent\'s side before the attack.', difficulty: 'Advanced' },
  { id: 18, category: 'Blocking', title: 'Multiple Blockers', content: 'Multiple players may participate in a block. Only the player(s) who touch the ball are considered blockers.', difficulty: 'Basic' },
  { id: 19, category: 'Substitution', title: 'Substitution Limits', content: 'Division I allows 15 substitutions per set. Divisions II and III allow 18, increased from 15 for the 2026 season. A player may enter the game twice per set in every division.', difficulty: 'Intermediate', changed2026: true, was: 'Read "12 per set (15 in NCAA)", with no divisional split. NCAA rule 11.3.2.1.' },
  { id: 20, category: 'Timeouts', title: 'Timeout Rules', content: 'Each team gets 2 timeouts per set, each up to 75 seconds. Conferences may instead use a technical timeout, triggered when a team reaches 15 points in sets 1-4 and lasting up to 90 seconds, whether or not a team has already taken a timeout. There is no media timeout in the fifth set.', difficulty: 'Basic', changed2026: true, was: 'Timeouts were 30 seconds and there was no technical-timeout protocol. NCAA rule 11.2.3.' },

  // ---- New for the 2026 and 2027 seasons -----------------------------------
  // Approved by the Division I Women's Volleyball Oversight Committee and the
  // Divisions II and III Playing Rules Oversight Panel. Everything below
  // applies to all three divisions; the divisional split on substitutions
  // above is the only difference between them.
  { id: 21, category: 'Violations', title: 'Center Line Fault', content: 'Completely crossing the center line with a foot or feet is not permitted. Completely crossing with other body parts is still permitted, provided it does not interfere with an opponent.', difficulty: 'Intermediate', new2026: true, was: 'Crossing the center line was only a fault if the player interfered or created a safety hazard. The change aligns NCAA play with the international rule. NCAA rule 15.2.4.3.' },
  { id: 22, category: 'Challenges', title: 'Challenging a Center Line Call', content: 'Center line is now a reviewable decision, so a coach may challenge whether a center line violation occurred. While reviewing it, officials may also rule on a possible net fault on the same play.', difficulty: 'Intermediate', new2026: true, was: 'Center line was not reviewable. NCAA rules 18.1.4 and 15.2.4.3.' },
  { id: 23, category: 'Challenges', title: 'Requesting a Challenge', content: 'The head coach requests a challenge by forming a "C" with both hands. The request must come immediately after the play in question and before any timeout is initiated.', difficulty: 'Basic', new2026: true, was: 'Coaches used a physical challenge card, and the request window was less tightly defined. NCAA rule 18.1.5.' },
  { id: 24, category: 'Match Play', title: 'Pursuit', content: 'After a team\'s first contact or a block sends the ball across the net outside the antenna, a player may chase it into the opponent\'s free zone and play it back to a teammate. The ball must return across the net plane outside the antenna on the same side, the pursuing player must not cross under the net, net cable or referee platform, and opponents may not prevent the play.', difficulty: 'Advanced', new2026: true, was: 'The ball was dead once it crossed outside the antenna. This aligns women\'s volleyball with the men\'s game. Not used in facilities without 2m of free space behind the standard and referee platform. NCAA rule 15.1.1.' },
  { id: 25, category: 'Service', title: 'Screening', content: 'No player on the serving team may raise their hands above their head during the serve until the ball has passed beyond the net.', difficulty: 'Intermediate', new2026: true, was: 'Screening was judged subjectively on whether the receiver\'s view was actually obstructed. NCAA rule 13.2.4.' },
  { id: 26, category: 'Conduct', title: 'Misconduct Carries the Match', content: 'Individual misconduct sanctions now stay in force for the entire match and are recorded on the score sheet, so a card in set one still counts in set five.', difficulty: 'Intermediate', new2026: true, was: 'Sanctions applied only to the set in which they were issued, so cards did not carry over. NCAA rule 6.1.2.' },
  { id: 27, category: 'Match Play', title: 'Switching Sides', content: 'Teams change ends at the end of the second set. Before a fifth set, the team winning the coin toss may choose to serve, to receive, or which side to play, and teams stay on that side for the whole fifth set.', difficulty: 'Basic', new2026: true, was: 'Teams changed ends more often, including a switch partway through the fifth set. NCAA rules 9.2.4.3 and 9.2.5.1.' },
  { id: 28, category: 'Conduct', title: 'Jewelry', content: 'Jewelry worn above the chin is unrestricted. No jewelry may be worn below the chin.', difficulty: 'Basic', new2026: true, was: 'Jewelry above the chin was also restricted. NCAA rule 7.2.2.' },
  { id: 29, category: 'Conduct', title: 'Technology on the Bench (Experimental)', content: 'Conferences may opt in during 2026 to live statistics and live video being sent to the bench. Video may not be used to show officials a missed call, and no electronic equipment may be used to communicate to or from the bench — doing so earns the head coach a red card. Laptops and tablets are otherwise allowed on the bench.', difficulty: 'Advanced', new2026: true, experimental: true, was: 'An experimental rule for 2026 only, and only in conferences that adopt it. NCAA experimental rule 6.1.5.' }
];

/** Sentinel category that filters to everything the 2026 changes touched. */
export const NEW_2026 = 'New for 2026';

export const is2026Rule = (rule) => Boolean(rule.new2026 || rule.changed2026);

export const rules2026Count = rulesData.filter(is2026Rule).length;

/** Filter chips: 'all', the 2026 sentinel, then each category as it first
 *  appears in the data — so adding a rule in a new category needs no edit
 *  here or in App. */
export const ruleCategories = [
  'all',
  NEW_2026,
  ...Array.from(new Set(rulesData.map((rule) => rule.category))),
];
