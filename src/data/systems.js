// Offensive systems, the rotation position map, and where each court slot
// sits as a percentage of the court box.

export const systemRoles = {
  '5-1': {
    1: { role: 'S', fullRole: 'Setter', color: '#FF9B6B' },
    2: { role: 'OH', fullRole: 'Outside Hitter', color: '#5FFAEE' },
    3: { role: 'MB', fullRole: 'Middle Blocker', color: '#95E1D3' },
    4: { role: 'OPP', fullRole: 'Opposite', color: '#F38181' },
    5: { role: 'OH', fullRole: 'Outside Hitter', color: '#5FFAEE' },
    6: { role: 'MB', fullRole: 'Middle Blocker', color: '#95E1D3' }
  },
  '6-2': {
    1: { role: 'S', fullRole: 'Setter', color: '#FF9B6B' },
    2: { role: 'OH', fullRole: 'Outside Hitter', color: '#5FFAEE' },
    3: { role: 'MB', fullRole: 'Middle Blocker', color: '#95E1D3' },
    4: { role: 'S', fullRole: 'Setter', color: '#FF9B6B' },
    5: { role: 'OH', fullRole: 'Outside Hitter', color: '#5FFAEE' },
    6: { role: 'MB', fullRole: 'Middle Blocker', color: '#95E1D3' }
  },
  '4-2': {
    1: { role: 'S', fullRole: 'Setter', color: '#FF9B6B' },
    2: { role: 'H', fullRole: 'Hitter', color: '#5FFAEE' },
    3: { role: 'H', fullRole: 'Hitter', color: '#5FFAEE' },
    4: { role: 'S', fullRole: 'Setter', color: '#FF9B6B' },
    5: { role: 'H', fullRole: 'Hitter', color: '#5FFAEE' },
    6: { role: 'H', fullRole: 'Hitter', color: '#5FFAEE' }
  }
};

export const rotationPositions = {
  1: [1, 2, 3, 4, 5, 6],
  2: [6, 1, 2, 3, 4, 5],
  3: [5, 6, 1, 2, 3, 4],
  4: [4, 5, 6, 1, 2, 3],
  5: [3, 4, 5, 6, 1, 2],
  6: [2, 3, 4, 5, 6, 1]
};

export const courtPositions = {
  1: { x: 75, y: 75 },
  2: { x: 75, y: 25 },
  3: { x: 50, y: 25 },
  4: { x: 25, y: 25 },
  5: { x: 25, y: 75 },
  6: { x: 50, y: 75 }
};
