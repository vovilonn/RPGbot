import { SET_CUBE } from "../types";

const initialCube = JSON.parse(sessionStorage.getItem("cube"));

const initialState = { cube: initialCube || { name: "", age: "" } };
export default function cubeReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CUBE:
            sessionStorage.setItem("cube", JSON.stringify(action.cube));
            return { ...state, cube: action.cube };

        default:
            return state;
    }
}
