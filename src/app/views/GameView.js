import { lego } from "@armathai/lego";
import { TOLERANCE } from "../../constants";
import { GameModelEvents, LevelModelEvents } from "../../events/ModelEvents";
import { PLAYER_CONFIG } from "../../gameConfig";
import BackgroundView from "./BackgroundView";
import Bullet from "./Bullet";
import Enemy from "./Enemy";
import PlayerView from "./PlayerView";

export class GameView extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);
        this.enemies = [];
        this.bullets = [];

        this.init();

        lego.event.on(GameModelEvents.PlayerModelUpdate, this.#onPlayerModelUpdate, this);
        lego.event.on(GameModelEvents.LevelModelUpdate, this.#onLevelModelUpdate, this);
        lego.event.on(LevelModelEvents.ActiveEnemiesUpdate, this.#onActiveEnemiesUpdate, this);
    }

    #onPlayerModelUpdate(newValue, oldValue) {
        if (!oldValue) {
            this.#initPlayer(newValue);
        }
    }

    #onLevelModelUpdate(newValue, oldValue) {
        const { bkg } = newValue;
        this.bkg.changeTexture(bkg);
    }

    #onActiveEnemiesUpdate(enemies) {
        this.enemies = enemies.map((e) => {
            const { x, y } = getEnemySpawnPosition(e.spawnPosition);
            const dir = Phaser.Math.Angle.Between(x, y, this.player.x, this.player.y);
            const enemy = new Enemy(this.scene, e);
            enemy.setPosition(x, y);
            enemy.setScale(0.4);
            enemy.setSpeed(Math.random() * 10);
            enemy.setAngle(dir);
            this.add(enemy);
            return enemy;
        });
    }

    update() {
        this.followPointer(this.scene.input.activePointer);
        // this.bullets.forEach((b) => {
        //     b.isActive && b.update();
        // });
        // this.#checkBulletAndEnemyCollision();
        if (this.enemies.length !== 0) {
            this.enemies.forEach((e) => {
                const dir = Phaser.Math.Angle.Between(e.x, e.y, this.player.x, this.player.y);

                e.setAngle(dir);
                e.update();
            });
            this.#checkEnemyAndPlayerCollision();
        }
    }

    init() {
        this.initBkg();
        // this.initBullets();
        // for (let i = 0; i < 5; i++) {
        //     const enemy = new Enemy(this.scene);
        //     enemy.setPosition(300 * (i + 1), 300 * (i + 1));
        //     this.add(enemy);
        //     this.enemies.push(enemy);
        // }
        this.scene.cameras.main.zoom = 0.35;
    }

    initBkg() {
        this.bkg = new BackgroundView(this.scene);
        this.add(this.bkg);
    }

    #initPlayer(config) {
        this.player = new PlayerView(this.scene, config);
        this.player.setPosition(200, 500);
        this.add(this.player);
        this.scene.cameras.main.startFollow(this.player);
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
        this.player.x += Math.cos(radiansToPointer) * PLAYER_CONFIG.speed;
        this.player.y += Math.sin(radiansToPointer) * PLAYER_CONFIG.speed;
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

    #checkEnemyAndPlayerCollision() {
        this.enemies.forEach((e) => {
            // if (b.isActive) {
            // this.enemies.forEach((e) => {
            const dist = Phaser.Math.Distance.Between(e.x, e.y, this.player.x, this.player.y);
            if (dist <= 50) {
                this.player.setTint(0xffffff * Math.random());
                // this.#disbaleBullet(e);
                this.player.alpha = 0.5;
            } else {
                this.player.alpha = 1;
            }
            // });
            // }
        });
    }
}

const getEnemySpawnPosition = (pos) => {
    const deltX = Math.random() * 200 - 100;
    const deltY = Math.random() * 200 - 100;
    return { x: pos.x + deltX, y: pos.y + deltY };
};
