import { lego } from "@armathai/lego";
import { ForegroundEvents } from "../../events/GameEvents";
import { WIN_POPUP_CONFIG } from "../../gameConfig";

export class LevelWinPopup extends Phaser.GameObjects.Container {
    constructor(scene, bg, tint) {
        super(scene);
        this.init(bg, tint);
    }

    init(bg, tint) {
        const bkg = this.scene.add.sprite(0, 0, bg);
        bkg.setTint(tint);
        this.add(bkg);

        const { position: sPos, bg: sBg, scale: sScale } = WIN_POPUP_CONFIG.storeButton;
        const storeBtn = this.scene.add.sprite(sPos.x, sPos.y, sBg);
        storeBtn.setScale(sScale);
        storeBtn.setInteractive();
        storeBtn.on(Phaser.Input.Events.POINTER_UP, () => {
            this.emit("winStoreBtnClick");
            lego.event.emit(ForegroundEvents.StoreClick);
        });
        this.add(storeBtn);

        const { position: nPos, bg: nBg, scale: nScale } = WIN_POPUP_CONFIG.nextLvlButton;

        const nextLvlBtn = this.scene.add.sprite(nPos.x, nPos.y, nBg);
        nextLvlBtn.setScale(nScale);
        nextLvlBtn.setInteractive();
        nextLvlBtn.on(Phaser.Input.Events.POINTER_UP, () => {
            this.emit("winNextLvlClick");
            lego.event.emit(ForegroundEvents.NextLvlClick);
        });
        this.add(nextLvlBtn);
        // this.#initWinPopup();
    }

    #initWinPopup() {
        //
    }
}
