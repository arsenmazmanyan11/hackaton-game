import { lego } from "@armathai/lego";
import { PlayerModelEvents } from "../../events/ModelEvents";

export default class PlayerView extends Phaser.GameObjects.Container {
    constructor(scene, config) {
        super(scene);

        const { lives, coins } = config;
        this.lives = lives;
        this.coins = coins;
        this.gun = null;

        this.init();
        // this.circle = null;
        lego.event.on(PlayerModelEvents.GunUpdate, this.#onGunUpdate, this);
    }

    get shootingPoint() {
        return new Phaser.Geom.Point(this.player.width / 2, 0);
    }

    setTint(color) {
        this.player.tint = color;
    }

    #onGunUpdate(newValue, oldValue) {
        if (!oldValue && newValue) {
            this.#initGun(newValue);
        }
    }

    #initGun(config) {
        //
    }

    init() {
        this.initPlayer();
        this.setSize(this.player.width, this.player.height);
    }

    // drawCircle(color) {
    //     this.circle?.destroy();
    //     this.circle = this.scene.add.circle(this.shootingPoint.x, this.shootingPoint.y, 10, color);
    //     this.add(this.circle);
    // }

    initPlayer() {
        this.player = this.scene.add.image(0, 0, "duck.png");
        this.add(this.player);
    }
}
