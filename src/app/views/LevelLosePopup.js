import { lego } from "@armathai/lego";
import { ForegroundEvents } from "../../events/GameEvents";
import { LOSE_POPUP_CONFIG } from "../../gameConfig";

export class LevelLosePopup extends Phaser.GameObjects.Container {
    constructor(scene,  bg, bgScale, bgAlpha) {
        super(scene);
        this.init( bg, bgScale, bgAlpha);
    }

    init( bg, bgScale, bgAlpha) {
        const bkg = this.scene.add.sprite(0, 0, bg);
        // bkg.setTint(0xaa0000);
        this.add(bkg);
        bkg.setScale(bgScale)
        bkg.setAlpha(bgAlpha)

        const { position: sPos, bg: sBg, scale: sScale, scaleDown: sScaleDown } = LOSE_POPUP_CONFIG.storeButton;

        const storeBtn = this.scene.add.sprite(sPos.x, sPos.y, sBg);
        storeBtn.setScale(sScale);
        this.scene.time.delayedCall(200, () => {
            storeBtn.setInteractive();
        });
        storeBtn.on("pointerdown", () => {
            storeBtn.setScale(sScaleDown);
        });
        storeBtn.on("pointerup", () => {
            this.emit("loseStoreBtnClick");
        });
        this.add(storeBtn);

        const { position: rPos, bg: rBg, scale: rScale, scaleDown: rScaleDown } = LOSE_POPUP_CONFIG.retryBtn;

        const retryBtn = this.scene.add.sprite(rPos.x, rPos.y, rBg);
        retryBtn.setScale(rScale);
        this.scene.time.delayedCall(200, () => {
            retryBtn.setInteractive();
        });
        retryBtn.on("pointerdown", () => {
            retryBtn.setScale(rScaleDown);
        });
        retryBtn.on("pointerup", () => {
            this.emit("loseRetryClick");
            lego.event.emit(ForegroundEvents.RetryClick);
        });
        this.add(retryBtn);
    }
}
