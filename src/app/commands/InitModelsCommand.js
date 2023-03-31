import { lego } from "@armathai/lego";
import { initGameModelCommand } from "./InitGameModelCommand";
import { initHeadModelCommand } from "./InitHeadModelCommand";

export const initModelsCommand = () => {
    lego.command
        //
        .execute(initHeadModelCommand)
        .execute(initGameModelCommand);
};
