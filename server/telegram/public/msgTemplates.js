function calcCubeAge(date) {
    return Math.round((Date.now() - new Date()) / 86400000);
}

module.exports = {
    getCubeInfo(cube) {
        return `Имя куба: ${cube.name}\nВозраст куба: ${calcCubeAge(
            cube.regDate
        )} дней`;
    },
};
