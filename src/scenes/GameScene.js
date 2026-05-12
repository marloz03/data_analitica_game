import { GAME_HEIGHT } from '../main.js';
import { PALETTE } from '../art/textures.js';
import {
  LEVEL_WIDTH,
  GROUND_Y,
  ZONES,
  DECORATIONS,
  PLATFORMS,
  DOORS,
  ENEMY_SPAWNS,
  PLAYER_SPAWN,
  BOSS_SPAWN,
  BOSS_PATROL,
  RESTART_BUTTON,
} from '../level/level1.js';
import { Player } from '../entities/Player.js';
import { ArchitectEnemy } from '../entities/ArchitectEnemy.js';
import { SecurityEnemy } from '../entities/SecurityEnemy.js';
import { Boss } from '../entities/Boss.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.physics.world.setBounds(0, 0, LEVEL_WIDTH, LEVEL_HEIGHT_PX());
    this.cameras.main.setBounds(0, 0, LEVEL_WIDTH, LEVEL_HEIGHT_PX());

    this.buildBackground();
    this.buildPlatforms();
    this.buildDecorations();

    // Player
    this.player = new Player(this, PLAYER_SPAWN.x, PLAYER_SPAWN.y);
    this.physics.add.collider(this.player, this.platforms);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1, 0, 60);

    // Groups
    this.playerBullets = this.physics.add.group({ allowGravity: false });
    this.enemyBullets = this.physics.add.group({ allowGravity: false });
    this.bossOrbs = this.physics.add.group({ allowGravity: false });
    this.enemies = this.physics.add.group();
    this.physics.add.collider(this.enemies, this.platforms);

    // Spawn enemies
    for (const spawn of ENEMY_SPAWNS) {
      this.spawnEnemy(spawn);
    }

    // Boss
    this.boss = new Boss(this, BOSS_SPAWN.x, BOSS_SPAWN.y);
    this.boss.setPatrolBounds(BOSS_PATROL.min, BOSS_PATROL.max);
    this.physics.add.collider(this.boss, this.platforms);

    // Restart button (hidden until boss defeated)
    this.restartButton = this.physics.add.staticImage(
      RESTART_BUTTON.x,
      RESTART_BUTTON.y,
      'restartBtn',
    );
    this.restartButton.setScale(1.6);
    this.restartButton.refreshBody();
    this.restartButton.setVisible(false);
    this.restartButton.body.checkCollision.none = true;
    this.bossDefeated = false;
    this.victoryTriggered = false;

    // Collisions
    this.physics.add.overlap(this.playerBullets, this.enemies, this.onBulletEnemy, null, this);
    this.physics.add.overlap(this.playerBullets, this.boss, this.onBulletBoss, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.onPlayerEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemyBullets, this.onPlayerBullet, null, this);
    this.physics.add.overlap(this.player, this.bossOrbs, this.onPlayerBullet, null, this);
    this.physics.add.overlap(this.player, this.boss, this.onPlayerEnemy, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      A: Phaser.Input.Keyboard.KeyCodes.A,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      W: Phaser.Input.Keyboard.KeyCodes.W,
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
      J: Phaser.Input.Keyboard.KeyCodes.J,
      X: Phaser.Input.Keyboard.KeyCodes.X,
      UP: Phaser.Input.Keyboard.KeyCodes.UP,
      E: Phaser.Input.Keyboard.KeyCodes.E,
    });

    // Touch flags fed by HUDScene
    this.touchInput = { left: false, right: false, jump: false, attack: false };

    // Zone banner
    this.currentZoneIndex = -1;
    this.zoneBanner = this.add
      .text(this.cameras.main.width / 2, 30, '', {
        fontFamily: 'monospace',
        fontSize: '20px',
        color: '#ffffff',
        stroke: '#003d7a',
        strokeThickness: 5,
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(50)
      .setAlpha(0);

    // Boss HP bar (only visible in boss zone)
    this.bossHpBg = this.add
      .rectangle(this.cameras.main.width / 2, 60, 340, 12, 0x222222)
      .setScrollFactor(0)
      .setStrokeStyle(2, 0xffffff)
      .setDepth(50)
      .setVisible(false);
    this.bossHpFill = this.add
      .rectangle(this.cameras.main.width / 2 - 168, 60, 336, 8, PALETTE.red)
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(51)
      .setVisible(false);
    this.bossLabel = this.add
      .text(this.cameras.main.width / 2, 44, 'Fernando Vargas — Gerente de Arquitectura de Datos', {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#ffd23f',
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(50)
      .setVisible(false);

    // Tutorial hint at start
    this.tutorialText = this.add
      .text(PLAYER_SPAWN.x + 40, PLAYER_SPAWN.y - 90, '→ Avanza al cuarto de TI\n[J / ATQ] dispara USB\n[ESPACIO / ▲] salta', {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#ffffff',
        backgroundColor: '#003d7a',
        padding: { x: 6, y: 4 },
      })
      .setDepth(45);
    this.time.delayedCall(8000, () => {
      if (this.tutorialText) this.tweens.add({ targets: this.tutorialText, alpha: 0, duration: 500, onComplete: () => this.tutorialText.destroy() });
    });

    // Trigger zone banner for the initial zone
    this.updateZone(true);
  }

  buildBackground() {
    // Sky / ceiling: soft navy gradient via stacked rectangles
    this.add
      .rectangle(LEVEL_WIDTH / 2, GAME_HEIGHT / 2, LEVEL_WIDTH, GAME_HEIGHT, PALETTE.navyDark)
      .setScrollFactor(1, 0);

    // Per-zone wall band (top half) + carpet floor
    for (const zone of ZONES) {
      const w = zone.xEnd - zone.xStart;
      // tiled wall
      const wallY = 0;
      const wallH = GROUND_Y - 40;
      const wallTex = zone.wall;
      // Render as tileSprite for performance
      const wall = this.add
        .tileSprite(zone.xStart, wallY, w, wallH, wallTex)
        .setOrigin(0, 0)
        .setScrollFactor(1, 1)
        .setAlpha(0.85);
      wall.setDepth(0);

      // Trim band at bottom of wall (corporate skirting board)
      this.add
        .rectangle(zone.xStart, GROUND_Y - 40, w, 4, PALETTE.orange)
        .setOrigin(0, 0)
        .setDepth(1)
        .setAlpha(0.8);

      // Carpet
      const carpet = this.add
        .tileSprite(zone.xStart, GROUND_Y - 36, w, GAME_HEIGHT - GROUND_Y + 36, 'floor')
        .setOrigin(0, 0)
        .setTint(zone.carpetTint)
        .setDepth(1);
      carpet.setAlpha(0.95);

      // Zone label sign on wall (small)
      this.add
        .text(zone.xStart + 24, 18, zone.name, {
          fontFamily: 'monospace',
          fontSize: '10px',
          color: '#ffd23f',
          backgroundColor: '#003d7a',
          padding: { x: 4, y: 2 },
        })
        .setDepth(2);
    }
  }

  buildPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    // Ground - one wide invisible static body across the level
    const ground = this.add.rectangle(LEVEL_WIDTH / 2, GROUND_Y + 10, LEVEL_WIDTH, 20, 0x000000, 0);
    this.physics.add.existing(ground, true);
    this.platforms.add(ground);
    ground.setDepth(0);

    // Visual ground accent line
    this.add
      .rectangle(LEVEL_WIDTH / 2, GROUND_Y + 1, LEVEL_WIDTH, 2, PALETTE.navy)
      .setDepth(2)
      .setAlpha(0.5);

    // Raised platforms
    for (const p of PLATFORMS) {
      const rect = this.add.rectangle(p.x + p.w / 2, p.y + p.h / 2, p.w, p.h, PALETTE.navy);
      rect.setStrokeStyle(1, PALETTE.orange);
      this.physics.add.existing(rect, true);
      this.platforms.add(rect);
      rect.setDepth(3);
    }
  }

  buildDecorations() {
    for (const d of DECORATIONS) {
      const img = this.add.image(d.x, d.y, d.type);
      img.setOrigin(0.5, 1);
      img.setDepth(d.type === 'window' || d.type === 'logo' || d.type === 'kpi' ? 1 : 4);
    }
    for (const door of DOORS) {
      this.add.image(door.x, door.y, 'door').setOrigin(0.5, 1).setDepth(2);
    }
  }

  spawnEnemy(spawn) {
    let e;
    if (spawn.type === 'architect') {
      e = new ArchitectEnemy(this, spawn.x, spawn.y, {
        patrolMin: spawn.patrolMin,
        patrolMax: spawn.patrolMax,
      });
    } else if (spawn.type === 'security') {
      e = new SecurityEnemy(this, spawn.x, spawn.y, {
        patrolMin: spawn.patrolMin,
        patrolMax: spawn.patrolMax,
      });
    }
    if (e) this.enemies.add(e);
    return e;
  }

  summonMinion(x, y) {
    const e = new ArchitectEnemy(this, x, y, { patrolMin: x - 60, patrolMax: x + 60 });
    e.hp = 1;
    e.maxHp = 1;
    this.enemies.add(e);
  }

  fireUsb(player) {
    const offset = 18;
    const bullet = this.playerBullets.create(player.x + player.facing * offset, player.y, 'usb');
    bullet.body.setAllowGravity(false);
    bullet.setScale(1.6);
    bullet.setVelocityX(player.facing * 480);
    bullet.damage = 1;
    bullet.setFlipX(player.facing < 0);
    bullet.setDepth(11);
    this.time.delayedCall(1100, () => bullet.destroy());
  }

  fireEnemyProjectile(source, key, dir, opts = {}) {
    const speed = opts.speed ?? 200;
    const bullet = this.enemyBullets.create(source.x + dir * 18, source.y - 4, key);
    bullet.body.setAllowGravity(false);
    bullet.setScale(1.6);
    bullet.setVelocityX(dir * speed);
    bullet.setFlipX(dir < 0);
    bullet.damage = 1;
    bullet.setDepth(11);
    if (key === 'sql') bullet.setTint(0xffd23f);
    this.time.delayedCall(2200, () => {
      if (bullet.active) bullet.destroy();
    });
  }

  onBulletEnemy(bullet, enemy) {
    if (!enemy.alive) return;
    bullet.destroy();
    enemy.takeHit(this.time.now);
  }

  onBulletBoss(bullet, boss) {
    if (!boss.alive) return;
    bullet.destroy();
    boss.takeHit(this, this.time.now);
    this.refreshBossHpBar();
  }

  onPlayerEnemy(player, enemy) {
    if (!enemy.alive || !player.isAlive()) return;
    if (player.isInvulnerable(this.time.now)) return;
    if (player.takeDamage(this.time.now)) {
      this.notifyHpChange();
      this.cameras.main.shake(120, 0.006);
      if (!player.isAlive()) this.killPlayer();
    }
  }

  onPlayerBullet(player, bullet) {
    if (!player.isAlive()) return;
    if (player.isInvulnerable(this.time.now)) return;
    if (player.takeDamage(this.time.now)) {
      this.notifyHpChange();
      this.cameras.main.shake(120, 0.006);
      if (!bullet.isOrbiter) bullet.destroy();
      if (!player.isAlive()) this.killPlayer();
    }
  }

  killPlayer() {
    this.player.setTint(0x555555);
    this.player.setVelocity(0, -250);
    if (this.player.body) this.player.body.checkCollision.none = true;
    this.time.delayedCall(900, () => {
      this.scene.stop('HUDScene');
      this.scene.start('GameOverScene');
    });
  }

  onBossDefeated() {
    this.bossDefeated = true;
    this.restartButton.setVisible(true);
    this.restartButton.body.checkCollision.none = false;
    this.tweens.add({
      targets: this.restartButton,
      y: this.restartButton.y - 6,
      yoyo: true,
      repeat: -1,
      duration: 600,
      ease: 'Sine.easeInOut',
    });
    this.bossLabel.setText('¡Acceso al servidor desbloqueado! → Pulsa el botón rojo');
    this.bossHpFill.setVisible(false);
    this.bossHpBg.setVisible(false);
  }

  notifyHpChange() {
    const hud = this.scene.get('HUDScene');
    if (hud && hud.setHp) hud.setHp(this.player.hp, this.player.maxHp);
  }

  refreshBossHpBar() {
    const ratio = Math.max(0, this.boss.hp / this.boss.maxHp);
    this.bossHpFill.width = 336 * ratio;
  }

  updateZone(initial = false) {
    const px = this.player.x;
    const idx = ZONES.findIndex((z) => px >= z.xStart && px < z.xEnd);
    if (idx !== this.currentZoneIndex && idx >= 0) {
      this.currentZoneIndex = idx;
      const z = ZONES[idx];
      this.zoneBanner.setText(`${z.name}`);
      this.zoneBanner.setAlpha(0);
      this.tweens.add({
        targets: this.zoneBanner,
        alpha: 1,
        duration: 250,
        yoyo: true,
        hold: 1500,
        onComplete: () => this.zoneBanner.setAlpha(0),
      });

      const inBossZone = idx === ZONES.length - 1;
      this.bossHpBg.setVisible(inBossZone && this.boss.alive);
      this.bossHpFill.setVisible(inBossZone && this.boss.alive);
      this.bossLabel.setVisible(inBossZone);

      if (initial) {
        // notify HUD of initial HP
        this.time.delayedCall(50, () => this.notifyHpChange());
      }
    }
  }

  checkRestart() {
    if (!this.bossDefeated || this.victoryTriggered) return;
    const dx = Math.abs(this.player.x - this.restartButton.x);
    const dy = Math.abs(this.player.y - this.restartButton.y);
    if (dx < 30 && dy < 50) {
      this.victoryTriggered = true;
      this.cameras.main.flash(500, 255, 255, 255);
      this.time.delayedCall(700, () => {
        this.scene.stop('HUDScene');
        this.scene.start('VictoryScene');
      });
    }
  }

  update(time, delta) {
    // Aggregate inputs (keyboard + touch)
    const kb = this.cursors;
    const k = this.keys;
    const t = this.touchInput;
    const inputState = {
      left: kb.left.isDown || k.A.isDown || t.left,
      right: kb.right.isDown || k.D.isDown || t.right,
      jump:
        kb.up.isDown || k.W.isDown || k.SPACE.isDown || k.UP.isDown || t.jump,
      attack: k.J.isDown || k.X.isDown || t.attack,
    };
    this.player.control(inputState, time);

    // Update entities
    this.enemies.getChildren().forEach((e) => {
      if (e.update) e.update(time, delta, this.player);
    });
    if (this.boss && this.boss.alive) this.boss.update(this, time, delta, this.player);

    // Cull bullets that left the world
    this.playerBullets.getChildren().forEach((b) => {
      if (b.x < -50 || b.x > LEVEL_WIDTH + 50) b.destroy();
    });
    this.enemyBullets.getChildren().forEach((b) => {
      if (b.x < -50 || b.x > LEVEL_WIDTH + 50) b.destroy();
    });

    // Fall pit (shouldn't happen but safety net)
    if (this.player.y > LEVEL_HEIGHT_PX() + 100 && this.player.isAlive()) {
      this.player.hp = 0;
      this.killPlayer();
    }

    this.updateZone(false);
    this.checkRestart();
  }
}

function LEVEL_HEIGHT_PX() {
  return 450;
}
