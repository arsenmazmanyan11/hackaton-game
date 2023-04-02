export const Scenes = {
    Preload: "preload",
    Boot: "boot",
    Game: "game",
};

export const GameState = {
    unknown: "unknown",
    introVideo: "introVideo",
    playWindow: "playWindow",
    game: "game",
    gameOver: "gameOver",
    gameWin: "gameWin",
    levelWin: "levelWin",
    levelLose: "levelLose",
    restart: "restart",
    store: "store",
};

export const EnemyState = {
    unknown: "unknown",
    alive: "alive",
    dead: "dead",
    running: "running",
    stands: "stands",
    active: "active",
};

export const ROTATION_SPEED = Math.PI; // 0.5 turn per sec, 2 sec per turn
export const ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED);
export const TOLERANCE = ROTATION_SPEED;
