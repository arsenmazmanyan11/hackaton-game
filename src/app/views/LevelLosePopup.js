import { lego } from "@armathai/lego";
import { ForegroundEvents } from "../../events/GameEvents";

export class LevelLosePopup extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.init();
    }

    init() {
        const bkg = this.scene.add.sprite(0, 0, "popup.png");
        bkg.setTint(0xaa0000);
        this.add(bkg);

        const storeBtn = this.scene.add.sprite(-150, 100, "yellow-btn.png");
        storeBtn.setInteractive();
        storeBtn.on("pointerdown", () => {
            this.emit("btnClick");
            lego.event.emit(ForegroundEvents.StoreClick);
        });
        this.add(storeBtn);

        const retryBtn = this.scene.add.sprite(150, 100, "blue-btn.png");
        retryBtn.setInteractive();
        retryBtn.setTint(0xf00f00);
        retryBtn.on("pointerdown", () => {
            this.emit("btnClick");
            lego.event.emit(ForegroundEvents.RetryClick);
        });
        this.add(retryBtn);
        // this.#initWinPopup();
    }

    #initWinPopup() {
        //
    }
}
