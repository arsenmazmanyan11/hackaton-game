import { lego } from "@armathai/lego";
import {
    BOOM,
    CANCER_ANIM,
    CANCER_BOSS_ANIM,
    DEVIL_ANIM,
    DEVIL_BOSS_ANIM,
    MORZH_BOSS_ANIM,
    PENGUIN_ANIM,
    PLAYER_P1_IDLE,
    PLAYER_P1_WALK,
    PLAYER_P2_IDLE,
    PLAYER_P2_WALK,
    PLAYER_P3_IDLE,
    PLAYER_P3_WALK,
    PLAYER_P4_IDLE,
    PLAYER_P4_WALK,
} from "../../animsConfig";
import { PlayerModelEvents } from "../../events/ModelEvents";

export default class PlayerView extends Phaser.GameObjects.Container {
    constructor(scene, config) {
        super(scene);

        const { coins, gun } = config;
        this.coins = coins;
        this.gunType = gun;
        this.cooldown = 1;
        this.circle = null;

        this.pc = this.scene.add.container();
        this.add(this.pc);

        this.init();
        lego.event.on(PlayerModelEvents.GunUpdate, this.#onGunUpdate, this);
    }

    get shootingPoint() {
        switch (this.gunType) {
            case 1:
                const x = -Math.cos(this.gun.rotation) * this.gun.width * this.pc.scaleX;
                const y = -Math.sin(this.gun.rotation) * this.gun.height + this.gun.y;
                return new Phaser.Geom.Point(x, y);

            default:
                return { x: 0, y: 0 };
        }
    }

    setGunAngle(rad) {
        this.gun.rotation = rad * Math.sign(this.scaleX);
    }

    turnRight() {
        if (this.pc.scaleX < 0) return;
        this.pc.scaleX *= -1;
    }

    turnLeft() {
        if (this.pc.scaleX > 0) return;
        this.pc.scaleX *= -1;
    }

    setTint(color) {
        this.player.tint = color;
    }

    #onGunUpdate(newValue, oldValue) {
        this.gunType = newValue;

        this.changeSkins();
    }

    changeSkins() {
        this.player.setTexture(`duck-${this.gunType}`, `idle-1-p${this.gunType}.png`);
        console.warn(`duck-${this.gunType}`, `idle-1-p${this.gunType}.png`);
        this.gun.setTexture(`gun-${this.gunType}.png`);
        this.player.play(`idle-p${this.gunType}`);
        const { x, y } = getAnchor(this.gunType);
        this.gun.setOrigin(x, y);
    }

    drawCircle() {
        this.circle?.destroy();
        this.circle = this.scene.add.circle(this.shootingPoint.x, this.shootingPoint.y, 30, 0xffffff * Math.random());
        this.pc.add(this.circle);
    }

    #initGun() {
        this.gun = this.scene.add.image(-45, 27, `gun-${this.gunType}.png`);
        const { x, y } = getAnchor(this.gunType);
        this.gun.setOrigin(x, y);
        this.pc.add(this.gun);
        this.bringToTop(this.player);
    }

    init() {
        this.#initGun();
        this.initPlayer();
        this.setSize(this.player.width, this.player.height);
        // const gr = this.scene.add.rectangle(0, 0, this.gun.width, this.gun.height, 0xff0000, 0.3);
        // this.pc.add(gr);
    }

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
            PLAYER_P2_WALK,
            PLAYER_P2_IDLE,
            PLAYER_P3_WALK,
            PLAYER_P3_IDLE,
            PLAYER_P4_WALK,
            PLAYER_P4_IDLE,
            BOOM,
        ].forEach((c) => {
            this.scene.anims.create(c);
        });

        this.player = this.scene.add.sprite(0, 0, "duck-1", "idle-1-p1.png").play("idle-p1");

        this.pc.add(this.player);
    }

    playAnimation(anim) {
        const name = `${anim}-p${this.gunType}`;
        if (this.player.anims.currentAnim?.key !== name) {
            this.player.setTexture(`${name}-1.png`);
            this.player.play(name);
        }
    }
}

const getAnchor = (n) => {
    if (n === 1 || n === 2) {
        return { x: 1, y: 0.5 };
    } else if (n === 3) {
        return { x: 1, y: 0.7 };
    } else if (n === 4) {
        return { x: 1, y: 0.85 };
    }
};
