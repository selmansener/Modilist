import { FormControl, FormControlLabel, FormLabel, Grid, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import { Dispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { SubscriptionState } from "../../../services/swagger/api";

export function SubscriptionDetails() {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy: getSubscriptionIsBusy, data: getSubscription, status: getSubscriptionStatus } = useSelector((state: RootState) => state.getSubscriptionModel);
    const { isBusy: createSubscriptionIsBusy, data: createSubscription, status: createSubscriptionStatus } = useSelector((state: RootState) => state.createSubscriptionModel);
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

        dispatch.stepperSubscription.setSubscriptionDetails(() => {
            dispatch.updateSubscriptionMaxPricingLimitModel.updateSubscriptionMaxPricingLimit({
                maxPricingLimit: maxLimit
            })
        });
    }, [maxLimit]);

    return <Grid item container spacing={4}>
        <Grid item xs={9}>
            <FormControl fullWidth>
                <FormControlLabel
                    labelPlacement="bottom"
                    label={
                        <Typography variant="h4" sx={{
                            mt: 2
                        }}>
                            {t("Pages.Welcome.Subscription.SubscriptionDetails.PriceTitle")}
                        </Typography>
                    }
                    control={
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
                    } />
            </FormControl>
        </Grid>
        <Grid item xs={3} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }} >
            <Typography variant="h2" color="secondary">{
                parseInt(maxLimit) <= 5000 ?
                    maxLimit :
                    "+5000"}
                <CurrencyLiraIcon fontSize="large" /></Typography>
            {maxLimit === "+5000" && <Typography variant="h5" color="secondary">{t("Pages.Welcome.Subscription.SubscriptionDetails.Description")}</Typography>}
        </Grid>
    </Grid>
}