import { Grid, Typography } from "@mui/material";
import { SizeInfo as WSizeInfo } from "../welcome/SizeInfo";

export function SizeInfo() {
    return (
        <Grid item container xs={12} spacing={2}>
            <WSizeInfo />
        </Grid>
    )
}