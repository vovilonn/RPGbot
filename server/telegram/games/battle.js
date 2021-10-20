const { Btn, STONE, SCISSORS, PAPER } = require("../public/buttons");

function BattleReq(id, u1, u2) {
    // u1, u2 - objects what contains fields id and first_name
    this.id = id;
    this.users = [
        { ...u1, _u: "u1" },
        { ...u2, _u: "u2" },
    ];
    this.response = { u1: null, u2: null };
    this.roundNumber = 1;
    this.msgId = null;
}

const roundsQuantity = 3;
let reqStack = [];

const gameBtns = JSON.stringify({
    inline_keyboard: [[new Btn("🗿", STONE), new Btn("✂️", SCISSORS), new Btn("📜", PAPER)]],
    resize_keyboard: true,
});

module.exports = {
    initialize(battleID, u1, u2) {
        const battle = new BattleReq(battleID, u1, u2);
        reqStack.push(battle);
        setTimeout(() => {
            reqStack = reqStack.filter((b) => b.id !== battle.id);
        }, 60000);
    },
    start: async (bot, chatId, battleId, userId) => {
        const battle = reqStack.find((battle) => battle.id === battleId);
        if (battle) {
            // ПОТОМ ВЕРНУТЬ НА users[1]
            if (battle.users[1].id === userId) {
                reqStack = reqStack.filter((battle) => battle.id !== battleId);
                battle.score = [0, 0];

                function checkAnswers() {
                    const [a1, a2] = [battle.response.u1, battle.response.u2];
                    const answers = {
                        [STONE]: SCISSORS,
                        [SCISSORS]: PAPER,
                        [PAPER]: STONE,
                    };

                    if (a1 === a2) {
                        return false;
                    } else if (answers[a1] === a2) {
                        battle.score[0]++;
                    } else {
                        battle.score[1]++;
                    }
                    return true;
                }

                async function startRound() {
                    const msg = await bot.sendMessage(
                        chatId,
                        `Раунд ${battle.roundNumber}\nСчет ${battle.score[0]}:${battle.score[1]}`,
                        {
                            reply_markup: gameBtns,
                        }
                    );
                    battle.msgId = msg.message_id;
                }

                async function finalRound() {
                    const res = {
                        [STONE]: "🗿",
                        [SCISSORS]: "✂️",
                        [PAPER]: "📜",
                    };
                    if (checkAnswers()) {
                        await bot.editMessageText(
                            `Раунд ${battle.roundNumber} окончен\n\nСчет ${battle.score[0]}:${battle.score[1]}\n${
                                battle.users[0].first_name
                            }: ${res[battle.response.u1]}\n${battle.users[1].first_name}: ${res[battle.response.u2]}`,
                            {
                                chat_id: chatId,
                                message_id: battle.msgId,
                            }
                        );
                    } else {
                        await bot.editMessageText(
                            `Раунд ${battle.roundNumber} окончен\n\nСчет ${battle.score[0]}:${
                                battle.score[1]
                            }\nОтветы одинаковые: ${res[battle.response.u1]}`,
                            {
                                chat_id: chatId,
                                message_id: battle.msgId,
                            }
                        );
                    }

                    // ОБНУЛЯЮТСЯ ОТВЕТЫ ВО ИЗБЕЖАНИЕ ОШИБОК
                    battle.response = { u1: null, u2: null };
                    battle.roundNumber++;

                    if (battle.score[1] + battle.score[0] >= 3) {
                        finalGame();
                    } else {
                        await startRound();
                    }
                }

                async function finalGame(status) {
                    const winner = battle.score[0] > battle.score[1] ? battle.users[0] : battle.users[1];
                    await bot.sendMessage(
                        chatId,
                        `Сражение завершено ${battle.score[0]}:${battle.score[1]}\nПобедил(a) ${winner.first_name}`,
                        {
                            reply_markup: JSON.stringify({
                                remove_keyboard: true,
                            }),
                        }
                    );
                    battle.roundNumber = 1;
                }

                await bot.sendMessage(
                    chatId,
                    `Началось сражение ${battle.users[0].first_name} и ${battle.users[1].first_name}`
                );

                // START BATTLE
                startRound();
                bot.on("callback_query", (qr) => {
                    function setResp(querry) {
                        const user = battle.users.find((u) => u.id === querry.from.id);
                        // ПРОВЕРКА УЧАВСТВУЕТ ЛИ ЮЗЕР В БАТЛЕ
                        if (user) {
                            battle.response[user._u] = querry.data;
                            // ЕСЛИ ДАНЫ ДВА ОТВЕТА - ЗАВЕРШАЕТЬСЯ РАУНД
                            if (battle.response.u1 && battle.response.u2) {
                                finalRound();
                            }
                        }
                    }
                    switch (qr.data) {
                        case STONE: {
                            setResp(qr);
                            break;
                        }
                        case SCISSORS: {
                            setResp(qr);
                            break;
                        }
                        case PAPER: {
                            setResp(qr);
                            break;
                        }

                        default:
                            break;
                    }
                });
            } else if (battle.users[0].id === userId) {
                bot.sendMessage(chatId, "Вы уже участвуете в сражении!");
            } else {
                bot.sendMessage(chatId, "Эй, вы не участвуете в сражении!");
            }
        } else {
            bot.sendMessage(chatId, "Это сражение уже идёт или было завершено:)");
        }
    },
    decline(bot, chatId, battleId) {
        reqStack = reqStack.filter((b) => b.id !== battleId);
        bot.sendMessage(chatId, "Сражение было отклонено😕");
    },
};
