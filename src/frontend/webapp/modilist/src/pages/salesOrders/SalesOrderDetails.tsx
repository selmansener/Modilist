import { Alert, Box, Button, Dialog, DialogTitle, Divider, FormControl, Grid, Link, Paper, Snackbar, TextField, Typography, useTheme } from "@mui/material";
import format from "date-fns/format";
import { tr } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AddressDTO, Gender, SalesOrderState } from "../../services/swagger/api";
import { Dispatch, RootState } from "../../store/store";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { ImageComponent } from "../../components/image/ImageComponent";
import { config } from "../../config";
import InfoIcon from '@mui/icons-material/Info';
import { SalesOrderFeedback } from "./components/SalesOrderFeedback";
import { LovelyRating } from "../../components/lovelyRating/LovelyRating";
import { calculateAvgSalesOrderRating } from "./utils/calculateAvgRating";
import { AddressSelection } from "../../components/addressSelection/AddressSelection";
import { DeliveryDateDialog } from "./components/DeliveryDateDialog";
import { CustomRadioButtonGroup } from "../../components/customRadioButton/CustomRadioButton";
import { Helmet } from "react-helmet";
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

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

export default function SalesOrderDetails() {
    const { t } = useTranslation();
    const { salesOrderId } = useParams();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy: getAccountIsBusy, data: getAccountResponse } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: isBusySalesOrder, data: salesOrder, status: salesOrderStatus } = useSelector((state: RootState) => state.salesOrderDetailsModel);
    const { isBusy: isBusyUpdateAddress, status: updateAddressStatus } = useSelector((state: RootState) => state.updateSalesOrderAddressModel);
    const { isBusy: isBusyUpdateAdditionalRequests, status: updateAdditionalRequestsStatus } = useSelector((state: RootState) => state.updateAdditionalRequestsModel);
    const { isBusy: isBusyUpdateRequestedStyle, status: updateRequestedStyleStatus } = useSelector((state: RootState) => state.updateRequestedStyleModel);
    const isBusy = getAccountIsBusy || isBusySalesOrder || isBusyUpdateAddress || isBusyUpdateAdditionalRequests || isBusyUpdateRequestedStyle;
    const { cdnImg: imgBaseHost } = config;
    const [isAddressSelectionOpen, setIsAddressSelectionOpen] = useState(false);
    const [isDeliveryDateDialogOpen, setIsDeliveryDateDialogOpen] = useState(false);
    const [additionalRequests, setAdditionalRequests] = useState<string>(salesOrder?.additionalRequests ?? "");
    const [snackbarStatus, setSnackbarStatus] = useState<boolean>(false);
    const [requestedStyle, setRequestedStyle] = useState<string>(salesOrder?.requestedStyle ?? "");
    const [isRequestedStyleOpen, setIsRequestedStyleOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        if (updateAdditionalRequestsStatus === 200) {
            if (salesOrderId) {
                dispatch.salesOrderDetailsModel.salesOrderDetails(parseInt(salesOrderId));
            }

            setSnackbarStatus(true);
            dispatch.updateAdditionalRequestsModel.RESET();
        }
    }, [updateAdditionalRequestsStatus]);

    useEffect(() => {
        if (salesOrderStatus === 200) {
            setAdditionalRequests(salesOrder?.additionalRequests ?? "");
        }
    }, [salesOrderStatus]);

    useEffect(() => {
        if (salesOrderId && !isBusySalesOrder) {
            dispatch.salesOrderDetailsModel.salesOrderDetails(parseInt(salesOrderId));
        }

        return () => {
            dispatch.salesOrderDetailsModel.RESET();
        }
    }, [salesOrderId]);

    useEffect(() => {
        if (salesOrderId && !isBusyUpdateAddress && updateAddressStatus === 200) {
            dispatch.salesOrderDetailsModel.salesOrderDetails(parseInt(salesOrderId));
        }
    }, [updateAddressStatus]);

    const handleAddressChange = (selectedAddress: AddressDTO) => {
        if (salesOrderId) {
            dispatch.updateSalesOrderAddressModel.updateSalesOrderAddress({
                salesOrderId: parseInt(salesOrderId),
                data: {
                    addressId: selectedAddress.id
                }
            });
        }

        setIsAddressSelectionOpen(false);
    }

    const getOrderImage = () => {
        switch (salesOrder?.state) {
            case SalesOrderState.Created:
            case SalesOrderState.Prepared:
            case SalesOrderState.Shipped:
                return `${imgBaseHost}/common/active-order-image.png`;
            case SalesOrderState.Delivered:
                return `${imgBaseHost}/common/delivered-order-image.png`;
            case SalesOrderState.Completed:
                return `${imgBaseHost}/common/completed-order-image.png`;
            default:
                return undefined;
        }
    }

    const doesOrderDelivered = salesOrder?.state === SalesOrderState.Delivered || salesOrder?.state === SalesOrderState.Completed;

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
                <Link sx={{
                    cursor: 'pointer'
                }}
                    fontWeight={800}
                    onClick={() => {
                        setIsAddressSelectionOpen(true);
                    }}>
                    {t("Pages.SalesOrderDetails.RegisteredAddresses")}
                </Link>
            </React.Fragment>
        )
    }

    const RenderChangeEstimatedDeliveryDateLink = () => {
        if (salesOrder?.state !== SalesOrderState.Created && salesOrder?.state !== SalesOrderState.Prepared) {
            return <></>
        }

        return (
            <React.Fragment>
                <Link sx={{
                    fontWeight: 800,
                    cursor: 'pointer'
                }} onClick={() => {
                    setIsDeliveryDateDialogOpen(true);
                }}>
                    {t("Pages.SalesOrderDetails.ChangeDeliveryDate")}
                    <CalendarMonthIcon sx={{
                        verticalAlign: 'text-top'
                    }} fontSize="small" />
                </Link>
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
                    <Typography variant="body1" align="right" fontWeight={800} color={theme.palette.secondary.main}>
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
                            variant="contained"
                            onClick={() => {
                                if (salesOrderId && !isBusyUpdateAdditionalRequests) {
                                    dispatch.updateAdditionalRequestsModel.updateAdditionalRequests({
                                        salesOrderId: parseInt(salesOrderId),
                                        data: {
                                            additionalRequests: additionalRequests
                                        }
                                    })
                                }
                            }}
                            color="secondary">
                            {t("Generic.Forms.Submit")}
                        </Button>
                    </FormControl>
                </Grid>
            </React.Fragment>
        )
    }

    const handleRequestedStyleClose = () => {
        setIsRequestedStyleOpen(false);
    }

    const requestedStyleData = getAccountResponse && (getAccountResponse?.gender === Gender.Female ? requestedStyleFemale : requestedStyleMale);

    const content = requestedStyleData?.map(style => {
        return {
            value: style,
            element: <Box sx={{
                p: 6
            }}>
                <ImageComponent src={`${imgBaseHost}/outfit-styles/${getAccountResponse?.gender?.toString().toLowerCase()}/${style}.png`} width='100%' sx={{
                    boxSizing: 'border-box'
                }} />
            </Box>,
            label: <Typography variant="h6" align='center' color='inherit' sx={{
                boxSizing: 'border-box',
            }}>
                {t(`Pages.SalesOrderDetails.OutfitStyles.${style}`)}
            </Typography>
        }
    }) ?? [];

    const RenderRequestedStyleDialog = (content: {
        value: string;
        element: string | JSX.Element;
        label: string | JSX.Element;
    }[]) => {
        if (!requestedStyleData || requestedStyleData.length === 0) {
            return <></>
        }

        return (
            <Dialog onClose={handleRequestedStyleClose} open={isRequestedStyleOpen} maxWidth="lg" fullWidth >
                <DialogTitle sx={{
                    mt: 4
                }}>
                    <Typography variant="h3" align="center">
                        {t("Pages.SalesOrderDetails.OutfitQuestion")}
                    </Typography>
                </DialogTitle>
                <CustomRadioButtonGroup
                    containerSx={{
                        justifyContent: 'space-evenly',
                        p: 4
                    }}
                    radioButtonSx={{
                        flexBasis: '25%'
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
                    py: [4]
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
        <Grid item container xs={12} spacing={2}>
            <Helmet>
                {salesOrderId && <title>{t("Pages.Titles.SalesOrderDetails", { orderId: salesOrderId })} | Modilist</title>}
            </Helmet>
            <Grid item xs={12}>
                <Grid item container xs={12} spacing={2}>
                    <Grid item xs={6}>
                        <IconButton onClick={() => navigate(-1)}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <Typography variant="h4" component="span" sx={{
                            verticalAlign: "middle",
                            ml: 2
                        }}>{t("Pages.SalesOrderDetails.Title")}#{salesOrderId}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h4" align="right">
                            {salesOrder?.createdAt && format(new Date(salesOrder.createdAt), 'MMMM yyyy', { locale: tr })}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item container xs={8} spacing={2} alignContent="flex-start">
                        <Grid item xs={4}>
                            <Typography variant="body1" align="right" fontWeight={800} color={theme.palette.secondary.main}>
                                {t("Pages.SalesOrderDetails.DeliveryAddress")}
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Typography variant="body1" component="span" fontWeight={800} color={theme.palette.primary.main}>
                                {salesOrder?.salesOrderAddress?.name}
                            </Typography>
                            <Typography align="right" component="span">
                                {RenderChangeAddressLink()}
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
                            <Typography variant="body1" align="right" fontWeight={800} color={theme.palette.secondary.main}>
                                {t("Pages.SalesOrderDetails.CreatedAt")}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body1" fontWeight={800} color={theme.palette.primary.main}>
                                {salesOrder?.createdAt && format(new Date(salesOrder?.createdAt), 'dd.MM.yyyy', { locale: tr })}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1" align="right" fontWeight={800} color={theme.palette.secondary.main}>
                                {t("Pages.SalesOrderDetails.EstimatedDeliveryDate")}
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            {salesOrder?.estimatedDeliveryDate && <Typography variant="body1" fontWeight={800} color={theme.palette.primary.main}>
                                {salesOrder?.createdAt && format(new Date(salesOrder?.estimatedDeliveryDate), 'dd.MM.yyyy', { locale: tr })}
                            </Typography>}
                            <Typography variant="body1">
                                {RenderChangeEstimatedDeliveryDateLink()}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1" align="right" fontWeight={800} color={theme.palette.secondary.main}>
                                {t("Pages.SalesOrderDetails.SalesOrderState")}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body1" color={theme.palette.primary.main} fontWeight={800}>
                                {t(`Generic.SalesOrderState.${salesOrder?.state}`)}
                            </Typography>
                        </Grid>
                        {RenderPackageContents()}
                        <Grid item xs={4}>
                            <Typography variant="body1" align="right" fontWeight={800} color={theme.palette.secondary.main}>
                                {t("Pages.SalesOrderDetails.CargoTrackingCode")}
                            </Typography>
                        </Grid>
                        <Grid item container xs={8}>
                            <Grid item xs={6}>
                                <Typography variant="body1" fontWeight={800} color={theme.palette.primary.main}>
                                    {salesOrder?.cargoTrackingCode}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body1" align="right" fontWeight={800} color={theme.palette.secondary.main}>
                                {t("Pages.SalesOrderDetails.SalesOrderFeedback")}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            {salesOrder && <LovelyRating
                                readOnly
                                disabled={!doesOrderDelivered}
                                value={calculateAvgSalesOrderRating(salesOrder)}
                                precision={0.5} />}
                        </Grid>
                        <Grid item xs={4} sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-start'
                        }}>
                            {salesOrder?.state === SalesOrderState.Completed && <Button variant="contained" color="secondary">
                                {t("Pages.SalesOrderDetails.DisplayInvoice")}
                            </Button>}
                        </Grid>
                        {RenderAdditionalNotes()}
                    </Grid>
                    {getOrderImage() && <Grid item xs={4}>
                        <ImageComponent src={getOrderImage() ?? ''} asBackground height={350} />
                    </Grid>}
                    {doesOrderDelivered && <SalesOrderFeedback salesOrder={salesOrder ?? {}} />}
                </Grid>
            </Grid>
            <AddressSelection
                open={isAddressSelectionOpen}
                handleClose={() => {
                    setIsAddressSelectionOpen(false);
                }}
                onSelect={handleAddressChange}
                contentText={"Pages.SalesOrderDetails.ChangeDeliveryAddress"}
            />
            {salesOrder?.estimatedDeliveryDate && <DeliveryDateDialog
                open={isDeliveryDateDialogOpen}
                salesOrderId={salesOrderId ? parseInt(salesOrderId) : 0}
                currentDate={new Date(salesOrder?.estimatedDeliveryDate)}
                handleClose={(isDateChanged: boolean) => {
                    if (isDateChanged && salesOrderId) {
                        dispatch.salesOrderDetailsModel.salesOrderDetails(parseInt(salesOrderId));
                    }

                    setIsDeliveryDateDialogOpen(false);
                }}
            />}
            {salesOrder?.state === SalesOrderState.Created && RenderRequestedStyleDialog(content)}
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
        </Grid>
    )
}