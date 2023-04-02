import Vector from "./Vector";

export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, config) {
        const { enemyName, uuid, speed, damage, hitInterval } = config;
        super(scene, 0, 0, `${enemyName}.png`);

        this.uuid = uuid;
        this.speed = speed;
        this.damage = damage;
        this.hitInterval = hitInterval;
        this.cooldown = hitInterval;

        this.velocity = new Vector(0, 0);
        this.velocity.setLength(0);
        this.velocity.setAngle(0);
    }

    destroy() {
        this.velocity = null;
        super.destroy();
    }

    tint(color) {
        this.setTint(color);
    }

    hitPlayer() {
        this.cooldown = this.hitInterval;
    }

    setAngle(angle) {
        this.velocity.setAngle(angle);
    }

    setSpeed(speed) {
        this.velocity.setLength(speed);
    }

    update() {
        this.cooldown -= 1 / 60;
        this.x += this.velocity.getX();
        this.y += this.velocity.getY();
    }
}
