export default class BackgroundView extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.items = [];
        this.init();
    }

    init() {
        this.map = this.scene.add.tileSprite(0, 0, 9000, 9000, "bg.jpg");
        this.add(this.map);
    }

    changeTexture(texture) {
        this.map.setTexture(texture);
    }

    setItems(config) {
        if (this.items.length !== 0) {
            this.items.forEach((i) => i.destroy());
            this.items = [];
        }

        this.items = config.map((c) => {
            const item = this.scene.add.sprite(c.x, c.y, c.item);
            item.setScale(c.scale);
            this.add(item);
            return item;
        });
    }
}
