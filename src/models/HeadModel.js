import { GameModel } from "./GameModel";
import { ObservableModel } from "./ObservableModel";

class HeadModel extends ObservableModel {
    constructor() {
        super("Head");
        this.makeObservable();
    }

    set gameModel(value) {
        this._gameModel = value;
    }

    get gameModel() {
        return this._gameModel;
    }

    init() {
        //
    }

    initGameModel() {
        this._gameModel = new GameModel();
        this._gameModel.init();
    }
}

const Head = new HeadModel();

export default Head;
