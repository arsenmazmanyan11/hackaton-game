import Head from "../../models/HeadModel";

export const setGameStateCommand = (state) => {
    Head.gameModel.state = state;
};

export const startNextLevelCommand = () => {
    Head.gameModel.startNextLevel();
};

export const buyItemCommand = (itemName) => {
    Head.gameModel.storeModel.buyItem(itemName);
};

export const enemyHitCommand = (uuid, damage = 100) => {
    Head.gameModel.currentLevel.decreaseEnemyHealth(uuid, damage);
};

export const enemyDiedCommand = (uuid) => {
    Head.gameModel.currentLevel.removeEnemy(uuid);
};
