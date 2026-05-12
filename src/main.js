import { BootScene } from './scenes/BootScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { HUDScene } from './scenes/HUDScene.js';
import { VictoryScene } from './scenes/VictoryScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 450;

const fallback = document.getElementById('fallback');
if (fallback) fallback.remove();

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#000814',
  pixelArt: true,
  roundPixels: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 900 },
      debug: false,
    },
  },
  input: {
    activePointers: 4, // multi-touch
  },
  scene: [BootScene, MenuScene, GameScene, HUDScene, VictoryScene, GameOverScene],
};

const game = new Phaser.Game(config);
// Expose for debugging in headless tests / dev consoles
window.__game = game;
