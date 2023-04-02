import { lego } from "@armathai/lego";
import { ForegroundEvents, GameEvents } from "../../events/GameEvents";
import { COUNTER_CONFIG } from "../../gameConfig";
import { CoinsCounter } from "./CoinsCounter";

export class UIView extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);

        this.init();
        // lego.event.on(PlayerModelEvents.CoinsUpdate, this.#coinsUpdate, this);
    }

    init() {
        // this.initCoinsCounter();
        //TODO REMOVE
        // this.initStoreButton();
        // this.initWinButton();
        // this.initLoseButton();
    }

    initCoinsCounter() {
        this.coinsCounter = new CoinsCounter(this.scene);
        this.coinsCounter.setScrollFactor(0);
        const { position, scale } = COUNTER_CONFIG;
        this.coinsCounter.setPosition(position.x, position.y);
        this.coinsCounter.setScale(scale);
        this.add(this.coinsCounter);
    }

    #coinsUpdate(value) {
        this.coinsCounter.updateText(Math.max(0, value));
    }

    initStoreButton() {
        const store = this.scene.add.sprite(-250, -400, "blue-btn.png");
        const sTxt = this.scene.add.text(-300, -430, "store", { fontSize: 50 });
        store.setScale(2);
        store.setInteractive();
        store.on("pointerdown", () => {
            lego.event.emit(ForegroundEvents.StoreClick, 200, 500);
        });
        this.add(store);
        this.add(sTxt);
    }

    initWinButton() {
        const store = this.scene.add.sprite(400, -400, "btn-green.png");
        const sTxt = this.scene.add.text(350, -430, "WIN", { fontSize: 50 });
        store.setScale(2);
        store.setInteractive();
        store.on("pointerdown", () => {
            lego.event.emit(GameEvents.ShowWinPopup, 200, 500);
        });
        this.add(store);
        this.add(sTxt);
    }

    initLoseButton() {
        const store = this.scene.add.sprite(1000, -400, "yellow-btn.png");
        const sTxt = this.scene.add.text(950, -430, "LOSE", { fontSize: 50, color: 0x0000ff });
        store.setScale(2);
        store.setInteractive();
        store.on("pointerdown", () => {
            lego.event.emit(GameEvents.ShowLosePopup, 200, 500);
        });
        this.add(store);
        this.add(sTxt);
    }
}
