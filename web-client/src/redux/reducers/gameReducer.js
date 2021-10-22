import { CHANGE_GAME_MODE, GENERATE_NEW_CARDS } from "../types";
import { images } from "./cardImages.json";

const generateCards = (mode) => {
    const cards = images.map((src, i) => ({ src: src, id: i, title: i })).splice(0, Math.pow(mode, 2) / 2); // формируем массив обрезаем до нужного кол-ва карточек;
    return cards
        .concat(cards) //are creating card duplicates
        .map((i) => [Math.random(), i]) // рандомно перемешиваем
        .sort()
        .map((i) => i[1]);
};

const initialState = {
    cardsGame: {
        mode: null,
        cards: [],
    },
};

export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_GAME_MODE:
            return { ...state, cardsGame: { ...state.cardsGame, mode: action.mode, started: true } };

        case GENERATE_NEW_CARDS:
            return { ...state, cardsGame: { ...state.cardsGame, cards: generateCards(state.cardsGame.mode) } };
        default:
            return state;
    }
}
