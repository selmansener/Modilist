import { Alert, Grid, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "../../store/store";
import { NewPaymentMethodListItem } from "./components/NewPaymentMethodListItem";
import { PaymentMethodListItem } from "./components/PaymentMethodListItem";

export function PaymentMethods() {
    const dispatch = useDispatch<Dispatch>();
    const { t } = useTranslation();
    const { isBusy: isBusyPaymentMethods, data: paymentMethods } = useSelector((state: RootState) => state.getAllPaymentMethodsModel);
    const { isBusy: isBusyChangeDefault, status: changeDefaultPaymentMethodStatus } = useSelector((state: RootState) => state.changeDefaultPaymentMethodModel);
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const [isFailed, setIsFailed] = useState(false);


    useEffect(() => {
        if (!isBusyPaymentMethods) {
            dispatch.getAllPaymentMethodsModel.getAllPaymentMethods();
        }
    }, []);

    useEffect(() => {
        if (!isBusyChangeDefault && changeDefaultPaymentMethodStatus === 200) {
            dispatch.changeDefaultPaymentMethodModel.RESET();

            dispatch.getAllPaymentMethodsModel.getAllPaymentMethods();
        }
        else if (changeDefaultPaymentMethodStatus !== 200 && changeDefaultPaymentMethodStatus !== 0) {
            setIsFailed(true);
            setSnackbarStatus(true);

        }
    }, [changeDefaultPaymentMethodStatus]);

    return (
        <Grid item container xs={12} spacing={2}>
            {paymentMethods?.map(paymentMethod => {
                return <Grid key={paymentMethod.id} item xs={4}>
                    <PaymentMethodListItem paymentMethod={paymentMethod}
                        setAsDefaultPaymentMethod={(cardName) => {
                            if (!isBusyChangeDefault && changeDefaultPaymentMethodStatus === 0) {
                                dispatch.changeDefaultPaymentMethodModel.changeDefaultPaymentMethod(cardName);
                            }
                        }} />
                </Grid>
            })}
            <Grid item xs={4} >
                <NewPaymentMethodListItem />
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
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    {t(`Generic.Forms.UnexpectedError`)}
                </Alert>
            </Snackbar>
        </Grid>
    )
}