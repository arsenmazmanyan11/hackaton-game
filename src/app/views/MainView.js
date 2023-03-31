import { lego } from "@armathai/lego";
import { MainViewEvents } from "../../events/GameEvents";
import { ForegroundView } from "./ForegroundView";
import { GameView } from "./GameView";
import { UIView } from "./UIView";

export class MainView extends Phaser.GameObjects.Container {
    #logo;
    #emitter;

    constructor(scene) {
        super(scene);
        this.#build();
        console.warn("Main View Build");
        // lego.event.on(GameModelEvents.PlayerModelUpdate, this.#scoreUpdate, this);
    }

    #build() {
        this.add((this.gameView = new GameView(this.scene)));
        this.add((this.uiView = new UIView(this.scene)));
        // this.add((this.resultView = new ResultView(this.scene)));
        this.add((this.foregroundView = new ForegroundView(this.scene)));

        lego.event.emit(MainViewEvents.ViewsReady);
    }
}
