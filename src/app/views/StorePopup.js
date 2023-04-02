import Head from "../../models/HeadModel";
import { StoreItem } from "./StoreItem";

export class StorePopup extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.items = [];
        this.init();
    }

    setItemBought(uuid) {
        const item = this.items.find((it) => it.uuid === uuid);
        item.disableItem();
    }

    init() {
        const bkg = this.scene.add.sprite(0, 0, "popup.png");
        bkg.setTint(0x0000aa);
        this.add(bkg);

        const models = [...Head.gameModel.storeModel.items];
        models.forEach((m, i) => {
            const item = new StoreItem(this.scene, m);
            item.setPosition(-200 + 150 * i, 0);
            this.items.push(item);
            this.add(item);
        });

        // const storeBtn = this.scene.add.sprite(-150, 100, "yellow-btn.png");
        // storeBtn.setInteractive();
        // storeBtn.on(Phaser.Input.Events.POINTER_UP, () => {
        //     this.emit("btnClick");
        //     lego.event.emit(ForegroundEvents.NextLvlClick);
        // });
        // this.add(storeBtn);

        // const nextLvlBtn = this.scene.add.sprite(150, 100, "blue-btn.png");
        // nextLvlBtn.setInteractive();
        // nextLvlBtn.on(Phaser.Input.Events.POINTER_UP, () => {
        //     this.emit("btnClick");
        //     lego.event.emit(ForegroundEvents.StoreClick);
        // });
        // this.add(nextLvlBtn);
        // this.#initWinPopup();
    }
}
