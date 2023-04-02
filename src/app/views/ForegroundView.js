import { lego } from "@armathai/lego";
import { ForegroundEvents, GameEvents } from "../../events/GameEvents";
import { ItemModelEvents } from "../../events/ModelEvents";
import { STORE_POPUP_CONFIG, WIN_POPUP_CONFIG } from "../../gameConfig";
import { LevelLosePopup } from "./LevelLosePopup";
import { LevelWinPopup } from "./LevelWinPopup";
import { StorePopup } from "./StorePopup";

export class ForegroundView extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.init();
        this.lastShown = "";
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
        const { scale, bg, tint } = WIN_POPUP_CONFIG;
        this.levelWinPopup = new LevelWinPopup(this.scene, bg, tint);
        this.levelWinPopup.setScale(scale);
        this.levelWinPopup.setPosition(x, y + 100);
        this.lastShown = "win";
        this.levelWinPopup.on("winNextLvlClick", () => {
            this.levelWinPopup.destroy();
            this.levelWinPopup = null;
        });
        this.levelWinPopup.on("winStoreBtnClick", () => {
            this.levelWinPopup.destroy();
            this.levelWinPopup = null;
        });
        this.add(this.levelWinPopup);
    }

    #initLosePopup(x, y) {
        const { scale, bg, tint } = WIN_POPUP_CONFIG;

        this.levelLosePopup = new LevelLosePopup(this.scene, bg, tint);
        this.levelLosePopup.setScale(scale);
        this.levelLosePopup.setPosition(x, y + 100);
        this.lastShown = "lose";
        this.levelLosePopup.on("btnClick", () => {
            this.levelLosePopup.destroy();
            this.levelLosePopup = null;
            this.#initStorePopup(x, y);
        });
        this.add(this.levelLosePopup);
    }

    #initStorePopup(x, y) {
        const { scale, bg, tint } = STORE_POPUP_CONFIG;
        this.storePopup = new StorePopup(this.scene, bg, tint);
        this.storePopup.setScale(scale);
        this.storePopup.setPosition(x, y + 100);
        this.lastShown = "store";
        this.storePopup.on("storeBackBtnClick", () => {
            this.storePopup.destroy();
            if (this.lastShown === "win") {
                this.#initWinPopup();
            } else if (this.lastShown === "lose") {
                this.#initLosePopup();
            }
        });
        this.add(this.storePopup);
    }

    #itemBoughtUpdate(newValue, oldValue, uuid) {
        if (!this.storePopup) return;
        this.storePopup.setItemBought(uuid);
    }
}
