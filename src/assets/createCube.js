const { dataBase } = require("../db/dataBase.js");

class Cube {
    constructor(owner, id, others = {}) {
        const { name, age } = others;
        this.owner = owner;
        this.id = id;
        this.age = age || 0;
        this.name = name || "Ваш куб";
    }

    setName(name) {
        this.name = name;
    }
    setAge(age) {
        this.age = age;
    }
}

// костыль ёбаный
const $setCubeMethods = (cube) => {
    const cubeWithMethods = new Cube(cube.owner, cube.id, {
        name: cube.name,
        age: cube.age,
    });
    return cubeWithMethods;
};

const getCube = (id) => {
    const cubes = dataBase.getData().users;
    const cube = cubes.find((cube) => (cube.id = id));
    return $setCubeMethods(cube);
};

const createNewCube = (owner, id) => {
    let db = dataBase.getData();
    if (db.users.find((cube) => cube.id === id)) {
        return false;
    } else {
        const cube = new Cube(owner, id);
        db.users.push(cube);
        dataBase.rewrite(db);
        return true;
    }
};

module.exports = {
    getCube: getCube,
    createNewCube: createNewCube,
};
