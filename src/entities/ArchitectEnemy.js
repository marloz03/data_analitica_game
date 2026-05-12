import { Enemy } from './Enemy.js';

export class ArchitectEnemy extends Enemy {
  constructor(scene, x, y, opts = {}) {
    super(scene, x, y, 'architect', {
      hp: 2,
      speed: 40,
      patrolMin: opts.patrolMin ?? x - 70,
      patrolMax: opts.patrolMax ?? x + 70,
    });
    this.shotCooldown = 2200;
    this.nextShotAt = scene.time.now + 1200 + Math.random() * 800;
  }

  update(time, _delta, player) {
    if (!this.alive) return;
    this.patrol();

    if (time > this.nextShotAt && player.isAlive()) {
      const dx = player.x - this.x;
      const sameFloor = Math.abs(player.y - this.y) < 50;
      const inRange = Math.abs(dx) < 280;
      if (sameFloor && inRange) {
        this.scene.fireEnemyProjectile(this, 'uml', Math.sign(dx) || 1);
        this.nextShotAt = time + this.shotCooldown;
      }
    }
  }
}
