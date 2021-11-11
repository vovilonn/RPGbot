import React, { useEffect, useState } from "react";
import axios from "axios";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers } from "redux";
import config from "./config.json";
import "./index.scss";
import { Container, Box, Button } from "@material-ui/core";
import Header from "./components/Header";
import cubeReducer from "./redux/reducers/cubeReducer";
import { setCube } from "./redux/actions";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import CardsGame from "./components/Games/CardsGame";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import gameReducer from "./redux/reducers/gameReducer";
import Games from "./components/Games/Games";
const url = new URL(window.location.href);
const playerId = url.searchParams.get("id");

const store = createStore(combineReducers({ cubes: cubeReducer, games: gameReducer }), composeWithDevTools());

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

    return (
        <BrowserRouter>
            <Provider store={store}>
                <Header />
                <Container>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/games" component={Games} />
                    <Route exact path="/games/cardsgame" component={CardsGame} />
                    <Box>
                        <Button>
                            <Link to="/">Home</Link>
                        </Button>
                        <Button>
                            <Link to="/games">Games</Link>
                        </Button>
                    </Box>
                </Container>
                {/* <Footer /> */}
            </Provider>
        </BrowserRouter>
    );
}

export default App;
