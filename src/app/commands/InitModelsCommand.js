import { lego } from "@armathai/lego";
import { initHeadModelCommand } from "./InitHeadModelCommand";

export const initModelsCommand = () => {
    lego.command
        //
        .execute(initHeadModelCommand);
    // .execute(initGameModelCommand);
};
