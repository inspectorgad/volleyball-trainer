// Interactive violation scenarios used by Simulator scenario mode.

export const scenarios = [
  {
    id: 1,
    title: "Back Row Attack from Front Court",
    description: "Your back row player wants to attack. Where can they jump from?",
    playerPosition: 5, // Back row player
    action: "attack",
    zones: [
      { id: 'front', name: 'Front Court (In front of 10-foot line)', legal: false, explanation: 'ILLEGAL! Back row players must take off from behind the 10-foot line when attacking above the net.' },
      { id: 'back', name: 'Back Court (Behind 10-foot line)', legal: true, explanation: 'LEGAL! Back row players can attack if they jump from behind the 10-foot line. They can land in front, but takeoff must be behind.' },
      { id: 'anywhere', name: 'Anywhere on the court', legal: false, explanation: 'INCORRECT! Only front row players can attack from anywhere. Back row players are restricted to behind the 10-foot line.' }
    ]
  },
  {
    id: 2,
    title: "Back Row Player at the Net",
    description: "Your setter is in the back row. Can they block?",
    playerPosition: 1, // Back row setter
    action: "block",
    zones: [
      { id: 'yes', name: 'Yes, they can block', legal: false, explanation: 'ILLEGAL! Back row players cannot participate in blocking at all, regardless of where they are on the court.' },
      { id: 'no', name: 'No, they cannot block', legal: true, explanation: 'CORRECT! Back row players are never allowed to block. Only front row players can participate in blocking.' },
      { id: 'sometimes', name: 'Only if they don\'t touch the ball', legal: false, explanation: 'INCORRECT! Back row players cannot attempt to block, whether they touch the ball or not.' }
    ]
  },
  {
    id: 3,
    title: "Libero Overhead Setting",
    description: "Your libero sets the ball overhand from in front of the 10-foot line. Can your hitter attack it above the net?",
    playerPosition: 6, // Libero position
    action: "libero_set",
    zones: [
      { id: 'yes', name: 'Yes, attack is legal', legal: false, explanation: 'ILLEGAL! When a libero sets overhand in front of the 10-foot line, attackers cannot attack the ball above net height.' },
      { id: 'no', name: 'No, cannot attack above net', legal: true, explanation: 'CORRECT! This is a libero setting restriction. The attack would only be legal if hit below net height or if the libero set from behind the 10-foot line.' },
      { id: 'depends', name: 'Depends on if it was a good set', legal: false, explanation: 'INCORRECT! Set quality doesn\'t matter. The rule is based on libero\'s position when setting.' }
    ]
  },
  {
    id: 4,
    title: "Player Overlap on Serve",
    description: "At the moment of serve, your middle blocker is slightly in front of your back row player. What happens?",
    playerPosition: 3, // Middle blocker
    action: "overlap",
    zones: [
      { id: 'legal', name: 'Legal - play continues', legal: false, explanation: 'ILLEGAL! This is an overlap violation. Players must maintain rotational order at the moment of serve.' },
      { id: 'violation', name: 'Overlap violation - point to opponent', legal: true, explanation: 'CORRECT! Players must be in proper rotational positions when the ball is served. Front row players must be in front of their corresponding back row players.' },
      { id: 'warning', name: 'Warning only, then re-serve', legal: false, explanation: 'INCORRECT! There are no warnings for overlap violations. Point is awarded to the opponent immediately.' }
    ]
  },
  {
    id: 5,
    title: "Block Touch Counting",
    description: "Your team blocks the ball, then passes, sets, and attacks. How many touches is that?",
    playerPosition: 3, // Blocker
    action: "block_count",
    zones: [
      { id: 'four', name: 'Four touches - violation', legal: false, explanation: 'INCORRECT! Block touches do not count toward the three-touch limit.' },
      { id: 'three', name: 'Three touches - legal', legal: true, explanation: 'CORRECT! The block does NOT count as one of your three touches. Block, pass, set, attack = 3 touches.' },
      { id: 'depends', name: 'Depends on how many people touched the block', legal: false, explanation: 'INCORRECT! Even if three people touched the block, it still doesn\'t count. The team still has three touches remaining.' }
    ]
  },
  {
    id: 6,
    title: "Net Touch During Play",
    description: "Your player's hand touches the net while blocking. What's the call?",
    playerPosition: 2, // Front row player
    action: "net_touch",
    zones: [
      { id: 'legal', name: 'Legal - play continues', legal: false, explanation: 'ILLEGAL! Any contact with the net during play is a violation (except hair).' },
      { id: 'violation', name: 'Net violation - point to opponent', legal: true, explanation: 'CORRECT! Touching the net with any part of the body (except hair) during play is a violation.' },
      { id: 'depends', name: 'Only illegal if it affects play', legal: false, explanation: 'INCORRECT! Any net contact during play is a violation, regardless of whether it affects the play.' }
    ]
  },
  {
    id: 7,
    title: "Front Row Setter Attack",
    description: "Your setter is in the front row and decides to attack the second ball over the net. Is this legal?",
    playerPosition: 2, // Front row setter
    action: "setter_attack",
    zones: [
      { id: 'yes', name: 'Yes, completely legal', legal: true, explanation: 'LEGAL! Front row players (including setters) can attack from anywhere on the court. The second ball attack (dump/tip) is a common and legal play.' },
      { id: 'no', name: 'No, setters cannot attack', legal: false, explanation: 'INCORRECT! There is no rule preventing setters from attacking. If they\'re in the front row, they have the same attacking rights as any front row player.' },
      { id: 'sometimes', name: 'Only on the third touch', legal: false, explanation: 'INCORRECT! Front row players can attack on any touch (first, second, or third).' }
    ]
  },
  {
    id: 8,
    title: "Serve Touching the Net",
    description: "Your serve hits the top of the net and goes over into the opponent's court. What happens?",
    playerPosition: 1, // Server
    action: "let_serve",
    zones: [
      { id: 'fault', name: 'Service fault - point to opponent', legal: false, explanation: 'INCORRECT! Let serves (touching the net) are legal in modern volleyball.' },
      { id: 'legal', name: 'Legal serve - play continues', legal: true, explanation: 'CORRECT! As long as the serve goes over the net into the opponent\'s court, it\'s legal even if it touches the net. This is called a "let serve."' },
      { id: 'reserve', name: 'Reserve - serve again', legal: false, explanation: 'INCORRECT! There are no re-serves for net contact. If it goes over, it\'s in play.' }
    ]
  }
];
