import { MainView } from "../views/MainView";

export default class GameScene extends Phaser.Scene {
    create() {
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
