import { MainView } from "../views/MainView";

export default class GameScene extends Phaser.Scene {
    create() {
        this.#buildMainView();
    }

    #buildMainView() {
        const mainView = new MainView(this);
        this.add.existing(mainView);
    }
}
