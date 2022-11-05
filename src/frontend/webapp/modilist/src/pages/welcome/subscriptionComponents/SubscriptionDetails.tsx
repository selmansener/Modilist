import { Box, FormControl, FormControlLabel, FormLabel, Grid, Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import { Dispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { SubscriptionPlan, SubscriptionState } from "../../../services/swagger/api";
import { SubscriptionPlanFrame } from "./SubscriptionPlan";

export function SubscriptionDetails() {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy: getSubscriptionIsBusy, data: getSubscription, status: getSubscriptionStatus } = useSelector((state: RootState) => state.getSubscriptionModel);
    const { isBusy: createSubscriptionIsBusy, data: createSubscription, status: createSubscriptionStatus } = useSelector((state: RootState) => state.createSubscriptionModel);
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>();
    const [maxLimit, setMaxLimit] = useState<string>(getSubscription?.maxPricingLimit ?? "2500");

    useEffect(() => {
        if (createSubscription && createSubscriptionStatus === 200) {
            dispatch.getSubscriptionModel.HANDLE_RESPONSE(createSubscription, createSubscriptionStatus);
        }
    }, [createSubscriptionStatus]);

    useEffect(() => {
        if (!createSubscriptionIsBusy && getSubscriptionStatus === 404) {
            dispatch.createSubscriptionModel.createSubscription();
        }

        if (getSubscriptionStatus === 200 && getSubscription?.maxPricingLimit) {
            setMaxLimit(getSubscription?.maxPricingLimit ?? "2500");
        }
    }, [getSubscriptionStatus]);

    useEffect(() => {
        if (!getSubscriptionIsBusy && getSubscription?.state === SubscriptionState.None) {
            dispatch.getSubscriptionModel.getSubscription();
        }

        console.log("fff");
        dispatch.stepperSubscription.setSubscriptionDetails(() => {
            dispatch.updateSubscriptionModel.updateSubscription({
                maxPricingLimit: maxLimit,
                plan: selectedPlan
            })
        });
    }, [maxLimit, selectedPlan]);

    return <React.Fragment>
        <Grid item container spacing={2} mb={4} mx={4}>
            <Grid item xs={12} md={6} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }} >
                <Typography align="center" variant="h3" sx={{
                    mb: 2
                }}>
                    {t("Pages.Welcome.Subscription.SubscriptionDetails.PriceTitle")}
                </Typography>
                <Box>
                    <Typography align="center" variant="body1">
                        {t("Pages.Welcome.Subscription.SubscriptionDetails.Description1")}
                    </Typography>
                    <Typography align="center" variant="body1">
                        {t("Pages.Welcome.Subscription.SubscriptionDetails.Description2")}
                    </Typography>
                    <Typography align="center" variant="body1" sx={{
                        mb: 2
                    }}>
                        {t("Pages.Welcome.Subscription.SubscriptionDetails.Description3")}
                    </Typography>
                </Box>
                <Box>
                    <Typography align="center" variant="body1" fontWeight={600}>
                        {t("Pages.Welcome.Subscription.SubscriptionDetails.PaymentInformation1")}
                    </Typography>
                    <Typography align="center" variant="body1" fontWeight={600}>
                        {t("Pages.Welcome.Subscription.SubscriptionDetails.PaymentInformation2")}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={6} textAlign="center" sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <FormControl fullWidth>
                    <Slider
                        color="secondary"
                        aria-label="Temperature"
                        value={maxLimit === "+5000" ? 5250 : parseInt(maxLimit)}
                        getAriaValueText={(val, index) => val.toString()}
                        valueLabelFormat={(val, index) =>
                            val <= 5000 ?
                                <Typography display="inline">{val}<CurrencyLiraIcon fontSize="small" sx={{
                                    verticalAlign: 'text-bottom',
                                    display: 'inline-flex'
                                }} /></Typography> :
                                <Typography display="inline">+5000<CurrencyLiraIcon fontSize="small" sx={{
                                    verticalAlign: 'text-bottom',
                                    display: 'inline-flex'
                                }} /></Typography>
                        }
                        valueLabelDisplay="auto"
                        onChange={(e, val) => {
                            if (val > 5000) {
                                setMaxLimit("+5000");
                            }
                            else {
                                setMaxLimit(val.toString());
                            }
                        }}
                        step={250}
                        marks
                        min={1500}
                        max={5250}
                    />
                </FormControl>
                <Typography variant="h2" color="secondary" mt={2}>{
                    parseInt(maxLimit) <= 5000 ?
                        maxLimit :
                        "+5000"}
                    <CurrencyLiraIcon fontSize="large" />
                </Typography>
                {maxLimit === "+5000" && <Typography variant="h5" color="secondary">{t("Pages.Welcome.Subscription.SubscriptionDetails.AndAbove")}</Typography>}
            </Grid>
        </Grid>
        <SubscriptionPlanFrame currentPlan={getSubscription?.plan ?? SubscriptionPlan.InEveryMonth} onChange={(selectedPlan: SubscriptionPlan) => {
            console.log("selectedPlan", selectedPlan)
            setSelectedPlan(selectedPlan);
        }} />
    </React.Fragment>
}