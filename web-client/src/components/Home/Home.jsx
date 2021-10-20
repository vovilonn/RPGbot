import React from "react";
import { Button, Box, Typography } from "@material-ui/core";
import CubeInfo from "./CubeInfo";

export default function Home() {
    return (
        <>
            <CubeInfo />
            <Box>
                <Typography>
                    Пока что тут только инфоомация о кубе(({"\n"}
                    Но скоро я добавлю много всего интересного:З
                </Typography>
            </Box>
            <Button variant="contained" onClick={window.TelegramGameProxy.shareScore}>
                Поделится:)
            </Button>
        </>
    );
}
