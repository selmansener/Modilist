import { Grid, Typography } from "@mui/material";
import WSizeInfo from "../welcome/SizeInfo";

export default function SizeInfo() {
    return (
        <Grid item container xs={12} spacing={2}>
            <WSizeInfo layout="dashboard" />
        </Grid>
    )
}