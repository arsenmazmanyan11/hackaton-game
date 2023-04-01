export default class BackgroundView extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.init();
    }

    init() {
        this.map = this.scene.add.sprite(0, 0, "bg.jpg");
        this.add(this.map);

        this.map.setInteractive();
        this.map.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.emit("click");
        });
    }
}
