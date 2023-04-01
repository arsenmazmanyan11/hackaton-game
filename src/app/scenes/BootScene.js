import { Scenes } from "../../constants";

export default class BootScene extends Phaser.Scene {
    preload() {
        //
    }

    create() {
        this.game.scene.stop(Scenes.Boot);
        this.game.scene.start(Scenes.Game);
    }

    init() {
        // this.#initLogo();
        // this.#initButton();
    }

    #initLogo() {
        console.warn(this);
        const { width, height } = this.scale.displaySize;
        const logo = this.add.sprite(width / 2, height / 2, "logo.png");
        logo.setOrigin(1);
        logo.setPosition(width / 2, height / 2);
        // this.add(logo);
    }

    #initButton() {
        const { width, height } = this.scale.displaySize;
        const btn = this.add.sprite(width / 2, height / 2, "btn-green.png");
        btn.setOrigin(1);
        btn.setPosition(width / 2 - 100, height / 2 + 200);
        btn.setInteractive();
        btn.on(Phaser.Input.Events.POINTER_UP, () => {
            this.game.scene.stop(Scenes.Boot);
            this.game.scene.start(Scenes.Game);
        });
    }
}
