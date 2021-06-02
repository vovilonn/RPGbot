//CONSTANTS
const token = "1819178585:AAEAY2wgfLHTqdBDlk_Mi2o7od0RYQR1M6Y";

const TelegramBot = require("node-telegram-bot-api");
const { dataBase } = require("./db/dataBase.js");
const { createNewCube, getCube } = require("./assets/createCube.js");
const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
    { command: "/cleardb", description: "Отчистить БД" },
    { command: "/showdb", description: "Показать БД" },
]);

const buttons = {
    createCube: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "Взять куб", callback_data: "/getcube" }],
            ],
        }),
    },
    myCybe: {
        reply_markup: JSON.stringify({
            inline_keyboard: [[{ text: "Мой куб", callback_data: "/mycube" }]],
        }),
    },
};

//FUNCTIONS

const wrappedCreateNewCube = async (msg, chatId) => {
    if (await createNewCube(msg.from.username, msg.from.id)) {
        return bot.sendMessage(
            chatId,
            "Ура! У вас теперь есть куб!",
            buttons.myCybe
        );
    } else {
        return bot.sendMessage(chatId, "Похоже, у вас уже есть куб)");
    }
};

const showMyCube = (msg, chatId) => {
    const db = dataBase.getData();
    const cube = db.users.find((cube) => cube.owner === msg.from.username);
    if (cube) {
        return bot.sendMessage(
            chatId,
            `Имя куба: ${cube.name}\nВозраст куба: ${cube.age}\nВладелец: ${cube.owner}`
        );
    } else {
        return bot.sendMessage(
            chatId,
            'У вас еще нет куба, чтобы взять куб напишите "Взять куб"',
            buttons.createCube
        );
    }
};
const validateCubeName = async (msg) => {
    const name = msg.text.split(" ").slice(2, 3).join("");

    if (msg.text.split(" ").length > 3) {
        await bot.sendMessage(msg.chat.id, "Имя должно быть из одного слова!");
        return false;
    } else if (name.length > 20) {
        await bot.sendMessage(
            msg.chat.id,
            "Имя должно быть короче 20 символов!"
        );
        return false;
    }
    return true;
};

//EVENTS

const start = () => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text.toLowerCase();
        const db = dataBase.getData();
        console.log(msg);

        if (text.split(" ").slice(0, 2).join(" ") == "назвать куб") {
            if (validateCubeName(msg)) {
                const cube = getCube(msg.from.id);

                const name = text.split(" ").slice(2, 3).join("");
                cube.setName(name);
                bot.sendMessage(chatId, `Вы назвали своего куба ${name}`);
            }
        } else {
            switch (text) {
                case "взять куб" || "/getcube": {
                    wrappedCreateNewCube(msg, chatId);
                    break;
                }
                case "мой куб": {
                    showMyCube(msg, chatId);
                    break;
                }
                case "/cleardb": {
                    const DB = { users: [] };
                    dataBase.rewrite(DB);
                    break;
                }
                case "/showdb": {
                    bot.sendMessage(chatId, JSON.stringify(db));
                    break;
                }
                default:
                    break;
            }
        }
    });

    bot.on("callback_query", (data) => {
        console.log(data);
        switch (data.data) {
            case "/getcube": {
                wrappedCreateNewCube(data, data.message.chat.id);
                break;
            }
            case "/mycube": {
                showMyCube(data, data.message.chat.id);
                break;
            }
            default:
                break;
        }
    });
};

start();
