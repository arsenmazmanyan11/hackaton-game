import { lego } from "@armathai/lego";
import { eventCommandPairs } from "./EventCommandPairs";

export const mapCommands = () => {
    eventCommandPairs.forEach((pair) => {
        lego.command.on(pair.event, pair.command);
    });
};

export const unmapCommands = () => {
    eventCommandPairs.forEach((pair) => {
        lego.command.off(pair.event, pair.command);
    });
};
