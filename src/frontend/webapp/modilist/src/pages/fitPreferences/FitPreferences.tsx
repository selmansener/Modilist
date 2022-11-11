import { Grid } from "@mui/material";
import  WFitPreferences  from "../welcome/FitPreferences";

export default function FitPreferences() {
    return (
        <Grid item container xs={12} spacing={12}>
            <WFitPreferences layout="dashboard" />
        </Grid>
    )
}