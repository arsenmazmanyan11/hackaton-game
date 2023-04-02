import { STORE_POPUP_CONFIG } from "../../gameConfig";
import Head from "../../models/HeadModel";
import { StoreItem } from "./StoreItem";

export class StorePopup extends Phaser.GameObjects.Container {
    constructor(scene, bg, tint) {
        super(scene);
        this.items = [];
        this.init(bg, tint);
    }

    setItemBought(uuid) {
        const item = this.items.find((it) => it.uuid === uuid);
        item.disableItem();
    }

    init(bg, tint) {
        const bkg = this.scene.add.sprite(0, 0, bg);
        bkg.setTint(tint);
        this.add(bkg);

        const models = [...Head.gameModel.storeModel.items];
        models.forEach((m, i) => {
            const { x, y, scale, bg } = STORE_POPUP_CONFIG.itemsConfig[i];
            const item = new StoreItem(this.scene, m, bg);
            item.setPosition(x, y);
            item.setScale(scale);
            this.items.push(item);
            this.add(item);
        });

        const { position, scale, scaleDown, bg: btnBg } = STORE_POPUP_CONFIG.backButton;

        const backBtn = this.scene.add.sprite(position.x, position.y, btnBg);
        backBtn.setScale(scale);
        this.scene.time.delayedCall(200, () => {
            backBtn.setInteractive();
        });

        backBtn.on("pointerdown", () => {
            backBtn.setScale(scaleDown);
        });
        backBtn.on("pointerup", () => {
            this.emit("storeBackBtnClick");
        });
        this.add(backBtn);
    }
}
