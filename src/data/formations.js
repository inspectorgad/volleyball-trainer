// Defensive and serve-receive coverage overlays drawn on the court.

export const defensiveFormations = {
  perimeter: {
    name: 'Perimeter Defense',
    description: 'Standard defense with players spread around the court perimeter. Good for general coverage.',
    zones: {
      1: { area: 'Back Right Corner', responsibility: 'Deep corner shots, right side coverage' },
      2: { area: 'Right Front', responsibility: 'Right side attacks, tip coverage' },
      3: { area: 'Middle Front', responsibility: 'Middle attacks, quick sets, blocking' },
      4: { area: 'Left Front', responsibility: 'Left side attacks, outside hits' },
      5: { area: 'Back Left Corner', responsibility: 'Deep corner shots, left side coverage' },
      6: { area: 'Back Middle', responsibility: 'Deep middle, off-blocker coverage' }
    },
    coverage: [
      { x: 85, y: 85, size: 80, color: 'rgba(78, 205, 196, 0.2)' }, // Pos 1
      { x: 85, y: 25, size: 60, color: 'rgba(149, 225, 211, 0.2)' }, // Pos 2
      { x: 50, y: 15, size: 60, color: 'rgba(149, 225, 211, 0.2)' }, // Pos 3
      { x: 15, y: 25, size: 60, color: 'rgba(149, 225, 211, 0.2)' }, // Pos 4
      { x: 15, y: 85, size: 80, color: 'rgba(78, 205, 196, 0.2)' }, // Pos 5
      { x: 50, y: 70, size: 70, color: 'rgba(78, 205, 196, 0.2)' }  // Pos 6
    ]
  },
  rotational: {
    name: 'Rotational Defense',
    description: 'Players rotate to fill gaps based on attack direction. Middle back shifts to cover.',
    zones: {
      1: { area: 'Back Right/Middle', responsibility: 'Shift to cover right or middle based on set' },
      2: { area: 'Right Front Block', responsibility: 'Primary blocker on right side attacks' },
      3: { area: 'Middle Block', responsibility: 'Read and react, close blocks' },
      4: { area: 'Left Front Block', responsibility: 'Primary blocker on left side attacks' },
      5: { area: 'Back Left/Middle', responsibility: 'Shift to cover left or middle based on set' },
      6: { area: 'Deep Middle Rover', responsibility: 'Fill gaps, deep coverage, shift with attack' }
    },
    coverage: [
      { x: 75, y: 70, size: 75, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 1
      { x: 85, y: 20, size: 55, color: 'rgba(255, 165, 0, 0.2)' }, // Pos 2
      { x: 50, y: 15, size: 55, color: 'rgba(255, 165, 0, 0.2)' }, // Pos 3
      { x: 15, y: 20, size: 55, color: 'rgba(255, 165, 0, 0.2)' }, // Pos 4
      { x: 25, y: 70, size: 75, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 5
      { x: 50, y: 80, size: 85, color: 'rgba(255, 217, 61, 0.2)' }  // Pos 6
    ]
  },
  'middle-back': {
    name: 'Middle-Back Defense',
    description: 'Middle back player plays deeper. Great for covering tips and off-speed shots.',
    zones: {
      1: { area: 'Right Back Deep', responsibility: 'Deep right corner, line shots' },
      2: { area: 'Right Front', responsibility: 'Block, short coverage, tips' },
      3: { area: 'Middle Front', responsibility: 'Primary blocker, read middle attacks' },
      4: { area: 'Left Front', responsibility: 'Block, short coverage, tips' },
      5: { area: 'Left Back Deep', responsibility: 'Deep left corner, angle shots' },
      6: { area: 'Middle Deep Libero', responsibility: 'Very deep, off-blocker, power shots' }
    },
    coverage: [
      { x: 85, y: 90, size: 70, color: 'rgba(243, 129, 129, 0.2)' }, // Pos 1
      { x: 85, y: 25, size: 60, color: 'rgba(255, 107, 53, 0.2)' }, // Pos 2
      { x: 50, y: 15, size: 60, color: 'rgba(255, 107, 53, 0.2)' }, // Pos 3
      { x: 15, y: 25, size: 60, color: 'rgba(255, 107, 53, 0.2)' }, // Pos 4
      { x: 15, y: 90, size: 70, color: 'rgba(243, 129, 129, 0.2)' }, // Pos 5
      { x: 50, y: 85, size: 85, color: 'rgba(243, 129, 129, 0.2)' }  // Pos 6
    ]
  }
};

// Serve Receive Formations - W/2-1-3 pattern (most common in NCAA)

export const serveReceiveFormations = {
  1: {
    name: 'Rotation 1 - Setter in Back Right',
    offPlayer: 1, // Setter is "off" (won't pass)
    zones: {
      1: { role: 'Setter', passing: 'off', responsibility: 'Hiding behind service line, will set', zone: 'No passing zone', color: 'rgba(243, 129, 129, 0.3)', priority: 'off' },
      2: { role: 'OH', passing: 'primary', responsibility: 'Primary passer - right side', zone: 'Right third of court', color: 'rgba(149, 225, 211, 0.3)', priority: 'primary' },
      3: { role: 'MB', passing: 'secondary', responsibility: 'Secondary passer - middle', zone: 'Middle seam coverage', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' },
      4: { role: 'OPP', passing: 'secondary', responsibility: 'Deep middle coverage', zone: 'Back middle court', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' },
      5: { role: 'OH', passing: 'primary', responsibility: 'Primary passer - left side', zone: 'Left third of court', color: 'rgba(149, 225, 211, 0.3)', priority: 'primary' },
      6: { role: 'MB', passing: 'secondary', responsibility: 'Secondary passer - middle', zone: 'Middle seam coverage', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' }
    },
    coverage: [
      { x: 88, y: 90, size: 40, color: 'rgba(243, 129, 129, 0.3)' }, // Pos 1 - OFF (setter hiding)
      { x: 75, y: 45, size: 95, color: 'rgba(149, 225, 211, 0.3)' }, // Pos 2 - Primary OH
      { x: 55, y: 30, size: 70, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 3 - Secondary MB
      { x: 50, y: 75, size: 80, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 4 - Secondary OPP
      { x: 25, y: 45, size: 95, color: 'rgba(149, 225, 211, 0.3)' }, // Pos 5 - Primary OH
      { x: 45, y: 30, size: 70, color: 'rgba(255, 217, 61, 0.2)' }  // Pos 6 - Secondary MB
    ]
  },
  2: {
    name: 'Rotation 2 - Setter in Back Middle',
    offPlayer: 6,
    zones: {
      1: { role: 'OH', passing: 'primary', responsibility: 'Primary passer - right side', zone: 'Right third of court', color: 'rgba(149, 225, 211, 0.3)', priority: 'primary' },
      2: { role: 'MB', passing: 'secondary', responsibility: 'Secondary passer - front right', zone: 'Right seam coverage', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' },
      3: { role: 'OPP', passing: 'secondary', responsibility: 'Secondary passer - middle', zone: 'Middle court', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' },
      4: { role: 'OH', passing: 'primary', responsibility: 'Primary passer - left side', zone: 'Left third of court', color: 'rgba(149, 225, 211, 0.3)', priority: 'primary' },
      5: { role: 'MB', passing: 'secondary', responsibility: 'Secondary passer - back left', zone: 'Left back coverage', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' },
      6: { role: 'Setter', passing: 'off', responsibility: 'Hiding behind service line, will set', zone: 'No passing zone', color: 'rgba(243, 129, 129, 0.3)', priority: 'off' }
    },
    coverage: [
      { x: 75, y: 60, size: 95, color: 'rgba(149, 225, 211, 0.3)' }, // Pos 1 - Primary OH
      { x: 70, y: 25, size: 70, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 2 - Secondary MB
      { x: 50, y: 30, size: 75, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 3 - Secondary OPP
      { x: 25, y: 45, size: 95, color: 'rgba(149, 225, 211, 0.3)' }, // Pos 4 - Primary OH
      { x: 30, y: 75, size: 70, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 5 - Secondary MB
      { x: 50, y: 90, size: 40, color: 'rgba(243, 129, 129, 0.3)' }  // Pos 6 - OFF (setter hiding)
    ]
  },
  3: {
    name: 'Rotation 3 - Setter in Back Left',
    offPlayer: 5,
    zones: {
      1: { role: 'MB', passing: 'secondary', responsibility: 'Secondary passer - back right', zone: 'Right back coverage', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' },
      2: { role: 'OPP', passing: 'secondary', responsibility: 'Secondary passer - front right', zone: 'Right front', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' },
      3: { role: 'OH', passing: 'primary', responsibility: 'Primary passer - middle', zone: 'Middle to right', color: 'rgba(149, 225, 211, 0.3)', priority: 'primary' },
      4: { role: 'MB', passing: 'secondary', responsibility: 'Secondary passer - left front', zone: 'Left seam coverage', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' },
      5: { role: 'Setter', passing: 'off', responsibility: 'Hiding behind service line, will set', zone: 'No passing zone', color: 'rgba(243, 129, 129, 0.3)', priority: 'off' },
      6: { role: 'OH', passing: 'primary', responsibility: 'Primary passer - back middle', zone: 'Back middle to left', color: 'rgba(149, 225, 211, 0.3)', priority: 'primary' }
    },
    coverage: [
      { x: 70, y: 75, size: 70, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 1 - Secondary MB
      { x: 75, y: 30, size: 75, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 2 - Secondary OPP
      { x: 55, y: 45, size: 95, color: 'rgba(149, 225, 211, 0.3)' }, // Pos 3 - Primary OH
      { x: 30, y: 25, size: 70, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 4 - Secondary MB
      { x: 12, y: 90, size: 40, color: 'rgba(243, 129, 129, 0.3)' }, // Pos 5 - OFF (setter hiding)
      { x: 45, y: 65, size: 95, color: 'rgba(149, 225, 211, 0.3)' }  // Pos 6 - Primary OH
    ]
  },
  4: {
    name: 'Rotation 4 - Setter in Front Right',
    offPlayer: 2,
    zones: {
      1: { role: 'OH', passing: 'primary', responsibility: 'Primary passer - back right', zone: 'Right side deep', color: 'rgba(149, 225, 211, 0.3)', priority: 'primary' },
      2: { role: 'Setter', passing: 'off', responsibility: 'Will transition to set, not passing', zone: 'No passing zone', color: 'rgba(243, 129, 129, 0.3)', priority: 'off' },
      3: { role: 'MB', passing: 'secondary', responsibility: 'Secondary passer - middle', zone: 'Middle coverage', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' },
      4: { role: 'OH', passing: 'primary', responsibility: 'Primary passer - left front', zone: 'Left side coverage', color: 'rgba(149, 225, 211, 0.3)', priority: 'primary' },
      5: { role: 'OPP', passing: 'secondary', responsibility: 'Deep middle coverage', zone: 'Back middle', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' },
      6: { role: 'MB', passing: 'secondary', responsibility: 'Secondary passer - back middle', zone: 'Middle back', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' }
    },
    coverage: [
      { x: 75, y: 70, size: 95, color: 'rgba(149, 225, 211, 0.3)' }, // Pos 1 - Primary OH
      { x: 85, y: 30, size: 40, color: 'rgba(243, 129, 129, 0.3)' }, // Pos 2 - OFF (setter, will move to net)
      { x: 50, y: 35, size: 70, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 3 - Secondary MB
      { x: 25, y: 40, size: 95, color: 'rgba(149, 225, 211, 0.3)' }, // Pos 4 - Primary OH
      { x: 40, y: 75, size: 75, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 5 - Secondary OPP
      { x: 60, y: 75, size: 70, color: 'rgba(255, 217, 61, 0.2)' }  // Pos 6 - Secondary MB
    ]
  },
  5: {
    name: 'Rotation 5 - Setter in Front Middle',
    offPlayer: 3,
    zones: {
      1: { role: 'MB', passing: 'secondary', responsibility: 'Secondary passer - back right', zone: 'Right back', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' },
      2: { role: 'OH', passing: 'primary', responsibility: 'Primary passer - right front', zone: 'Right side', color: 'rgba(149, 225, 211, 0.3)', priority: 'primary' },
      3: { role: 'Setter', passing: 'off', responsibility: 'Will transition to set, not passing', zone: 'No passing zone', color: 'rgba(243, 129, 129, 0.3)', priority: 'off' },
      4: { role: 'OPP', passing: 'secondary', responsibility: 'Secondary passer - left', zone: 'Left side', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' },
      5: { role: 'OH', passing: 'primary', responsibility: 'Primary passer - back left', zone: 'Left back', color: 'rgba(149, 225, 211, 0.3)', priority: 'primary' },
      6: { role: 'MB', passing: 'secondary', responsibility: 'Secondary passer - deep middle', zone: 'Back middle', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' }
    },
    coverage: [
      { x: 70, y: 80, size: 70, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 1 - Secondary MB
      { x: 65, y: 45, size: 95, color: 'rgba(149, 225, 211, 0.3)' }, // Pos 2 - Primary OH
      { x: 50, y: 20, size: 40, color: 'rgba(243, 129, 129, 0.3)' }, // Pos 3 - OFF (setter, will move to set)
      { x: 25, y: 35, size: 75, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 4 - Secondary OPP
      { x: 30, y: 70, size: 95, color: 'rgba(149, 225, 211, 0.3)' }, // Pos 5 - Primary OH
      { x: 50, y: 75, size: 70, color: 'rgba(255, 217, 61, 0.2)' }  // Pos 6 - Secondary MB
    ]
  },
  6: {
    name: 'Rotation 6 - Setter in Front Left',
    offPlayer: 4,
    zones: {
      1: { role: 'OPP', passing: 'secondary', responsibility: 'Secondary passer - back right', zone: 'Right back', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' },
      2: { role: 'MB', passing: 'secondary', responsibility: 'Secondary passer - right front', zone: 'Right seam', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' },
      3: { role: 'OH', passing: 'primary', responsibility: 'Primary passer - middle', zone: 'Middle to right', color: 'rgba(149, 225, 211, 0.3)', priority: 'primary' },
      4: { role: 'Setter', passing: 'off', responsibility: 'Will transition to set, not passing', zone: 'No passing zone', color: 'rgba(243, 129, 129, 0.3)', priority: 'off' },
      5: { role: 'MB', passing: 'secondary', responsibility: 'Secondary passer - back left', zone: 'Left back', color: 'rgba(255, 217, 61, 0.2)', priority: 'secondary' },
      6: { role: 'OH', passing: 'primary', responsibility: 'Primary passer - middle back', zone: 'Middle to left', color: 'rgba(149, 225, 211, 0.3)', priority: 'primary' }
    },
    coverage: [
      { x: 65, y: 75, size: 75, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 1 - Secondary OPP
      { x: 70, y: 30, size: 70, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 2 - Secondary MB
      { x: 55, y: 50, size: 95, color: 'rgba(149, 225, 211, 0.3)' }, // Pos 3 - Primary OH
      { x: 15, y: 25, size: 40, color: 'rgba(243, 129, 129, 0.3)' }, // Pos 4 - OFF (setter, will move to set)
      { x: 30, y: 75, size: 70, color: 'rgba(255, 217, 61, 0.2)' }, // Pos 5 - Secondary MB
      { x: 45, y: 60, size: 95, color: 'rgba(149, 225, 211, 0.3)' }  // Pos 6 - Primary OH
    ]
  }
};

// Get next rotation positions
