import { FIRST_LEVEL_BACKGROUND_ITEMS, SECOND_LEVEL_BACKGROUND_ITEMS, THIRD_LEVEL_BACKGROUND_ITEMS } from "./bkgItems";

export const GUN_TYPE = {
    basic: "gun1",
    dual: "gun2",
    triple: "gun3",
    penta: "gun4",
};

export const PLAYER_CONFIG = {
    initialCoins: 10000, // TO CHANGE
    gunType: GUN_TYPE.basic, // DONT TOUCH
    bulletsCount: 50, // DONT TOUCH
    bulletDistance: 1000, // TO CHANGE
    bulletSpeed: 5, // TO CHANGE
    speed: 15, // TO CHANGE
};

// TO CHANGE
export const ENEMY_TYPE = {
    cancer: {
        name: "cancer", // DONT TOUCH
        health: 20, //will let you know when to test
        coins: 20, //
        speed: 10, //
        damage: 10, //
        hitInterval: 1, //seconds
    },
    type2: {
        name: "enemy-type2",
        health: 200,
        coins: 30,
        speed: 11,
        damage: 10,
        hitInterval: 0.5,
    },
    type3: {
        name: "enemy-type3",
        health: 300,
        coins: 40,
        speed: 12,
        damage: 10,
        hitInterval: 1,
    },
    type4: {
        name: "enemy-type4",
        health: 400,
        coins: 50,
        speed: 13,
        damage: 10,
        hitInterval: 1,
    },
    type5: {
        name: "enemy-type5",
        health: 500,
        coins: 60,
        speed: 13,
        damage: 10,
        hitInterval: 1,
    },
};

// TO CHANGE
export const BOSS_TYPE = {
    type1: {
        name: "boss-type1",
        health: 20,
        coins: 100,
        speed: 11,
        damage: 100,
        hitInterval: 0.3,
    },
    type2: {
        name: "boss-type2",
        health: 2000,
        coins: 200,
        speed: 22,
        damage: 100,
        hitInterval: 0.3,
    },
    type3: {
        name: "boss-type3",
        health: 3000,
        coins: 300,
        speed: 33,
        damage: 100,
        hitInterval: 0.3,
    },
};

// TO CHANGE
export const LEVELS_CONFIG = [
    // LEVEL 1
    {
        name: "desert", // has nothing to do. just naming for ourselves
        bkg: "desert.jpg", // Background image
        bkgItems: FIRST_LEVEL_BACKGROUND_ITEMS, // background items config. located in bkgItems.js file
        waves: [
            // LEVEL 1 WAVE 1
            {
                enemiesCount: 1, // how many enemies in this wave
                enemyType: ENEMY_TYPE.cancer, // which enemy
                spawnPosition: {
                    // where to appear in the world
                    x: 0,
                    y: 0,
                },
                respawnTimeout: 1000, // miliseconds, delay in their appearing
            },

            // LEVEL 1 WAVE 2
            {
                enemiesCount: 5,
                enemyType: ENEMY_TYPE.cancer,
                spawnPosition: {
                    x: 100,
                    y: 100,
                },
                respawnTimeout: 3000,
            },
            // LEVEL 1 WAVE 3
            {
                enemiesCount: 2,
                enemyType: ENEMY_TYPE.cancer,
                spawnPosition: {
                    x: -100,
                    y: -100,
                },
                respawnTimeout: 3000,
                // !!!!!!!
                boss: BOSS_TYPE.type1, // !!!!! include boss in the last wave
            },
        ],
    },
    // LEVEL 2
    {
        name: "TEST",
        bkg: "blue-btn.png",
        bkgItems: SECOND_LEVEL_BACKGROUND_ITEMS,
        waves: [
            // LEVEL 2 WAVE 1
            {
                enemiesCount: 1,
                enemyType: ENEMY_TYPE.type2,
                spawnPosition: {
                    x: 0,
                    y: 0,
                },
                respawnTimeout: 0,
            },
            // LEVEL 2 WAVE 2
            {
                enemiesCount: 5,
                enemyType: ENEMY_TYPE.type2,
                spawnPosition: {
                    x: 100,
                    y: 100,
                },
                respawnTimeout: 3000,
            },
            // LEVEL 2 WAVE 3
            {
                enemiesCount: 15,
                enemyType: ENEMY_TYPE.type2,
                spawnPosition: {
                    x: -100,
                    y: -100,
                },
                boss: BOSS_TYPE.type2,
                respawnTimeout: 3000,
            },
        ],
    },
    // LEVEL 3
    {
        name: "TEST 2",
        bkg: "blue-btn.png",
        bkgItems: THIRD_LEVEL_BACKGROUND_ITEMS,
        waves: [
            // LEVEL 3 WAVE 1
            {
                enemiesCount: 1,
                enemyType: ENEMY_TYPE.type2,
                spawnPosition: {
                    x: 0,
                    y: 0,
                },
                respawnTimeout: 0,
            },
            // LEVEL 3 WAVE 2
            {
                enemiesCount: 5,
                enemyType: ENEMY_TYPE.type2,
                spawnPosition: {
                    x: 100,
                    y: 100,
                },
                respawnTimeout: 3000,
            },
            // LEVEL 3 WAVE 3
            {
                enemiesCount: 15,
                enemyType: ENEMY_TYPE.type2,
                spawnPosition: {
                    x: -100,
                    y: -100,
                },
                boss: BOSS_TYPE.type2,
                respawnTimeout: 3000,
            },
        ],
    },
];

// Counter popup, where coins are shown
export const COUNTER_CONFIG = {
    position: {
        x: -500,
        y: -400,
    },
    scale: 3.5,
    fontSize: 50,
    textPosition: {
        x: 0,
        y: 0,
    },
    bg: "btn-green.png",
};

// Store popup config
export const STORE_POPUP_CONFIG = {
    itemsConfig: [
        // items config
        // 1
        { x: -300, y: 0, scale: 1, bg: "store-item.png" },
        // 2
        { x: -100, y: 0, scale: 1, bg: "store-item.png" },
        // 3
        { x: 100, y: 0, scale: 1, bg: "store-item.png" },
        // 4
        { x: 300, y: 0, scale: 1, bg: "store-item.png" },
    ],
    scale: 3, // popup scale
    bg: "popup.png", // popup background image
    tint: 0x0000aa, //set 0xffffff if not necessary

    backButton: {
        //back button config
        position: {
            // button position
            x: -150,
            y: 100,
        },
        bg: "yellow-btn.png", //button background
        scale: 1, //button scale
        scaleDown: 0.7, // button scale down ratio, when clicked
    },
};

// win popup config
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
        scaleDown: 0.7,
    },
    nextLvlButton: {
        position: {
            x: 150,
            y: 100,
        },
        bg: "blue-btn.png",
        scale: 1,
        scaleDown: 0.7,
    },
};

// lose popup config
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
        scaleDown: 0.7,
    },
    retryBtn: {
        position: {
            x: 150,
            y: 100,
        },
        bg: "blue-btn.png",
        scale: 1,
        scaleDown: 0.7,
    },
};

// Boot scene config
export const BOOT_SCENE_CONFIG = {
    logo: {
        image: "logo.png",
        x: 100,
        y: 0,
        scale: 1,
    },
    button: {
        image: "btn-green.png",
        x: 100,
        y: 300,
        scale: 1,
    },
};
