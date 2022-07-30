import { Grid } from "@mui/material";
import { FitPreferences as WFitPreferences } from "../welcome/FitPreferences";

export function FitPreferences() {
    return (
        <Grid item container xs={12} spacing={12}>
            <WFitPreferences />
        </Grid>
    )
}