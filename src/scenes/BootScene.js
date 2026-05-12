import { createAllTextures } from '../art/textures.js';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    createAllTextures(this);
    this.scene.start('MenuScene');
  }
}
