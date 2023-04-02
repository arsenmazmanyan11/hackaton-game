import { lego } from "@armathai/lego";
import { PlayerModelEvents } from "../../events/ModelEvents";
import { CoinsCounter } from "./CoinsCounter";

export class UIView extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);

        this.init();
        lego.event.on(PlayerModelEvents.CoinsUpdate, this.#coinsUpdate, this);
    }

    init() {
        this.initCoinsCounter();
    }

    initCoinsCounter() {
        this.coinsCounter = new CoinsCounter(this.scene);
        this.coinsCounter.setScrollFactor(0);
        this.coinsCounter.setPosition(-500, -400);
        this.coinsCounter.setScale(3.5);
        this.add(this.coinsCounter);
    }

    #coinsUpdate(value) {
        this.coinsCounter.updateText(Math.max(0, value));
    }
}
