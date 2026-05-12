import { Enemy } from './Enemy.js';

export class SecurityEnemy extends Enemy {
  constructor(scene, x, y, opts = {}) {
    super(scene, x, y, 'security', {
      hp: 2,
      speed: 70,
      patrolMin: opts.patrolMin ?? x - 60,
      patrolMax: opts.patrolMax ?? x + 60,
    });
    this.chasing = false;
    this.chaseSpeed = 130;
  }

  update(_time, _delta, player) {
    if (!this.alive) return;

    if (player.isAlive()) {
      const dx = player.x - this.x;
      const dy = player.y - this.y;
      const sameFloor = Math.abs(dy) < 50;
      const inSight = sameFloor && Math.abs(dx) < 220;
      this.chasing = inSight;
      if (inSight) {
        this.dir = Math.sign(dx) || 1;
        this.setVelocityX(this.dir * this.chaseSpeed);
        this.setFlipX(this.dir < 0);
        return;
      }
    }
    this.patrol();
  }
}
