import { lego } from "@armathai/lego";
import { ForegroundEvents } from "../../events/GameEvents";
import { WIN_POPUP_CONFIG } from "../../gameConfig";

export class LevelWinPopup extends Phaser.GameObjects.Container {
    constructor(scene, bg, bgScale, bgAlpha) {
        super(scene);
        this.storeBtn = null;
        this.nextLvlBtn = null;
        this.init(bg, bgScale, bgAlpha);
    }

    init(bg, bgScale, bgAlpha) {
        const bkg = this.scene.add.sprite(0, 0, bg);
        this.add(bkg);
        bkg.setScale(bgScale)
        bkg.setAlpha(bgAlpha)

        const { position: sPos, bg: sBg, scale: sScale, scaleDown: sScaleDown } = WIN_POPUP_CONFIG.storeButton;
        this.storeBtn = this.scene.add.sprite(sPos.x, sPos.y, sBg);
        this.storeBtn.setScale(sScale);
        this.scene.time.delayedCall(200, () => {
            this.storeBtn.setInteractive();
        });

        this.storeBtn.on("pointerdown", () => {
            this.storeBtn.setScale(sScaleDown);
        });
        this.storeBtn.on("pointerup", () => {
            this.emit("winStoreBtnClick");
        });

        this.add(this.storeBtn);

        const { position: nPos, bg: nBg, scale: nScale, scaleDown: nScaleDown } = WIN_POPUP_CONFIG.nextLvlButton;

        this.nextLvlBtn = this.scene.add.sprite(nPos.x, nPos.y, nBg);
        this.nextLvlBtn.setScale(nScale);
        this.scene.time.delayedCall(200, () => {
            this.nextLvlBtn.setInteractive();
        });

        this.nextLvlBtn.on("pointerdown", () => {
            this.nextLvlBtn.setScale(nScaleDown);
        });
        this.nextLvlBtn.on("pointerup", () => {
            this.emit("winNextLvlClick");
            lego.event.emit(ForegroundEvents.NextLvlClick);
        });

        this.add(this.nextLvlBtn);
    }

    #initWinPopup() {
        //
    }
}
