import { Button, Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { config } from "../../config";
import { ImageComponent } from "../../components/image/ImageComponent";

export function CheckoutCompleted() {
    const { t } = useTranslation();
    const { salesOrderId } = useParams();
    const { cdnImg: imgBaseHost } = config;
    const theme = useTheme();
    const navigate = useNavigate();

    // TODO: should fetch and check sales order state in case of invalid state it should navigate to home page

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12} textAlign="center">
                <CheckCircleIcon color="success" sx={{
                    fontSize: 70
                }} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" align="center" color={theme.palette.secondary.main}>
                    {t("Pages.CheckoutCompleted.SalesOrderReferenceNumber", { salesOrderId })}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" align="center">
                    {t("Pages.CheckoutCompleted.SuccessMessage")}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Button size="large"
                    onClick={() => {
                        navigate("/", {
                            replace: true
                        });
                    }}>
                    <Typography variant="h5">
                        {t("Pages.CheckoutCompleted.ReturnToHome")}
                    </Typography>
                </Button>
            </Grid>
            <Grid item xs={12} sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <ImageComponent src={`${imgBaseHost}/checkout/checkout-completed.svg`} />
            </Grid>
        </Grid>
    )
}