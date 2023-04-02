import Head from "../../models/HeadModel";

export const onWaveCompleteCommand = () => {
    Head.gameModel.currentLevel.startNextWave();
};
