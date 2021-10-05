const { start, bot } = require("./telegram/index");
const express = require("express");
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("../etc/config");
const {
    DBcreateCube,
    DBshowCube,
    DBsetCubeName,
} = require("./handlers/cubeHandler");

const privateKey = fs.readFileSync(path.resolve("../etc/ssl/key.pem"));
const certificate = fs.readFileSync(path.resolve("../etc/ssl/cert.pem"));

const credentials = { key: privateKey, cert: certificate };
const app = express();

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

start();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send("It's cubebot API!");
});

app.get("/api/cubes/:id", async (req, res) => {
    try {
        const { cube, alreadyExists } = await DBshowCube(req.params.id);
        res.status(200).json({ alreadyExists, cube });
    } catch (err) {
        console.error(err);
    }
});

app.post("/api/cubes/", async (req, res) => {
    try {
        const { isCreated } = await DBcreateCube(
            req.body.id,
            req.body.username
        );
        res.status(200).json(isCreated);
    } catch (err) {
        console.error(err);
    }
});

app.put("/api/cubes/", async (req, res) => {
    try {
        const { alreadyExists, hasBeenNamed } = await DBsetCubeName(
            req.body.name,
            req.body.id
        );
        res.status(200).json({ alreadyExists, hasBeenNamed });
    } catch (err) {
        console.error(err);
    }
});

app.post("/api/bot/send/", (req, res) => {
    try {
        bot.sendMessage(req.body.chatId, req.body.msg);
    } catch (err) {
        console.error(err);
    }
});

async function startServer() {
    try {
        await mongoose.connect(config.mongooseConnectinonUrl, {
            useNewUrlParser: true,
        });
        httpServer.listen(2080);
        httpsServer.listen(config.PORT, "192.168.0.198", () =>
            console.log("Server has been started!")
        );
    } catch (e) {
        console.error(e);
    }
}

startServer();
