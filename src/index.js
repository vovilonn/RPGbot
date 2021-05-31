const TelegramBot = require("node-telegram-bot-api");
const token = "1819178585:AAEAY2wgfLHTqdBDlk_Mi2o7od0RYQR1M6Y";
const bot = new TelegramBot(token, { polling: true });

//CONSTANTS

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [[{ text: "Button", callback_data: "1" }]],
    }),
};

bot.setMyCommands([
    { command: "/start", description: "Старт" },
    { command: "/getcube", description: "Взять куб" },
]);

//FUNCTIONS

//EVENTS

const start = () => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        console.log(msg);

        if (text === "Взять куб") {
            const owner = msg.chat.username;
            console.log(owner);
        }
    });

    bot.on("callback_query", (msg) => {
        const data = msg.data;
        console.log(data);
    });
};

start();
