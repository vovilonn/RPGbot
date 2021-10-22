import { SET_CUBE, CHANGE_GAME_MODE, GENERATE_NEW_CARDS } from "./types";

export const setCube = (cube) => ({ type: SET_CUBE, cube });
export const changeGameMode = (mode) => ({ type: CHANGE_GAME_MODE, mode });
export const generateNewCards = () => ({ type: GENERATE_NEW_CARDS });
