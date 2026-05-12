import { GAME_WIDTH, GAME_HEIGHT } from '../main.js';
import { PALETTE } from '../art/textures.js';

export class VictoryScene extends Phaser.Scene {
  constructor() {
    super('VictoryScene');
  }

  create() {
    const w = GAME_WIDTH;
    const h = GAME_HEIGHT;
    this.add.rectangle(w / 2, h / 2, w, h, PALETTE.navyDark);
    this.add.rectangle(w / 2, h - 30, w, 6, PALETTE.orange).setAlpha(0.9);

    this.add
      .text(w / 2, 80, '✓ SERVIDOR REINICIADO', {
        fontFamily: 'monospace',
        fontSize: '32px',
        color: '#22c55e',
        stroke: '#000000',
        strokeThickness: 5,
      })
      .setOrigin(0.5);

    this.add
      .text(w / 2, 130, 'Operaciones del Banco Guayaquil restauradas.', {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    const heroPlayer = this.add.image(w / 2 - 80, 230, 'player').setScale(3);
    this.add.image(w / 2 + 80, 230, 'boss').setScale(2.4).setAngle(90).setAlpha(0.5);

    this.tweens.add({
      targets: heroPlayer,
      y: '+=8',
      yoyo: true,
      repeat: -1,
      duration: 600,
      ease: 'Sine.easeInOut',
    });

    this.add
      .text(
        w / 2,
        320,
        'Fernando Vargas ha sido derrotado.\nLa data fluye nuevamente.',
        {
          fontFamily: 'monospace',
          fontSize: '14px',
          color: '#ffd23f',
          align: 'center',
        },
      )
      .setOrigin(0.5);

    const btn = this.add
      .rectangle(w / 2, h - 70, 220, 46, PALETTE.orange)
      .setStrokeStyle(3, PALETTE.white)
      .setInteractive({ useHandCursor: true });
    this.add
      .text(w / 2, h - 70, '↻ Jugar de nuevo', {
        fontFamily: 'monospace',
        fontSize: '18px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
    btn.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
    this.input.keyboard.once('keydown-ENTER', () => this.scene.start('MenuScene'));
    this.input.keyboard.once('keydown-SPACE', () => this.scene.start('MenuScene'));
  }
}
