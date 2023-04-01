export const EnemyModelEvents = {
    HealthUpdate: "EnemyModelHealthUpdate",
    CoinsUpdate: "EnemyModelCoinsUpdate",
    SpeedUpdate: "EnemyModelSpeedUpdate",
    EnemyNameUpdate: "EnemyModelEnemyNameUpdate",
    IsDeadUpdate: "EnemyModelIsDeadUpdate",
    StateUpdate: "EnemyModelStateUpdate",
    SpawnPositionUpdate: "EnemyModelSpawnPositionUpdate",
};

export const GameModelEvents = {
    PlayerModelUpdate: "GameModelPlayerModelUpdate",
    LevelModelUpdate: "GameModelLevelModelUpdate",
    StoreModelUpdate: "GameModelStoreModelUpdate",
    LevelUpdate: "GameModelLevelUpdate",
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
    IsCompletedUpdate: "LevelModelIsCompletedUpdate",
    ActiveEnemiesUpdate: "LevelModelActiveEnemiesUpdate",
    WaveUpdate: "LevelModelWaveUpdate",
};

export const PlayerModelEvents = {
    SpeedUpdate: "PlayerModelSpeedUpdate",
    LivesUpdate: "PlayerModelLivesUpdate",
    CoinsUpdate: "PlayerModelCoinsUpdate",
    GunUpdate: "PlayerModelGunUpdate",
    ScoreUpdate: "PlayerModelScoreUpdate",
};

export const StoreModelEvents = { IsShownUpdate: "StoreModelIsShownUpdate", ItemsUpdate: "StoreModelItemsUpdate" };
