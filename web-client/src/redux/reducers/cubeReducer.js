import { SET_CUBE } from "../types";

const initialState = { cube: { name: "", age: "" } };
export default function cubeReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CUBE:
            return { ...state, cube: action.cube };

        default:
            return state;
    }
}
