import { lego } from "@armathai/lego";
import Head from "../../models/HeadModel";
import { startNextLevelCommand } from "./GameModelCommands";

export const initGameModelCommand = () => {
    Head.initGameModel();
    lego.command.execute(startNextLevelCommand);
};
