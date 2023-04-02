import { ObservableModel } from "./ObservableModel";
import { WaveModel } from "./WaveModel";

export class LevelModel extends ObservableModel {
    constructor(config) {
        super("LevelModel");
        this._config = config;
        this._levelName = config.name;
        this._bkg = config.bkg;
        this._currentWaveIndex = -1;
        this._currentWave = null;
        this._complete = false;
        this._waves = [];
        this._bkgConfig = config.bkgItems;

        this.makeObservable();
    }

    get bkgConfig() {
        return this._bkgConfig;
    }

    get currentWaveIndex() {
        return this._currentWaveIndex;
    }

    set currentWaveIndex(value) {
        this._currentWaveIndex = value;
    }

    get currentWave() {
        return this._currentWave;
    }

    set currentWave(value) {
        this._currentWave = value;
    }

    get complete() {
        return this._complete;
    }

    set complete(value) {
        this._complete = value;
    }

    get bkg() {
        return this._bkg;
    }

    init() {
        this.#initWaves();
    }

    restartLevel() {
        this.#initWaves();
        this._currentWaveIndex = -1;
        this.startNextWave();
    }

    startNextWave() {
        this._currentWaveIndex += 1;
        if (this._currentWaveIndex === this._waves.length) {
            this._complete = true;
            return;
        }
        setTimeout(() => {
            this._currentWave = this._waves[this._currentWaveIndex];
        }, this._waves[this._currentWaveIndex].respawnTimeout);
    }

    #initWaves() {
        this._waves = this._config.waves.map((w) => {
            const wave = new WaveModel(w);
            wave.init();
            return wave;
        });
    }

    removeEnemy(uuid) {
        this._currentWave.removeEnemy(uuid);
    }

    setEnemyState(uuid, state) {
        this._currentWave.setEnemyState(uuid, state);
    }

    getEnemyByUuid(uuid) {
        return this._currentWave.getEnemyByUuid(uuid);
    }

    decreaseEnemyHealth(uuid, damage) {
        this._currentWave.decreaseEnemyHealth(uuid, damage);
    }
}
