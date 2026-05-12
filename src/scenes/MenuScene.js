import { GAME_WIDTH, GAME_HEIGHT } from '../main.js';
import { PALETTE } from '../art/textures.js';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const w = GAME_WIDTH;
    const h = GAME_HEIGHT;

    // Background: navy gradient
    this.add.rectangle(w / 2, h / 2, w, h, PALETTE.navyDark);
    const stripe = this.add.rectangle(w / 2, h - 40, w, 6, PALETTE.orange);
    stripe.setAlpha(0.85);

    // Decorative tiled walls
    for (let x = 0; x < w; x += 16) {
      const s = this.add.image(x + 8, 60, 'wall-data').setScale(1);
      s.setAlpha(0.35);
    }

    // Title
    this.add
      .text(w / 2, 120, 'REINICIA EL SERVIDOR', {
        fontFamily: 'monospace',
        fontSize: '36px',
        color: '#ffffff',
        stroke: '#003d7a',
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    this.add
      .text(w / 2, 160, 'Banco Guayaquil — Piso Data & Analítica', {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: '#ff6b00',
      })
      .setOrigin(0.5);

    // Decorative characters
    const player = this.add.image(w / 2 - 160, 250, 'player').setScale(2.5);
    player.setTint(0xffffff);
    const boss = this.add.image(w / 2 + 160, 250, 'boss').setScale(2.2);

    this.tweens.add({
      targets: [player, boss],
      y: '+=6',
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.add
      .text(w / 2, 250, 'VS', {
        fontFamily: 'monospace',
        fontSize: '40px',
        color: '#ffd23f',
        stroke: '#000000',
        strokeThickness: 5,
      })
      .setOrigin(0.5);

    this.add
      .text(w / 2, 320, 'Misión: llegar al cuarto de TI y reiniciar el servidor.', {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#e6f0ff',
      })
      .setOrigin(0.5);

    // Play button
    const btn = this.add
      .rectangle(w / 2, h - 70, 220, 50, PALETTE.orange)
      .setStrokeStyle(3, PALETTE.white)
      .setInteractive({ useHandCursor: true });
    this.add
      .text(w / 2, h - 70, '▶ JUGAR', {
        fontFamily: 'monospace',
        fontSize: '22px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    btn.on('pointerover', () => btn.setFillStyle(PALETTE.orangeLight));
    btn.on('pointerout', () => btn.setFillStyle(PALETTE.orange));
    btn.on('pointerdown', () => {
      this.scene.launch('HUDScene');
      this.scene.start('GameScene');
    });

    // Controls hint
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const controlsText = isTouch
      ? 'Controles táctiles aparecerán en pantalla.'
      : 'Controles: ← → mover • ESPACIO saltar • J atacar';
    this.add
      .text(w / 2, h - 20, controlsText, {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#bcbcbc',
      })
      .setOrigin(0.5);

    // Keyboard shortcut
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
