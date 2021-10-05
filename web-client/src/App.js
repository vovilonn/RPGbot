import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "./config.json";
const url = new URL(window.location.href);
const playerid = url.searchParams.get("id");
const chatId = url.searchParams.get("chatId");

function App() {
    const [cube, setCube] = useState({ name: "-" });
    const [msg, setMsg] = useState("");
    const getData = async () => {
        try {
            const res = await axios.get(
                `https://cubebot.fun:${config.PORT}/api/cubes/${playerid}`
            );
            setCube(res.data.cube);
        } catch (err) {
            console.error(err.data);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const botSendMsg = async (e) => {
        try {
            e.preventDefault();
            await axios.post(
                `https://cubebot.fun:${config.PORT}/api/bot/send`,
                { msg, chatId }
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <h1>CUBEBOT APP User id: {playerid}</h1>
            <ul>
                <li>Name: {cube.name}</li>
                <li>Age: </li>
            </ul>
            <button onClick={window.TelegramGameProxy.shareScore}>
                Share score
            </button>
            <form onSubmit={botSendMsg}>
                <input
                    type="text"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </>
    );
}

export default App;
