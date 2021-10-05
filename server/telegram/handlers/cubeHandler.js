const axios = require("axios");
const config = require("../../../etc/config.json");
const { getCubeInfo } = require("../public/msgTemplates");

async function createCube(id, username) {
    try {
        const { data: isCreated } = await axios.post(
            `https://cubebot.fun:${config.PORT}/api/cubes/`,
            { id, username }
        );
        if (isCreated) {
            return 'Ура, у вас теперь есть куб!\n\nЧтобы назвать куб напишите:\n"Назвать куб <имя>"(без<>)\n\nИнформация о кубе:\n"Мой куб"';
        }
        return "У вас уже есть куб!";
    } catch (err) {
        console.error(err);
    }
}

async function showCube(id) {
    try {
        const { data } = await axios.get(
            `https://cubebot.fun:${config.PORT}/api/cubes/${id}`
        );
        if (!data.alreadyExists) {
            return getCubeInfo(data.cube);
        }
        return 'У вас нет куба, чтобы взять куб напишите "Взять куб"';
    } catch (err) {
        console.error(err);
    }
}

async function setCubeName(name, id) {
    try {
        const { data } = await axios.put(
            `https://cubebot.fun:${config.PORT}/api/cubes`,
            { name, id }
        );
        if (data.alreadyExists) {
            if (data.hasBeenNamed) {
                return `Теперь вашего куба зовут ${name}.`;
            }
            return "Имя куба не может содержать более 2х слов!";
        }
        return 'У вас нет куба, чтобы взять куб напишите "Взять куб"';
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    createCube,
    showCube,
    setCubeName,
};
