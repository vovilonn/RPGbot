import { connect } from "react-redux";
import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Box } from "@material-ui/system";

function GamesRoot() {
    return (
        <Box style={{ marginTop: "20px" }}>
            <Link style={{ textDecoration: "none" }} to="games/cardsgame">
                <Button variant="contained">Cards</Button>
            </Link>
        </Box>
    );
}

const Games = connect()(GamesRoot);

export default Games;
