export const Scenes = {
    Preload: "preload",
    Boot: "boot",
    Game: "game",
};

export const SPEED = 10;
export const ROTATION_SPEED = Math.PI; // 0.5 turn per sec, 2 sec per turn
export const ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED);
export const TOLERANCE = ROTATION_SPEED;

export const CONFIG = {
    bulletDist: 3000,
    bulletSpeed: 2,
};
