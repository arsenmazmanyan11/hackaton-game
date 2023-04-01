import { ObservableModel } from "./ObservableModel";

export class LevelModel extends ObservableModel {
    constructor() {
        super("LevelModel");
        this._levelName = null;
        this._bkg = null;
        this._enemies = null;
        this._enemiesCount = null;
        this._enemiesRespawnCounts = null;
        this._enemiesRespawnPositions = null;
        this._boss = null;
        this._isCompleted = false;

        this.makeObservable();
    }

    get isCompleted() {
        return this._isCompleted;
    }

    set isCompleted(value) {
        this._isCompleted = value;
    }

    setNewConfig(config) {
        const { name, bkg, enemies, enemiesCount, enemiesRespawnCounts, enemiesRespawnPositions, boss } = config;
        this._levelName = name;
        this._bkg = bkg;
        this._enemies = enemies;
        this._enemiesCount = enemiesCount;
        this._enemiesRespawnCounts = enemiesRespawnCounts;
        this._enemiesRespawnPositions = enemiesRespawnPositions;
        this._boss = boss;
    }
}
