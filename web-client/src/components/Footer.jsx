import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
    footer: { position: "absolute", bottom: "0" },
});

export default function Footer() {
    const c = useStyles();
    const date = new Date();
    return (
        <AppBar position="static" color="primary" className={c.footer}>
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="body2" color="inherit">
                        © {date.getFullYear()} Cubebot
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
