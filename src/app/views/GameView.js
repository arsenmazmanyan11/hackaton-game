import { lego } from "@armathai/lego";
import { GameModelEvents } from "../../events/ModelEvents";

export class GameView extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);

        lego.event.on(GameModelEvents.ScoreUpdate, this.#onScoreUpdate, this);

        this.init();
    }

    init() {
        // this.initBkg();
        // this.initHole();
        // this.scene.cameras.main.startFollow(this.hole);
    }
    #onScoreUpdate(a, b, c) {
        console.warn(a, b, c);
    }
}
