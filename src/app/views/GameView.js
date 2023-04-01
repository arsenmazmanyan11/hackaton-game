import { lego } from "@armathai/lego";
import { SPEED } from "../../constants";
import { GameModelEvents } from "../../events/ModelEvents";
import BackgroundView from "./BackgroundView";
import PlayerView from "./PlayerView";

export class GameView extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);

        lego.event.on(GameModelEvents.ScoreUpdate, this.#onScoreUpdate, this);

        this.init();
    }

    update() {
        this.followPointer(this.scene.input.activePointer);
    }

    init() {
        this.initBkg();
        this.initPlayer();

        this.scene.cameras.main.startFollow(this.player);
        // this.scene.cameras.cameras[0].zoom = 0.5;
    }

    initBkg() {
        this.bkg = new BackgroundView(this.scene);
        this.bkg.on("click", () => {
            // console.warn(12);
        });
        this.add(this.bkg);
    }

    initPlayer() {
        this.player = new PlayerView(this.scene);
        this.add(this.player);
    }

    followPointer(pointer) {
        if (!pointer.isDown) return;
        const radiansToPointer = Phaser.Math.Angle.Between(
            this.player.x,
            this.player.y,
            pointer.worldX,
            pointer.worldY,
        );
        this.player.rotation = radiansToPointer;
        this.player.x += Math.cos(radiansToPointer) * SPEED;
        this.player.y += Math.sin(radiansToPointer) * SPEED;
    }

    #onScoreUpdate(a, b, c) {
        // console.warn(a, b, c);
    }
}
