import { Grid, Box } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";

const CubeInfoRoot = ({ cube }) => {
    return (
        <Grid container direction="row" wrap="wrap">
            <Grid item>
                <Box>
                    <img
                        src="/cube.png"
                        alt=""
                        style={{ width: "100%", display: "block" }}
                    />
                </Box>
            </Grid>
            <Grid item>
                <ul>
                    <li>Name: {cube.name}</li>
                    <li>Age: </li>
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
