export default class PlayerView extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.bullets = [];
        this.init();
    }

    init() {
        this.initPlayer();
        this.initBullets();
    }

    initPlayer() {
        this.player = this.scene.add.image(0, 0, "logo.png");
        this.add(this.player);
    }

    initBullets() {
        // this.player = this.scene.add.image(0, 0, "logo.png");
        // this.add(this.player);
    }
}
