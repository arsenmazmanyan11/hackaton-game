import { lego } from "@armathai/lego";
import { ForegroundEvents } from "../../events/GameEvents";

export class CoinsCounter extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.init();
    }

    init() {
        const bkg = this.scene.add.sprite(0, 0, "btn-green.png");
        this.add(bkg);
        bkg.setInteractive();
        bkg.on("pointerdown", () => {
            lego.event.emit(ForegroundEvents.StoreClick, 200, 500);
        });

        this.text = this.scene.add.text(bkg.x, bkg.y, "0");
        this.text.setOrigin(0, 0.5);
        this.add(this.text);
    }

    updateText(text) {
        this.text.setText(text);
    }
}
