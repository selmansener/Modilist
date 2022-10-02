import { Alert, Button, CircularProgress, Grid, Snackbar, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AccountDTO, AccountState, FitPreferencesDTO, Gender } from "../../services/swagger/api";
import { RootState, Dispatch } from "../../store/store";
import SkipFormPaper from "./components/SkipFormPaper";
import { FootTypes } from "./fitPreferenceComponents/FootType";
import { LegFits } from "./fitPreferenceComponents/LegFit";
import { LowerFits } from "./fitPreferenceComponents/LowerFit";
import { ShortsLengths } from "./fitPreferenceComponents/ShortsLength";
import { SkirtDressLengths } from "./fitPreferenceComponents/SkirtDressLength";
import { UpperFits } from "./fitPreferenceComponents/UpperFit";
import { WaistHeights } from "./fitPreferenceComponents/WaistHeight";

export interface FitPreferencesProps {
    layout?: string;
}

export function FitPreferences(props: FitPreferencesProps) {
    const { layout } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy: getAccountIsBusy, data: account, status } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: getFitPreferencesIsBusy, data: initialFitPreferences, status: getFitPreferencesStatus } = useSelector((state: RootState) => state.getFitPreferencesModel);
    const { isBusy: upsertFitPreferencesIsBusy, data: upsertFitPreferences, status: upsertStatus } = useSelector((state: RootState) => state.upsertFitPreferencesModel);
    const isBusy = getAccountIsBusy || getFitPreferencesIsBusy || upsertFitPreferencesIsBusy;
    const [fitPreferences, setFitPreferences] = useState<FitPreferencesDTO>({
        footType: "",
        legFit: "",
        lowerFit: "",
        shortsLength: "",
        skirtDressLength: "",
        upperFit: "",
        waistHeight: ""
    });
    const [snackbarStatus, setSnackbarStatus] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [])

    useEffect(() => {
        if (upsertStatus === 200) {
            if (upsertFitPreferences) {
                dispatch.getFitPreferencesModel.HANDLE_RESPONSE(upsertFitPreferences, upsertStatus);
            }

            if (layout !== "dashboard") {
                dispatch.welcomePageStepper.next();
            }
        }
        else if (upsertStatus !== 200 && upsertStatus !== 0) {
            setSnackbarStatus(true);
        }

        if (upsertStatus !== 0) {
            dispatch.upsertFitPreferencesModel.RESET();
        }
    }, [upsertStatus]);



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

    const Waist = () => {
        return <WaistHeights
            gender={account?.gender ?? Gender.None}
            value={fitPreferences.waistHeight}
            onChange={(value) => {
                setFitPreferences({
                    ...fitPreferences,
                    waistHeight: value
                });
            }}
        />
    }

    const Upper = () => {
        return <UpperFits
            gender={account?.gender ?? Gender.None}
            value={fitPreferences.upperFit}
            onChange={(value) => {
                setFitPreferences({
                    ...fitPreferences,
                    upperFit: value
                });
            }}
        />
    }

    const Lower = () => {
        return <LowerFits
            gender={account?.gender ?? Gender.None}
            value={fitPreferences.lowerFit}
            onChange={(value) => {
                setFitPreferences({
                    ...fitPreferences,
                    lowerFit: value
                });
            }}
        />
    }

    const Shorts = () => {
        return <ShortsLengths
            gender={account?.gender ?? Gender.None}
            value={fitPreferences.shortsLength}
            onChange={(value) => {
                setFitPreferences({
                    ...fitPreferences,
                    shortsLength: value
                });
            }}
        />
    }

    const Legs = () => {
        return <LegFits
            gender={account?.gender ?? Gender.None}
            value={fitPreferences.legFit}
            onChange={(value) => {
                setFitPreferences({
                    ...fitPreferences,
                    legFit: value
                });
            }}
        />
    }

    const Foot = () => {
        return <FootTypes
            gender={account?.gender ?? Gender.None}
            value={fitPreferences.footType}
            onChange={(value) => {
                setFitPreferences({
                    ...fitPreferences,
                    footType: value
                });
            }}
        />
    }

    const Skirt = () => {
        return <SkirtDressLengths
            value={fitPreferences.skirtDressLength}
            onChange={(value) => {
                setFitPreferences({
                    ...fitPreferences,
                    skirtDressLength: value
                });
            }}
        />
    }

    return <Grid item container xs={12} spacing={{ xs: 4, md: 12 }}>
        {(layout !== "dashboard") && <SkipFormPaper />}
        <Grid item xs={12}>
            <Typography variant="h5" color="secondary" sx={{ fontWeight: 800 }} align="center">
                {t('Pages.Welcome.FitPreferences.Warning')}
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Waist />
        </Grid>
        <Grid item xs={12}>
            <Lower />
        </Grid>
        <Grid item xs={12}>
            <Legs />
        </Grid>
        {account?.gender === Gender.Female && <Grid item xs={12}>
            <Skirt />
        </Grid>}
        {account?.gender === Gender.Female && <Grid item xs={12}>
            <Shorts />
        </Grid>}
        <Grid item xs={12}>
            <Upper />
        </Grid>
        {/* TODO: Enable foot type later */}
        {/* <Grid item xs={12}>
            <Foot />
        </Grid> */}
        {layout && layout === "dashboard" ?
            <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button
                    disabled={isBusy}
                    onClick={() => {
                        if (!upsertFitPreferencesIsBusy) {
                            dispatch.upsertFitPreferencesModel.upsertFitPreferences(fitPreferences);
                        }
                    }}
                    variant="contained"
                    color="secondary">
                    {isBusy && <CircularProgress sx={{
                        width: "18px !important",
                        height: "18px !important",
                        mr: 2
                    }} />}
                    {t('Generic.Forms.Submit')}
                </Button>
            </Grid> : <React.Fragment>
                <Grid item container xs={6} justifyContent="flex-start">
                    <Button
                        disabled={isBusy}
                        variant="outlined"
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
                            if (!upsertFitPreferencesIsBusy) {
                                dispatch.upsertFitPreferencesModel.upsertFitPreferences(fitPreferences);
                            }
                        }}
                        color="secondary"
                        variant="contained">
                        {isBusy && <CircularProgress sx={{
                            width: "18px !important",
                            height: "18px !important",
                            mr: 2
                        }} />}
                        {t('Layouts.Welcome.WelcomeSteps.Buttons.Next')}
                    </Button>
                </Grid>
            </React.Fragment>
        }
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
}