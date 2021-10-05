const { calcCubeAge } = require("../../etc/etc.js");

module.exports = {
    getCubeInfo(cube) {
        return `Имя куба: ${cube.name}\nВозраст куба: ${calcCubeAge(
            cube.regDate
        )} дней`;
    },
};
