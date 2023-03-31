import BootScene from "./app/scenes/BootScene";
import GameScene from "./app/scenes/GameScene";
import PreloadScene from "./app/scenes/PreloadScene";
import { Scenes } from "./constants";

export class Game extends Phaser.Game {
    constructor(gameConfig) {
        super(gameConfig);

        this.#initializeScenes();
        this.scene.start(Scenes.Preload);
    }

    #initializeScenes() {
        this.scene.add(Scenes.Preload, new PreloadScene());
        this.scene.add(Scenes.Boot, new BootScene());
        this.scene.add(Scenes.Game, new GameScene());
    }
}
