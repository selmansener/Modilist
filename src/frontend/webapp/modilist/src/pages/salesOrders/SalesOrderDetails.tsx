import { Divider, FormControl, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import format from "date-fns/format";
import { tr } from "date-fns/locale";
import React, { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SalesOrderState } from "../../services/swagger/api";
import { Dispatch, RootState } from "../../store/store";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { ImageComponent } from "../../components/image/ImageComponent";
import { config } from "../../config";
import InfoIcon from '@mui/icons-material/Info';
import { SalesOrderFeedback } from "./components/SalesOrderFeedback";

export function SalesOrderDetails() {
    const { t } = useTranslation();
    const { salesOrderId } = useParams();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy, data: salesOrder } = useSelector((state: RootState) => state.salesOrderDetailsModel);
    const { imgBaseHost } = config;

    useEffect(() => {
        if (salesOrderId && !isBusy) {
            dispatch.salesOrderDetailsModel.salesOrderDetails(parseInt(salesOrderId));
        }
    }, [salesOrderId]);

    const getMaskedPhone = () => {
        const phone = salesOrder?.salesOrderAddress?.phone;
        const lastFourNumber = phone?.substring(phone.length - 4, phone.length);
        return `+90******${lastFourNumber}`
    }

    const RenderChangeAddressLink = () => {
        if (salesOrder?.state !== SalesOrderState.Created && salesOrder?.state !== SalesOrderState.Prepared) {
            return <></>
        }

        return (
            <React.Fragment>
                {"("}
                <Link sx={{
                    cursor: 'pointer'
                }} onClick={() => {

                }}>
                    {t("Pages.SalesOrderDetails.RegisteredAddresses")}
                </Link>
                {")"}
            </React.Fragment>
        )
    }

    const RenderChangeEstimatedDeliveryDateLink = () => {
        if (salesOrder?.state !== SalesOrderState.Created && salesOrder?.state !== SalesOrderState.Prepared) {
            return <></>
        }

        return (
            <React.Fragment>
                {"("}
                <Link sx={{
                    cursor: 'pointer'
                }} onClick={() => {

                }}>
                    {t("Pages.SalesOrderDetails.Change")}
                    <CalendarMonthIcon sx={{
                        verticalAlign: 'text-top'
                    }} fontSize="small" />
                </Link>
                {")"}
            </React.Fragment>
        )
    }

    const RenderPackageContents = () => {
        const doesOrderShipped = salesOrder?.state !== SalesOrderState.Created && salesOrder?.state !== SalesOrderState.Prepared;

        if (doesOrderShipped) {
            return <></>
        }

        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <Typography variant="body1" align="right" fontWeight={800}>
                        {t("Pages.SalesOrderDetails.PackageContents")}
                    </Typography>
                </Grid>
                <Grid item container xs={8} spacing={2}>
                    <Grid item xs={2}>
                        <ImageComponent src={`${imgBaseHost}/common/QuestionMark.jpg`} />
                    </Grid>
                    <Grid item xs={2}>
                        <ImageComponent src={`${imgBaseHost}/common/QuestionMark.jpg`} />
                    </Grid>
                    <Grid item xs={2}>
                        <ImageComponent src={`${imgBaseHost}/common/QuestionMark.jpg`} />
                    </Grid>
                    <Grid item xs={2}>
                        <ImageComponent src={`${imgBaseHost}/common/QuestionMark.jpg`} />
                    </Grid>
                    <Grid item xs={2}>
                        <ImageComponent src={`${imgBaseHost}/common/QuestionMark.jpg`} />
                    </Grid>
                    <Grid item xs={12}>
                        <Trans>
                            <Typography variant="body1">
                                <InfoIcon sx={{
                                    verticalAlign: 'sub'
                                }} fontSize="small" />
                                {t("Pages.SalesOrderDetails.PackageContentsDescription")}
                            </Typography>
                        </Trans>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }

    const RenderAdditionalNotes = () => {
        const doesOrderShipped = salesOrder?.state !== SalesOrderState.Created && salesOrder?.state !== SalesOrderState.Prepared;

        if (doesOrderShipped) {
            return <></>
        }

        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <Typography variant="body1" align="right" fontWeight={800}>
                        {t("Pages.SalesOrderDetails.AdditionalNotes")}
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <FormControl fullWidth>
                        <TextField
                            label={t("Pages.SalesOrderDetails.AdditionalNotes")}
                            multiline
                            rows={4}
                            defaultValue=""
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>
            </React.Fragment>
        )
    }

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
                <Paper sx={{
                    p: 2
                }}>
                    <Grid item container xs={12} spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h4">{t("Pages.SalesOrderDetails.Title")}#{salesOrderId}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h4" align="right">
                                {salesOrder?.createdAt && format(new Date(salesOrder.createdAt), 'MMMM yyyy', { locale: tr })}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item container xs={8} spacing={2}>
                            <Grid item xs={4}>
                                <Typography variant="body1" align="right" fontWeight={800}>
                                    {t("Pages.SalesOrderDetails.DeliveryAddress")}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">
                                    {salesOrder?.salesOrderAddress?.name} {RenderChangeAddressLink()}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                {/* WARN: This line should be empty */}
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">
                                    {salesOrder?.salesOrderAddress?.fullAddress}
                                </Typography>
                                <Typography variant="body1">
                                    {salesOrder?.salesOrderAddress?.district} / {salesOrder?.salesOrderAddress?.city}
                                </Typography>
                                <Typography variant="body1">
                                    {getMaskedPhone()}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" align="right" fontWeight={800}>
                                    {t("Pages.SalesOrderDetails.CreatedAt")}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">
                                    {salesOrder?.createdAt && format(new Date(salesOrder?.createdAt), 'dd.MM.yyyy', { locale: tr })}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" align="right" fontWeight={800}>
                                    {t("Pages.SalesOrderDetails.EstimatedDeliveryDate")}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">
                                    {salesOrder?.createdAt && format(new Date(salesOrder?.createdAt), 'dd.MM.yyyy', { locale: tr })} {RenderChangeEstimatedDeliveryDateLink()}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1" align="right" fontWeight={800}>
                                    {t("Pages.SalesOrderDetails.SalesOrderState")}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1">
                                    {t(`Generic.SalesOrderState.${salesOrder?.state}`)}
                                </Typography>
                            </Grid>
                            {RenderPackageContents()}
                            <Grid item xs={4}>
                                <Typography variant="body1" align="right" fontWeight={800}>
                                    {t("Pages.SalesOrderDetails.CargoTrackingCode")}
                                </Typography>
                            </Grid>
                            <Grid item container xs={8}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        {salesOrder?.cargoTrackingCode}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" align="right">
                                        CARGO COMPANY IMAGE
                                    </Typography>
                                </Grid>
                            </Grid>
                            {RenderAdditionalNotes()}
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h3">
                                CONTEXT IMAGE
                            </Typography>
                        </Grid>
                        <SalesOrderFeedback salesOrder={salesOrder ?? {}} />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}