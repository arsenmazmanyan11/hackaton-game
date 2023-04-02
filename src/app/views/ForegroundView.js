import { lego } from "@armathai/lego";
import { ForegroundEvents, GameEvents } from "../../events/GameEvents";
import { ItemModelEvents } from "../../events/ModelEvents";
import { LevelLosePopup } from "./LevelLosePopup";
import { LevelWinPopup } from "./LevelWinPopup";
import { StorePopup } from "./StorePopup";

export class ForegroundView extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.init();
        lego.event.on(GameEvents.ShowWinPopup, this.#initWinPopup, this);
        lego.event.on(GameEvents.ShowLosePopup, this.#initLosePopup, this);
        lego.event.on(GameEvents.ShowStorePopup, this.#initStorePopup, this);
        lego.event.on(ItemModelEvents.IsBoughtUpdate, this.#itemBoughtUpdate, this);

        lego.event.on(ForegroundEvents.StoreClick, this.#initStorePopup, this);
    }

    init() {
        // this.#initWinPopup();
    }

    #initWinPopup(x, y) {
        this.levelWinPopup = new LevelWinPopup(this.scene);
        // this.levelWinPopup.setScrollFactor(0);
        this.levelWinPopup.setScale(3);
        this.levelWinPopup.setPosition(x, y + 100);
        this.levelWinPopup.on("btnClick", () => {
            this.levelWinPopup.destroy();
            this.levelWinPopup = null;
        });
        this.add(this.levelWinPopup);
    }

    #initLosePopup(x, y) {
        this.levelLosePopup = new LevelLosePopup(this.scene);
        // this.levelLosePopup.setScrollFactor(0);
        this.levelLosePopup.setScale(3);
        this.levelLosePopup.setPosition(x, y + 100);
        this.levelLosePopup.on("btnClick", () => {
            this.levelLosePopup.destroy();
            this.levelLosePopup = null;
            this.#initStorePopup(x, y);
        });
        this.add(this.levelLosePopup);
    }

    #initStorePopup(x, y) {
        this.storePopup = new StorePopup(this.scene);
        this.storePopup.setScale(3);
        this.storePopup.setPosition(x, y + 100);
        // this.storePopup.on("btnClick", () => {
        //     // this.storePopup.destroy();
        // });
        this.add(this.storePopup);
    }

    #itemBoughtUpdate(newValue, oldValue, uuid) {
        if (!this.storePopup) return;
        this.storePopup.setItemBought(uuid);
    }
}
