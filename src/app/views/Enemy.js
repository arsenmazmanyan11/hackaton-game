export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, "enemy.png");
    }

    tint(color) {
        this.setTint(color);
    }
}
