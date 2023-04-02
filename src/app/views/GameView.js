import { lego } from "@armathai/lego";
import { GameState, TOLERANCE } from "../../constants";
import { GameEvents } from "../../events/GameEvents";
import { EnemyModelEvents, GameModelEvents, LevelModelEvents } from "../../events/ModelEvents";
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
        lego.event.on(GameModelEvents.CurrentLevelUpdate, this.#onCurrentLevelUpdate, this);
        lego.event.on(LevelModelEvents.CurrentWaveUpdate, this.#onCurrentWaveUpdate, this);
        lego.event.on(EnemyModelEvents.IsDeadUpdate, this.#onEnemyDeadUpdate, this);
        lego.event.on(GameModelEvents.StateUpdate, this.#onGameStateUpdate, this);
    }

    #onGameStateUpdate(newState, oldState) {
        switch (newState) {
            case GameState.levelWin:
                lego.event.emit(GameEvents.ShowWinPopup, this.player.x, this.player.y);
                break;

            default:
                break;
        }
    }

    #onPlayerModelUpdate(newValue, oldValue) {
        if (!oldValue) {
            this.#initPlayer(newValue);
            this.initBullets();
        }
    }

    #onCurrentLevelUpdate(newValue) {
        const { bkg } = newValue;
        this.bkg.changeTexture(bkg);
    }

    #onCurrentWaveUpdate(newWave) {
        if (!newWave) return;
        this.#addEnemies(newWave.enemies);
    }

    #addEnemies(enemies) {
        this.enemies = [];
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

    #onEnemyDeadUpdate(isDead, wasAlive, uuid) {
        if (isDead) {
            const enemy = this.#getEnemyByUuid(uuid);
            const index = this.enemies.indexOf(enemy);
            enemy.destroy();
            this.enemies.splice(index, 1);
            lego.event.emit(GameEvents.EnemyDied, uuid);
        }
    }

    update() {
        this.player.cooldown -= 1 / 60;
        this.followPointer(this.scene.input.activePointer);
        this.bullets.forEach((b) => {
            b.isActive && b.update();
        });
        this.#checkBulletAndEnemyCollision();
        if (this.enemies.length !== 0) {
            this.enemies.forEach((e) => {
                const dir = Phaser.Math.Angle.Between(e.x, e.y, this.player.x, this.player.y);
                e.setAngle(dir);
                e.update();
            });
        }
        this.#checkEnemyAndPlayerCollision();
    }

    init() {
        this.initBkg();
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
            this.#addNewBullet();
        }
    }

    getBullet() {
        return this.bullets.find((b) => !b.isActive);
    }

    #addNewBullet() {
        const bullet = new Bullet(this.scene, 0, 0);
        bullet.visible = false;
        bullet.on("distReached", () => {
            this.#disbaleBullet(bullet);
        });
        this.add(bullet);
        this.bullets.push(bullet);
    }
    #shootBullet(enemy) {
        const bullet = this.getBullet();
        if (!bullet) return;
        const { x: ex, y: ey } = enemy;
        const { x } = this.player.shootingPoint;
        bullet.visible = true;
        bullet.x = this.player.x + Math.cos(this.player.rotation) * x;
        bullet.y = this.player.y + (Math.sin(this.player.rotation) * this.player.height) / 2;
        const rot = Phaser.Math.Angle.Between(bullet.x, bullet.y, ex, ey);
        bullet.setSpeed(PLAYER_CONFIG.bulletSpeed);
        bullet.setAngle(rot);
        bullet.rotation = this.player.rotation;
        bullet.isActive = true;
    }

    #disbaleBullet(bullet) {
        bullet.visible = false;
        bullet.setSpeed(0);
        bullet.isActive = false;
        bullet.remainingDist = PLAYER_CONFIG.bulletDistance;
    }

    #checkBulletAndEnemyCollision() {
        this.bullets.forEach((b) => {
            if (b.isActive) {
                this.enemies.forEach((e) => {
                    const dist = Phaser.Math.Distance.Between(b.x, b.y, e.x, e.y);
                    if (dist <= 30) {
                        e.tint(0xffffff * Math.random());
                        this.#disbaleBullet(b);
                        lego.event.emit(GameEvents.EnemyHit, e.uuid);
                    }
                });
            }
        });
    }

    #checkEnemyAndPlayerCollision() {
        this.enemies.forEach((e) => {
            const dist = Phaser.Math.Distance.Between(e.x, e.y, this.player.x, this.player.y);
            if (dist <= 50 && e.cooldown <= 0) {
                this.player.setTint(0xffffff * Math.random());
                lego.event.emit(GameEvents.PlayerHit, e.damage);
                e.hitPlayer();
                this.player.alpha = 0.5;
            }
            if (dist <= 500) {
                if (this.player.cooldown <= 0) {
                    this.player.cooldown = 1;
                    this.#shootBullet(e);
                }
            }
        });
    }

    #getEnemyByUuid(uuid) {
        return this.enemies.find((e) => e.uuid === uuid);
    }
}

const getEnemySpawnPosition = (pos) => {
    const deltX = Math.random() * 200 - 100;
    const deltY = Math.random() * 200 - 100;
    return { x: pos.x + deltX, y: pos.y + deltY };
};
