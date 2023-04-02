export const EnemyModelEvents = {
    HealthUpdate: "EnemyModelHealthUpdate",
    IsDeadUpdate: "EnemyModelIsDeadUpdate",
    StateUpdate: "EnemyModelStateUpdate",
};

export const GameModelEvents = {
    PlayerModelUpdate: "GameModelPlayerModelUpdate",
    StoreModelUpdate: "GameModelStoreModelUpdate",
    LevelUpdate: "GameModelLevelUpdate",
    CurrentLevelUpdate: "GameModelCurrentLevelUpdate",
    StateUpdate: "GameModelStateUpdate",
};

export const GunModelEvents = {
    GunTypeUpdate: "GunModelGunTypeUpdate",
    BulletsCountUpdate: "GunModelBulletsCountUpdate",
    BulletSpeedUpdate: "GunModelBulletSpeedUpdate",
    BulletDistanceUpdate: "GunModelBulletDistanceUpdate",
};

export const HeadModelEvents = { GameModelUpdate: "HeadModelGameModelUpdate" };

export const ItemModelEvents = {
    PriceUpdate: "ItemModelPriceUpdate",
    ItemNameUpdate: "ItemModelItemNameUpdate",
    IsBoughtUpdate: "ItemModelIsBoughtUpdate",
    UpgradeLevelUpdate: "ItemModelUpgradeLevelUpdate",
};

export const LevelModelEvents = {
    CurrentWaveIndexUpdate: "LevelModelCurrentWaveIndexUpdate",
    CurrentWaveUpdate: "LevelModelCurrentWaveUpdate",
    CompleteUpdate: "LevelModelCompleteUpdate",
};

export const PlayerModelEvents = {
    SpeedUpdate: "PlayerModelSpeedUpdate",
    CoinsUpdate: "PlayerModelCoinsUpdate",
    GunUpdate: "PlayerModelGunUpdate",
    ScoreUpdate: "PlayerModelScoreUpdate",
    IsDeadUpdate: "PlayerModelIsDeadUpdate",
    LastCoinsUpdate: "PlayerModelLastCoinsUpdate",
};

export const StoreModelEvents = { IsShownUpdate: "StoreModelIsShownUpdate", ItemsUpdate: "StoreModelItemsUpdate" };

export const WaveModelEvents = { IsCompletedUpdate: "WaveModelIsCompletedUpdate" };
