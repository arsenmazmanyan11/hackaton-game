import {
    CANCER_ANIM,
    CANCER_BOSS_ANIM,
    DEVIL_ANIM,
    DEVIL_BOSS_ANIM,
    MORZH_BOSS_ANIM,
    PENGUIN_ANIM,
} from "./animsConfig";
import { FIRST_LEVEL_BACKGROUND_ITEMS, SECOND_LEVEL_BACKGROUND_ITEMS, THIRD_LEVEL_BACKGROUND_ITEMS } from "./bkgItems";

export const GUN_TYPE = {
    basic: 1,
    dual: 2,
    triple: 3,
    penta: 4,
};

export const PLAYER_CONFIG = {
    initialCoins: 100000, // TO CHANGE
    gunType: GUN_TYPE.basic, // DONT TOUCH
    bulletsCount: 50, // DONT TOUCH
    bulletDistance: 1000, // TO CHANGE
    bulletSpeed: 10, // TO CHANGE
    speed: 15, // TO CHANGE
};

// TO CHANGE
export const ENEMY_TYPE = {
    cancer: {
        name: "cancer", // DONT TOUCH
        health: 20, //will let you know when to test
        coins: 20, //
        speed: 10, //
        damage: 1, //
        hitInterval: 1, //seconds
        anim: CANCER_ANIM,
        firstFrame: "cancer-1.png",
        scale: 0.6,
    },
    devil: {
        name: "devil",
        health: 20,
        coins: 30,
        speed: 11,
        damage: 10,
        hitInterval: 0.5,
        anim: DEVIL_ANIM,
        firstFrame: "devil-1.png",
        scale: 0.9,
    },
    penguin: {
        name: "penguin",
        health: 30,
        coins: 40,
        speed: 12,
        damage: 10,
        hitInterval: 1,
        anim: PENGUIN_ANIM,
        firstFrame: "penguin-1.png",
        scale: 0.8,
    },
};

// TO CHANGE
export const BOSS_TYPE = {
    cancer: {
        name: "cancerBoss",
        health: 1000,
        coins: 100,
        speed: 11,
        damage: 100,
        hitInterval: 0.3,
        anim: CANCER_BOSS_ANIM,
        firstFrame: "cancer-boss-1.png",
        scale: 0.9,
    },
    morzh: {
        name: "morzhBoss",
        health: 2000,
        coins: 200,
        speed: 66,
        damage: 100,
        hitInterval: 0.3,
        anim: MORZH_BOSS_ANIM,
        firstFrame: "morzh-boss-1.png",
        scale: 2.1,
    },
    devil: {
        name: "devilBoss",
        health: 2300,
        coins: 300,
        speed: 28,
        damage: 100,
        hitInterval: 0.3,
        anim: DEVIL_BOSS_ANIM,
        firstFrame: "devil-boss-1.png",
        scale: 1.7,
    },
};

