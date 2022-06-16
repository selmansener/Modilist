import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FitPreferencesDTO, Gender } from "../../services/swagger/api";
import { RootState, Dispatch } from "../../store/store";
import { FootTypes } from "./fitPreferenceComponents/FootType";
import { LegFits } from "./fitPreferenceComponents/LegFit";
import { LowerFits } from "./fitPreferenceComponents/LowerFit";
import { ShortsLengths } from "./fitPreferenceComponents/ShortsLength";
import { SkirtDressLengths } from "./fitPreferenceComponents/SkirtDressLength";
import { UpperFit } from "./fitPreferenceComponents/UpperFit";
import { WaistHeights } from "./fitPreferenceComponents/WaistHeight";

export function FitPreferences() {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy: getAccountIsBusy, data: account, status } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: getFitPreferencesIsBusy, data: initialFitPreferences, status: getFitPreferencesStatus } = useSelector((state: RootState) => state.getFitPreferencesModel);
    const { isBusy: upsertFitPreferencesIsBusy, data: upsertFitPreferences, status: upsertStatus } = useSelector((state: RootState) => state.upsertFitPreferencesModel);
    const { activeStep, skipped } = useSelector((state: RootState) => state.welcomeStepsModel);
    const [fitPreferences, setFitPreferences] = useState<FitPreferencesDTO>({
        footType: "",
        legFit: "",
        lowerFit: "",
        shortsLength: "",
        skirtDressLength: "",
        upperFit: "",
        waistHeight: ""
    });

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    useEffect(() => {
        if (upsertStatus === 200) {
            if (upsertFitPreferences) {
                dispatch.getFitPreferencesModel.HANDLE_RESPONSE(upsertFitPreferences, upsertStatus);
            }

            dispatch.upsertFitPreferencesModel.RESET();

            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            dispatch.welcomeStepsModel.setActiveStep(activeStep + 1);
            dispatch.welcomeStepsModel.setSkipped(newSkipped);
        }
    }, [upsertStatus]);

    useEffect(() => {
        dispatch.welcomeStepsModel.setNextCallback(() => {
            if (!upsertFitPreferencesIsBusy) {
                dispatch.upsertFitPreferencesModel.upsertFitPreferences(fitPreferences);
            }
        });

        dispatch.welcomeStepsModel.setBackCallback(() => {
            let newSkipped = skipped;
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);

            const newStep = activeStep - 1;

            dispatch.welcomeStepsModel.setActiveStep(newStep);
            dispatch.welcomeStepsModel.setSkipped(newSkipped);
        });
    }, [fitPreferences]);

    useEffect(() => {
        if (initialFitPreferences && getFitPreferencesStatus === 200) {
            setFitPreferences(initialFitPreferences);
        }
    }, [getFitPreferencesStatus]);

    useEffect(() => {
        if (!getFitPreferencesIsBusy && initialFitPreferences === undefined) {
            dispatch.getFitPreferencesModel.getFitPreferences();
        }

        if (!getAccountIsBusy && account === undefined) {
            dispatch.getAccountModel.getAccount();
        }
    }, []);

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <WaistHeights
                value={fitPreferences.waistHeight}
                onChange={(value) => {
                    setFitPreferences({
                        ...fitPreferences,
                        waistHeight: value
                    });
                }}
            />
        </Grid>
        <Grid item xs={12}>
            <UpperFit />
        </Grid>
        <Grid item xs={12}>
            <LowerFits
                value={fitPreferences.lowerFit}
                onChange={(value) => {
                    setFitPreferences({
                        ...fitPreferences,
                        lowerFit: value
                    });
                }}
            />
        </Grid>
        <Grid item xs={12}>
            <ShortsLengths
                gender={account?.gender ?? Gender.None}
                value={fitPreferences.shortsLength}
                onChange={(value) => {
                    setFitPreferences({
                        ...fitPreferences,
                        shortsLength: value
                    });
                }}
            />
        </Grid>
        <Grid item xs={12}>
            <LegFits
                value={fitPreferences.legFit}
                onChange={(value) => {
                    setFitPreferences({
                        ...fitPreferences,
                        legFit: value
                    });
                }}
            />
        </Grid>
        <Grid item xs={12}>
            <FootTypes
                value={fitPreferences.footType}
                onChange={(value) => {
                    setFitPreferences({
                        ...fitPreferences,
                        footType: value
                    });
                }}
            />
        </Grid>
        {account?.gender === Gender.Female && <Grid item xs={12}>
            <SkirtDressLengths
                value={fitPreferences.skirtDressLength}
                onChange={(value) => {
                    setFitPreferences({
                        ...fitPreferences,
                        skirtDressLength: value
                    });
                }}
            />
        </Grid>}
    </Grid>
}