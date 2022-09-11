import { Alert, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, FormControl, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { format, addDays } from "date-fns";
import { tr } from "date-fns/locale";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store/store";
import React, { useEffect, useState } from "react";
import { Gender } from "../../../services/swagger/api";
import { CustomRadioButtonGroup } from "../../../components/customRadioButton/CustomRadioButton";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";

const requestedStyleMale = [
    "Casual",
    "Grunge",
    "Bohem",
    "Trendy",
    "Elegant",
    "Sportswear",
    "Minimalist",
    "Artsy",
    "Vintage",
    "Modest",
    "Loungewear",
    "BusinessCasual"
];

const requestedStyleFemale = [
    "Casual",
    "Grunge",
    "Bohem",
    "Trendy",
    "Elegant",
    "Sportswear",
    "Minimalist",
    "Artsy",
    "Vintage",
    "Modest",
    "Loungewear",
    "BusinessCasual"
];

export function ActiveOrder() {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy: getAccountIsBusy, data: getAccountResponse } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: isSalesOrderBusy, data: salesOrder, status } = useSelector((state: RootState) => state.activeSalesOrderModel);
    const { isBusy: isBusyUpdateAdditionalRequests, status: updateAdditionalRequestsStatus } = useSelector((state: RootState) => state.updateAdditionalRequestsModel);
    const { isBusy: isBusyUpdateRequestedStyle, status: updateRequestedStyleStatus } = useSelector((state: RootState) => state.updateRequestedStyleModel);
    const [additionalRequests, setAdditionalRequests] = useState<string>(salesOrder?.additionalRequests ?? "");
    const [requestedStyle, setRequestedStyle] = useState<string>(salesOrder?.requestedStyle ?? "");
    const [snackbarStatus, setSnackbarStatus] = useState<boolean>(false);
    const [isRequestedStyleOpen, setIsRequestedStyleOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { cdnImg } = config;
    const isBusy = getAccountIsBusy || isSalesOrderBusy || isBusyUpdateAdditionalRequests || isBusyUpdateRequestedStyle;

    useEffect(() => {
        if (!isSalesOrderBusy && status === 0) {
            dispatch.activeSalesOrderModel.activeSalesOrder();
        }
    }, []);

    useEffect(() => {
        if (updateAdditionalRequestsStatus === 0) {
            return;
        }

        if (!isBusyUpdateAdditionalRequests && updateAdditionalRequestsStatus === 200) {
            setIsSuccess(true);
            dispatch.activeSalesOrderModel.activeSalesOrder();
            dispatch.updateAdditionalRequestsModel.RESET();
        }
        else {
            setIsSuccess(false);
        }

        setSnackbarStatus(true);
    }, [updateAdditionalRequestsStatus]);

    useEffect(() => {
        if (updateRequestedStyleStatus === 0) {
            return;
        }

        if (!isBusyUpdateRequestedStyle && updateRequestedStyleStatus === 200) {
            setIsSuccess(true);
            dispatch.activeSalesOrderModel.activeSalesOrder();
            dispatch.updateRequestedStyleModel.RESET();
            setIsRequestedStyleOpen(false);
        }
        else {
            setIsSuccess(false);
        }

        setSnackbarStatus(true);
    }, [updateRequestedStyleStatus]);

    const handleRequestedStyleClose = () => {
        setIsRequestedStyleOpen(false);
    }

    const requestedStyleData = getAccountResponse && (getAccountResponse?.gender === Gender.Female ? requestedStyleFemale : requestedStyleMale);

    const content = requestedStyleData?.map(style => {
        return {
            value: style,
            element: <Box textAlign="center">
                <ImageComponent src={`${cdnImg}/outfit-styles/${getAccountResponse?.gender?.toString().toLowerCase()}/${style}.png`} width={155} />
                <Typography variant="h6">
                    {t(`Pages.SalesOrderDetails.OutfitStyles.${style}`)}
                </Typography>
            </Box>
        }
    }) ?? [];

    const RenderRequestedStyleDialog = (content: {
        value: string;
        element: JSX.Element;
    }[]) => {
        if (!requestedStyleData || requestedStyleData.length === 0) {
            return <></>
        }

        return (
            <Dialog onClose={handleRequestedStyleClose} open={isRequestedStyleOpen} maxWidth="lg" fullWidth>
                <DialogTitle sx={{
                    mb: 2
                }}>
                    <Typography variant="h3" align="center">
                        {t("Pages.SalesOrderDetails.OutfitQuestion")}
                    </Typography>
                </DialogTitle>
                <CustomRadioButtonGroup
                    containerSx={{
                        justifyContent: 'space-evenly'
                    }}
                    radioButtonSx={{
                        flexBasis: '20%'
                    }}
                    name="requestedStyle"
                    value={requestedStyle}
                    contents={content}
                    onChange={(value) => {
                        setRequestedStyle(value);
                    }}
                />
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: [6],
                    py: [2]
                }}>
                    <Box>
                        <Typography>
                            {t("Pages.SalesOrderDetails.OutfitInfo.1")}
                        </Typography>
                        <Typography>
                            {t("Pages.SalesOrderDetails.OutfitInfo.2")}
                        </Typography>
                    </Box>
                    <Button
                        disabled={isBusy || requestedStyle === ""}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            if (salesOrder?.id && !isBusyUpdateRequestedStyle && updateRequestedStyleStatus === 0) {
                                dispatch.updateRequestedStyleModel.updateRequestedStyle({
                                    salesOrderId: salesOrder.id,
                                    data: {
                                        requestedStyle: requestedStyle
                                    }
                                })
                            }
                        }}>
                        {t("Generic.Forms.Submit")}
                    </Button>
                </Box>
            </Dialog>
        )
    }

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
                    <Grid item xs={6} sx={{
                        zIndex: 9
                    }}>
                        <Typography variant="body1" align="right" >
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
                        justifyContent: 'space-between'
                    }}>
                        <FormControl>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={(() => {
                                    if (salesOrder?.id && !isBusyUpdateAdditionalRequests) {
                                        setIsRequestedStyleOpen(true);
                                    }
                                })}>
                                {t("Pages.SalesOrderDetails.SelectRequestedStyle")}
                            </Button>
                        </FormControl>
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
                {RenderRequestedStyleDialog(content)}
                <Snackbar
                    open={snackbarStatus}
                    autoHideDuration={6000}
                    onClose={() => {
                        setSnackbarStatus(false);
                    }}>
                    <Alert onClose={() => {
                        setSnackbarStatus(false);
                    }}
                        severity={isSuccess ? "success" : "error"}
                        variant="filled"
                        sx={{ width: '100%' }}>
                        {t(`Generic.Forms.${isSuccess ? "Success" : "Error"}`)}
                    </Alert>
                </Snackbar>
            </Paper>
        </Grid>
    )
}