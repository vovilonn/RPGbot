import React, { useEffect, useState } from "react";
import axios from "axios";
import { createStore, combineReducers } from "redux";
import config from "./config.json";
import "./index.scss";
import { Button, Container } from "@material-ui/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CubeInfo from "./components/CubeInfo";
import cubeReducer from "./redux/reducers/cubeReducer";
import { setCube } from "./redux/actions";
import { Provider } from "react-redux";

const url = new URL(window.location.href);
const playerId = url.searchParams.get("id");
const chatId = url.searchParams.get("chatId");

const store = createStore(combineReducers({ cubes: cubeReducer }));

function App() {
    const getData = async () => {
        try {
            const res = await axios.get(
                `https://cubebot.fun:${config.PORT}/api/cubes/${playerId}`
            );
            if (res.data.cube) store.dispatch(setCube(res.data.cube));
            console.log(store.getState());
        } catch (err) {
            console.error(err.data);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const botSendMsg = async (msg) => {
        try {
            await axios.post(
                `https://cubebot.fun:${config.PORT}/api/bot/send`,
                { msg, chatId }
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Provider store={store}>
            <Header />
            <Container>
                <CubeInfo />
                <Button
                    variant="contained"
                    onClick={window.TelegramGameProxy.shareScore}
                >
                    Share game
                </Button>
            </Container>
            <Footer />
        </Provider>
    );
}

export default App;
