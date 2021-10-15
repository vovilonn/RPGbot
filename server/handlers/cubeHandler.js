const Cube = require("../models/cubeModel");

async function DBcreateCube(id, username, chatId) {
    const params = {
        id,
        friends: {
            chats: [chatId],
        },
    };
    if (username) params.name = `Куб игрока ${username}`;
    try {
        const cube = await Cube.find({ id }).exec();
        if (!cube[0]) {
            const cube = new Cube(params);
            await cube.save();
            return { isCreated: true };
        }
        return { isCreated: false };
    } catch (err) {
        console.error(err);
    }
}

async function DBshowCube(id) {
    try {
        const cube = await Cube.findOne({ id });
        if (cube) {
            return { cube, alreadyExists: true };
        }
        return { alreadyExists: false, cube: null };
    } catch (err) {
        console.error(err);
    }
}

async function DBsetCubeName(name, id) {
    try {
        const cube = await Cube.findOne({ id });
        if (cube) {
            if (name.split(" ").length <= 2 && name.length < 21) {
                cube.name = name.trim();
                await cube.save();
                return { hasBeenNamed: true, alreadyExists: true };
            } else {
                return { hasBeenNamed: false, alreadyExists: true };
            }
        }
        return { alreadyExists: false, hasBeenNamed: false };
    } catch (err) {
        console.error(err);
    }
}

module.exports = { DBcreateCube, DBshowCube, DBsetCubeName };
