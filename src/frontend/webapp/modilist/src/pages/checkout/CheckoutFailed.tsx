import { Button, Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../config";
import { ImageComponent } from "../../components/image/ImageComponent";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export function CheckoutFailed() {
    const { t } = useTranslation();
    const { salesOrderId } = useParams();
    const { imgBaseHost } = config;
    const theme = useTheme();
    const navigate = useNavigate();

    // TODO: should fetch and check sales order state in case of invalid state it should navigate to home page

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12} textAlign="center">
                <ErrorOutlineIcon color="error" sx={{
                    fontSize: 70
                }} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" align="center" color={theme.palette.secondary.main}>
                    {t("Pages.CheckoutFailed.SalesOrderReferenceNumber", { salesOrderId })}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" align="center">
                    {t("Pages.CheckoutFailed.FailureMessage")}
                </Typography>
                <Typography variant="body1" align="center">
                    {t("Pages.CheckoutFailed.Apologize")}
                </Typography>
                <Typography variant="body1" align="center">
                    {t("Pages.CheckoutFailed.Investigate")}
                </Typography>
                <Typography variant="body1" align="center">
                    {t("Pages.CheckoutFailed.Suggest")}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Button sx={{
                    mr: 2
                }}
                    size="large"
                    onClick={() => {
                        navigate(-1);
                    }}>
                    <Typography variant="h5">
                        {t("Pages.CheckoutFailed.ReturnToCheckout")}
                    </Typography>
                </Button>
                <Button size="large"
                    onClick={() => {
                        navigate("/", {
                            replace: true
                        });
                    }}>
                    <Typography variant="h5">
                        {t("Pages.CheckoutFailed.ReturnToHome")}
                    </Typography>
                </Button>
            </Grid>
            <Grid item xs={12} sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <ImageComponent src={`${imgBaseHost}/checkout/checkout-failed.svg`} />
            </Grid>
        </Grid>
    )
}