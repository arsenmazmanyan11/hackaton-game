export const GUN_TYPE = {
    basic: 1,
    dual: 2,
    triple: 3,
    penta: 5,
};

export const PLAYER_CONFIG = {
    initalCoins: 100,
    gunType: GUN_TYPE.basic,
    bulletsCount: 50,
    bulletDistance: 300, // TO CHANGE
    bulletSpeed: 5, // TO CHANGE
    speed: 10, // TO CHANGE
};

// TO CHANGE
export const ENEMY_TYPE = {
    type1: {
        name: "enemy-type1",
        health: 100,
        coins: 20,
        speed: 10,
    },
    type2: {
        name: "enemy-type2",
        health: 200,
        coins: 30,
        speed: 11,
    },
    type3: {
        name: "enemy-type3",
        health: 300,
        coins: 40,
        speed: 12,
    },
    type4: {
        name: "enemy-type4",
        health: 400,
        coins: 50,
        speed: 13,
    },
    type5: {
        name: "enemy-type5",
        health: 500,
        coins: 60,
        speed: 13,
    },
};

// TO CHANGE
export const BOSS_TYPE = {
    type1: {
        name: "boss-type1",
        health: 1000,
        coins: 100,
        speed: 11,
    },
    type2: {
        name: "boss-type2",
        health: 2000,
        coins: 200,
        speed: 22,
    },
    type3: {
        name: "boss-type3",
        health: 3000,
        coins: 300,
        speed: 33,
    },
};

// TO CHANGE
export const LEVEL_CONFIG = [
    {
        name: "desert",
        bkg: "desert.jpg",
        enemy: ENEMY_TYPE.type1,
        enemiesCount: 50,
        enemiesRespawnCounts: [10, 15, 25],
        respawnTimeout: 10000,
        enemiesRespawnPositions: [
            { x: 0, y: 0 },
            { x: 100, y: 100 },
            { x: 200, y: 200 },
        ],
    },
    {
        name: "desert",
        bkg: "bg.jpg",
        enemy: ENEMY_TYPE.type2,
        enemiesCount: 50,
        enemiesRespawnCounts: [10, 15, 25],
        respawnTimeout: 10000,
        enemiesRespawnPositions: [
            { x: 0, y: 0 },
            { x: 100, y: 100 },
            { x: 200, y: 200 },
        ],
        boss: BOSS_TYPE.type1,
    },
];
