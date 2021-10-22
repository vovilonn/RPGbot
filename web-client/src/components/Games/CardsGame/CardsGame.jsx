import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { BottomNavigation, BottomNavigationAction, Button } from "@material-ui/core";
import { changeGameMode, generateNewCards } from "../../../redux/actions";

const Card = ({ root, onCardClick }) => {
    const [active, setActive] = useState(false);
    const stylesFront = {
        transform: active ? "rotateY(180deg)" : "",
    };
    const stylesBack = {
        transform: active ? "rotateY(360deg)" : "",
        backgroundImage: `url(${root.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    };
    return (
        <div className="game_card">
            <div
                className="game_card_front"
                onClick={(e) => {
                    console.log(root.src);
                    onCardClick(root);
                    setActive(!active);
                }}
                style={stylesFront}
            >
                {root.title}
            </div>
            <div className="game_card_back" style={stylesBack}></div>
        </div>
    );
};

const CardsGameRoot = ({ mode, changeMode, generateCards, cardsArr }) => {
    useEffect(() => {
        generateCards();
    }, []);

    // STATES
    const [areaStyles, setAreaStyles] = useState({
        gridTemplateColumns: `repeat(${mode}, 1fr)`,
        gridTemplateRows: `repeat(${mode}, 1fr)`,
    });
    const [gameStarted, setGameStarted] = useState(false);
    const [prevCard, setPrevCard] = useState({});
    // CONSTS

    // FUNCIONS

    // EVENT HANDLERS
    const onChangeDiff = (diff) => {
        setAreaStyles({
            gridTemplateColumns: `repeat(${diff}, 1fr)`,
            gridTemplateRows: `repeat(${diff}, 1fr)`,
        });
        changeMode(diff);
        generateCards();
        setGameStarted(true);
    };

    const onCardClick = (card) => {
        if ((card.src = prevCard.src)) {
            console.log("WIN");
        } else {
            setPrevCard(card);
            console.log("LOOSE");
        }
    };

    return (
        <div className="game_wrapper">
            <section className="gameInfo">{gameStarted ? "info" : "Change difficulty"}</section>
            {gameStarted ? (
                <section className="game">
                    <div className="game_area" style={areaStyles}>
                        {cardsArr.map((card, i) => (
                            <Card root={card} key={i} onCardClick={onCardClick} />
                        ))}
                    </div>
                </section>
            ) : (
                <div>
                    <Button onClick={() => onChangeDiff(2)}>easy</Button>
                    <Button onClick={() => onChangeDiff(4)}>normal</Button>
                    {/* <Button onClick={() => changeDiff(6)}>insane</Button> */}
                </div>
            )}
        </div>
    );
};

const mstp = ({ games }) => {
    return {
        mode: games.cardsGame.mode,
        cardsArr: games.cardsGame.cards,
    };
};

const mdtp = (dispatch) => {
    return {
        changeMode: (mode) => dispatch(changeGameMode(mode)),
        generateCards: () => dispatch(generateNewCards()),
    };
};

const CardsGame = connect(mstp, mdtp)(CardsGameRoot);

export default CardsGame;
