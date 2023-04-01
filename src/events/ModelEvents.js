export const GameModelEvents = {
    PlayerModelUpdate: "GameModelPlayerModelUpdate",
    LevelModelUpdate: "GameModelLevelModelUpdate",
    LevelUpdate: "GameModelLevelUpdate",
};

export const GunModelEvents = {
    GunTypeUpdate: "GunModelGunTypeUpdate",
    BulletsCountUpdate: "GunModelBulletsCountUpdate",
    BulletSpeedUpdate: "GunModelBulletSpeedUpdate",
    BulletDistanceUpdate: "GunModelBulletDistanceUpdate",
};

export const HeadModelEvents = { GameModelUpdate: "HeadModelGameModelUpdate" };

export const LevelModelEvents = { IsCompletedUpdate: "LevelModelIsCompletedUpdate" };

export const PlayerModelEvents = {
    SpeedUpdate: "PlayerModelSpeedUpdate",
    LivesUpdate: "PlayerModelLivesUpdate",
    CoinsUpdate: "PlayerModelCoinsUpdate",
    GunUpdate: "PlayerModelGunUpdate",
    ScoreUpdate: "PlayerModelScoreUpdate",
};
