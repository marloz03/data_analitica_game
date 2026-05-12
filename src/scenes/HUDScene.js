import { GAME_WIDTH, GAME_HEIGHT } from '../main.js';
import { PALETTE } from '../art/textures.js';

export class HUDScene extends Phaser.Scene {
  constructor() {
    super('HUDScene');
  }

  create() {
    this.hearts = [];
    this.hp = 3;
    this.maxHp = 3;
    this.renderHearts();

    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 900;

    if (isTouch) {
      this.buildTouchControls();
    }
  }

  renderHearts() {
    for (const h of this.hearts) h.destroy();
    this.hearts = [];
    for (let i = 0; i < this.maxHp; i++) {
      const img = this.add.image(20 + i * 28, 22, 'heart').setScale(2);
      img.setScrollFactor(0);
      if (i >= this.hp) img.setTint(0x444444);
      this.hearts.push(img);
    }
  }

  setHp(hp, maxHp) {
    this.hp = hp;
    this.maxHp = maxHp;
    if (this.hearts) this.renderHearts();
  }

  buildTouchControls() {
    const game = this.scene.get('GameScene');
    const flags = game ? game.touchInput : null;
    if (!flags) return;

    const padY = GAME_HEIGHT - 70;
    const padXLeft = 70;
    const padXRight = GAME_WIDTH - 70;
    const buttonAlpha = 0.55;
    const buttonRadius = 32;

    const makeBtn = (x, y, label, color, onDown, onUp) => {
      const bg = this.add
        .circle(x, y, buttonRadius, color, buttonAlpha)
        .setStrokeStyle(2, 0xffffff, 0.8)
        .setScrollFactor(0)
        .setDepth(100)
        .setInteractive({ useHandCursor: true });
      const txt = this.add
        .text(x, y, label, {
          fontFamily: 'monospace',
          fontSize: '20px',
          color: '#ffffff',
        })
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(101);
      const setActive = (active) => {
        bg.setFillStyle(color, active ? 0.85 : buttonAlpha);
      };
      bg.on('pointerdown', () => {
        onDown();
        setActive(true);
      });
      bg.on('pointerup', () => {
        onUp();
        setActive(false);
      });
      bg.on('pointerout', () => {
        onUp();
        setActive(false);
      });
      bg.on('pointerupoutside', () => {
        onUp();
        setActive(false);
      });
      return { bg, txt };
    };

    // D-pad
    makeBtn(
      padXLeft - 40,
      padY,
      '◀',
      PALETTE.navy,
      () => (flags.left = true),
      () => (flags.left = false),
    );
    makeBtn(
      padXLeft + 40,
      padY,
      '▶',
      PALETTE.navy,
      () => (flags.right = true),
      () => (flags.right = false),
    );

    // Jump + Attack
    makeBtn(
      padXRight - 40,
      padY,
      '▲',
      PALETTE.orange,
      () => (flags.jump = true),
      () => (flags.jump = false),
    );
    makeBtn(
      padXRight + 40,
      padY,
      'ATQ',
      PALETTE.red,
      () => (flags.attack = true),
      () => (flags.attack = false),
    );

    // Hint
    this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT - 14, 'Toca los botones para moverte / saltar / atacar', {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#bcbcbc',
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(100)
      .setAlpha(0.7);
  }
}
