import { Grid, Typography } from "@mui/material";
import WStylePreferences from "../welcome/StylePreferences";

export default function StylePreferences() {

    return (
        <Grid item container xs={12} spacing={2}>
            <WStylePreferences layout="dashboard" />
        </Grid>
    )
}