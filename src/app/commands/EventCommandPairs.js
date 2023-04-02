import { GameEvents, MainViewEvents } from "../../events/GameEvents";
import { WaveModelEvents } from "../../events/ModelEvents";
import { enemyDiedCommand, enemyHitCommand } from "./GameModelCommands";
import { initGameModelCommand } from "./InitGameModelCommand";
import { onWaveCompleteCommand } from "./LevelModelCommands";

export const eventCommandPairs = [
    {
        event: MainViewEvents.ViewsReady,
        command: initGameModelCommand,
    },
    {
        event: GameEvents.EnemyHit,
        command: enemyHitCommand,
    },
    {
        event: GameEvents.EnemyDied,
        command: enemyDiedCommand,
    },
    {
        event: WaveModelEvents.IsCompletedUpdate,
        command: onWaveCompleteCommand,
    },
];
