import { SET_CUBE, CHANGE_GAME_MODE, GENERATE_NEW_CARDS, TOGGLE_CARD_STATE } from "./types";

export const setCube = (cube) => ({ type: SET_CUBE, cube });
export const changeGameMode = (mode) => ({ type: CHANGE_GAME_MODE, mode });
export const generateNewCards = () => ({ type: GENERATE_NEW_CARDS });
export const toggleCardState = (active, id1, id2 = null) => ({ type: TOGGLE_CARD_STATE, id: [id1, id2], active });
