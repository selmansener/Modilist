import { useMsal } from "@azure/msal-react";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { AccountState, SubscriptionState, SubscriptionSuspentionReason } from "../../../services/swagger/api";
import { Dispatch, RootState } from "../../../store/store";

export default function Subscription() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { instance, accounts } = useMsal();
    const { isBusy: getSubscriptionIsBusy, data: subscription, status: getSubscriptionStatus } = useSelector((state: RootState) => state.getSubscriptionModel);
    const { isBusy: suspendSubscriptionIsBusy, status: suspendSubscriptionStatus } = useSelector((state: RootState) => state.suspendSubscriptionModel);
    const { isBusy: activateSubscriptionIsBusy, status: activateSubscriptionStatus } = useSelector((state: RootState) => state.activateSubscriptionModel);
    const isBusy = getSubscriptionIsBusy || suspendSubscriptionIsBusy;
    const dispatch = useDispatch<Dispatch>();
    const [suspentionReasons, setSuspentionReasons] = useState<SubscriptionSuspentionReason[]>([]);

    useEffect(() => {
        if (!getSubscriptionIsBusy && getSubscriptionStatus === 0) {
            dispatch.getSubscriptionModel.getSubscription();
        }
    }, []);

    useEffect(() => {
        if (!suspendSubscriptionIsBusy && suspendSubscriptionStatus === 200) {
            dispatch.suspendSubscriptionModel.RESET();
            dispatch.getSubscriptionModel.getSubscription();
            setSuspentionReasons([]);
        }
    }, [suspendSubscriptionStatus]);

    useEffect(() => {
        if (!activateSubscriptionIsBusy && activateSubscriptionStatus === 200) {
            dispatch.activateSubscriptionModel.RESET();
            dispatch.getSubscriptionModel.getSubscription();
        }
    })

    const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const value = e.target.value;

        if (checked) {
            const current = [...suspentionReasons];
            current.push(value as SubscriptionSuspentionReason);
            setSuspentionReasons(current);
        }
        else {
            const newSuspentionReasons = suspentionReasons.filter(x => x !== value);
            setSuspentionReasons(newSuspentionReasons);
        }
    }

    const handleFreezeSubs = () => {
        if (!suspendSubscriptionIsBusy && suspendSubscriptionStatus === 0) {
            dispatch.suspendSubscriptionModel.suspendSubscription({
                suspentionReasons: suspentionReasons
            });
        }
    }

    const handleActivateSubs = () => {
        if (!activateSubscriptionIsBusy && activateSubscriptionStatus === 0) {
            dispatch.activateSubscriptionModel.activateSubscription();
        }
    }

    const reasons = [
        "Pricing",
        "TrustIssues",
        "TooMuchNotifications",
        "UXIssues",
        "StyleIssues",
        "LogisticIssues",
        "Other"
    ];

    return (
        <Grid item container xs={12} spacing={2}>
            <Helmet>
                <title>{t("Pages.Titles.Subscription")} | Modilist</title>
            </Helmet>
            <Grid item xs={12}>
                <Typography variant="h4">
                    {t("Pages.Titles.Subscription")}
                </Typography>
            </Grid>
            {subscription?.state === SubscriptionState.Active &&
                <React.Fragment>
                    <Grid item xs={12}>
                        <Typography>
                            {t("Pages.AccountSettings.SubscriptionInfo")}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            {t("Pages.AccountSettings.FeedbackInfo")}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            {t("Pages.AccountSettings.FeedbackTitle")}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <FormGroup>
                                {reasons.map(reason => (
                                    <FormControlLabel key={reason} control={
                                        <Checkbox
                                            disabled={isBusy}
                                            value={reason}
                                            checked={suspentionReasons.some(r => r === reason)}
                                            onChange={handleReasonChange}
                                        />} label={
                                            <Typography variant="subtitle1">
                                                {t(`Pages.AccountSettings.SubsFreezeReasons.${reason}`)}
                                            </Typography>
                                        } />
                                ))}
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="error"
                            onClick={handleFreezeSubs}>
                            {t("Pages.AccountSettings.FreezeSubs")}
                        </Button>
                    </Grid>
                </React.Fragment>
            }
            {subscription?.state === SubscriptionState.Suspended && <React.Fragment>
                <Grid item xs={12}>
                    <Typography>
                        {t("Pages.AccountSettings.EncourageToActivate.1")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        {t("Pages.AccountSettings.EncourageToActivate.2")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        {t("Pages.AccountSettings.ActivationInfo")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="success"
                        onClick={handleActivateSubs}>
                        {t("Pages.AccountSettings.ActivateSubs")}
                    </Button>
                </Grid>
            </React.Fragment>}
        </Grid>

    )
}
