function calcCubeAge(date) {
    return Math.round((Date.now() - new Date()) / 86400000);
}

module.exports = {
    calcCubeAge,
};
