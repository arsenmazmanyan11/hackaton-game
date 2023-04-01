import ItemModel from "./ItemModel";
import { ObservableModel } from "./ObservableModel";

export default class StoreModel extends ObservableModel {
    constructor(config) {
        super("StoreModel");
        this._config = config;
        this._isShown = false;
        this._items = [];

        this.makeObservable();
    }

    get isShown() {
        return this._isShown;
    }

    set isShown(value) {
        this._isShown = value;
    }

    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }

    getItemByName(name) {
        return this._items.find((item) => item.itemName === name);
    }

    buyItem(name) {
        const item = this.getItemByName(name);
        item.isBought = true;
    }

    init() {
        this._items = this._config.map((c) => {
            const item = new ItemModel(c);
            item.init();
            return item;
        });
    }
}
