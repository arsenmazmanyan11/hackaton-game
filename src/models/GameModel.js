import { GameState } from "../constants";
import { LEVELS_CONFIG, PLAYER_CONFIG } from "../gameConfig";
import { STORE_ITEMS } from "../storeItems";
import { LevelModel } from "./LevelModel";
import { ObservableModel } from "./ObservableModel";
import { PlayerModel } from "./PlayerModel";
import StoreModel from "./StoreModel";

export class GameModel extends ObservableModel {
    constructor() {
        super("GameModel");
        this._playerModel = null;
        this._levels = [];
        this._currentLevel = null;
        this._storeModel = null;
        this._level = -1;
        this._state = GameState.unknown;
        this.makeObservable();
    }

    get playerModel() {
        return this._playerModel;
    }

    set playerModel(value) {
        this._playerModel = value;
    }

    get storeModel() {
        return this._storeModel;
    }

    set storeModel(value) {
        this._storeModel = value;
    }

    get level() {
        return this._level;
    }

    set level(value) {
        this._level = value;
    }

    get currentLevel() {
        return this._currentLevel;
    }

    set currentLevel(value) {
        this._currentLevel = value;
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    startNextLevel() {
        this._level += 1;
        this._currentLevel = this._levels[this._level];
        this._currentLevel.startNextWave();
    }

    restartCurrentLevel() {
        this._currentLevel = this._levels[this._level];
        this._currentLevel.startFromZero();
    }

    init() {
        this.#initPlayerModel();
        this.#initStoreModel();
        this.#initLevels();
    }

    #initPlayerModel() {
        this._playerModel = new PlayerModel(PLAYER_CONFIG);
        this._playerModel.init();
    }

    #initStoreModel() {
        this._storeModel = new StoreModel(STORE_ITEMS);
        this._storeModel.init();
    }

    #initLevels() {
        this._levels = LEVELS_CONFIG.map((c) => {
            const level = new LevelModel(c);
            level.init();
            return level;
        });
    }
}
