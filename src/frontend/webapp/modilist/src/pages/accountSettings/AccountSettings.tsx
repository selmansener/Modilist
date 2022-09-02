import { Grid } from "@mui/material";
import { Subscription } from "./components/Subscription";

export function AccountSettings() {
    return (
        <Grid item container spacing={2}>
            <Grid item xs={12}>
                <Subscription />
            </Grid>
        </Grid>
    )
}