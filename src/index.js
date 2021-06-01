//CONSTANTS
const token = "1819178585:AAEAY2wgfLHTqdBDlk_Mi2o7od0RYQR1M6Y";

const TelegramBot = require("node-telegram-bot-api");
const { dataBase } = require("./db/dataBase.js");
const { createNewCube } = require("./assets/createCube.js");
const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
    { command: "/cleardb", description: "Отчистить БД" },
    { command: "/showdb", description: "Показать БД" },
]);

const createCube = {
    reply_markup: JSON.stringify({
        inline_keyboard: [[{ text: "Взять куб", callback_data: "/getcube" }]],
    }),
};

//FUNCTIONS

const wrappedCreateNewCube = async (msg) => {
    if (await createNewCube(msg.from.username, msg.from.id)) {
        return bot.sendMessage(
            msg.message.chat.id,
            "Ура! У вас теперь есть куб!"
        );
    } else {
        return bot.sendMessage(
            msg.message.chat.id,
            "Похоже, у вас уже есть куб)"
        );
    }
};

//EVENTS

const start = () => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text.toLowerCase();
        const db = dataBase.getData();
        console.log(msg);

        switch (text) {
            case "взять куб" || "/getcube": {
                wrappedCreateNewCube(msg);
            }
            case "мой куб": {
                const cube = db.users.find(
                    (cube) => cube.owner === msg.from.username
                );
                if (cube) {
                    return bot.sendMessage(
                        chatId,
                        `Имя куба: ${cube.name}\nВозраст куба: ${cube.age}\nВладелец: ${cube.owner}`
                    );
                } else {
                    return bot.sendMessage(
                        chatId,
                        'У вас еще нет куба, чтобы взять куб напишите "Взять куб"',
                        createCube
                    );
                }
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
    });

    bot.on("callback_query", (data) => {
        console.log(data);
        switch (data.data) {
            case "/getcube": {
                wrappedCreateNewCube(data);
                break;
            }
            default:
                break;
        }
    });
};

start();
