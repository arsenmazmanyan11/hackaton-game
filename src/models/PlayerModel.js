import { ObservableModel } from "./ObservableModel";

export class PlayerModel extends ObservableModel {
    constructor() {
        super("PlayerModel");
        this.makeObservable();
    }

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
    }

    init() {
        this.score = 0;
    }

    increaseScore(value = 0) {
        this.score += Math.max(value, 1);
    }
}
