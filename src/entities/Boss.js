// Fernando Vargas — Gerente de Arquitectura de Datos. Final boss.
// 3 phases: orbiting DB diagrams, SQL ray bursts, summons mini-architect.
export class Boss extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'boss');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(2);
    this.setCollideWorldBounds(true);
    this.setSize(18, 28);
    this.setOffset(3, 2);
    this.setDepth(10);

    this.maxHp = 10;
    this.hp = this.maxHp;
    this.alive = true;
    this.phase = 1;
    this.state = 'INTRO';
    this.stateUntil = scene.time.now + 1500;
    this.dir = -1;
    this.lastHitAt = 0;
    this.summonedThisPhase = 0;

    // Orbiting diagrams in phase 1
    this.orbs = [];
  }

  phaseFromHp() {
    if (this.hp > 7) return 1;
    if (this.hp > 3) return 2;
    return 3;
  }

  startOrbs(scene) {
    this.clearOrbs();
    const count = 4;
    for (let i = 0; i < count; i++) {
      const orb = scene.physics.add.image(this.x, this.y, 'uml');
      orb.setScale(1.4);
      orb.setCircle(5);
      orb.body.setAllowGravity(false);
      orb.setDepth(11);
      orb.isOrbiter = true;
      orb.damage = 1;
      orb.theta = (i / count) * Math.PI * 2;
      this.orbs.push(orb);
      scene.bossOrbs.add(orb);
    }
  }

  clearOrbs() {
    for (const o of this.orbs) o.destroy();
    this.orbs.length = 0;
  }

  updateOrbs(time) {
    const radius = 70;
    const speed = 0.0035;
    for (let i = 0; i < this.orbs.length; i++) {
      const o = this.orbs[i];
      if (!o.active) continue;
      o.theta = (i / this.orbs.length) * Math.PI * 2 + time * speed;
      o.x = this.x + Math.cos(o.theta) * radius;
      o.y = this.y + Math.sin(o.theta) * radius;
    }
  }

  takeHit(scene, time) {
    if (!this.alive || time - this.lastHitAt < 180) return false;
    this.hp -= 1;
    this.lastHitAt = time;
    this.setTint(0xff8888);
    scene.time.delayedCall(140, () => {
      if (this.alive) this.clearTint();
    });

    if (this.hp <= 0) {
      this.die(scene);
      return true;
    }

    const newPhase = this.phaseFromHp();
    if (newPhase !== this.phase) {
      this.phase = newPhase;
      this.summonedThisPhase = 0;
      this.clearOrbs();
      this.state = 'PHASE_TRANSITION';
      this.stateUntil = time + 900;
      scene.cameras.main.flash(300, 255, 80, 80);
      scene.cameras.main.shake(220, 0.008);
    }
    return false;
  }

  die(scene) {
    this.alive = false;
    this.clearOrbs();
    this.setTint(0x444444);
    this.body.checkCollision.none = true;
    this.setVelocity(0, 0);
    scene.tweens.add({
      targets: this,
      angle: 90,
      alpha: 0.3,
      duration: 1200,
    });
    scene.onBossDefeated();
  }

  update(scene, time, _delta, player) {
    if (!this.alive) return;

    // Always face player
    if (player && player.isAlive()) {
      this.dir = player.x < this.x ? -1 : 1;
      this.setFlipX(this.dir < 0);
    }

    if (this.state === 'INTRO' || this.state === 'PHASE_TRANSITION') {
      this.setVelocityX(0);
      if (time >= this.stateUntil) {
        this.state = 'ACTION';
        this.scheduleNextAction(scene, time);
      }
      this.updateOrbs(time);
      return;
    }

    this.updateOrbs(time);

    // Slow pacing back and forth
    if (this.body.blocked.down) {
      if (this.x < this.minX) this.dir = 1;
      else if (this.x > this.maxX) this.dir = -1;
      this.setVelocityX(this.dir * 40);
    }

    if (time >= this.stateUntil) {
      this.scheduleNextAction(scene, time);
    }
  }

  setPatrolBounds(min, max) {
    this.minX = min;
    this.maxX = max;
  }

  scheduleNextAction(scene, time) {
    if (this.phase === 1) {
      if (this.orbs.length === 0) this.startOrbs(scene);
      // Jump occasionally
      if (this.body.blocked.down && Math.random() < 0.5) {
        this.setVelocityY(-420);
      }
      this.stateUntil = time + 1600;
    } else if (this.phase === 2) {
      this.clearOrbs();
      // Fire SQL volley
      const dirs = [this.dir, this.dir, -this.dir];
      let delay = 0;
      for (const d of dirs) {
        scene.time.delayedCall(delay, () => {
          if (this.alive) scene.fireEnemyProjectile(this, 'sql', d, { speed: 320 });
        });
        delay += 220;
      }
      if (this.body.blocked.down && Math.random() < 0.6) {
        this.setVelocityY(-440);
      }
      this.stateUntil = time + 1800;
    } else {
      this.clearOrbs();
      // Phase 3: SQL + summon mini-architect
      scene.fireEnemyProjectile(this, 'sql', this.dir, { speed: 360 });
      if (this.summonedThisPhase < 2 && Math.random() < 0.5) {
        scene.summonMinion(this.x - 60 * this.dir, this.y - 60);
        this.summonedThisPhase += 1;
      }
      if (this.body.blocked.down) this.setVelocityY(-460);
      this.stateUntil = time + 1500;
    }
  }
}
