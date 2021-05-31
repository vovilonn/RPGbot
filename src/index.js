const TelegramBot = require("node-telegram-bot-api");
const { dataBase } = require("./db/dataBase.js");
const token = "1819178585:AAEAY2wgfLHTqdBDlk_Mi2o7od0RYQR1M6Y";
const bot = new TelegramBot(token, { polling: true });

//CONSTANTS

bot.setMyCommands([
    { command: "/start", description: "Старт" },
    { command: "/getcube", description: "Взять куб" },
]);
const setNameBtn = {
    reply_markup: JSON.stringify({
        inline_keyboard: [[{ text: "Дать кубу имя", callback_data: 123 }]],
    }),
};

//FUNCTIONS
dataBase.rewriteDB();
//EVENTS

const start = () => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        console.log(msg);

        if (text === "Взять куб") {
            bot.sendMessage(
                chatId,
                "Вы взяли куб, теперь надо дать ему имя!",
                setNameBtn
            );
            // bot.answerInlineQuery(msg.chat.id, msg.chat.id, msg.message_id);
        }
    });

    bot.on("callback_query", (msg) => {
        console.log(msg);
        bot.answerInlineQuery(msg.сhat.id, ["9781"]);
    });
};

start();
