import { Box, Button, Divider, FormControl, Grid, Link, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import format from "date-fns/format";
import tr from "date-fns/locale/tr";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ImageComponent } from "../../components/image/ImageComponent";
import { config } from "../../config";
import { SalesOrderLineItemState } from "../../services/swagger/api";
import { RootState, Dispatch } from "../../store/store";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import addDays from "date-fns/addDays";
import { LineItemFeedback } from "../salesOrders/components/LineItemFeedback";

export function Checkout() {
    const { t } = useTranslation();
    const { salesOrderId } = useParams();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy: isBusySalesOrder, data: salesOrder } = useSelector((state: RootState) => state.salesOrderDetailsModel);
    const { isBusy: isBusyPaymentMethod, data: paymentMethod, status: paymentMethodStatus } = useSelector((state: RootState) => state.getDefaultPaymentMethodModel);
    const { isBusy: isBusyGetReturn, data: getReturnData, status: getReturnStatus } = useSelector((state: RootState) => state.getReturnModel);
    const { isBusy: isBusyCreateReturn, data: createReturnData, status: createReturnStatus } = useSelector((state: RootState) => state.createReturnModel);
    const { imgBaseHost } = config;
    const [pickupDate, setPickupDate] = useState<Date | null>(null);
    const now = new Date();
    const minDate = addDays(now, 2);
    const maxDate = addDays(now, 14);

    useEffect(() => {
        if (salesOrderId && !isBusySalesOrder) {
            dispatch.salesOrderDetailsModel.salesOrderDetails(parseInt(salesOrderId));
        }

        if (salesOrderId && !isBusyGetReturn && getReturnStatus === 0) {
            dispatch.getReturnModel.getReturn(parseInt(salesOrderId));
        }
    }, [salesOrderId]);

    useEffect(() => {
        if (!isBusyPaymentMethod && paymentMethodStatus === 0) {
            dispatch.getDefaultPaymentMethodModel.getDefaultPaymentMethod();
        }
    }, []);

    const getMaskedPhone = () => {
        const phone = salesOrder?.salesOrderAddress?.phone;
        const lastFourNumber = phone?.substring(phone.length - 4, phone.length);
        return `+90******${lastFourNumber}`
    }

    const getMaskedCardNumber = () => {
        let cardNumber: string | null | undefined = paymentMethod?.lastFourDigit;

        if (!cardNumber) {
            return "";
        }

        for (let i = 0; i < 3; i++) {
            cardNumber = cardNumber.padStart(cardNumber.length + 1, " ");
            cardNumber = cardNumber?.padStart(cardNumber.length + 4, "*");
        }

        return cardNumber;
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

    const vatPrice = () => {
        return Math.round(((totalPrice() - soldProductPrice()) + Number.EPSILON) * 100) / 100;
    }

    const isCheckoutDisabled = () => {
        if (salesOrder?.lineItems?.every(x => x.state === SalesOrderLineItemState.Sold)) {
            return false;
        }

        return getReturnStatus !== 200;
    }

    const RenderReturnedLineItems = () => {
        if (!salesOrder || !salesOrder?.lineItems) {
            return <></>
        }

        return salesOrder.lineItems.filter(x => x.state === SalesOrderLineItemState.Returned).map(lineItem => {
            return <Grid key={lineItem.id} item xs={2.4} sx={{
                pr: 4
            }}>
                {lineItem?.id && <LineItemFeedback
                    salesOrderId={salesOrder?.id ?? 0}
                    lineItemId={lineItem?.id}
                    product={lineItem?.product ?? {}}
                    lineItemFeedback={lineItem?.feedback ?? {}}
                    state={lineItem?.state ?? SalesOrderLineItemState.None} />}
            </Grid>
        })
    }

    const RenderSoldLineItems = () => {
        if (!salesOrder || !salesOrder?.lineItems) {
            return <></>
        }

        return salesOrder.lineItems.filter(x => x.state === SalesOrderLineItemState.Sold).map(lineItem => {
            return <Grid key={lineItem.id} item xs={2.4} sx={{
                pr: 4
            }}>
                {lineItem?.id && <LineItemFeedback
                    salesOrderId={salesOrder?.id ?? 0}
                    lineItemId={lineItem?.id}
                    product={lineItem?.product ?? {}}
                    lineItemFeedback={lineItem?.feedback ?? {}}
                    state={lineItem?.state ?? SalesOrderLineItemState.None} />}
            </Grid>
        })
    }

    const RenderReturnsSection = () => {
        if (salesOrder?.lineItems?.every(lineItem => lineItem.state === SalesOrderLineItemState.Sold)) {
            return <></>
        }

        return <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
                <Typography variant="body1" fontWeight={800}>
                    {t("Pages.Checkout.ReturnedLineItems")}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {/* WARN: Box used for adjusting content since we break container - item chain in this grid */}
                <Box sx={{
                    display: 'flex',
                    p: 2,
                    flexDirection: 'row',
                }}>
                    {RenderReturnedLineItems()}
                </Box>
            </Grid>
            <Grid item container xs={6} spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body1" fontWeight={800}>
                        {t("Pages.Checkout.ReturnDate")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <Paper>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <StaticDatePicker
                                    showToolbar
                                    orientation="landscape"
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    onError={(reason) => {
                                        // TODO: formik set error
                                        console.log(reason);
                                    }}
                                    views={["month", "day"]}
                                    displayStaticWrapperAs="desktop"
                                    value={pickupDate}
                                    disablePast
                                    onChange={(newValue) => {
                                        setPickupDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>

                        </Paper>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item container xs={6} spacing={2} alignContent="space-between">
                <Grid item container xs={12} spacing={2} alignContent="flex-start">
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight={800}>
                            {t("Pages.Checkout.ReturnAddress")}
                        </Typography>
                    </Grid>
                    {/* TODO: this section should be rendered with selected address */}
                    <Grid item xs={6}>
                        {salesOrder?.salesOrderAddress?.name}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" fontWeight={800} align="right">
                            <Link sx={{
                                cursor: 'pointer'
                            }}>
                                {t("Pages.Checkout.ChangeReturnAddress")}
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
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
                </Grid>
                <Grid item container xs={12} spacing={2}>
                    <Grid item xs={12}>
                        <Typography>
                            {t("Pages.Checkout.CargoTrackingCode")}
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h5">
                            {t("Pages.Checkout.CargoTrackingCodeInfo")}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <Button variant="contained">
                                {t("Pages.Checkout.CreateReturn")}
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    }

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={6}>
                <Typography variant="h4">{t("Pages.Checkout.Title")}#{salesOrderId}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h4" align="right">
                    {salesOrder?.createdAt && format(new Date(salesOrder.createdAt), 'MMMM yyyy', { locale: tr })}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            {RenderReturnsSection()}
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" fontWeight={800}>
                    {t("Pages.Checkout.SoldLineItems")}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{
                    display: 'flex',
                    p: 2,
                    flexDirection: 'row',
                }}>
                    {RenderSoldLineItems()}
                </Box>
            </Grid>
            <Grid item container xs={6} spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body1" fontWeight={800}>
                        {t("Pages.Checkout.PaymentMethod")}
                    </Typography>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                    <Grid item container xs={8} alignContent="flex-start" spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body1" fontWeight={800}>
                                {paymentMethod?.cardBankName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                {getMaskedCardNumber()}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <ImageComponent src={`${imgBaseHost}/common/iyzico.svg`} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">
                                {t("Pages.Checkout.IyzicoInfo")}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <ImageComponent src={`${imgBaseHost}/card-logo/${paymentMethod?.cardAssociation}.svg`} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container xs={6} spacing={2} alignContent="flex-start" >
                <Grid item container xs={12} alignItems="center" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight={800} >
                            {t("Pages.Checkout.DiscountTitle")}
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <FormControl fullWidth>
                            <TextField
                                label={t("Pages.Checkout.DiscountCode")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <Button disabled variant="contained">
                                {t("Pages.Checkout.ApplyDiscount")}
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item container xs={12} alignItems="center" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight={800} >
                            {t("Pages.Checkout.Wallet")}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <AccountBalanceWalletIcon fontSize="large" sx={{
                            verticalAlign: "text-bottom"
                        }} />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h4" >
                            {t("Pages.Checkout.Balance")}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h4" component="span">
                            0
                        </Typography>
                        <CurrencyLiraIcon sx={{
                            verticalAlign: "sub"
                        }} />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <Button disabled variant="contained">
                                {t("Pages.Checkout.UseBalance")}
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container xs={12} spacing={2}>
                <Grid item xs={11}>
                    <Typography variant="body1" align="right" fontWeight={800}>
                        {t("Pages.Checkout.SoldProductPrice")}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="body1" align="right">
                        {soldProductPrice()} TL
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <Typography variant="body1" align="right" fontWeight={800}>
                        {t("Pages.Checkout.VATPrice")}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="body1" align="right">
                        {vatPrice()} TL
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <Typography variant="body1" align="right" fontWeight={800}>
                        {t("Pages.Checkout.TotalProductPrice")}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="body1" align="right">
                        {totalPrice()} TL
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                {isCheckoutDisabled() ?
                    <Tooltip
                        title={t("Pages.Checkout.ReturnWarning")}
                        placement="left"
                    >
                        <span>
                            <Button
                                disabled
                                variant="contained"
                            >
                                {t("Pages.Checkout.Checkout")}
                            </Button>
                        </span>
                    </Tooltip>
                    : <Button
                        variant="contained"
                        onClick={() => {

                        }}
                    >
                        {t("Pages.Checkout.Checkout")}
                    </Button>
                }


            </Grid>
        </Grid>
    )
}