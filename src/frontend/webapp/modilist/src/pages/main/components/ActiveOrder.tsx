import { Alert, Button, CircularProgress, FormControl, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { format, addDays } from "date-fns";
import { tr } from "date-fns/locale";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store/store";
import { useEffect, useState } from "react";

export function ActiveOrder() {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy, data: salesOrder, status } = useSelector((state: RootState) => state.activeSalesOrderModel);
    const { isBusy: isBusyUpdateAdditionalRequests, status: updateAdditionalRequestsStatus } = useSelector((state: RootState) => state.updateAdditionalRequestsModel);
    const [additionalRequests, setAdditionalRequests] = useState<string>(salesOrder?.additionalRequests ?? "");
    const [snackbarStatus, setSnackbarStatus] = useState<boolean>(false);

    useEffect(() => {
        if (!isBusy && status === 0) {
            dispatch.activeSalesOrderModel.activeSalesOrder();
        }
    }, []);

    useEffect(() => {
        if (!isBusyUpdateAdditionalRequests && updateAdditionalRequestsStatus === 200) {
            setSnackbarStatus(true);
            dispatch.activeSalesOrderModel.activeSalesOrder();
            dispatch.updateAdditionalRequestsModel.RESET();
        }
    }, [updateAdditionalRequestsStatus]);

    return (
        <Grid item container xs={12}>
            <Paper elevation={6} sx={{
                p: 2
            }}>
                <Grid item container xs={12} spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h3">
                            <AccessTimeIcon fontSize="large" sx={{
                                verticalAlign: "top",
                                mr: 1
                            }} />
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
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                label={t("Pages.SalesOrderDetails.AdditionalNotes")}
                                multiline
                                rows={4}
                                value={additionalRequests}
                                onChange={(e) => {
                                    setAdditionalRequests(e.target.value);
                                }}
                                variant="outlined"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <FormControl>
                            <Button
                                disabled={isBusyUpdateAdditionalRequests}
                                variant="contained"
                                onClick={() => {
                                    if (salesOrder?.id && !isBusyUpdateAdditionalRequests) {
                                        dispatch.updateAdditionalRequestsModel.updateAdditionalRequests({
                                            salesOrderId: salesOrder.id,
                                            data: {
                                                additionalRequests: additionalRequests
                                            }
                                        })
                                    }
                                }}
                                color="secondary">
                                {isBusyUpdateAdditionalRequests && <CircularProgress sx={{
                                    width: "18px !important",
                                    height: "18px !important",
                                    mr: 2
                                }} />}
                                {t("Generic.Forms.Submit")}
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
                <Snackbar
                    open={snackbarStatus}
                    autoHideDuration={6000}
                    onClose={() => {
                        setSnackbarStatus(false);
                    }}>
                    <Alert onClose={() => {
                        setSnackbarStatus(false);
                    }}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}>
                        {t("Generic.Forms.Success")}
                    </Alert>
                </Snackbar>
            </Paper>
        </Grid>
    )
}