export const GUN_TYPE = {
    basic: 4,
    dual: 1,
    triple: 2,
};

export const PLAYER_CONFIG = {
    lives: 3,
    initalCoins: 100,
    gunType: GUN_TYPE.basic,
    bulletsCount: 50,
    bulletDistance: 300,
    bulletSpeed: 5,
    speed: 10,
};

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

export const LEVEL_CONFIG = [
    {
        name: "desert",
        bkg: "bg.jpg",
        enemies: [ENEMY_TYPE.type1, ENEMY_TYPE.type2, ENEMY_TYPE.type3],
        enemiesCount: 50,
        enemiesRespawnCounts: [10, 15, 25],
        enemiesRespawnPositions: [
            { x: 0, y: 0 },
            { x: 100, y: 100 },
            { x: 200, y: 200 },
        ],
    },
    {
        name: "desert",
        bkg: "bg.jpg",
        enemies: [ENEMY_TYPE.type1, ENEMY_TYPE.type2, ENEMY_TYPE.type3],
        enemiesCount: 50,
        enemiesRespawnCounts: [10, 15, 25],
        enemiesRespawnPositions: [
            { x: 0, y: 0 },
            { x: 100, y: 100 },
            { x: 200, y: 200 },
        ],
        boss: BOSS_TYPE.type1,
        bossSpawnPosition: { x: 50, y: 50 },
    },
];
