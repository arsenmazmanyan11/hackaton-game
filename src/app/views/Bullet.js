import { PLAYER_CONFIG } from "../../gameConfig";
import Vector from "./Vector";

export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, speed, direction) {
        super(scene, 0, 0, "bullet.png");

        this.isActive = false;
        this.direction = null;
        this.remainingDist = PLAYER_CONFIG.bulletDistance;
        this.velocity = new Vector(0, 0);
        this.velocity.setLength(speed);
        this.velocity.setAngle(direction);
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
