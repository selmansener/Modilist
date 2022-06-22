import { Button, CircularProgress, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../store/store';
import ContactInfo from './subscriptionComponents/ContactInfo';
import PaymentMethod from './subscriptionComponents/PaymentMethod';
import Personal from './subscriptionComponents/Personal';
import { SubscriptionDetails } from './subscriptionComponents/SubscriptionDetails';

export default function Subscription() {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy: getAccountIsBusy } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: updateAccountIsBusy, status: updateAccountStatus } = useSelector((state: RootState) => state.updateAccountModel);
    const { isBusy: getDefaultAddressIsBusy } = useSelector((state: RootState) => state.getDefaultAddressModel);
    const { isBusy: upsertAddressIsBusy, status: upsertAddressStatus } = useSelector((state: RootState) => state.upsertAddressModel);
    const { isBusy: createPaymentMethodIsBusy, status: createPaymentMethodStatus } = useSelector((state: RootState) => state.createPaymentMethodModel);
    const { isBusy: updateSubscriptionMaxPricingLimitIsBusy, status: updateSubscriptionMaxPricingLimitStatus } = useSelector((state: RootState) => state.updateSubscriptionMaxPricingLimitModel);
    const { personal, contactInfo, paymentMethod, subscriptionDetails } = useSelector((state: RootState) => state.stepperSubscription);
    const isBusy = getAccountIsBusy || updateAccountIsBusy || getDefaultAddressIsBusy || upsertAddressIsBusy || createPaymentMethodIsBusy || updateSubscriptionMaxPricingLimitIsBusy;

    useEffect(() => {
        if (updateAccountStatus === 200 && upsertAddressStatus === 200 && createPaymentMethodStatus === 200 && updateSubscriptionMaxPricingLimitStatus === 200) {
            dispatch.welcomePageStepper.next();
        }
    }, [updateAccountStatus, upsertAddressStatus, createPaymentMethodStatus, updateSubscriptionMaxPricingLimitStatus])

    return (
        <Grid item container spacing={12}>
            <Personal />
            <ContactInfo />
            <SubscriptionDetails />
            <PaymentMethod />
            <Grid item container xs={6} justifyContent="flex-start">
                <Button
                    disabled={isBusy}
                    onClick={() => {
                        dispatch.welcomePageStepper.back();
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
        </Grid>
    );
}
