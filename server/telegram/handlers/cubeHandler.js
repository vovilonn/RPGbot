const axios = require("axios");
const config = require("../../../etc/config.json");
const { getCubeInfo, formatInventory } = require("../public/msgTemplates");

async function getCube(id) {
    try {
        const { data } = await axios.get(`https://cubebot.fun:${config.PORT}/api/cubes/${id}`);
        if (data.alreadyExists) {
            return data.cube;
        }
        return 'У вас нет куба, чтобы взять куб напишите "Взять куб"';
    } catch (err) {
        console.error(err);
    }
}

async function showCubeInfo(id, msg) {
    try {
        const res = await getCube(id);
        if (res.id) {
            return { msg: msg(res) || msg, alreadyExists: true };
        }
        return { msg: res, alreadyExists: false };
    } catch (err) {
        console.error(err);
    }
}

async function createCube(id, username, chatId) {
    try {
        const { data: isCreated } = await axios.post(`https://cubebot.fun:${config.PORT}/api/cubes/`, {
            id,
            username,
            chatId,
        });
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
        return await showCubeInfo(id, (res) => getCubeInfo(res));
    } catch (err) {
        console.error(err);
    }
}

async function showInventory(id) {
    try {
        return await showCubeInfo(id, (res) => formatInventory(res));
    } catch (err) {
        console.error(err);
    }
}

async function setCubeName(name, id) {
    try {
        const { data } = await axios.put(`https://cubebot.fun:${config.PORT}/api/cubes`, { name, id });
        if (data.alreadyExists) {
            if (data.hasBeenNamed) {
                return `Теперь вашего куба зовут ${name}.`;
            }
            return "Имя куба должно быть не длинее 20 символов и не может содержать более 2х слов!";
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
    showInventory,
};
