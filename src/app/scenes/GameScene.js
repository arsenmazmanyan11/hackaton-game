import { lego } from "@armathai/lego";
import { initModelsCommand } from "../commands/InitModelsCommand";
import { MainView } from "../views/MainView";

export default class GameScene extends Phaser.Scene {
    create() {
        lego.command.execute(initModelsCommand);

        this.#buildMainView();
    }

    update() {
        this.mainView?.update();
    }

    #buildMainView() {
        this.mainView = new MainView(this);
        this.add.existing(this.mainView);
    }
}
