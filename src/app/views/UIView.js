import { lego } from "@armathai/lego";
import { PlayerModelEvents } from "../../events/ModelEvents";
import { COUNTER_CONFIG } from "../../gameConfig";
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
        const { position, scale } = COUNTER_CONFIG;
        this.coinsCounter.setPosition(position.x, position.y);
        this.coinsCounter.setScale(scale);
        this.add(this.coinsCounter);
    }

    #coinsUpdate(value) {
        this.coinsCounter.updateText(Math.max(0, value));
    }
}
