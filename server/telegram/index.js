const TelegramBot = require("node-telegram-bot-api");
const config = require("../../etc/config.json");
const { createCube, showCube, setCubeName } = require("./handlers/cubeHandler");

const bot = new TelegramBot(config.TOKEN, { polling: true });

const start = () => {
    bot.setWebHook(`https://cubebot.fun:${config.PORT}/bot${config.TOKEN}`);

    bot.onText(/\/getcube/, wrappedCreateCube);
    bot.onText(/^взять куб/i, wrappedCreateCube);

    bot.onText(/\/showcube/, wrappedShowCube);
    bot.onText(/^мой куб/i, wrappedShowCube);

    bot.onText(/^назвать куб (.+)/i, wrappedSetCubeName);

    bot.onText(/\/play/, (msg) => {
        bot.sendGame(msg.from.id, "CubeBot");
    });

    bot.onText(/\/score/, async (msg) => {
        try {
            await bot.getGameHighScores(msg.from.id, {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
            });
        } catch (err) {
            console.error(err);
        }
    });

    bot.on("callback_query", (qr) => {
        if (qr.game_short_name) {
            bot.answerCallbackQuery(qr.id, {
                url: `https://cubebot.fun/?id=${qr.from.id}&chatId=${qr.message.chat.id}`,
            });
        }
    });

    bot.on("inline_query", (iq) => {
        bot.answerInlineQuery(iq.id, [
            { type: "game", id: "0", game_short_name: "CubeBot" },
        ]);
    });
};

async function wrappedCreateCube(msg) {
    const status = await createCube(msg.from.id, msg.from.first_name.trim());
    bot.sendMessage(msg.chat.id, status);
}

async function wrappedShowCube(msg) {
    const status = await showCube(msg.from.id);
    bot.sendMessage(msg.chat.id, status);
}

async function wrappedSetCubeName(msg, temp) {
    const status = await setCubeName(temp[1].trim(), msg.from.id);
    bot.sendMessage(msg.chat.id, status);
}

module.exports = {
    start,
    bot,
};
