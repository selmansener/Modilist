import { Alert, Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, FormHelperText, Grid, Link, Paper, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import format from "date-fns/format";
import tr from "date-fns/locale/tr";
import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ImageComponent } from "../../components/image/ImageComponent";
import { config } from "../../config";
import { AddressDTO, SalesOrderLineItemState } from "../../services/swagger/api";
import { RootState, Dispatch } from "../../store/store";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import addDays from "date-fns/addDays";
import { LineItemFeedback } from "../salesOrders/components/LineItemFeedback";
import { AddressSelection } from "../../components/addressSelection/AddressSelection";
import trLocale from 'date-fns/locale/tr';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import Cards from 'react-credit-cards';

export function Checkout() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { salesOrderId } = useParams();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy: isBusySalesOrder, data: salesOrder, status: salesOrderStatus } = useSelector((state: RootState) => state.salesOrderDetailsModel);
    const { isBusy: isBusyPaymentMethod, data: paymentMethod, status: paymentMethodStatus } = useSelector((state: RootState) => state.getDefaultPaymentMethodModel);
    const { isBusy: isBusyGetReturn, data: getReturnData, status: getReturnStatus } = useSelector((state: RootState) => state.getReturnModel);
    const { isBusy: isBusyCreateReturn, data: createReturnData, status: createReturnStatus } = useSelector((state: RootState) => state.createReturnModel);
    const { isBusy: isBusyCreatePayment, data: createPaymentData, status: createPaymentStatus } = useSelector((state: RootState) => state.createPaymentModel);
    const { cdn, cdnImg: imgBaseHost } = config;
    const now = new Date();
    const minDate = addDays(now, 2);
    const maxDate = addDays(now, 14);
    const [addressSelectionOpen, setAddressSelectionOpen] = useState<boolean>(false);
    const [pickupDate, setPickupDate] = useState<Date | null>(addDays(now, 3));
    const [selectedAddress, setSelectedAddress] = useState<AddressDTO>();
    const [isFormChecked, setIsFormChecked] = useState<boolean>(false);
    const [isCheckoutTouched, setIsCheckoutTouched] = useState<boolean>(false);
    const [isReturnPolicyChecked, setIsReturnPolicyChecked] = useState<boolean>(false);
    const [isReturnTouched, setIsReturnTouched] = useState<boolean>(false);
    const theme = useTheme();

    const everyItemReturned = salesOrder?.lineItems?.every(x => x.state === SalesOrderLineItemState.Returned);
    const anyItemReturned = salesOrder?.lineItems?.some(x => x.state === SalesOrderLineItemState.Returned);
    const servicePrice = everyItemReturned ? 45 : 0;

    useEffect(() => {
        if (salesOrderId && !isBusySalesOrder && salesOrderStatus === 0) {
            dispatch.salesOrderDetailsModel.salesOrderDetails(parseInt(salesOrderId));
        }

        if (salesOrderId && !isBusyGetReturn && getReturnStatus === 0) {
            dispatch.getReturnModel.getReturn(parseInt(salesOrderId));
        }
    }, [salesOrderId]);

    useEffect(() => {
        if (createPaymentStatus === 200) {
            dispatch.createPaymentModel.RESET();
            navigate(`/sales-orders/${salesOrderId}/checkout-completed`);
        }
        else if(createPaymentStatus !== 200 && createPaymentStatus !== 0) {
            navigate(`/sales-orders/${salesOrderId}/checkout-failed`);
            dispatch.createPaymentModel.RESET();
        }
    }, [createPaymentStatus])


    useEffect(() => {
        if (!isBusyPaymentMethod && paymentMethodStatus === 0) {
            dispatch.getDefaultPaymentMethodModel.getDefaultPaymentMethod();
        }

        return () => {
            dispatch.getReturnModel.RESET();
        }
    }, []);

    useEffect(() => {
        if (getReturnData?.returnAddress) {
            setSelectedAddress(getReturnData?.returnAddress);
        }
        else if (salesOrder?.salesOrderAddress?.id) {
            setSelectedAddress(salesOrder.salesOrderAddress);
        }
    }, [salesOrder, getReturnData]);

    useEffect(() => {
        if (createReturnData && createReturnStatus === 200) {
            dispatch.getReturnModel.HANDLE_RESPONSE(createReturnData, createReturnStatus);

            dispatch.createReturnModel.RESET();
        }
    }, [createReturnStatus]);

    const handleAddressSelectionClose = () => {
        setAddressSelectionOpen(false);
    }

    const handleAddressSelection = (selectedAddress: AddressDTO) => {
        setAddressSelectionOpen(false);
        setSelectedAddress(selectedAddress);
    }

    const handleCheckout = () => {
        if (!isFormChecked) {
            setIsCheckoutTouched(true);
            return;
        }

        if (salesOrderId && !isBusyCreatePayment && createPaymentStatus === 0) {
            dispatch.createPaymentModel.createPayment(parseInt(salesOrderId));
        }
    }

    const getMaskedPhone = () => {
        const phone = selectedAddress?.phone;
        const lastFourNumber = phone?.substring(phone.length - 4, phone.length);
        return `+90******${lastFourNumber}`
    }

    const getMaskedCardNumber = () => {
        let cardNumber: string | null | undefined = paymentMethod?.binNumber;

        if (!cardNumber) {
            return "";
        }

        let endResult = "";
        for (let i = 0; i < 5; i++) {
            if (i * 4 > cardNumber.length) {
                endResult += " ****";
                continue;
            }

            if (i !== 0) {
                endResult += (" " + cardNumber.substring(i * 4, 4));
            }
            else {
                endResult += cardNumber.substring(i * 4, 4);
            }
        }

        return endResult;
    }


    const soldProductPrice = () => {
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

    const totalPrice = (): number => {
        if (salesOrder?.lineItems === undefined) {
            return 0;
        }

        if (everyItemReturned) {
            return servicePrice;
        }

        const total = salesOrder.lineItems?.filter(x => x.state === SalesOrderLineItemState.Sold)
            .map(x => {
                if (x.product?.salesPrice === undefined) {
                    throw new Error("Price cannot be null or empty");
                }

                return x.product.salesPrice;
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
                    disabled={getReturnData !== undefined}
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
                    disabled={getReturnData !== undefined}
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

        return <React.Fragment>
            <Grid item container xs={12} spacing={2}>
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
                <Grid item xs={12}>
                    <Paper elevation={6} sx={{
                        p: 4
                    }}>
                        <Grid item container xs={12} spacing={2}>
                            <Grid item container xs={12} xl={6} spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body1" fontWeight={800}>
                                        {t(getReturnData === undefined ? "Pages.Checkout.ReturnDate" : "Pages.Checkout.EstimatedPickupDate", {
                                            date: getReturnData?.requestedPickupDate && format(new Date(getReturnData?.requestedPickupDate), "dd.MM.yyyy", {
                                                locale: trLocale
                                            })
                                        })}
                                    </Typography>
                                </Grid>
                                {getReturnData === undefined && <Grid item xs={12}>
                                    <FormControl>
                                        <Paper>
                                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={trLocale}>
                                                <StaticDatePicker
                                                    showToolbar
                                                    toolbarTitle={t("Pages.Checkout.SelectReturnDate")}
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
                                </Grid>}
                                {getReturnData &&
                                    <Grid item xs={12}>
                                        <Typography variant="h1">PICKUP IMAGE</Typography>
                                    </Grid>}
                            </Grid>
                            <Grid item container xs={12} xl={6} spacing={2} alignContent="space-between">
                                <Grid item container xs={12} spacing={2} alignContent="flex-start">
                                    <Grid item xs={6}>
                                        <Trans>
                                            <Typography variant="body1" fontWeight={800} component="span">
                                                {t("Pages.Checkout.ReturnAddress")}
                                            </Typography>
                                            <Typography variant="body1" fontWeight={800} component="span">
                                                {selectedAddress?.name}
                                            </Typography>
                                        </Trans>
                                    </Grid>
                                    {getReturnData === undefined && <Grid item xs={6}>
                                        <Typography variant="body1" fontWeight={800} align="right">
                                            <Link
                                                onClick={() => {
                                                    setAddressSelectionOpen(true);
                                                }}
                                                sx={{
                                                    cursor: 'pointer'
                                                }}>
                                                {t("Pages.Checkout.ChangeReturnAddress")}
                                            </Link>
                                        </Typography>
                                    </Grid>}
                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            {selectedAddress?.fullAddress}
                                        </Typography>
                                        <Typography variant="body1">
                                            {selectedAddress?.district} / {selectedAddress?.city}
                                        </Typography>
                                        <Typography variant="body1">
                                            {getMaskedPhone()}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container xs={12} spacing={2}>
                                    {getReturnData === undefined && <Grid item xs={12}>
                                        <FormControl error={isReturnTouched && !isReturnPolicyChecked}>
                                            <FormControlLabel control={<Checkbox checked={isReturnPolicyChecked} onClick={(e) => {
                                                setIsReturnPolicyChecked(!isReturnPolicyChecked);
                                                setIsReturnTouched(false);
                                            }} />} label={
                                                <Trans>
                                                    <Link href={`${cdn}/contracts/return-policy.pdf`} target="_blank">
                                                        {t("Pages.Checkout.ReturnPolicy.1")}
                                                    </Link>
                                                    <Typography variant="body1" component="span">
                                                        {t("Pages.Checkout.ReturnPolicy.2")}
                                                    </Typography>
                                                </Trans>
                                            } />
                                            {isReturnTouched && !isReturnPolicyChecked && <FormHelperText color="error">{t("Pages.Checkout.TermsInfoError")}</FormHelperText>}
                                        </FormControl>
                                    </Grid>}

                                    <Grid item xs={12}>
                                        <Typography variant="body1" fontWeight={800}>
                                            {t("Pages.Checkout.CargoTrackingCode")}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body1">
                                            {getReturnData ? getReturnData.cargoTrackingCode : t("Pages.Checkout.CargoTrackingCodeInfo")}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <Button
                                                disabled={getReturnData !== undefined}
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => {
                                                    if (!isReturnPolicyChecked) {
                                                        setIsReturnTouched(true);
                                                        return;
                                                    }

                                                    if (!isBusyCreateReturn && createReturnStatus === 0 && salesOrderId && pickupDate) {
                                                        dispatch.createReturnModel.createReturn({
                                                            salesOrderId: parseInt(salesOrderId),
                                                            addressName: selectedAddress?.name,
                                                            requestedPickupDate: pickupDate
                                                        })
                                                    }
                                                }}>
                                                {t("Pages.Checkout.CreateReturn")}
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <AddressSelection open={addressSelectionOpen} handleClose={handleAddressSelectionClose} onSelect={handleAddressSelection} contentText="Pages.Checkout.ChangeReturnAddressModal" />
        </React.Fragment>
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
            {anyItemReturned && <Grid item xs={12}>
                <Divider sx={{
                    mb: 4
                }} />
            </Grid>}
            {RenderReturnsSection()}
            {!everyItemReturned &&
                <React.Fragment>
                    <Grid item xs={12} sx={{
                        mt: 4
                    }}>
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
                </React.Fragment>}
            <Grid item container xs={6} spacing={2} sx={{
                mt: 2
            }}>
                <Grid item xs={12}>
                    <Typography variant="body1" fontWeight={800}>
                        {t("Pages.Checkout.PaymentMethod")}
                    </Typography>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                    <Grid item container xs={7} alignContent="flex-start" spacing={2}>
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
                    <Grid item xs={5} sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <Cards
                            cvc={"000"}
                            expiry={""}
                            name={" "}
                            preview
                            issuer={paymentMethod?.cardAssociation?.replace("_", "").toLowerCase() ?? undefined}
                            number={paymentMethod?.binNumber?.padEnd(16, "*") ?? ""}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container xs={6} spacing={2} alignContent="flex-start" sx={{
                mt: 2
            }} >
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
                justifyContent: 'space-between'
            }}>
                <FormControl error={isCheckoutTouched && !isFormChecked}>
                    <FormControlLabel control={<Checkbox checked={isFormChecked} onClick={(e) => {
                        setIsFormChecked(!isFormChecked);
                        setIsCheckoutTouched(false);
                    }} />} label={
                        <Trans>
                            <Link href={`${cdn}/contracts/pre-information-form.pdf`} target="_blank">
                                {t("Pages.Checkout.TermsInfo.1")}
                            </Link>
                            <Typography variant="body1" component="span">
                                {t("Pages.Checkout.TermsInfo.2")}
                            </Typography>
                            <Link href={`${cdn}/contracts/distant-sales-contract.pdf`} target="_blank">
                                {t("Pages.Checkout.TermsInfo.3")}
                            </Link>
                            <Typography variant="body1" component="span">
                                {t("Pages.Checkout.TermsInfo.4")}
                            </Typography>
                        </Trans>
                    } />
                    {isCheckoutTouched && !isFormChecked && <FormHelperText color="error">{t("Pages.Checkout.TermsInfoError")}</FormHelperText>}
                </FormControl>
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
                        disabled={isBusyCreatePayment}
                        variant="contained"
                        onClick={handleCheckout}
                    >
                        {isBusyCreatePayment && <CircularProgress
                            sx={{
                                width: "18px !important",
                                height: "18px !important",
                                mr: 2
                            }}
                        />}
                        {t("Pages.Checkout.Checkout")}
                    </Button>
                }
            </Grid>
        </Grid>
    )
}