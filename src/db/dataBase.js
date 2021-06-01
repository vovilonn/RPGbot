const fs = require("fs");
const data = require("./database.json");
class DataBase {
    constructor(data) {
        this.dataBase = data;
    }
    getData() {
        return this.dataBase;
    }
    rewrite(db) {
        this.dataBase = db;
        fs.writeFile(
            __dirname + "/database.json",
            JSON.stringify(db),
            () => {}
        );
    }
}
const DB = new DataBase(data);

module.exports = {
    dataBase: DB,
};
