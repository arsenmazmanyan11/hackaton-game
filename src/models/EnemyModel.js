import { EnemyState } from "../constants";
import { ObservableModel } from "./ObservableModel";

export default class EnemyModel extends ObservableModel {
    constructor(config) {
        super("EnemyModel");
        this._config = config;
        this._health = config.health;
        this._coins = config.coins;
        this._speed = config.speed;
        this._damage = config.damage;
        this._enemyName = config.name;
        this._state = EnemyState.unknown;
        this._anim = config.anim;
        this._scale = config.scale;
        this._firstFrame = config.firstFrame;
        this._isDead = false;
        this._hitInterval = config.hitInterval;
        this._spawnPosition = config.spawnPosition;

        this.makeObservable();
    }

    get scale() {
        return this._scale;
    }

    get firstFrame() {
        return this._firstFrame;
    }

    get health() {
        return this._health;
    }

    get anim() {
        return this._anim;
    }

    get hitInterval() {
        return this._hitInterval;
    }

    get damage() {
        return this._damage;
    }

    set health(value) {
        this._health = value;
    }

    get coins() {
        return this._coins;
    }

    get speed() {
        return this._speed;
    }

    get enemyName() {
        return this._enemyName;
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

    decreaseHealth(damage) {
        this._health -= damage;
        if (this._health <= 0) {
            this._state = EnemyState.dead;
            this._isDead = true;
        } else {
            this._state = EnemyState.hit;
        }
    }

    init() {
        // const { name, health, coins, speed } = this._config;
        // this._enemyName = name;
        // this._health = health;
        // this._coins = coins;
        // this._speed = speed;
    }
}
