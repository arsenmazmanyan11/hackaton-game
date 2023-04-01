import { ObservableModel } from "./ObservableModel";

export default class ItemModel extends ObservableModel {
    constructor(config) {
        super("ItemModel");
        this._config = config;
        this._price = 0;
        this._upgradeLevel = 0;
        this._isBought = false;
        this._itemName = "";

        this.makeObservable();
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get isBought() {
        return this._isBought;
    }

    set isBought(value) {
        this._isBought = value;
    }

    get upgradeLevel() {
        return this._upgradeLevel;
    }

    set upgradeLevel(value) {
        this._upgradeLevel = value;
    }

    init() {
        const { name, price, upgradeLevel } = this._config;
        this._price = price;
        this._itemName = name;
        this._upgradeLevel = upgradeLevel;
    }
}
