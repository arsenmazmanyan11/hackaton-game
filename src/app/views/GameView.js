import { lego } from "@armathai/lego";
import { GameState } from "../../constants";
import { GameEvents } from "../../events/GameEvents";
import { EnemyModelEvents, GameModelEvents, LevelModelEvents, PlayerModelEvents } from "../../events/ModelEvents";
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
        this.state = GameState.unknown;
        this.init();

        lego.event.on(GameModelEvents.PlayerModelUpdate, this.#onPlayerModelUpdate, this);
        lego.event.on(GameModelEvents.CurrentLevelUpdate, this.#onCurrentLevelUpdate, this);
        lego.event.on(LevelModelEvents.CurrentWaveUpdate, this.#onCurrentWaveUpdate, this);
        lego.event.on(EnemyModelEvents.IsDeadUpdate, this.#onEnemyDeadUpdate, this);
        lego.event.on(PlayerModelEvents.IsDeadUpdate, this.#onPlayerDeadUpdate, this);
        lego.event.on(GameModelEvents.StateUpdate, this.#onGameStateUpdate, this);
    }

    #onGameStateUpdate(newState, oldState) {
        this.state = newState;
        switch (newState) {
            case GameState.levelWin:
                this.bullets.forEach((e) => e.destroy());
                this.bullets = [];
                lego.event.emit(GameEvents.ShowWinPopup, this.player.x, this.player.y);
                break;
            case GameState.levelLose:
                this.bullets.forEach((e) => e.destroy());
                this.bullets = [];
                lego.event.emit(GameEvents.ShowLosePopup, this.player.x, this.player.y);
                break;
            case GameState.game:
                this.player.cooldown = 1;
                this.initBullets();
                break;

            default:
                break;
        }
    }

    #onPlayerDeadUpdate() {
        this.enemies.forEach((e) => e.destroy());
        this.enemies = [];
    }

    #onPlayerModelUpdate(newValue, oldValue) {
        if (!oldValue) {
            this.initBullets();
            this.#initPlayer(newValue);
        }
    }

    #onCurrentLevelUpdate(newValue) {
        this.enemies.forEach((e) => e.destroy());
        this.enemies = [];
        const { bkg, bkgConfig } = newValue;
        this.bkg.changeTexture(bkg);
        this.bkg.setItems(bkgConfig);
    }

    #onCurrentWaveUpdate(newWave) {
        if (!newWave) return;
        this.#addEnemies(newWave.enemies);
    }

    #addEnemies(enemies) {
        this.enemies.forEach((e) => e.destroy());
        this.enemies = [];
        this.enemies = enemies.map((e) => {
            const { x, y } = getEnemySpawnPosition(e.spawnPosition);
            const dir = Phaser.Math.Angle.Between(x, y, this.player.x, this.player.y);
            const enemy = new Enemy(this.scene, e);
            enemy.setPosition(x, y);
            enemy.setSpeed(e.speed + (Math.random() * 6 - 3));
            enemy.setAngle(dir);
            enemy.setScale(e.scale);
            this.add(enemy);
            return enemy;
        });
    }

    #onEnemyDeadUpdate(isDead, wasAlive, uuid) {
        if (isDead) {
            const enemy = this.#getEnemyByUuid(uuid);
            const index = this.enemies.indexOf(enemy);
            const { x, y } = enemy;
            const boom = this.scene.add.sprite(x, y, "boom", "enemy_kill_1.png").play("explode");
            boom.on("animationcomplete", () => {
                boom.visible = false;
                boom.destroy();
            });

            this.add(boom);
            enemy.destroy();
            this.enemies.splice(index, 1);
            lego.event.emit(GameEvents.EnemyDied, uuid);
        }
    }

    update() {
        if (this.state === GameState.levelLose || this.state === GameState.levelWin) return;
        this.player.cooldown -= 1 / 60;
        this.followPointer(this.scene.input.activePointer);
        this.bullets.forEach((b) => {
            b.isActive && b.update();
        });
        if (this.enemies.length !== 0) {
            this.#checkBulletAndEnemyCollision();
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
        if (x <= -2500 || x >= 2500 || y >= 2500 || y <= -2500) {
            this.scene.cameras.main.stopFollow(this.player);
        } else {
            this.scene.cameras.main.startFollow(this.player);
        }
        // const dist = Phaser.Math.Distance.Between(worldX, worldY, x, y);
        if (!isDown) {
            this.player.playAnimation("idle");
            return;
        }

        const radiansToPointer = Phaser.Math.Angle.Between(x, y, worldX, worldY);
        // if (Math.PI / 2 > radiansToPointer && -Math.PI / 2 < radiansToPointer) {
        //     this.player.setGunAngle(radiansToPointer);
        // } else if (Math.PI / 2 <= radiansToPointer || -Math.PI / 2 >= radiansToPointer) {
        //     this.player.setGunAngle(Math.PI - radiansToPointer);
        // }
        // this.player.drawCircle();
        // if (radiansToPointer > Math.PI / 2 || radiansToPointer < -Math.PI / 2) {
        //     this.player.turnLeft();
        // } else {
        //     this.player.turnRight();
        // }
        this.player.x += Math.cos(radiansToPointer) * PLAYER_CONFIG.speed;
        this.player.y += Math.sin(radiansToPointer) * PLAYER_CONFIG.speed;
        this.player.playAnimation("walk");
    }

    #checkEnemyAndPlayerCollision() {
        const arr = this.enemies.map((e) => {
            const dist = Phaser.Math.Distance.Between(e.x, e.y, this.player.x, this.player.y);
            return { dist, enemy: e };
        });
        if (arr.length === 0) return;
        arr.sort((a, b) => a.dist - b.dist);
        const en = arr[0].enemy;
        const radToEnemy = Phaser.Math.Angle.Between(en.x, en.y, this.player.x, this.player.y);
        if (radToEnemy > Math.PI / 2 || radToEnemy < -Math.PI / 2) {
            this.player.turnRight();
        } else {
            this.player.turnLeft();
        }

        if (Math.PI / 2 > radToEnemy && -Math.PI / 2 < radToEnemy) {
            this.player.setGunAngle(radToEnemy);
        } else if (Math.PI / 2 <= radToEnemy || -Math.PI / 2 >= radToEnemy) {
            this.player.setGunAngle(Math.PI - radToEnemy);
        }
        this.enemies.forEach((e) => {
            const dist = Phaser.Math.Distance.Between(e.x, e.y, this.player.x, this.player.y);
            if (dist < 100) {
                e.setSpeed(0);
            } else {
                e.setSpeed(e.speed);
            }
            if (dist <= 50 && e.cooldown <= 0) {
                // this.player.setTint(0xffffff * Math.random());
                lego.event.emit(GameEvents.PlayerHit, e.damage);
                e.hitPlayer();
                // this.player.alpha = 0.5;
            }
            if (dist <= 1000) {
                if (this.player.cooldown <= 0) {
                    this.player.cooldown = 1;
                    this.#shootBullet(e);
                }
            }
        });
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
        const { x, y } = this.player.shootingPoint;
        bullet.visible = true;
        bullet.x = this.player.x + x;
        bullet.y = this.player.y + y;
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
                    if (dist <= 150) {
                        // e.tint(0xffffff * Math.random());
                        this.#disbaleBullet(b);
                        lego.event.emit(GameEvents.EnemyHit, e.uuid);
                    }
                });
            }
        });
    }

    #getEnemyByUuid(uuid) {
        return this.enemies.find((e) => e.uuid === uuid);
    }
}

const getEnemySpawnPosition = (pos) => {
    const deltX = Math.random() * 600 - 300;
    const deltY = Math.random() * 600 - 300;
    return { x: pos.x + deltX, y: pos.y + deltY };
};

const clamp = (min, max) => {
    return Math.min(Math.max(this, min), max);
};
