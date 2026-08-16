// Guided jumps from the Rules Hub into a preconfigured Simulator view.

export const demonstrations = [
  {
    id: 1,
    title: 'Court Positioning & Attack Zones',
    category: 'Positions',
    description: 'See where front row and back row players can legally attack from',
    simulatorFeature: 'attackZones',
    instructions: 'Click below to open the Simulator with Attack Zones enabled. You\'ll see green zones (front row can attack anywhere) and red zones (back row must jump behind 10-foot line).'
  },
  {
    id: 2,
    title: 'Rotation Patterns',
    category: 'Positions',
    description: 'Understand how players rotate clockwise through all 6 positions',
    simulatorFeature: 'rotationPreview',
    instructions: 'Click below to open the Simulator with Rotation Preview enabled. Yellow arrows will show you where each player moves on the next rotation.'
  },
  {
    id: 3,
    title: 'Attack Line Restrictions',
    category: 'Positions',
    description: 'Learn the 10-foot line rule for back row attackers',
    simulatorFeature: 'attackZones',
    instructions: 'Click below to see the highlighted 10-foot attack line. Back row players must take off behind this line when attacking above the net.'
  },
  {
    id: 4,
    title: 'Blocking Fundamentals',
    category: 'Blocking',
    description: 'See which players can block and which cannot',
    simulatorFeature: 'blockingRules',
    instructions: 'Click below to open the Simulator with Blocking Rules enabled. Front row players show "✓ CAN BLOCK" and back row show "✗ NO BLOCK".'
  },
  {
    id: 5,
    title: 'Common Violations',
    category: 'Violations',
    description: 'Practice identifying rule violations with interactive scenarios',
    simulatorFeature: 'scenarios',
    instructions: 'Click below to open Scenario Mode where you can test your knowledge of 8 common volleyball violations with instant feedback.'
  }
];
