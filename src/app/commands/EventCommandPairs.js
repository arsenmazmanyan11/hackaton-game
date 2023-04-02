import { ForegroundEvents, GameEvents, MainViewEvents, StorePopupEvents } from "../../events/GameEvents";
import { LevelModelEvents, PlayerModelEvents, WaveModelEvents } from "../../events/ModelEvents";
import {
    enemyDiedCommand,
    enemyHitCommand,
    onItemClickCommand,
    onPlayerDeadCommand,
    playerHitCommand,
    restartCurrentLevelCommand,
    startNextLevelCommand,
} from "./GameModelCommands";
import { initGameModelCommand } from "./InitGameModelCommand";
import { onLevelCompleteCommand, onWaveCompleteCommand } from "./LevelModelCommands";

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
    {
        event: LevelModelEvents.CompleteUpdate,
        command: onLevelCompleteCommand,
    },
    {
        event: ForegroundEvents.NextLvlClick,
        command: startNextLevelCommand,
    },
    {
        event: ForegroundEvents.RetryClick,
        command: restartCurrentLevelCommand,
    },
    {
        event: StorePopupEvents.ItemClick,
        command: onItemClickCommand,
    },
    {
        event: GameEvents.PlayerHit,
        command: playerHitCommand,
    },
    {
        event: PlayerModelEvents.IsDeadUpdate,
        command: onPlayerDeadCommand,
    },
];
