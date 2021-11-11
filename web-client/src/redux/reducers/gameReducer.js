import { CHANGE_GAME_MODE, GENERATE_NEW_CARDS, TOGGLE_CARD_STATE } from "../types";
import { images } from "./cardImages.json";

const generateCards = (mode) => {
    const cards = images.map((src, i) => ({ src: src, title: i, active: false })).splice(0, Math.pow(mode, 2) / 2); // формируем массив обрезаем до нужного кол-ва карточек;
    return cards
        .concat(cards) //are creating card duplicates
        .map((i) => [Math.random(), i]) // рандомно перемешиваем
        .sort()
        .map((e, i) => ({ ...e[1], id: i })); // добавляем id
};

const initialState = {
    cardsGame: {
        gameFinished: false,
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

        case TOGGLE_CARD_STATE: {
            const updatedCards = state.cardsGame.cards.map((card) =>
                card.id === action.id[0] || card.id === action.id[1] ? { ...card, active: action.active } : card
            );
            const gameFinished = updatedCards.every((card) => card.active);
            return { ...state, cardsGame: { ...state.cardsGame, cards: updatedCards, gameFinished } };
        }

        default:
            return state;
    }
}
