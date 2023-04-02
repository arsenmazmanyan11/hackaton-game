import { Scenes } from "../../constants";
// import { BOOT_SCENE_CONFIG } from "../../gameConfig";

export default class BootScene extends Phaser.Scene {
    preload() {
        //
    }

    create() {
        // TODO
        this.game.scene.stop(Scenes.Boot);
        this.game.scene.start(Scenes.Game);
    }

    init() {
        // const { logo: logoConfig, button: buttonConfig } = BOOT_SCENE_CONFIG;
        // this.#initLogo(logoConfig);
        // this.#initButton(buttonConfig);
    }

    #initLogo(logoConfig) {
        const { x, y, image, scale } = logoConfig;
        // const { width, height } = this.scale.displaySize;
        const logo = this.add.sprite(0, 0, image);
        logo.setOrigin(0.5);
        logo.setPosition(x, y);
        logo.setScale(scale);
    }

    #initButton(buttonConfig) {
        const { x, y, image, scale } = buttonConfig;

        // const { width, height } = this.scale.displaySize;
        const btn = this.add.sprite(0, 0, image);
        btn.setOrigin(0.5);
        btn.setPosition(x, y);
        btn.setScale(scale);
        btn.setInteractive();
        btn.on(Phaser.Input.Events.POINTER_UP, () => {
            this.game.scene.stop(Scenes.Boot);
            this.game.scene.start(Scenes.Game);
        });
    }
}
