import Head from "../../models/HeadModel";

export const setGameStateCommand = (state) => {
    Head.gameModel.state = state;
};

export const startNextLevelCommand = () => {
    Head.gameModel.startNextLevel();
};

export const restartCurrentLevelCommand = () => {
    Head.gameModel.restartCurrentLevel();
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

export const onItemClickCommand = (name) => {
    const item = Head.gameModel.storeModel.getItemByName(name);
    if (item.price + 100 < Head.gameModel.playerModel.coins) {
        Head.gameModel.storeModel.buyItem(name);
        Head.gameModel.playerModel.gun = name;
        Head.gameModel.playerModel.coins -= item.price;
    }
};
