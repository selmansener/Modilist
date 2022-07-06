import { Button, Divider, Grid, Paper, Rating, Typography, useTheme } from "@mui/material";
import format from "date-fns/format";
import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";
import { SalesOrderDetailsDTO, SalesOrderState } from "../../../services/swagger/api";
import { tr } from "date-fns/locale";
import { LovelyRating } from "../../../components/lovelyRating/LovelyRating";
import { calculateAvgSalesOrderRating } from "../utils/calculateAvgRating";
import { addDays } from "date-fns";

export interface SalesOrderListItemProps {
    salesOrder: SalesOrderDetailsDTO;
}

export function SalesOrderListItem(props: SalesOrderListItemProps) {
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    const { imgBaseHost } = config;
    const { salesOrder } = props;

    const doesOrderDelivered = salesOrder.state === SalesOrderState.Delivered || salesOrder.state === SalesOrderState.Completed;

    const RenderPackageContent = () => {
        if (!doesOrderDelivered) {
            return (
                <React.Fragment>
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
                        <Typography variant="body1">
                            {t("Pages.SalesOrders.PackageContentsDescription")}
                        </Typography>
                    </Grid>
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                {salesOrder.lineItems?.map(lineItem => {
                    return (
                        <Grid key={lineItem.id} item xs={2}>
                            <ImageComponent sx={{
                                height: '86px'
                            }} src={lineItem?.product?.images ? (lineItem?.product?.images[0].url ?? "") : ""} asBackground />
                        </Grid>
                    )
                })}
            </React.Fragment>
        )
    }

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
                <Paper sx={{
                    p: 2
                }}>
                    <Grid item container xs={12}>
                        <Grid item xs={6}>
                            <Trans>
                                <Typography display="inline" variant="body1" fontWeight={800}>
                                    {t("Pages.SalesOrders.SalesOrderReferenceNumber")}
                                </Typography>
                                <Link to={`/sales-orders/${salesOrder.id}`}>
                                    <Typography display="inline" variant="body1">
                                        #{salesOrder.id?.toString()}
                                    </Typography>
                                </Link>
                            </Trans>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" align="right">
                                {/* TODO: Change locale with i18n */}
                                {salesOrder.createdAt && format(new Date(salesOrder.createdAt), 'MMMM yyyy', { locale: tr })}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{
                            mt: 2,
                            mb: 2
                        }} />
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item container xs={4} spacing={4}>
                            <Grid item xs={12}>
                                <Trans>
                                    <Typography display="inline" variant="body1" fontWeight={800}>
                                        {t("Pages.SalesOrders.SalesOrderCreatedAt")}
                                    </Typography>
                                    <Typography>
                                        {salesOrder.createdAt && format(new Date(salesOrder.createdAt), 'dd.MM.yyyy', { locale: tr })}
                                    </Typography>
                                </Trans>
                            </Grid>
                            <Grid item xs={12}>
                                <Trans>
                                    <Typography variant="body1" fontWeight={800}>
                                        {t("Pages.SalesOrders.SalesOrderAddress")}
                                    </Typography>
                                    <Typography variant="body1" >
                                        {salesOrder.salesOrderAddress?.name}
                                    </Typography>
                                </Trans>
                            </Grid>
                            <Grid item xs={12}>
                                <Trans>
                                    <Typography variant="body1" color={doesOrderDelivered ? theme.palette.text.primary : theme.palette.text.disabled} fontWeight={800}>
                                        {t("Pages.SalesOrders.DeliveryDate")}
                                    </Typography>
                                    {doesOrderDelivered && <Typography>
                                        {salesOrder.createdAt && format(new Date(salesOrder.createdAt), 'dd.MM.yyyy', { locale: tr })}
                                    </Typography>}
                                </Trans>
                            </Grid>
                            <Grid item xs={12}>
                                <Trans>
                                    <Typography variant="body1" color={doesOrderDelivered ? theme.palette.text.primary : theme.palette.text.disabled} fontWeight={800}>
                                        {t("Pages.SalesOrders.Recipient")}
                                    </Typography>
                                    {doesOrderDelivered && <Typography>
                                        Selman Şener
                                    </Typography>}
                                </Trans>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" color={doesOrderDelivered ? theme.palette.text.primary : theme.palette.text.disabled} fontWeight={800}>
                                    {t("Pages.SalesOrders.SalesOrderFeedback")}
                                </Typography>
                                <LovelyRating
                                    readOnly
                                    disabled={!doesOrderDelivered}
                                    value={calculateAvgSalesOrderRating(salesOrder)}
                                    precision={0.5} />
                            </Grid>
                        </Grid>
                        <Grid item container xs={4}>
                            <Grid item xs={12}>
                                <Typography variant="body1">
                                    {t("Pages.SalesOrders.PackageContents")}
                                </Typography>
                            </Grid>
                            {RenderPackageContent()}
                        </Grid>
                        <Grid item container xs={4}>
                            <Grid item xs={12}>
                                <Trans>
                                    <Typography display="inline">
                                        {t("Pages.SalesOrders.SalesOrderState")}
                                    </Typography>
                                    <Typography display="inline">
                                        {t(`Generic.SalesOrderState.${salesOrder.state}`)}
                                    </Typography>
                                </Trans>
                            </Grid>
                            <Grid item xs={12}>
                                {!doesOrderDelivered &&
                                    <Trans>
                                        <Typography display="inline">
                                            {t("Pages.SalesOrders.EstimatedDeliveryDate")}
                                        </Typography>
                                        <Typography display="inline">
                                            {salesOrder.createdAt && format(addDays(new Date(salesOrder.createdAt), 7), 'dd.MM.yyyy', { locale: tr })}
                                        </Typography>
                                    </Trans>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained"
                                    onClick={() => {
                                        navigate(`/sales-orders/${salesOrder.id}`);
                                    }}>
                                    {t("Pages.SalesOrders.Details")}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}