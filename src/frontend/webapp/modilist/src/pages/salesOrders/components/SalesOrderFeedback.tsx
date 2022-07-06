import { Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SalesOrderDetailsDTO, SalesOrderLineItemState, SalesOrderState } from "../../../services/swagger/api";
import { LineItemFeedback } from "./LineItemFeedback";

export interface SalesOrderFeedbackProps {
    salesOrder: SalesOrderDetailsDTO;
}

export function SalesOrderFeedback(props: SalesOrderFeedbackProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { salesOrder } = props;

    const RenderLineItemFeedbacks = () => {
        if (!salesOrder.lineItems) {
            return <></>
        }

        return salesOrder.lineItems.map(lineItem => {
            return <Grid key={lineItem.id} item xs={2.4}>
                {lineItem?.id && <LineItemFeedback
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
        return Math.round(((totalPrice() - soldProductPrice()) + Number.EPSILON) * 100) / 100;
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
                    <Button size="large" variant="contained">
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
        <Grid item container xs={12} spacing={2}>
            {RenderBuyAllSection()}
            <Grid item xs={12}>
                <Typography variant="body1" fontWeight={800}>
                    {t("Pages.SalesOrderFeedback.PackageContents")}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item container xs={12} spacing={4}>
                {RenderLineItemFeedbacks()}
            </Grid>
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