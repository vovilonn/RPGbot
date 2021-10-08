const TelegramBot = require("node-telegram-bot-api");
const config = require("../../etc/config.json");
const { createCube, showCube, setCubeName, showInventory } = require("./handlers/cubeHandler");
const { Btn, SHOW_INVENTORY, CREATE_CUBE, SHOW_CUBE } = require("./public/buttons");

const bot = new TelegramBot(config.TOKEN, { polling: true });

async function wrappedCreateCube(msg) {
    const status = await createCube(msg.from.id, msg.from.first_name.trim());
    bot.sendMessage("message" in msg ? msg.message.chat.id : msg.chat.id, status, {
        reply_markup: JSON.stringify({
            inline_keyboard: [[new Btn("Мой куб", SHOW_CUBE)]],
        }),
    });
}

async function wrappedShowCube(msg) {
    const status = await showCube(msg.from.id);
    bot.sendMessage("message" in msg ? msg.message.chat.id : msg.chat.id, status.msg, {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [status.alreadyExists ? new Btn("Инвентарь", SHOW_INVENTORY) : new Btn("Взять куб", CREATE_CUBE)],
            ],
        }),
    });
}
async function wrappedShowInventory(msg) {
    const status = await showInventory(msg.from.id);
    let options = {};
    if (!status.alreadyExists) {
        options = {
            reply_markup: JSON.stringify({
                inline_keyboard: [[new Btn("Взять куб", CREATE_CUBE)]],
            }),
        };
    }
    bot.sendMessage("message" in msg ? msg.message.chat.id : msg.chat.id, status.msg, options);
}

async function wrappedSetCubeName(msg, temp) {
    const status = await setCubeName(temp[1].trim(), msg.from.id);
    bot.sendMessage(msg.chat.id, status);
}

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
        switch (qr.data) {
            case CREATE_CUBE: {
                wrappedCreateCube(qr);
                break;
            }

            case SHOW_INVENTORY: {
                wrappedShowInventory(qr);
                break;
            }

            case SHOW_CUBE: {
                wrappedShowCube(qr);
                break;
            }

            default:
                break;
        }
    });

    bot.on("inline_query", (iq) => {
        bot.answerInlineQuery(iq.id, [{ type: "game", id: "0", game_short_name: "CubeBot" }]);
    });
};

module.exports = {
    start,
    bot,
};
