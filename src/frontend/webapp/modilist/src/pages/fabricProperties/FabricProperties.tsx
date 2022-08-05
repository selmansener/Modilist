import { Grid } from "@mui/material";
import { FabricProperties as WFabricProperties } from "../welcome/FabricProperties";

export function FabricProperties() {
    return (
        <Grid item container xs={12} spacing={12}>
            <WFabricProperties layout="dashboard" />
        </Grid>
    )
}