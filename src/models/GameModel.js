import { GameState } from "../constants";
import { LEVEL_CONFIG, PLAYER_CONFIG } from "../gameConfig";
import { STORE_ITEMS } from "../storeItemModels";
import { ObservableModel } from "./ObservableModel";
import { PlayerModel } from "./PlayerModel";
import StoreModel from "./StoreModel";

export class GameModel extends ObservableModel {
    constructor() {
        super("GameModel");
        this._playerModel = null;
        this._levelModel = null;
        this._storeModel = null;
        this._level = 0;
        this._state = GameState.unknown;
        this.makeObservable();
    }

    get playerModel() {
        return this._playerModel;
    }

    set playerModel(value) {
        this._playerModel = value;
    }

    get levelModel() {
        return this._levelModel;
    }

    set levelModel(value) {
        this._levelModel = value;
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

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    setLevel(level) {
        this.level = level;
        this.levelModel.setNewConfig(LEVEL_CONFIG[this.level - 1]);
    }

    init() {
        this.#initPlayerModel();
        this.#initStoreModel();
    }

    #initPlayerModel() {
        this._playerModel = new PlayerModel(PLAYER_CONFIG);
        this._playerModel.init();
    }

    #initStoreModel() {
        this._storeModel = new StoreModel(STORE_ITEMS);
        this._storeModel.init();
    }
}
