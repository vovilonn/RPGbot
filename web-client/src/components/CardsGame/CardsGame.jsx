import React from "react";
import { connect } from "react-redux";
import { images } from "./images.json";
console.log(images);
let areaStyles = {};

if (window.matchMedia("(orientation: portrait)").matches) {
    areaStyles = { width: `${window.innerWidth * 0.95}px`, height: `${window.innerWidth * 0.95}px` };
} else {
    areaStyles = { width: `${window.innerHeight * 0.8}px`, height: `${window.innerHeight * 0.8}px` };
}

const CardsGameRoot = () => {
    return (
        <>
            <section className="gameInfo">info</section>
            <section className="game">
                <div className="game_area" style={areaStyles}>
                    <div className="game_card">
                        <div className="game_card_front ">front</div>
                        <div className="game_card_back ">back</div>
                    </div>
                    <div className="game_card">
                        <div className="game_card_front ">front</div>
                        <div className="game_card_back ">back</div>
                    </div>
                    <div className="game_card">
                        <div className="game_card_front ">front</div>
                        <div className="game_card_back ">back</div>
                    </div>
                    <div className="game_card">
                        <div className="game_card_front ">front</div>
                        <div className="game_card_back ">back</div>
                    </div>
                    <div className="game_card">
                        <div className="game_card_front ">front</div>
                        <div className="game_card_back ">back</div>
                    </div>
                    <div className="game_card">
                        <div className="game_card_front ">front</div>
                        <div className="game_card_back ">back</div>
                    </div>
                    <div className="game_card">
                        <div className="game_card_front ">front</div>
                        <div className="game_card_back ">back</div>
                    </div>
                    <div className="game_card">
                        <div className="game_card_front ">front</div>
                        <div className="game_card_back ">back</div>
                    </div>
                    <div className="game_card">
                        <div className="game_card_front ">front</div>
                        <div className="game_card_back ">back</div>
                    </div>
                    <div className="game_card">
                        <div className="game_card_front ">front</div>
                        <div className="game_card_back ">back</div>
                    </div>
                    <div className="game_card">
                        <div className="game_card_front ">front</div>
                        <div className="game_card_back ">back</div>
                    </div>
                    <div className="game_card">
                        <div className="game_card_front ">front</div>
                        <div className="game_card_back ">back</div>
                    </div>
                    <div className="game_card">
                        <div className="game_card_front ">front</div>
                        <div className="game_card_back ">back</div>
                    </div>
                    <div className="game_card">
                        <div className="game_card_front ">front</div>
                        <div className="game_card_back ">back</div>
                    </div>
                    <div className="game_card">
                        <div className="game_card_front ">front</div>
                        <div className="game_card_back ">back</div>
                    </div>
                    <div className="game_card">
                        <div className="game_card_front ">front</div>
                        <div className="game_card_back ">back</div>
                    </div>
                </div>
            </section>
        </>
    );
};

const mstp = (state) => {
    return {};
};

const CardsGame = connect(mstp)(CardsGameRoot);

export default CardsGame;
