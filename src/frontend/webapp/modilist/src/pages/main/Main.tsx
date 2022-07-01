import { Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Main() {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item container xs={6} spacing={2}>
                <Grid item container xs={12}>
                    <Paper sx={{
                        p: 2
                    }}>
                        <Grid item container xs={12} spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h3">
                                    <AccessTimeIcon fontSize="large" />
                                    {t("Pages.Main.ActiveSalesOrders")}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" align="right">
                                    {t("Pages.Main.SalesOrderReferenceNumber")} #24124
                                </Typography>

                            </Grid>
                            <Grid item xs={12}>
                                <Trans>
                                    <Typography display={"inline"} variant="body1" fontWeight={800}>{t("Pages.Main.SalesOrderCreatedAt")}</Typography>
                                    <Typography display={"inline"} variant="body1">15.06.2022</Typography>
                                </Trans>
                            </Grid>
                            <Grid item xs={12}>
                                <Trans>
                                    <Typography display={"inline"} variant="body1" fontWeight={800}>{t("Pages.Main.SalesOrderState")}</Typography>
                                    <Typography display={"inline"} variant="body1" color="secondary">{t("Generic.SalesOrderState.Created")}</Typography>
                                </Trans>
                            </Grid>
                            <Grid item xs={12}>
                                <Trans>
                                    <Typography display={"inline"} variant="body1" fontWeight={800}>{t("Pages.Main.SalesOrderAddress")}</Typography>
                                    <Typography display={"inline"} variant="body1">Evim</Typography>
                                </Trans>
                            </Grid>
                            <Grid item xs={10}>
                                <Trans>
                                    <Typography display={"inline"} variant="body1" fontWeight={800}>{t("Pages.Main.EstimatedDeliveryDate")}</Typography>
                                    <Typography display={"inline"} variant="body1">15.06.2022</Typography>
                                </Trans>
                            </Grid>
                            <Grid item xs={2} textAlign="right">
                                <Link to={"/main"}>
                                    {t("Pages.Main.Details")}
                                </Link>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        p: 5
                    }}>
                        <Typography variant="h1" align="center" color={theme.palette.primary.contrastText}>{t("Pages.Main.FirstOrderPromotion")}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        p: 5
                    }}>
                        <Grid item container xs={12}>
                            <Grid item xs={4}>
                                <Typography variant="h4" align="center" color={theme.palette.primary.contrastText}>Friendship image</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h3" align="center" color={theme.palette.primary.contrastText}>{t("Pages.Main.FriendshipPromotion")}</Typography>
                            </Grid>
                            <Grid item xs={4} sx={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                flexDirection: 'column'
                            }}>
                                <Button variant="contained" color="secondary">
                                    <Typography align="center" color={theme.palette.primary.contrastText}>{t("Pages.Main.SendInvitation")}</Typography>
                                    <ArrowRightAltIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '480px'
                }}>
                    <Typography variant="h1">BLOG</Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}