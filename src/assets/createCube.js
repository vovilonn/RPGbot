const { dataBase } = require("../db/dataBase.js");

class Cube {
    constructor(owner, id) {
        this.owner = owner || "Аноним";
        this.id = id || dataBase.getData().users.length;
        this.age = 0;
    }
}

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
    Cube: Cube,
    createNewCube: createNewCube,
};
