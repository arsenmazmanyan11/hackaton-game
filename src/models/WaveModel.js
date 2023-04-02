import EnemyModel from "./EnemyModel";
import Head from "./HeadModel";
import { ObservableModel } from "./ObservableModel";

export class WaveModel extends ObservableModel {
    constructor(config) {
        super("WaveModel");
        this._config = config;

        this._enemiesCount = this._config.enemiesCount;
        this._enemies = [];
        this._isCompleted = false;
        this._respawnTimeout = this._config.respawnTimeout;

        this.makeObservable();
    }

    get respawnTimeout() {
        return this._respawnTimeout;
    }

    get isCompleted() {
        return this._isCompleted;
    }

    get enemies() {
        return this._enemies;
    }

    set isCompleted(value) {
        this._isCompleted = value;
    }

    init() {
        const arr = [];
        const { spawnPosition } = this._config;
        for (let i = 0; i < this._enemiesCount; i++) {
            const config = {
                ...this._config.enemyType,
                spawnPosition,
            };
            const enemy = new EnemyModel(config);
            enemy.init();
            arr.push(enemy);
        }

        if (this._config.boss) {
            const config = {
                ...this._config.boss,
                spawnPosition,
            };
            const boss = new EnemyModel(config);
            boss.init();
            arr.push(boss);
        }
        this._enemies = [...arr];
    }

    getEnemyByUuid(uuid) {
        return this._enemies.find((e) => e.uuid === uuid);
    }

    removeEnemy(uuid) {
        const enemy = this.getEnemyByUuid(uuid);
        const index = this._enemies.indexOf(enemy);
        Head.gameModel.playerModel.coins += enemy.coins;

        enemy.destroy();
        this._enemies.splice(index, 1);

        if (this._enemies.length === 0) {
            this._isCompleted = true;
        }
    }

    setEnemyState(uuid, state) {
        const enemy = this.getEnemyByUuid(uuid);
        enemy.state = state;
    }

    decreaseEnemyHealth(uuid, damage) {
        const enemy = this.getEnemyByUuid(uuid);
        enemy.decreaseHealth(damage);
    }
}
