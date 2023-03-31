import { lego } from "@armathai/lego";
import { assets } from "../../assets/assetNames/assets";
import { audioAssets } from "../../assets/assetNames/audio";
import { shaders } from "../../assets/assetNames/shaders";
import { spines } from "../../assets/assetNames/spines";
import { spriteSheets } from "../../assets/assetNames/spriteSheets";
import { videos } from "../../assets/assetNames/videos";
import { Scenes } from "../../constants";
import { initModelsCommand } from "../commands/InitModelsCommand";
import { mapCommands } from "../commands/MapUnmapCommands";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: Scenes.Preload });
    }

    preload() {
        console.log("Starting Asset loading");
        this.loadAssets();
        this.loadSpriteSheets();
        this.loadAudio();
        this.loadSpines();
        this.loadShaders();
        // this.load.tilemapTiledJSON("roots-map", "./assets/map/roots-map.json");
        // this.load.image("blue", "./assets/map/Blue.png");
    }

    init() {
        //
    }

    create() {
        console.log("Asset loading is completed");
        lego.command.execute(mapCommands);
        this.scene.start(Scenes.Game);
        lego.command.execute(initModelsCommand);
    }

    loadAssets() {
        console.warn(assets);

        if (assets.length === 0) return;
        assets.forEach((el) => {
            const { name, path } = el;
            this.load.image(name, "src/" + path);
        });
    }

    loadSpriteSheets() {
        if (spriteSheets.length === 0) return;
        spriteSheets.forEach((el) => {
            this.load.atlas(el, `./assets/spriteSheets/${el}.png`, `./assets/spriteSheets/${el}.json`);
        });
    }

    loadAudio() {
        if (audioAssets.length === 0) return;
        audioAssets.forEach((el) => {
            const { name, path } = el;
            this.load.audio(name, path);
        });
    }

    loadVideo() {
        if (videos.length === 0) return;
        videos.forEach((el) => {
            const { name, path } = el;
            this.load.video(name, path);
        });
    }

    loadShaders() {
        if (shaders.length === 0) return;
        shaders.forEach((el) => {
            const { name, path } = el;
            this.load.glsl(name, path);
        });
    }

    loadSpines() {
        if (spines.length === 0) return;
        spines.forEach((el) => {
            const { key, atlasURL, jsonURL, preMultipliedAlpha } = el;
            this.load.spine(key, jsonURL, atlasURL, preMultipliedAlpha);
        });
    }
}
