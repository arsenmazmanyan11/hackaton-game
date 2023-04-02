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

        this.text = this.scene.add.text(this.bkg.x, this.bkg.y, this.config.price);
        this.text.setOrigin(0, 0.5);
        this.add(this.text);

        if (!this.config.isBought) {
            this.bkg.setInteractive();
            this.bkg.on("pointerdown", () => {
                lego.event.emit(StorePopupEvents.ItemClick, this.config.itemName);
            });
        } else {
            // this.bkg.setAlpha(0.3);
        }
    }

    disableItem() {
        this.bkg.disableInteractive();
        // this.bkg.setAlpha(0.8);
    }
}
