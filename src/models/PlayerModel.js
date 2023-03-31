import { ObservableModel } from "./ObservableModel";

export class PlayerModel extends ObservableModel {
    constructor() {
        super("PlayerModel");
        this.makeObservable();
    }

    init() {
        // this.score = 0;
    }
}
