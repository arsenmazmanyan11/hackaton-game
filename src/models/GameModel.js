import { ObservableModel } from "./ObservableModel";
import { PlayerModel } from "./PlayerModel";

export class GameModel extends ObservableModel {
    constructor() {
        super("GameModel");
        this.makeObservable();
    }

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
    }

    get playerModel() {
        return this._playerModel;
    }

    set playerModel(value) {
        this._playerModel = value;
    }

    init() {
        this._playerModel = new PlayerModel();
        this._playerModel.init();
        this.score = 0;
    }
}