export class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, opts = {}) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(2);
    this.setCollideWorldBounds(false);
    this.setSize(10, 22);
    this.setOffset(3, 1);
    this.setDepth(9);

    this.hp = opts.hp ?? 2;
    this.maxHp = this.hp;
    this.contactDamage = opts.contactDamage ?? 1;
    this.patrolMin = opts.patrolMin ?? x - 80;
    this.patrolMax = opts.patrolMax ?? x + 80;
    this.speed = opts.speed ?? 60;
    this.dir = -1;
    this.alive = true;
    this.hitFlashUntil = 0;
  }

  takeHit(now) {
    if (!this.alive) return false;
    this.hp -= 1;
    this.hitFlashUntil = now + 120;
    this.setTint(0xff8888);
    this.scene.time.delayedCall(120, () => {
      if (this.alive) this.clearTint();
    });
    if (this.hp <= 0) {
      this.die();
      return true;
    }
    return false;
  }

  die() {
    this.alive = false;
    this.setTint(0x666666);
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      angle: 90,
      duration: 350,
      onComplete: () => {
        this.destroy();
      },
    });
    if (this.body) this.body.checkCollision.none = true;
  }

  patrol() {
    if (!this.alive) return;
    if (this.x <= this.patrolMin) {
      this.dir = 1;
    } else if (this.x >= this.patrolMax) {
      this.dir = -1;
    }
    this.setVelocityX(this.dir * this.speed);
    this.setFlipX(this.dir < 0);
  }
}
