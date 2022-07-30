import { Grid, Typography } from "@mui/material";
import { StylePreferences as WStylePreferences } from "../welcome/StylePreferences";

export function StylePreferences() {

    return (
        <Grid item container xs={12} spacing={2}>
            <WStylePreferences />
        </Grid>
    )
}