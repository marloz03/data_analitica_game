import { GAME_WIDTH, GAME_HEIGHT } from '../main.js';
import { PALETTE } from '../art/textures.js';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  create() {
    const w = GAME_WIDTH;
    const h = GAME_HEIGHT;
    this.add.rectangle(w / 2, h / 2, w, h, 0x0a0d12);
    this.add.rectangle(w / 2, h - 30, w, 6, PALETTE.red).setAlpha(0.9);

    this.add
      .text(w / 2, 100, 'GAME OVER', {
        fontFamily: 'monospace',
        fontSize: '44px',
        color: '#e63946',
        stroke: '#000000',
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    this.add
      .text(w / 2, 160, 'Te encontró Talento Humano.\nEl servidor sigue caído.', {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#ffffff',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add.image(w / 2, 260, 'boss').setScale(3).setTint(0xff5555);

    const btn = this.add
      .rectangle(w / 2, h - 70, 220, 46, PALETTE.red)
      .setStrokeStyle(3, PALETTE.white)
      .setInteractive({ useHandCursor: true });
    this.add
      .text(w / 2, h - 70, '↻ Reintentar', {
        fontFamily: 'monospace',
        fontSize: '18px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
    btn.on('pointerdown', () => {
      this.scene.launch('HUDScene');
      this.scene.start('GameScene');
    });
    this.input.keyboard.once('keydown-ENTER', () => {
      this.scene.launch('HUDScene');
      this.scene.start('GameScene');
    });
    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.launch('HUDScene');
      this.scene.start('GameScene');
    });
  }
}
