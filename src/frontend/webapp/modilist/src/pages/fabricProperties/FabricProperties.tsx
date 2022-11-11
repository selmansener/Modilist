import { Grid } from "@mui/material";
import  WFabricProperties  from "../welcome/FabricProperties";

export default function FabricProperties() {
    return (
        <Grid item container xs={12} spacing={12}>
            <WFabricProperties layout="dashboard" />
        </Grid>
    )
}