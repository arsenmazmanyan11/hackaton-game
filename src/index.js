import { lego, legoLogger } from "@armathai/lego";
import "phaser";
import "phaser/plugins/spine/dist/SpinePlugin";
import { Game } from "./game";

const config = {
    transparent: false,
    antialiasGL: false,
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    input: {
        mouse: {
            preventDefaultWheel: false,
        },
    },
    scale: {
        parent: "phaser-game",
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
    },
    plugins: {
        scene: [
            {
                key: "SpinePlugin",
                plugin: window.SpinePlugin,
                mapping: "spine",
            },
        ],
    },
    antialias: true,
};

window.addEventListener("load", () => {
    legoLogger.start(lego, Object.freeze({}));
    new Game(config);
});
