import { MainViewEvents } from "../../events/GameEvents";
import { initGameModelCommand } from "./InitGameModelCommand";

export const eventCommandPairs = [
    {
        event: MainViewEvents.ViewsReady,
        command: initGameModelCommand,
    },
];
