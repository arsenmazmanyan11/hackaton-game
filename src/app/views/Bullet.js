import Vector from "./Vector";

export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, speed, direction) {
        super(scene, 0, 0, "shot.png");

        this.isActive = false;
        this.direction = null;
        // this.remainingDist = CONFIG.bulletDist;
        this.remainingDist = 400;
        this.velocity = new Vector(0, 0);
        this.velocity.setLength(speed);
        this.velocity.setAngle(direction);

        // this.setOrigin(0, 0.5);
    }

    setAngle(angle) {
        this.velocity.setAngle(angle);
    }

    setSpeed(speed) {
        this.velocity.setLength(speed);
    }

    update() {
        this.x += this.velocity.getX();
        this.y += this.velocity.getY();
        this.remainingDist -= Math.abs(this.velocity.getLength());
        if (this.remainingDist <= 0) {
            this.emit("distReached");
        }
    }
}
