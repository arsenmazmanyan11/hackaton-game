import { EnemyState } from "../constants";
import EnemyModel from "./EnemyModel";
import { ObservableModel } from "./ObservableModel";

export class LevelModel extends ObservableModel {
    constructor() {
        super("LevelModel");
        this._levelName = null;
        this._bkg = null;
        this._enemyType = null;
        this._enemiesCount = null;
        this._enemiesRespawnCounts = null;
        this._enemiesRespawnPositions = null;
        this._activeEnemies = [];
        this._boss = null;
        this._isCompleted = false;
        this._wave = 0;

        this.makeObservable();
    }

    get isCompleted() {
        return this._isCompleted;
    }

    set isCompleted(value) {
        this._isCompleted = value;
    }

    get activeEnemies() {
        return this._activeEnemies;
    }

    set activeEnemies(value) {
        this._activeEnemies = value;
    }

    get wave() {
        return this._wave;
    }

    set wave(value) {
        this._wave = value;
    }

    get bkg() {
        return this._bkg;
    }

    set bkg(value) {
        this._bkg = value;
    }

    startWave() {
        this.setActiveEnemies();
    }

    removeEnemy(uuid) {
        const index = this._activeEnemies.indexOf((e) => e.uuid === uuid);
        const enemy = this._activeEnemies.find((e) => e.uuid === uuid);
        this._activeEnemies.splice(index, 1);
        enemy.destroy();

        if (this._activeEnemies.length === 0) {
            this.setActiveEnemies();
        }
    }

    setEnemyState(uuid, state) {
        const enemy = this._activeEnemies.find((e) => e.uuid === uuid);
        enemy.state = state;
    }

    getEnemyByUuid(uuid) {
        return this._enemies.find((e) => e.uuid === uuid);
    }

    setActiveEnemies() {
        this._wave++;
        if (this._wave >= this._enemiesRespawnCounts.length && !this._boss) {
            this._isCompleted = true;
        }
        // else if (this._wave >= this._enemiesRespawnCounts.length && this._boss) {
        //     this.showBoss();
        // }
        const spawnPos = this._enemiesRespawnPositions[this.wave];
        const count = this._enemiesRespawnCounts[this._wave];
        const enemies = this._enemies.splice(0, count);
        enemies.forEach((e) => {
            e.spawnPosition = spawnPos;
            e.state = EnemyState.active;
        });

        this._activeEnemies = [...enemies];
    }

    setNewConfig(config) {
        const {
            name,
            bkg,
            enemy,
            enemiesCount,
            enemiesRespawnCounts,
            enemiesRespawnPositions,
            boss,
            bossSpawnPosition,
        } = config;
        this._levelName = name;
        this._bkg = bkg;
        this._enemiesCount = enemiesCount;
        this._enemiesRespawnCounts = enemiesRespawnCounts;
        this._enemiesRespawnPositions = enemiesRespawnPositions;
        this.setEnemies(enemy);

        if (boss) {
            this.#setBoss(boss, bossSpawnPosition);
        }
    }

    setEnemies(enemyConfig) {
        const arr = [];
        for (let i = 0; i < this._enemiesCount; i++) {
            const enemy = new EnemyModel(enemyConfig);
            enemy.init();
            arr.push(enemy);
        }
        this._enemies = [...arr];
    }

    #setBoss(config, spawnPos) {
        this._boss = new EnemyModel(config);
        this._boss.spawnPosition = spawnPos;
        this._boss.init();
    }
}
