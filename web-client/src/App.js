import React, { useEffect } from "react";
import axios from "axios";
import { createStore, combineReducers } from "redux";
import config from "./config.json";
import "./index.scss";
import { Button, Container, Box, Typography } from "@material-ui/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import cubeReducer from "./redux/reducers/cubeReducer";
import { setCube } from "./redux/actions";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import CardsGame from "./components/CardsGame/CardsGame";
import Home from "./components/Home/Home";

const url = new URL(window.location.href);
const playerId = url.searchParams.get("id");
const chatId = url.searchParams.get("chatId");

const store = createStore(combineReducers({ cubes: cubeReducer }));

function App() {
    const getData = async () => {
        try {
            if (playerId) {
                const res = await axios.get(`https://cubebot.fun:${config.PORT}/api/cubes/${playerId}`);
                if (res.data.cube) store.dispatch(setCube(res.data.cube));
                console.log(store.getState());
            }
        } catch (err) {
            console.error(err.data);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const botSendMsg = async (msg) => {
        try {
            await axios.post(`https://cubebot.fun:${config.PORT}/api/bot/send`, { msg, chatId });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <BrowserRouter>
            <Provider store={store}>
                <Header />
                <Container>
                    <Route exact path="/" component={Home} />
                    <Route path="/games" component={CardsGame} />
                </Container>

                <Footer />
            </Provider>
        </BrowserRouter>
    );
}

export default App;
