import { lego } from "@armathai/lego";
import { ForegroundEvents } from "../../events/GameEvents";

export class LevelWinPopup extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.init();
    }

    init() {
        const bkg = this.scene.add.sprite(0, 0, "popup.png");
        bkg.setTint(0x00aa00);
        this.add(bkg);

        const storeBtn = this.scene.add.sprite(-150, 100, "yellow-btn.png");
        storeBtn.setInteractive();
        storeBtn.on(Phaser.Input.Events.POINTER_UP, () => {
            this.emit("btnClick");
            lego.event.emit(ForegroundEvents.NextLvlClick);
        });
        this.add(storeBtn);

        const nextLvlBtn = this.scene.add.sprite(150, 100, "blue-btn.png");
        nextLvlBtn.setInteractive();
        nextLvlBtn.on(Phaser.Input.Events.POINTER_UP, () => {
            this.emit("btnClick");
            lego.event.emit(ForegroundEvents.StoreClick);
        });
        this.add(nextLvlBtn);
        // this.#initWinPopup();
    }

    #initWinPopup() {
        //
    }
}
