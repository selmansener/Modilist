import { Alert, Button, Divider, Grid, Paper, Rating, Typography, useTheme } from "@mui/material";
import format from "date-fns/format";
import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";
import { SalesOrderDetailsDTO, SalesOrderLineItemState, SalesOrderState } from "../../../services/swagger/api";
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
    const anyItemSold = salesOrder?.lineItems?.some(x => x.state === SalesOrderLineItemState.Sold);
    const anyItemReturned = salesOrder?.lineItems?.some(x => x.state === SalesOrderLineItemState.Returned);

    const RenderPackageContent = () => {
        if (salesOrder.state === SalesOrderState.Completed) {
            return (
                <React.Fragment>
                    {anyItemSold && <Grid item xs={12}>
                        <Typography variant="body1" fontWeight={800} color={theme.palette.secondary.main}>
                            {t("Pages.SalesOrders.SoldItems")}
                        </Typography>
                    </Grid>}
                    {salesOrder?.lineItems?.filter(x => x.state === SalesOrderLineItemState.Sold).map(lineItem => {
                        return (<Grid key={lineItem.id} item xs={2}>
                            <ImageComponent sx={{
                                height: '86px'
                            }} src={lineItem?.product?.images ? (lineItem?.product?.images[0].url ?? "") : ""} asBackground />
                        </Grid>)
                    })}
                    {anyItemReturned && <Grid item xs={12}>
                        <Typography variant="body1" fontWeight={800} color={theme.palette.secondary.main}>
                            {t("Pages.SalesOrders.ReturnedItems")}
                        </Typography>
                    </Grid>}
                    {salesOrder?.lineItems?.filter(x => x.state === SalesOrderLineItemState.Returned).map(lineItem => {
                        return (<Grid key={lineItem.id} item xs={2}>
                            <ImageComponent sx={{
                                height: '86px'
                            }} src={lineItem?.product?.images ? (lineItem?.product?.images[0].url ?? "") : ""} asBackground />
                        </Grid>)
                    })}
                </React.Fragment>
            )
        }

        if (salesOrder.state === SalesOrderState.Delivered) {
            return (

                <React.Fragment>
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight={800} color={theme.palette.secondary.main}>
                            {t("Pages.SalesOrders.PackageContents")}
                        </Typography>
                    </Grid>
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
            <React.Fragment>
                <Grid item xs={12}>
                    <Typography variant="body1" fontWeight={800} color={theme.palette.secondary.main}>
                        {t("Pages.SalesOrders.PackageContents")}
                    </Typography>
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

    const soldProductPrice = () => {
        if (salesOrder?.lineItems === undefined) {
            return 0;
        }

        const total = salesOrder.lineItems?.filter(x => x.state === SalesOrderLineItemState.Sold)
            .map(x => {
                if (x.product?.priceWithoutVAT === undefined) {
                    throw new Error("Price cannot be null or empty");
                }

                return x.product.priceWithoutVAT;
            })
            .reduce((prev, current) => {
                return prev + current;
            }, 0);

        return Math.round((total + Number.EPSILON) * 100) / 100;
    }

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
                <Paper elevation={6} sx={{
                    p: 2
                }}>
                    <Grid item container xs={12}>
                        <Grid item xs={6}>
                            <Trans>
                                <NavLink to={`/sales-orders/${salesOrder.id}`}>
                                    <Typography component="span" variant="h5" fontWeight={800}>
                                        {t("Pages.SalesOrders.SalesOrderReferenceNumber")}
                                    </Typography>
                                    <Typography component="span" variant="h5" fontWeight={800}>
                                        #{salesOrder.id?.toString()}
                                    </Typography>
                                </NavLink>
                            </Trans>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h5" align="right">
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
                    <Grid item container xs={12} spacing={2} sx={{
                        py: [salesOrder.state !== SalesOrderState.Completed ? 6 : 0]
                    }}>
                        <Grid item container xs={4} spacing={2} alignContent="center">
                            <Grid item xs={12}>
                                <Trans>
                                    <Typography variant="body1" fontWeight={800} color={theme.palette.secondary.main} component="span">
                                        {t("Pages.SalesOrders.SalesOrderCreatedAt")}
                                    </Typography>
                                    <Typography variant="body1" component="span" fontWeight={800} color={theme.palette.primary.main}>
                                        {salesOrder.createdAt && format(new Date(salesOrder.createdAt), 'dd.MM.yyyy', { locale: tr })}
                                    </Typography>
                                </Trans>
                            </Grid>
                            <Grid item xs={12}>
                                <Trans>
                                    <Typography variant="body1" fontWeight={800} color={theme.palette.secondary.main} component="span">
                                        {t("Pages.SalesOrders.SalesOrderAddress")}
                                    </Typography>
                                    <Typography variant="body1" component="span" fontWeight={800} color={theme.palette.primary.main}>
                                        {salesOrder.salesOrderAddress?.name}
                                    </Typography>
                                </Trans>
                            </Grid>
                            <Grid item xs={12}>
                                <Trans>
                                    <Typography variant="body1" fontWeight={800} color={doesOrderDelivered ? theme.palette.secondary.main : theme.palette.text.disabled} component="span">
                                        {t("Pages.SalesOrders.DeliveryDate")}
                                    </Typography>
                                    {doesOrderDelivered && <Typography component="span" fontWeight={800} color={theme.palette.primary.main}>
                                        {salesOrder.createdAt && format(new Date(salesOrder.createdAt), 'dd.MM.yyyy', { locale: tr })}
                                    </Typography>}
                                </Trans>
                            </Grid>
                            <Grid item xs={12}>
                                <Trans>
                                    <Typography variant="body1" fontWeight={800} color={doesOrderDelivered ? theme.palette.secondary.main : theme.palette.text.disabled} component="span">
                                        {t("Pages.SalesOrders.Recipient")}
                                    </Typography>
                                    {doesOrderDelivered && <Typography component="span" fontWeight={800} color={theme.palette.primary.main}>
                                        {`${salesOrder.salesOrderAddress?.firstName} ${salesOrder.salesOrderAddress?.lastName}`}
                                    </Typography>}
                                </Trans>
                            </Grid>
                            <Grid item xs={12} sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <Typography variant="body1"
                                    color={doesOrderDelivered ? theme.palette.secondary.main : theme.palette.text.disabled}
                                    fontWeight={800}
                                    component="span"
                                    sx={{
                                        mr: 1
                                    }}>
                                    {t("Pages.SalesOrders.SalesOrderFeedback")}
                                </Typography>
                                <LovelyRating
                                    readOnly
                                    disabled={!doesOrderDelivered}
                                    value={calculateAvgSalesOrderRating(salesOrder)}
                                    precision={0.5} />
                            </Grid>
                        </Grid>
                        <Grid item container xs={4} spacing={2} alignItems="flex-start">
                            {RenderPackageContent()}
                        </Grid>
                        <Grid item container xs={4} spacing={2} textAlign="right" alignContent="center">
                            <Grid item xs={12}>
                                <Trans>
                                    <Typography variant="body1" component="span" fontWeight={800}>
                                        {t("Pages.SalesOrders.SalesOrderState")}
                                    </Typography>
                                    <Typography component="span" color={theme.palette.secondary.main} fontWeight={800}>
                                        {t(`Generic.SalesOrderState.${salesOrder.state}`)}
                                    </Typography>
                                </Trans>
                            </Grid>
                            <Grid item xs={12}>
                                {!doesOrderDelivered &&
                                    <Trans>
                                        <Typography variant="body1" component="span" fontWeight={800}>
                                            {t("Pages.SalesOrders.EstimatedDeliveryDate")}
                                        </Typography>
                                        <Typography component="span">
                                            {salesOrder.createdAt && format(addDays(new Date(salesOrder.createdAt), 7), 'dd.MM.yyyy', { locale: tr })}
                                        </Typography>
                                    </Trans>
                                }
                            </Grid>
                            {anyItemSold && <Grid item xs={12}>
                                <Trans>
                                    <Typography variant="body1" component="span" fontWeight={800}>
                                        {t("Pages.SalesOrders.TotalPrice")}
                                    </Typography>
                                    <Typography variant="body1" component="span">
                                        {soldProductPrice().toString()} TL
                                    </Typography>
                                </Trans>
                            </Grid>}
                            <Grid item xs={12}>
                                <Button variant="contained"
                                    color="secondary"
                                    size="large"
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