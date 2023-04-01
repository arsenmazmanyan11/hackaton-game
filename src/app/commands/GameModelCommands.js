import Head from "../../models/HeadModel";

export const setGameStateCommand = (state) => {
    Head.gameModel.state = state;
};

export const setLevelCommand = (level) => {
    Head.gameModel.setLevel(level);
};

export const buyItemCommand = (itemName) => {
    Head.gameModel.storeModel.buyItem(itemName);
};
