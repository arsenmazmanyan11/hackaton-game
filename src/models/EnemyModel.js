import { EnemyState } from "../constants";
import { ObservableModel } from "./ObservableModel";

export default class EnemyModel extends ObservableModel {
    constructor(config) {
        super("EnemyModel");
        this._config = config;
        this._health = 0;
        this._coins = 0;
        this._speed = 0;
        this._enemyName = "";
        this._state = EnemyState.unknown;
        this._isDead = false;
        this._spawnPosition = null;

        this.makeObservable();
    }

    get health() {
        return this._health;
    }

    set health(value) {
        this._health = value;
    }

    get coins() {
        return this._coins;
    }

    set coins(value) {
        this._coins = value;
    }

    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
    }

    get enemyName() {
        return this._enemyName;
    }

    set enemyName(value) {
        this._enemyName = value;
    }

    get isDead() {
        return this._isDead;
    }

    set isDead(value) {
        this._isDead = value;
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    get spawnPosition() {
        return this._spawnPosition;
    }

    set spawnPosition(value) {
        this._spawnPosition = value;
    }

    decreaseHealth(damage) {
        this._health -= damage;
        if (this._health <= 0) {
            this._isDead = true;
        }
    }

    init() {
        const { name, health, coins, speed } = this._config;
        this._enemyName = name;
        this._health = health;
        this._coins = coins;
        this._speed = speed;
    }
}
