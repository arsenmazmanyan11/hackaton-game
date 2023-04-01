export default class BackgroundView extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.init();
    }

    init() {
        this.map = this.scene.add.tileSprite(0, 0, 9000, 9000, "bg.jpg");
        this.add(this.map);
    }

    changeTexture(texture) {
        this.map.setTexture(texture);
    }
}
