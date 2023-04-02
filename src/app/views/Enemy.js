import Vector from "./Vector";

export default class Enemy extends Phaser.GameObjects.Container {
    constructor(scene, config) {
        const { enemyName, anim, firstFrame, uuid, speed, damage, hitInterval } = config;
        super(scene);

        this.uuid = uuid;
        this.eName = enemyName;
        this.speed = speed;
        this.damage = damage;
        this.animConfig = anim;
        this.firstFrame = firstFrame;
        this.hitInterval = hitInterval;
        this.cooldown = hitInterval;

        this.velocity = new Vector(0, 0);
        this.velocity.setLength(0);
        this.velocity.setAngle(0);

        this.init();
    }

    init() {
        // this.initAnims();
        this.initEnemy();
    }

    destroy() {
        this.velocity = null;
        super.destroy();
    }

    tint(color) {
        // this.enemy.setTint(color);
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

    initEnemy() {
        this.enemy = this.scene.add.sprite(0, 0, this.eName, this.firstFrame).play(`${this.eName}-walk`);
        this.add(this.enemy);
        this.setSize(this.enemy.width, this.enemy.height);
    }
}
