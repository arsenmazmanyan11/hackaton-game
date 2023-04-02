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
                const x1 = -Math.cos(this.gun.rotation) * this.gun.width * this.pc.scaleX;
                const y1 = -Math.sin(this.gun.rotation) * this.gun.height + this.gun.y;
                return [new Phaser.Geom.Point(x1, y1)];
            case 2:
                const x21 = -Math.cos(this.gun.rotation) * this.gun.width * this.pc.scaleX - 10;
                const y21 = -Math.sin(this.gun.rotation) * this.gun.height + this.gun.y - 10;
                const x22 = -Math.cos(this.gun.rotation) * this.gun.width * this.pc.scaleX + 10;
                const y22 = -Math.sin(this.gun.rotation) * this.gun.height + this.gun.y + 10;
                return [new Phaser.Geom.Point(x21, y21), new Phaser.Geom.Point(x22, y22)];
            case 3:
                const x31 = -Math.cos(this.gun.rotation) * this.gun.width * this.pc.scaleX - 25;
                const y31 = -Math.sin(this.gun.rotation) * this.gun.height + this.gun.y;
                const x32 = -Math.cos(this.gun.rotation) * this.gun.width * this.pc.scaleX + 25;
                const y32 = -Math.sin(this.gun.rotation) * this.gun.height + this.gun.y;
                const x33 = -Math.cos(this.gun.rotation) * this.gun.width * this.pc.scaleX;
                const y33 = -Math.sin(this.gun.rotation) * this.gun.height + this.gun.y - 45;
                return [
                    new Phaser.Geom.Point(x31, y31),
                    new Phaser.Geom.Point(x32, y32),
                    new Phaser.Geom.Point(x33, y33),
                ];
            case 4:
                const x41 = -Math.cos(this.gun.rotation) * this.gun.width * this.pc.scaleX - 45;
                const y41 = -Math.sin(this.gun.rotation) * this.gun.height + this.gun.y - 10;
                const x42 = -Math.cos(this.gun.rotation) * this.gun.width * this.pc.scaleX + 45;
                const y42 = -Math.sin(this.gun.rotation) * this.gun.height + this.gun.y - 10;
                const x43 = -Math.cos(this.gun.rotation) * this.gun.width * this.pc.scaleX;
                const y43 = -Math.sin(this.gun.rotation) * this.gun.height + this.gun.y - 45;
                const x44 = -Math.cos(this.gun.rotation) * this.gun.width * this.pc.scaleX + 35;
                const y44 = -Math.sin(this.gun.rotation) * this.gun.height + this.gun.y + 65;
                const x45 = -Math.cos(this.gun.rotation) * this.gun.width * this.pc.scaleX - 35;
                const y45 = -Math.sin(this.gun.rotation) * this.gun.height + this.gun.y + 65;
                return [
                    new Phaser.Geom.Point(x41, y41),
                    new Phaser.Geom.Point(x42, y42),
                    new Phaser.Geom.Point(x43, y43),
                    new Phaser.Geom.Point(x44, y44),
                    new Phaser.Geom.Point(x45, y45),
                ];
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
