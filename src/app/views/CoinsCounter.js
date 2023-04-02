import { COUNTER_CONFIG } from "../../gameConfig";

export class CoinsCounter extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.init();
    }

    init() {
        const { textPosition, fontSize, bg } = COUNTER_CONFIG;
        const bkg = this.scene.add.sprite(0, 0, bg);
        this.add(bkg);
        // bkg.setInteractive();
        // bkg.on("pointerdown", () => {
        //     lego.event.emit(ForegroundEvents.StoreClick, 200, 500);
        // });

        this.text = this.scene.add.text(textPosition.x, textPosition.y, "0", { fontSize });
        this.text.setOrigin(0.5);
        this.add(this.text);
    }

    updateText(text) {
        this.text.setText(text);
    }
}
