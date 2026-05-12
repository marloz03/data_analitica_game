// Level 1: A single floor of Banco Guayaquil with 4 zones.
// World coordinates: (0,0) top-left, ground at GROUND_Y.
// All decorations / spawn points reference world pixels.

export const LEVEL_WIDTH = 3600;
export const LEVEL_HEIGHT = 450;
export const GROUND_Y = 380;

// Each zone defines its horizontal span and wall texture key.
export const ZONES = [
  { name: 'Data & Analítica', xStart: 0, xEnd: 900, wall: 'wall-data', carpetTint: 0x1d3a5f },
  { name: 'Arquitectura de Software', xStart: 900, xEnd: 1700, wall: 'wall-arch', carpetTint: 0x2a2a2a },
  { name: 'Seguridad de la Información', xStart: 1700, xEnd: 2500, wall: 'wall-sec', carpetTint: 0x1a1a1a },
  { name: 'TI · Cuarto de Servidores', xStart: 2500, xEnd: LEVEL_WIDTH, wall: 'wall-ti', carpetTint: 0x1a0a0a },
];

// Static decorations (cosmetic, non-colliding).
export const DECORATIONS = [
  // Zone A - Data & Analítica
  { type: 'window', x: 120, y: 90 },
  { type: 'kpi', x: 360, y: 110 },
  { type: 'window', x: 620, y: 90 },
  { type: 'logo', x: 800, y: 60 },

  { type: 'desk', x: 160, y: GROUND_Y - 20 },
  { type: 'monitor', x: 160, y: GROUND_Y - 56 },
  { type: 'desk', x: 320, y: GROUND_Y - 20 },
  { type: 'monitor', x: 320, y: GROUND_Y - 56 },
  { type: 'desk', x: 480, y: GROUND_Y - 20 },
  { type: 'monitor', x: 480, y: GROUND_Y - 56 },
  { type: 'coffee', x: 700, y: GROUND_Y - 36 },
  { type: 'desk', x: 800, y: GROUND_Y - 20 },
  { type: 'monitor', x: 800, y: GROUND_Y - 56 },

  // Zone B - Arquitectura de Software
  { type: 'kpi', x: 1100, y: 110 },
  { type: 'window', x: 1380, y: 90 },
  { type: 'desk', x: 1080, y: GROUND_Y - 20 },
  { type: 'monitor', x: 1080, y: GROUND_Y - 56 },
  { type: 'desk', x: 1280, y: GROUND_Y - 20 },
  { type: 'monitor', x: 1280, y: GROUND_Y - 56 },
  { type: 'desk', x: 1500, y: GROUND_Y - 20 },
  { type: 'monitor', x: 1500, y: GROUND_Y - 56 },

  // Zone C - Seguridad de la Información
  { type: 'window', x: 1820, y: 90 },
  { type: 'server', x: 1900, y: GROUND_Y - 50 },
  { type: 'desk', x: 2080, y: GROUND_Y - 20 },
  { type: 'monitor', x: 2080, y: GROUND_Y - 56 },
  { type: 'server', x: 2240, y: GROUND_Y - 50 },
  { type: 'desk', x: 2380, y: GROUND_Y - 20 },
  { type: 'monitor', x: 2380, y: GROUND_Y - 56 },

  // Zone D - TI / Cuarto de Servidores
  { type: 'logo', x: 2620, y: 60 },
  { type: 'server', x: 2700, y: GROUND_Y - 50 },
  { type: 'server', x: 2820, y: GROUND_Y - 50 },
  { type: 'server', x: 2960, y: GROUND_Y - 50 },
  { type: 'server', x: 3360, y: GROUND_Y - 50 },
  { type: 'server', x: 3460, y: GROUND_Y - 50 },
];

// Solid platforms (the player can stand on top, jump from below).
// Format: { x, y, w, h }
export const PLATFORMS = [
  // raised platform A (cubicle ledge)
  { x: 580, y: GROUND_Y - 90, w: 96, h: 12 },
  // raised platform B (arch zone)
  { x: 1200, y: GROUND_Y - 110, w: 128, h: 12 },
  { x: 1420, y: GROUND_Y - 90, w: 96, h: 12 },
  // sec zone: server top
  { x: 1900, y: GROUND_Y - 110, w: 64, h: 12 },
  { x: 2240, y: GROUND_Y - 110, w: 64, h: 12 },
];

// Doors between zones (cosmetic, mark transitions)
export const DOORS = [
  { x: 900, y: GROUND_Y - 64 },
  { x: 1700, y: GROUND_Y - 64 },
  { x: 2500, y: GROUND_Y - 64 },
];

// Enemy spawn points
export const ENEMY_SPAWNS = [
  // Arquitectos in zone B
  { type: 'architect', x: 1150, y: GROUND_Y - 30, patrolMin: 1060, patrolMax: 1280 },
  { type: 'architect', x: 1480, y: GROUND_Y - 30, patrolMin: 1400, patrolMax: 1620 },
  // Security in zone C
  { type: 'security', x: 1900, y: GROUND_Y - 30, patrolMin: 1780, patrolMax: 1980 },
  { type: 'security', x: 2280, y: GROUND_Y - 30, patrolMin: 2160, patrolMax: 2420 },
];

// Player + boss spawn
export const PLAYER_SPAWN = { x: 80, y: GROUND_Y - 60 };
export const BOSS_SPAWN = { x: 3200, y: GROUND_Y - 80 };
export const BOSS_PATROL = { min: 3000, max: 3400 };

// Restart button (appears after boss defeat)
export const RESTART_BUTTON = { x: 3500, y: GROUND_Y - 30 };

export const ZONE_TRIGGER_MARGIN = 20;
