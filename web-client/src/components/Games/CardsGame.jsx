import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { BottomNavigation, BottomNavigationAction, Button } from "@material-ui/core";
import { changeGameMode, generateNewCards, toggleCardState } from "../../redux/actions";

const Card = ({ root, onCardClick, toggleActive }) => {
    // const [active, setActive] = useState(false);
    const stylesFront = {
        transform: root.active ? "rotateY(180deg)" : "",
    };
    const stylesBack = {
        transform: root.active ? "rotateY(360deg)" : "",
        backgroundImage: `url(${root.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    };
    return (
        <div className="game_card">
            <div
                className="game_card_front"
                onClick={(e) => {
                    onCardClick(root);
                    toggleActive(true, root.id);
                }}
                style={stylesFront}
            >
                {/* {root.title} */}
            </div>
            <div className="game_card_back" style={stylesBack}></div>
        </div>
    );
};

const CardsGameRoot = ({ mode, changeMode, generateCards, cards, toggleActive, gameFinished }) => {
    useEffect(() => {
        generateCards();
    }, []);

    // STATES
    const [areaStyles, setAreaStyles] = useState({
        gridTemplateColumns: `repeat(${mode}, 1fr)`,
        gridTemplateRows: `repeat(${mode}, 1fr)`,
    });
    const [gameStarted, setGameStarted] = useState(false);
    const [prevCard, setPrevCard] = useState();
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
        if (prevCard) {
            if (card.src === prevCard.src) {
                console.log("WIN");
                setPrevCard(null);
            } else {
                setTimeout(() => {
                    toggleActive(false, card.id);
                    toggleActive(false, prevCard.id);
                }, 1000);
                setPrevCard(null);
                console.log("LOOSE");
            }
        } else setPrevCard(card);
    };

    return (
        <div className="game_wrapper">
            <section className="game_info">
                <span className="game_info_msg">
                    {gameStarted ? (gameFinished ? "WIIIN!!!" : "") : "Change difficulty"}
                </span>
            </section>
            {gameStarted ? (
                <section className="game">
                    <div className="game_area" style={areaStyles}>
                        {cards.map((card, i) => (
                            <Card root={card} key={i} onCardClick={onCardClick} toggleActive={toggleActive} />
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
        cards: games.cardsGame.cards,
        gameFinished: games.cardsGame.gameFinished,
    };
};

const mdtp = (dispatch) => {
    return {
        changeMode: (mode) => dispatch(changeGameMode(mode)),
        generateCards: () => dispatch(generateNewCards()),
        toggleActive: (id, active) => dispatch(toggleCardState(id, active)),
    };
};

const CardsGame = connect(mstp, mdtp)(CardsGameRoot);

export default CardsGame;
