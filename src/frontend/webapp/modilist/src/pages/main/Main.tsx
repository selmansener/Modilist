import { Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { tr } from "date-fns/locale";
import format from "date-fns/format";
import addDays from "date-fns/addDays";

export function Main() {
    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy, data: salesOrder, status } = useSelector((state: RootState) => state.activeSalesOrderModel);

    useEffect(() => {
        if (!isBusy && status === 0) {
            dispatch.activeSalesOrderModel.activeSalesOrder();
        }
    }, []);

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
                                    {t("Pages.Main.SalesOrderReferenceNumber")}
                                    <Link to={`/sales-orders/${salesOrder?.id}`}>
                                        #{salesOrder?.id}
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Trans>
                                    <Typography display={"inline"} variant="body1" fontWeight={800}>{t("Pages.Main.SalesOrderCreatedAt")}</Typography>
                                    <Typography display={"inline"} variant="body1">
                                        {salesOrder?.createdAt && format(new Date(salesOrder?.createdAt), 'MMMM yyyy', { locale: tr })}
                                    </Typography>
                                </Trans>
                            </Grid>
                            <Grid item xs={12}>
                                <Trans>
                                    <Typography display={"inline"} variant="body1" fontWeight={800}>{t("Pages.Main.SalesOrderState")}</Typography>
                                    <Typography display={"inline"} variant="body1" color="secondary">{t(`Generic.SalesOrderState.${salesOrder?.state}`)}</Typography>
                                </Trans>
                            </Grid>
                            <Grid item xs={12}>
                                <Trans>
                                    <Typography display={"inline"} variant="body1" fontWeight={800}>{t("Pages.Main.SalesOrderAddress")}</Typography>
                                    <Typography display={"inline"} variant="body1">{salesOrder?.salesOrderAddress?.name}</Typography>
                                </Trans>
                            </Grid>
                            <Grid item xs={10}>
                                <Trans>
                                    <Typography display={"inline"} variant="body1" fontWeight={800}>{t("Pages.Main.EstimatedDeliveryDate")}</Typography>
                                    <Typography display={"inline"} variant="body1">
                                        {salesOrder?.createdAt && format(addDays(new Date(salesOrder.createdAt), 7), 'dd.MM.yyyy', { locale: tr })}
                                    </Typography>
                                </Trans>
                            </Grid>
                            <Grid item xs={2} textAlign="right">
                                <Typography variant="body1">
                                    <Link to={`/sales-orders/${salesOrder?.id}`}>
                                        {t("Pages.Main.Details")}
                                    </Link>
                                </Typography>
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