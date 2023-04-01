export const Scenes = {
    Preload: "preload",
    Boot: "boot",
    Game: "game",
};

export const SPEED = 25;
export const ROTATION_SPEED = 1 * Math.PI; // 0.5 turn per sec, 2 sec per turn
export const ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED);
export const TOLERANCE = 0.02 * ROTATION_SPEED;
