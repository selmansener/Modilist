import { Grid, Typography } from "@mui/material";
import { useParams, useResolvedPath } from "react-router-dom";

export function SalesOrderDetails() {
    let { salesOrderId } = useParams();

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h3">SalesOrder: #{salesOrderId}</Typography>
            </Grid>
        </Grid>
    )

}