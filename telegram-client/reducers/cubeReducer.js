const { dataBase } = require("../db/dataBase");
const { CREATE_CUBE, SET_CUBE_NAME } = require("../types");

const initialState = dataBase.getData().cubes || { entities: [] };

const cubeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CUBE: {
            const cube = {
                owner: action.ownerUsername,
                id: action.ownerId,
                age: 0,
                name: `Куб игрока ${action.ownerName}`,
            };
            console.log(state);
            return { ...state, entities: [...state.entities, cube] };
        }

        case SET_CUBE_NAME: {
            const cube = dataBase.findCube(action.cubeId);
            const entities = [...state.entities];
            console.log(entities.indexOf(cube));
            entities[entities.indexOf(cube)].name = action.name;
            return { ...state, entities: entities };
        }

        default:
            return state;
    }
};

module.exports = {
    cubeReducer: cubeReducer,
};
