const fs = require("fs");
const data = require("./database.json");
class DataBase {
    constructor(data) {
        this.dataBase = data;
    }
    getDataBase() {
        return this.dataBase;
    }
    rewriteDB() {
        fs.writeFile("./database.json", JSON.stringify(this.dataBase));
    }
}
const DB = new DataBase(data);

module.exports = {
    dataBase: DB,
};
