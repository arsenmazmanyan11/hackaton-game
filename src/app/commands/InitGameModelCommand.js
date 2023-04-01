import Head from "../../models/HeadModel";

export const initGameModelCommand = () => {
    Head.initGameModel();
    Head.gameModel.setLevel(1);
};
