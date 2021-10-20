import { Grid, Box } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { calcCubeAge, validateDay } from "../../etc/handlers.js";

const CubeInfoRoot = ({ cube }) => {
    const age = calcCubeAge(cube.regDate);
    const ageMsg = `${age || "-"} ${validateDay(age)}`;

    return (
        <Grid container direction="row" wrap="wrap">
            <Grid item>
                <Box>
                    <img src="/cube.png" alt="" style={{ width: "100%", display: "block" }} />
                </Box>
            </Grid>
            <Grid item>
                <ul>
                    <li>Name: {cube.name}</li>
                    <li>Age: {ageMsg}</li>
                </ul>
            </Grid>
        </Grid>
    );
};

const mstp = ({ cubes }) => ({
    cube: cubes.cube,
});

const CubeInfo = connect(mstp)(CubeInfoRoot);

export default CubeInfo;
