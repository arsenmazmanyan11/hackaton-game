export const GUN_TYPE = {
    basic: "gun1",
    dual: "gun2",
    triple: "gun3",
    penta: "gun4",
};

export const PLAYER_CONFIG = {
    initialCoins: 10000,
    gunType: GUN_TYPE.basic,
    bulletsCount: 50,
    bulletDistance: 300, // TO CHANGE
    bulletSpeed: 5, // TO CHANGE
    speed: 15, // TO CHANGE
};

// TO CHANGE
export const ENEMY_TYPE = {
    cancer: {
        name: "cancer",
        health: 20,
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
        health: 20,
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
export const LEVELS_CONFIG = [
    {
        name: "desert",
        bkg: "desert.jpg",

        waves: [
            {
                enemiesCount: 1,
                enemyType: ENEMY_TYPE.cancer,
                spawnPosition: {
                    x: 0,
                    y: 0,
                },
                respawnTimeout: 0,
            },
            // {
            //     enemiesCount: 5,
            //     enemyType: ENEMY_TYPE.cancer,
            //     spawnPosition: {
            //         x: 100,
            //         y: 100,
            //     },
            //     respawnTimeout: 3000,
            // },
            {
                enemiesCount: 2,
                enemyType: ENEMY_TYPE.cancer,
                spawnPosition: {
                    x: -100,
                    y: -100,
                },
                respawnTimeout: 3000,
                boss: BOSS_TYPE.type1,
            },
        ],
    },
    // {
    //     name: "desert",
    //     bkg: "bg.jpg",
    //     waves: [
    //         {
    //             enemiesCount: 1,
    //             enemyType: ENEMY_TYPE.type2,
    //             spawnPosition: {
    //                 x: 0,
    //                 y: 0,
    //             },
    //             respawnTimeout: 0,
    //         },
    //         {
    //             enemiesCount: 5,
    //             enemyType: ENEMY_TYPE.type2,
    //             spawnPosition: {
    //                 x: 100,
    //                 y: 100,
    //             },
    //             respawnTimeout: 3000,
    //         },
    //         {
    //             enemiesCount: 15,
    //             enemyType: ENEMY_TYPE.type2,
    //             spawnPosition: {
    //                 x: -100,
    //                 y: -100,
    //             },
    //             boss: BOSS_TYPE.type2,
    //             respawnTimeout: 3000,
    //         },
    //     ],
    // },
];

export const COUNTER_CONFIG = {
    position: {
        x: -500,
        y: -400,
    },
    scale: 3.5,
    fontSize: 50,
    textPosition: {
        x: -100,
        y: 0,
    },
    bg: "btn-green.png",
};

export const STORE_POPUP_CONFIG = {
    itemsConfig: [
        // 1
        { x: -300, y: 0, scale: 1, bg: "store-item.png" },
        // 2
        { x: -100, y: 0, scale: 1, bg: "store-item.png" },
        // 3
        { x: 100, y: 0, scale: 1, bg: "store-item.png" },
        // 4
        { x: 300, y: 0, scale: 1, bg: "store-item.png" },
    ],
    scale: 3,
    bg: "popup.png",
    tint: 0x0000aa, //set 0xffffff if not necessary

    backButton: {
        position: {
            x: -150,
            y: 100,
        },
        bg: "yellow-btn.png",
        scale: 1,
    },
};

export const WIN_POPUP_CONFIG = {
    scale: 3,
    bg: "popup.png",
    tint: 0x00aa00, //set 0xffffff if not necessary

    storeButton: {
        position: {
            x: -150,
            y: 100,
        },
        bg: "yellow-btn.png",
        scale: 1,
    },
    nextLvlButton: {
        position: {
            x: 150,
            y: 100,
        },
        bg: "blue-btn.png",
        scale: 1,
    },
};

export const LOSE_POPUP_CONFIG = {
    scale: 3,
    bg: "popup.png",
    tint: 0xaa0000, //set 0xffffff if not necessary

    storeButton: {
        position: {
            x: -150,
            y: 100,
        },
        bg: "yellow-btn.png",
        scale: 1,
    },
    retryBtn: {
        position: {
            x: 150,
            y: 100,
        },
        bg: "blue-btn.png",
        scale: 1,
    },
};
