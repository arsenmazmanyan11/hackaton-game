import { lego } from "@armathai/lego";
import { ForegroundEvents, GameEvents } from "../../events/GameEvents";
import { ItemModelEvents } from "../../events/ModelEvents";
import { LOSE_POPUP_CONFIG, STORE_POPUP_CONFIG, WIN_POPUP_CONFIG } from "../../gameConfig";
import { LevelLosePopup } from "./LevelLosePopup";
import { LevelWinPopup } from "./LevelWinPopup";
import { StorePopup } from "./StorePopup";

export class ForegroundView extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.lastShown = "";
        lego.event.on(GameEvents.ShowWinPopup, this.#initWinPopup, this);
        lego.event.on(GameEvents.ShowLosePopup, this.#initLosePopup, this);
        lego.event.on(GameEvents.ShowStorePopup, this.#initStorePopup, this);
        lego.event.on(ItemModelEvents.IsBoughtUpdate, this.#itemBoughtUpdate, this);

        // TODO REMOVE
        lego.event.on(ForegroundEvents.StoreClick, this.#initStorePopup, this);
    }

    #initWinPopup(x, y) {
        const { scale, bg,  bgScale, bgAlpha } = WIN_POPUP_CONFIG;
        this.levelWinPopup = new LevelWinPopup(this.scene, bg,  bgScale, bgAlpha);
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
            this.#initStorePopup(x, y);
        });
        this.add(this.levelWinPopup);
    }

    #initLosePopup(x, y) {
        const { scale, bg,  bgScale, bgAlpha } = LOSE_POPUP_CONFIG;

        this.levelLosePopup = new LevelLosePopup(this.scene,  bg,  bgScale, bgAlpha);
        this.levelLosePopup.setScale(scale);
        this.levelLosePopup.setPosition(x, y + 100);
        this.lastShown = "lose";
        this.levelLosePopup.on("loseStoreBtnClick", () => {
            this.levelLosePopup.destroy();
            this.levelLosePopup = null;
            this.#initStorePopup(x, y);
        });
        this.levelLosePopup.on("loseRetryClick", () => {
            this.levelLosePopup.destroy();
            this.levelLosePopup = null;
        });
        this.add(this.levelLosePopup);
    }

    #initStorePopup(x, y) {
        const { scale, bg, bgScale, bgAlpha } = STORE_POPUP_CONFIG;
        this.storePopup = new StorePopup(this.scene, bg, bgScale, bgAlpha);
        this.storePopup.setScale(scale);
        this.storePopup.setPosition(x, y + 100);
        // this.lastShown = "store";
        this.storePopup.on("storeBackBtnClick", () => {
            this.storePopup.destroy();
            this.storePopup = null;
            if (this.lastShown === "win") {
                this.#initWinPopup(x, y);
            } else if (this.lastShown === "lose") {
                this.#initLosePopup(x, y);
            }
        });
        this.add(this.storePopup);
    }

    #itemBoughtUpdate(newValue, oldValue, uuid) {
        if (!this.storePopup) return;
        this.storePopup.setItemBought(uuid);
    }
}
