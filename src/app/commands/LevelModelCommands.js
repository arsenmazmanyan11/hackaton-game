import { GameState } from "../../constants";
import Head from "../../models/HeadModel";

export const onWaveCompleteCommand = () => {
    Head.gameModel.currentLevel.startNextWave();
};

export const onLevelCompleteCommand = () => {
    // Head.gameModel.currentLevel.startNextWave();
    Head.gameModel.state = GameState.levelWin;
};
