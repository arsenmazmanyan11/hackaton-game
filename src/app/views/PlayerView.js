import { lego } from "@armathai/lego";
import {
    CANCER_ANIM,
    CANCER_BOSS_ANIM,
    DEVIL_ANIM,
    DEVIL_BOSS_ANIM,
    MORZH_BOSS_ANIM,
    PENGUIN_ANIM,
    PLAYER_P1_IDLE,
    PLAYER_P1_WALK,
} from "../../animsConfig";
import { PlayerModelEvents } from "../../events/ModelEvents";

export default class PlayerView extends Phaser.GameObjects.Container {
    constructor(scene, config) {
        super(scene);

        const { coins } = config;
        this.coins = coins;
        this.gun = null;
        this.cooldown = 1;

        this.init();
        // this.circle = null;
        lego.event.on(PlayerModelEvents.GunUpdate, this.#onGunUpdate, this);
    }

    get shootingPoint() {
        return new Phaser.Geom.Point(this.player.width / 2, 0);
    }

    turnRight() {
        if (this.player.scaleX < 0) return;
        this.player.scaleX *= -1;
    }

    turnLeft() {
        if (this.player.scaleX > 0) return;
        this.player.scaleX *= -1;
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
        // this.initAnims();
        this.initPlayer();
        this.setSize(this.player.width, this.player.height);
        const gr = this.scene.add.rectangle(0, 0, this.player.width, this.player.height, 0xff0000, 0.3);
        this.add(gr);
    }

    // drawCircle(color) {
    //     this.circle?.destroy();
    //     this.circle = this.scene.add.circle(this.shootingPoint.x, this.shootingPoint.y, 10, color);
    //     this.add(this.circle);
    // }

    initPlayer() {
        [
            CANCER_ANIM,
            CANCER_BOSS_ANIM,
            DEVIL_ANIM,
            DEVIL_BOSS_ANIM,
            MORZH_BOSS_ANIM,
            PENGUIN_ANIM,
            PLAYER_P1_WALK,
            PLAYER_P1_IDLE,
        ].forEach((c) => {
            this.scene.anims.create(c);
        });

        this.player = this.scene.add.sprite(0, 0, "duck", "idle-1-p1.png").play("idle-p1");

        this.add(this.player);
    }

    playAnimation(anim) {
        if (this.player.anims.currentAnim?.key !== anim) {
            this.player.setTexture(`${anim}-1.png`);
            this.player.play(anim);
        }
    }
}
