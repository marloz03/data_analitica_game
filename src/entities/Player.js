export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(2);
    this.setCollideWorldBounds(true);
    this.setSize(10, 22);
    this.setOffset(3, 1);
    this.setMaxVelocity(220, 700);
    this.setDepth(10);

    this.hp = 3;
    this.maxHp = 3;
    this.facing = 1; // 1 right, -1 left
    this.invulnerableUntil = 0;
    this.lastShotAt = 0;
    this.shotCooldown = 280;
    this.speed = 180;
    this.jumpVelocity = -480;
  }

  isAlive() {
    return this.hp > 0;
  }

  isInvulnerable(now) {
    return now < this.invulnerableUntil;
  }

  takeDamage(now) {
    if (this.isInvulnerable(now) || !this.isAlive()) return false;
    this.hp = Math.max(0, this.hp - 1);
    this.invulnerableUntil = now + 900;
    this.setVelocityY(-260);
    this.setVelocityX(-this.facing * 180);
    // flash
    this.scene.tweens.add({
      targets: this,
      alpha: { from: 0.2, to: 1 },
      duration: 120,
      repeat: 6,
      onComplete: () => this.setAlpha(1),
    });
    return true;
  }

  control(input, now) {
    if (!this.isAlive()) {
      this.setVelocityX(0);
      return;
    }

    if (input.left && !input.right) {
      this.setVelocityX(-this.speed);
      this.facing = -1;
      this.setFlipX(true);
    } else if (input.right && !input.left) {
      this.setVelocityX(this.speed);
      this.facing = 1;
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if (input.jump && this.body.blocked.down) {
      this.setVelocityY(this.jumpVelocity);
    }

    if (input.attack && now - this.lastShotAt > this.shotCooldown) {
      this.lastShotAt = now;
      this.scene.fireUsb(this);
    }
  }
}
