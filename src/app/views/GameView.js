import { lego } from "@armathai/lego";
import { TOLERANCE } from "../../constants";
import { GameModelEvents } from "../../events/ModelEvents";
import BackgroundView from "./BackgroundView";
import Bullet from "./Bullet";
import PlayerView from "./PlayerView";

export class GameView extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.enemies = [];
        this.bullets = [];

        this.init();

        lego.event.on(GameModelEvents.PlayerModelUpdate, this.#onPlayerModelUpdate, this);
        lego.event.on(GameModelEvents.LevelModelUpdate, this.#onLevelModelUpdate, this);
    }

    #onPlayerModelUpdate(newValue, oldValue) {
        if (!oldValue) {
            this.#initPlayer(newValue);
        }
    }

    #onLevelModelUpdate(newValue, oldValue) {
        console.log(newValue, oldValue);
        // this.bkg.changeTexture()
    }

    update() {
        // this.followPointer(this.scene.input.activePointer);
        // this.bullets.forEach((b) => {
        //     b.isActive && b.update();
        // });
        // this.#checkBulletAndEnemyCollision();
    }

    init() {
        this.initBkg();
        // this.initPlayer();
        // this.initBullets();
        // for (let i = 0; i < 5; i++) {
        //     const enemy = new Enemy(this.scene);
        //     enemy.setPosition(300 * (i + 1), 300 * (i + 1));
        //     this.add(enemy);
        //     this.enemies.push(enemy);
        // }
        this.scene.cameras.main.zoom = 0.15;

        // this.scene.time.delayedCall(
        //     4000,
        //     () => {
        //         this.bkg.changeTexture("desert.jpg");
        //     },
        //     this,
        // );
        // this.scene.cameras.main.startFollow(this.player);
        // // this.scene.cameras.cameras[0].zoom = 0.5;
    }

    initBkg() {
        this.bkg = new BackgroundView(this.scene);
        this.bkg.on("click", () => {
            this.#shootBullet();
        });
        this.add(this.bkg);
    }

    #initPlayer(config) {
        this.player = new PlayerView(this.scene, config);

        this.add(this.player);
    }

    followPointer(pointer) {
        const { isDown, worldX, worldY } = pointer;
        const { x, y } = this.player;
        const dist = Phaser.Math.Distance.Between(worldX, worldY, x, y);
        if (!isDown) return;
        if (dist <= 60) return;
        const radiansToPointer = Phaser.Math.Angle.Between(x, y, worldX, worldY);
        if (Phaser.Math.Fuzzy.Equal(radiansToPointer, 0, TOLERANCE)) {
            this.player.rotation = radiansToPointer;
        }
        this.player.x += Math.cos(radiansToPointer) * SPEED;
        this.player.y += Math.sin(radiansToPointer) * SPEED;
        // this.player.drawCircle(0xffffff * Math.random());
    }

    initBullets() {
        for (let i = 0; i < 50; i++) {
            const bullet = new Bullet(this.scene, 0, 0);
            bullet.visible = false;
            bullet.on("distReached", () => {
                this.#disbaleBullet(bullet);
            });
            this.add(bullet);
            this.bullets.push(bullet);
        }
    }

    getBullet() {
        return this.bullets.find((b) => !b.isActive);
    }

    #shootBullet() {
        // const bullet = this.getBullet();
        // if (!bullet) return;
        // const { x } = this.player.shootingPoint;
        // bullet.visible = true;
        // bullet.x = this.player.x + Math.cos(this.player.rotation) * x;
        // bullet.y = this.player.y + (Math.sin(this.player.rotation) * this.player.height) / 2;
        // bullet.setSpeed(CONFIG.bulletSpeed);
        // bullet.setAngle(this.player.rotation);
        // bullet.rotation = this.player.rotation;
        // bullet.isActive = true;
    }

    #disbaleBullet(bullet) {
        // bullet.visible = false;
        // bullet.setSpeed(0);
        // bullet.isActive = false;
        // bullet.remainingDist = CONFIG.bulletDist;
    }

    #checkBulletAndEnemyCollision() {
        // this.bullets.forEach((b) => {
        //     if (b.isActive) {
        //         this.enemies.forEach((e) => {
        //             const dist = Phaser.Math.Distance.Between(b.x, b.y, e.x, e.y);
        //             if (dist <= e.width / 2) {
        //                 e.tint(0xffffff * Math.random());
        //                 this.#disbaleBullet(b);
        //             }
        //         });
        //     }
        // });
    }
}
