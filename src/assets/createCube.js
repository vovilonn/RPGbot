const Cube = (owner, id) => {
        this.name = "Твой куб";
        this.id = 0;
        this.owner = "";
    },

const setCubeName = () => {

}

const newCube =  (owner) => {
    const id = dataBase.users.length;
    const cube = new Cube(owner,id);
    database.users.push(cube);
};

module.exports = {
   
};
