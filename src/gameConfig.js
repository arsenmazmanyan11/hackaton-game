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
    type1: "enemy-type1",
    type2: "enemy-type2",
    type3: "enemy-type3",
    type4: "enemy-type4",
    type5: "enemy-type5",
    type6: "enemy-type6",
    type7: "enemy-type7",
};

export const BOSS_TYPE = {
    type1: "boss-type1",
    type2: "boss-type2",
    type3: "boss-type3",
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
        boss: BOSS_TYPE.type1,
    },
];
