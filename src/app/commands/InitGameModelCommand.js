import { lego } from "@armathai/lego";
import Head from "../../models/HeadModel";
import { setLevelCommand } from "./GameModelCommands";
import { startWaveCommand } from "./LevelModelCommands";

export const initGameModelCommand = () => {
    Head.initGameModel();
    lego.command.payload(1).execute(setLevelCommand).execute(startWaveCommand);
};
