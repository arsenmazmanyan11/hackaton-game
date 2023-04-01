import { ObservableModel } from "./ObservableModel";

export class GunModel extends ObservableModel {
    constructor(config) {
        super("GunModel");

        const { gunType, bulletsCount, bulletDistance, bulletSpeed } = config;
        this._gunType = gunType;
        this._bulletsCount = bulletsCount;
        this._bulletDistance = bulletDistance;
        this._bulletSpeed = bulletSpeed;

        this.makeObservable();
    }

    get gunType() {
        return this._gunType;
    }

    set gunType(value) {
        this._gunType = value;
    }

    get bulletsCount() {
        return this._bulletsCount;
    }

    set bulletsCount(value) {
        this._bulletsCount = value;
    }

    get bulletSpeed() {
        return this._bulletSpeed;
    }

    set bulletSpeed(value) {
        this._bulletSpeed = value;
    }

    get bulletDistance() {
        return this._bulletDistance;
    }

    set bulletDistance(value) {
        this._bulletDistance = value;
    }

    setType(value) {
        this.gunType = value;
    }

    setBulletDistance(value) {
        this.bulletDistance = value;
    }

    setBulletSpeed(value) {
        this.bulletSpeed = value;
    }

    init() {
        //
    }
}
