import { lego } from "@armathai/lego";
import { StorePopupEvents } from "../../events/GameEvents";

export class StoreItem extends Phaser.GameObjects.Container {
    constructor(scene, config, bg) {
        super(scene);
        this.config = config;
        this.uuid = config.uuid;
        this.init(bg);
    }

    init(bg) {
        this.bkg = this.scene.add.sprite(0, 0, bg);
        // this.bkg.setTint(this.config.tint);
        this.add(this.bkg);

        if (!this.config.isBought) {
            this.bkg.setInteractive();
            this.bkg.on("pointerdown", () => {
                lego.event.emit(StorePopupEvents.ItemClick, this.config.itemName);
            });
        } else {
            this.bkg.setTint(0xaaaaaa);
        }
    }

    disableItem() {
        this.bkg.disableInteractive();
        // this.bkg.setAlpha(0.8);
        this.bkg.setTint(0xcccccc);
    }
}
