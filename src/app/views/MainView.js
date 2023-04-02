import { lego } from "@armathai/lego";
import { MainViewEvents } from "../../events/GameEvents";
import { ForegroundView } from "./ForegroundView";
import { GameView } from "./GameView";
import { UIView } from "./UIView";

export class MainView extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.#build();
    }

    update() {
        this.gameView.update();
    }

    #build() {
        this.foregroundView = new ForegroundView(this.scene);
        this.uiView = new UIView(this.scene);
        this.add((this.gameView = new GameView(this.scene)));
        this.add(this.uiView);
        // this.add((this.resultView = new ResultView(this.scene)));
        this.add(this.foregroundView);

        lego.event.emit(MainViewEvents.ViewsReady);
    }
}
