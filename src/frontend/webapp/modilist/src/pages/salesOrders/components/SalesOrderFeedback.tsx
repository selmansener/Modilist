import { Alert, Box, Button, Divider, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SalesOrderDetailsDTO, SalesOrderLineItemState, SalesOrderState } from "../../../services/swagger/api";
import { Dispatch, RootState } from "../../../store/store";
import { LineItemFeedback } from "./LineItemFeedback";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

export interface SalesOrderFeedbackProps {
    salesOrder: SalesOrderDetailsDTO;
}

export function SalesOrderFeedback(props: SalesOrderFeedbackProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy, status } = useSelector((state: RootState) => state.buyAllLineItemsModel);
    const { salesOrder } = props;
    const theme = useTheme();

    useEffect(() => {
        if (status === 200) {
            dispatch.buyAllLineItemsModel.RESET();
            navigate(`/sales-orders/${salesOrder.id}/checkout`);
        }
    }, [status]);

    const everyItemReturned = salesOrder?.lineItems?.every(x => x.state === SalesOrderLineItemState.Returned);
    const everyItemNone = salesOrder?.lineItems?.every(x => x.state === SalesOrderLineItemState.None);
    const servicePrice = everyItemReturned ? 45 : 0;

    const RenderLineItemFeedbacks = () => {
        if (!salesOrder.lineItems) {
            return <></>
        }

        return salesOrder.lineItems.map(lineItem => {
            return <Grid key={lineItem.id} item xs={2.4} sx={{
                display: 'flex'
            }}>
                {lineItem?.id && <LineItemFeedback
                    disabled={salesOrder?.state === SalesOrderState.Completed}
                    salesOrderId={salesOrder?.id ?? 0}
                    lineItemId={lineItem?.id}
                    product={lineItem?.product ?? {}}
                    lineItemFeedback={lineItem?.feedback ?? {}}
                    state={lineItem?.state ?? SalesOrderLineItemState.None} />}
            </Grid>
        })
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

    const totalPrice = (): number => {
        if (salesOrder?.lineItems === undefined) {
            return 0;
        }

        if (everyItemReturned) {
            return servicePrice;
        }

        const total = salesOrder.lineItems?.filter(x => x.state === SalesOrderLineItemState.Sold)
            .map(x => {
                if (x.product?.price === undefined) {
                    throw new Error("Price cannot be null or empty");
                }

                return x.product.price;
            })
            .reduce((prev, current) => {
                return prev + current;
            }, 0);

        return Math.round((total + Number.EPSILON) * 100) / 100;
    }

    const allItemsPrice = () => {
        if (salesOrder?.lineItems === undefined) {
            return 0;
        }

        const total = salesOrder.lineItems?.map(x => {
            if (x.product?.price === undefined) {
                throw new Error("Price cannot be null or empty");
            }

            return x.product.price;
        })
            .reduce((prev, current) => {
                return prev + current;
            }, 0);

        return Math.round((total + Number.EPSILON) * 100) / 100;
    }

    const vatPrice = () => {
        if (everyItemReturned) {
            return 0;
        }

        return Math.round(((totalPrice() - soldProductPrice()) + Number.EPSILON) * 100) / 100;
    }

    const buyAllClickHandler = () => {
        if (!isBusy && status === 0 && salesOrder?.id) {
            dispatch.buyAllLineItemsModel.buyAllLineItems(salesOrder?.id);
        }
    }

    const RenderBuyAllSection = () => {
        if (salesOrder.state !== SalesOrderState.Delivered) {
            return <></>
        }

        return (
            <React.Fragment>
                <Grid item xs={11}>
                    <Typography variant="body1" align="right" fontWeight={800}>
                        {t("Pages.SalesOrderFeedback.PackageTotalPrice")}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="body1" align="right">
                        {allItemsPrice()} TL
                    </Typography>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button
                        disabled={isBusy}
                        size="large"
                        color="primary"
                        variant="contained"
                        onClick={buyAllClickHandler}>
                        {t("Pages.SalesOrderFeedback.BuyAll")}
                    </Button>
                </Grid>
            </React.Fragment>
        )
    }

    const RenderCheckoutNavigationSection = () => {
        if (salesOrder.state !== SalesOrderState.Delivered) {
            return <></>
        }

        return (
            <React.Fragment>
                <Grid item xs={10}>
                    <Typography variant="body1">
                        {t("Pages.SalesOrderFeedback.AutoPaymentWarning")}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        fullWidth
                        disabled={salesOrder.lineItems?.some(x => x.state === SalesOrderLineItemState.None)}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            navigate(`/sales-orders/${salesOrder.id}/checkout`);
                        }}
                    >
                        {t("Pages.SalesOrderFeedback.Checkout")}
                    </Button>
                </Grid>
            </React.Fragment>
        )
    }

    return (
        <Grid item container xs={12} spacing={4}>
            {RenderBuyAllSection()}
            <Grid item xs={12}>
                <Typography variant="body1" fontWeight={800}>
                    {t("Pages.SalesOrderFeedback.PackageContents")}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{
                mb: 2,
            }}>
                <Divider />
            </Grid>
            <Grid item container xs={12} spacing={4}>
                {RenderLineItemFeedbacks()}
            </Grid>
            {everyItemNone && <Grid item xs={12} sx={{
                display: 'flex',
                flexBasis: 'max-content',
                justifyContent: 'flex-end'
            }}>
                <Alert variant="filled" severity="info" icon={<InfoOutlinedIcon color="primary" />}>
                    <Typography variant="body1" align="right" fontWeight={800}>
                        {t("Pages.SalesOrderFeedback.DisplayPriceInfo")}
                    </Typography>
                </Alert>
            </Grid>}
            {everyItemReturned && <Grid item xs={12} sx={{
                display: 'flex',
                flexBasis: 'max-content',
                justifyContent: 'flex-end'
            }}>
                <Alert variant="filled" severity="warning" icon={<WarningAmberOutlinedIcon color="primary" />}>
                    <Typography variant="body1" align="right" fontWeight={800}>
                        {t("Pages.SalesOrderFeedback.ServicePriceWarning")}
                    </Typography>
                </Alert>
            </Grid>}
            <Grid item xs={11}>
                <Typography variant="body1" align="right" fontWeight={800}>
                    {t("Pages.SalesOrderFeedback.SoldProductPrice")}
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="body1" align="right">
                    {soldProductPrice()} TL
                </Typography>
            </Grid>
            <Grid item xs={11}>
                <Typography variant="body1" align="right" fontWeight={800}>
                    {t("Pages.SalesOrderFeedback.VATPrice")}
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="body1" align="right">
                    {vatPrice()} TL
                </Typography>
            </Grid>
            <Grid item xs={11}>
                <Typography variant="body1" align="right" fontWeight={800} color={everyItemReturned ? theme.palette.error.main : theme.palette.primary.main}>
                    {t("Pages.SalesOrderFeedback.ServicePrice")}
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="body1" align="right" color={everyItemReturned ? theme.palette.error.main : theme.palette.primary.main}>
                    {servicePrice} TL
                </Typography>
            </Grid>
            <Grid item xs={11}>
                <Typography variant="body1" align="right" fontWeight={800}>
                    {t("Pages.SalesOrderFeedback.TotalProductPrice")}
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="body1" align="right">
                    {totalPrice()} TL
                </Typography>
            </Grid>
            {RenderCheckoutNavigationSection()}
        </Grid>
    )
}