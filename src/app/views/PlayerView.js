export default class PlayerView extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.init();
        this.circle = null;
    }

    get shootingPoint() {
        return new Phaser.Geom.Point(this.player.width / 2, 0);
    }

    init() {
        this.initPlayer();
        this.setSize(this.player.width, this.player.height);
    }

    // drawCircle(color) {
    //     this.circle?.destroy();
    //     this.circle = this.scene.add.circle(this.shootingPoint.x, this.shootingPoint.y, 10, color);
    //     this.add(this.circle);
    // }

    initPlayer() {
        this.player = this.scene.add.image(0, 0, "logo.png");
        this.add(this.player);
    }
}
