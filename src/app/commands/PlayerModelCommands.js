import Head from "../../models/HeadModel";

export const increaseScoreCommand = () => {
    Head.gameModel.playerModel.increaseScore();
};

export const setGunTypeCommand = (value) => {
    Head.gameModel.playerModel.setGunType(value);
};

export const setGunBulletDistanceCommand = (value) => {
    Head.gameModel.playerModel.setGunBulletDistance(value);
};

export const setGunBulletSpeedCommand = (value) => {
    Head.gameModel.playerModel.setGunBulletSpeed(value);
};

export const increasePlayerCoinsCommand = (value) => {
    Head.gameModel.playerModel.increaseCoinsCountBy(value);
};

export const decreasePlayerCoinsCommand = (value) => {
    Head.gameModel.playerModel.decreaseCoinsCountBy(value);
};

export const increaseLivesCommand = () => {
    Head.gameModel.playerModel.increaseLives();
};

export const decreaseLivesCommand = () => {
    Head.gameModel.playerModel.decreaselives();
};