// TO CHANGE
export const LEVELS_CONFIG = [
    // LEVEL 1
    {
        name: "desert", // has nothing to do. just naming for ourselves
        bkg: "location_1.png", // Background image
        bkgItems: FIRST_LEVEL_BACKGROUND_ITEMS, // background items config. located in bkgItems.js file
        waves: [
            // LEVEL 1 WAVE 1
            {
                enemiesCount: 4, // how many enemies in this wave
                enemyType: ENEMY_TYPE.cancer, // which enemy
                spawnPosition: {
                    // where to appear in the world
                    x: 500,
                    y: -1300,
                },
                respawnTimeout: 1000, // miliseconds, delay in their appearing
            },

            // LEVEL 1 WAVE 2
            {
                enemiesCount: 7,
                enemyType: ENEMY_TYPE.cancer,
                spawnPosition: {
                    x: 100,
                    y: -1300,
                },
                respawnTimeout: 3000,
            },
            // LEVEL 1 WAVE 3
            {
                enemiesCount: 0,
                enemyType: ENEMY_TYPE.cancer,
                spawnPosition: {
                    x: -1000,
                    y: -1000,
                },
                respawnTimeout: 0,
                // !!!!!!!
                boss: BOSS_TYPE.cancer, // !!!!! include boss in the last wave
            },
        ],
    },
    // LEVEL 2
    {
        name: "snow",
        bkg: "location_2.png",
        bkgItems: SECOND_LEVEL_BACKGROUND_ITEMS,
        waves: [
            // LEVEL 2 WAVE 1
            {
                enemiesCount: 5,
                enemyType: ENEMY_TYPE.penguin,
                spawnPosition: {
                    x: 0,
                    y: 0,
                },
                respawnTimeout: 0,
            },
            // LEVEL 2 WAVE 2
            {
                enemiesCount: 12,
                enemyType: ENEMY_TYPE.penguin,
                spawnPosition: {
                    x: 100,
                    y: 100,
                },
                respawnTimeout: 1000,
            },
            // LEVEL 2 WAVE 3
            {
                enemiesCount: 0,
                enemyType: ENEMY_TYPE.penguin,
                spawnPosition: {
                    x: -100,
                    y: -100,
                },
                boss: BOSS_TYPE.morzh,
                respawnTimeout: 3000,
            },
        ],
    },
    // LEVEL 3
    {
        name: "fire",
        bkg: "location_3.png",
        bkgItems: THIRD_LEVEL_BACKGROUND_ITEMS,
        waves: [
            // LEVEL 3 WAVE 1
            {
                enemiesCount: 13,
                enemyType: ENEMY_TYPE.devil,
                spawnPosition: {
                    x: 0,
                    y: 0,
                },
                respawnTimeout: 1000,
            },
            // LEVEL 3 WAVE 2
            {
                enemiesCount: 15,
                enemyType: ENEMY_TYPE.devil,
                spawnPosition: {
                    x: 100,
                    y: 100,
                },
                respawnTimeout: 3000,
            },
            // LEVEL 3 WAVE 3
            {
                enemiesCount: 0,
                enemyType: ENEMY_TYPE.devil,
                spawnPosition: {
                    x: -10200,
                    y: -2000,
                },
                boss: BOSS_TYPE.devil,
                respawnTimeout: 3000,
            },
        ],
    },
];

// Counter popup, where coins are shown
export const COUNTER_CONFIG = {
    position: {
        x: 2000,
        y: -500,
    },
    scale: 1.5,
    fontSize: 50,
    textPosition: {
        x: 50,
        y: 0,
    },
    bg: "hud_coins.png",
};

// Store popup config
export const STORE_POPUP_CONFIG = {
    itemsConfig: [
        // items config
        // 1
        { x: -300, y: 0, scale: 0.4, bg: "lot_1.png" },
        // 2
        { x: -100, y: 0, scale: 0.4, bg: "lot_2.png" },
        // 3
        { x: 100, y: 0, scale: 0.4, bg: "lot_3.png" },
        // 4
        { x: 300, y: 0, scale: 0.4, bg: "lot_4.png" },
    ],
    scale: 4, // popup scale
    bg: "popup.png", // popup background image
    bgScale: 1,
    bgAlpha: 0,
    tint: 0xffffff, //set 0xffffff if not necessary

    backButton: {
        //back button config
        position: {
            // button position
            x: -350,
            y: -170,
        },
        bg: "hud_close.png", //button background
        scale: 0.3, //button scale
        scaleDown: 0.26, // button scale down ratio, when clicked
    },
};

// win popup config
export const WIN_POPUP_CONFIG = {
    scale: 3,
    bg: "up_window.png",
    bgScale: 0.6,
    bgAlpha: 1,
    tint: 0x00aa00, //set 0xffffff if not necessary

    storeButton: {
        position: {
            x: -150,
            y: 70,
        },
        bg: "window_success_shop.png",
        scale: 0.5,
        scaleDown: 0.45,
    },
    nextLvlButton: {
        position: {
            x: 150,
            y: 70,
        },
        bg: "button_play.png",
        scale: 0.5,
        scaleDown: 0.45,
    },
};

// lose popup config
export const LOSE_POPUP_CONFIG = {
    scale: 3,
    bg: "down_window.png",
    bgScale: 0.6,
    bgAlpha: 1,
    tint: 0xaa0000, //set 0xffffff if not necessary

    storeButton: {
        position: {
            x: -150,
            y: 70,
        },
        bg: "window_success_shop.png",
        scale: 0.5,
        scaleDown: 0.45,
    },
    retryBtn: {
        position: {
            x: 150,
            y: 70,
        },
        bg: "window_success_repair.png",
        scale: 0.5,
        scaleDown: 0.45,
    },
};

// Boot scene config
export const BOOT_SCENE_CONFIG = {
    logo: {
        image: "Logotip.png",
        x: 600,
        y: 287,
        scale: 0.55,
    },
    button: {
        image: "button_play.png",
        x: 600,
        y: 637,
        scale: 0.5,
    },
};
