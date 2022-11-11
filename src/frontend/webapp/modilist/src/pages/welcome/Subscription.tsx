import { Alert, Button, CircularProgress, Grid, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dispatch, RootState } from '../../store/store';
import ContactInfo from './subscriptionComponents/ContactInfo';
import PaymentMethod from './subscriptionComponents/PaymentMethod';
import Personal from './subscriptionComponents/Personal';
import { SubscriptionDetails } from './subscriptionComponents/SubscriptionDetails';
import { SubscriptionInformation } from './subscriptionComponents/SubscriptionInformation';

export default function Subscription() {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy: getAccountIsBusy } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: updateAccountIsBusy, status: updateAccountStatus } = useSelector((state: RootState) => state.updateAccountModel);
    const { isBusy: getDefaultAddressIsBusy } = useSelector((state: RootState) => state.getDefaultAddressModel);
    const { isBusy: upsertAddressIsBusy, status: upsertAddressStatus } = useSelector((state: RootState) => state.upsertAddressModel);
    const { isBusy: createPaymentMethodIsBusy, status: createPaymentMethodStatus } = useSelector((state: RootState) => state.createDefaultPaymentMethodModel);
    const { isBusy: updateSubscriptiontIsBusy, status: updateSubscriptionStatus } = useSelector((state: RootState) => state.updateSubscriptionModel);
    const { isBusy: activateAccountIsBusy, data: activateAccount, status: activateAccountStatus } = useSelector((state: RootState) => state.activateAccountModel);
    const { personal, contactInfo, paymentMethod, subscriptionDetails } = useSelector((state: RootState) => state.stepperSubscription);
    const isBusy = getAccountIsBusy || updateAccountIsBusy || getDefaultAddressIsBusy || upsertAddressIsBusy || createPaymentMethodIsBusy || updateSubscriptiontIsBusy;
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const statusList = [updateAccountStatus, upsertAddressStatus, createPaymentMethodStatus, updateSubscriptionStatus];
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [])

    useEffect(() => {
        statusList.forEach(status => {
            if (status !== 200 && status !== 0) {
                setSnackbarStatus(true);
            }
        });

        if (updateAccountStatus === 200 && upsertAddressStatus === 200 && createPaymentMethodStatus === 200 && updateSubscriptionStatus === 200) {
            dispatch.activateAccountModel.activateAccount();
        }

    }, [updateAccountStatus, upsertAddressStatus, createPaymentMethodStatus, updateSubscriptionStatus])

    useEffect(() => {
        if (activateAccountStatus === 200 && activateAccount) {
            dispatch.getAccountModel.HANDLE_RESPONSE(activateAccount, activateAccountStatus);
            navigate("/", { replace: true });
        }
    }, [activateAccountStatus]);

    return (
        <Grid item container spacing={4}>
            <Personal />
            <ContactInfo />
            <SubscriptionInformation />
            <SubscriptionDetails />
            <PaymentMethod />
            <Grid item container xs={6} justifyContent="flex-start">
                <Button
                    disabled={isBusy}
                    variant="outlined"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    {t('Layouts.Welcome.WelcomeSteps.Buttons.Back')}
                </Button>
            </Grid>
            <Grid item container xs={6} justifyContent="flex-end">
                <Button
                    disabled={isBusy}
                    onClick={() => {
                        personal();
                        contactInfo();
                        paymentMethod();
                        subscriptionDetails();
                    }}
                    variant="outlined">
                    {isBusy && <CircularProgress sx={{
                        width: "18px !important",
                        height: "18px !important",
                        mr: 2
                    }} />}
                    {t('Layouts.Welcome.WelcomeSteps.Buttons.Finish')}
                </Button>
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
                    variant="filled">
                    {t(`Generic.Forms.UnexpectedError`)}
                </Alert>
            </Snackbar>
        </Grid>
    );
}
