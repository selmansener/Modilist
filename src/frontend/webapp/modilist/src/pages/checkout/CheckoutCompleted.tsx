import { Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function CheckoutCompleted() {
    const { t } = useTranslation();
    const { salesOrderId } = useParams();

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h2" align="center">
                    <CheckCircleIcon color="success" fontSize="large" />
                    {t("Pages.CheckoutCompleted.SalesOrderCompleted", { salesOrderId })}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h3" align="center">
                    {t("Pages.CheckoutCompleted.Thanks")}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{
                display:"flex",
                justifyContent:"center"
            }}>
                <Button>
                    <Link to="/">
                        {t("Pages.CheckoutCompleted.ReturnToHome")}
                    </Link>
                </Button>
            </Grid>
        </Grid>
    )
}