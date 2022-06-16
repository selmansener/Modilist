import { FormControl, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Colors } from "./stylePreferenceComponents/Colors";
import { ColorTypes } from "./stylePreferenceComponents/ColorTypes";
import { Fabrics } from "./stylePreferenceComponents/Fabrics";
import { Patterns } from "./stylePreferenceComponents/Patterns";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Dispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Gender, PreferedFabricPropertiesDTO } from "../../services/swagger/api";


export function FabricProperties() {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy: getAccountIsBusy, data: account, status } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: getPreferedFabricPropertiesIsBusy, data: initialPreferedFabricProperties, status: getPreferedFabricPropertiesStatus } = useSelector((state: RootState) => state.getPreferedFabricPropertiesModel);
    const { isBusy: upsertPreferedFabricPropertiesIsBusy, data: upsertPreferedFabricProperties, status: upsertStatus } = useSelector((state: RootState) => state.upsertPreferedFabricPropertiesModel);
    const { activeStep, skipped } = useSelector((state: RootState) => state.welcomeStepsModel);
    const [fabricProps, setFabricProps] = useState<PreferedFabricPropertiesDTO>({
        excludedColors: "",
        excludedColorCategories: "",
        excludedPatterns: "",
        excludedFabrics: "",
        allergens: "",
        additionalNotes: ""
    });

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    useEffect(() => {
        if (upsertStatus === 200) {
            if (upsertPreferedFabricProperties) {
                dispatch.getPreferedFabricPropertiesModel.HANDLE_RESPONSE(upsertPreferedFabricProperties, upsertStatus);
            }

            dispatch.upsertPreferedFabricPropertiesModel.RESET();

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
            if (!upsertPreferedFabricPropertiesIsBusy) {
                dispatch.upsertPreferedFabricPropertiesModel.upsertPreferedFabricProperties(fabricProps);
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
    }, [fabricProps]);

    useEffect(() => {
        if (initialPreferedFabricProperties && getPreferedFabricPropertiesStatus === 200) {
            setFabricProps(initialPreferedFabricProperties);
        }
    }, [getPreferedFabricPropertiesStatus]);

    useEffect(() => {
        if (!getPreferedFabricPropertiesIsBusy && initialPreferedFabricProperties === undefined) {
            dispatch.getPreferedFabricPropertiesModel.getPreferedFabricProperties();
        }

        if (!getAccountIsBusy && account === undefined) {
            dispatch.getAccountModel.getAccount();
        }
    }, []);

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <Colors
                value={fabricProps?.excludedColors}
                onChange={(value) => {
                    setFabricProps({
                        ...fabricProps,
                        excludedColors: value
                    });
                }}
            />
        </Grid>
        <Grid item xs={12}>
            <ColorTypes
                value={fabricProps?.excludedColorCategories}
                onChange={(value) => {
                    setFabricProps({
                        ...fabricProps,
                        excludedColorCategories: value
                    });
                }}
            />
        </Grid>
        <Grid item xs={12}>
            <Patterns
                value={fabricProps?.excludedPatterns}
                gender={account?.gender ?? Gender.None}
                onChange={(value) => {
                    setFabricProps({
                        ...fabricProps,
                        excludedPatterns: value
                    });
                }}
            />
        </Grid>
        <Grid item xs={12}>
            <Fabrics
                value={fabricProps?.excludedFabrics}
                gender={account?.gender ?? Gender.None}
                onChange={(value) => {
                    setFabricProps({
                        ...fabricProps,
                        excludedFabrics: value
                    });
                }}
            />
        </Grid>
        <Grid item xs={12}>
            <Trans>
                <Typography display="inline" color={"error"} variant={"h5"}>
                    <ErrorOutlineOutlinedIcon sx={{
                        verticalAlign: 'text-top',
                        display: 'inline-flex'
                    }} />
                    {t("Pages.Welcome.FabricProperties.Allergens.1")}
                </Typography>
                <Typography display="inline" variant={"h5"}>
                    {t("Pages.Welcome.FabricProperties.Allergens.2")}
                </Typography>
            </Trans>
        </Grid>
        <Grid item xs={12}>
            <FormControl fullWidth>
                <TextField
                    value={fabricProps.allergens}
                    onChange={(e) => {
                        setFabricProps({
                            ...fabricProps,
                            allergens: e.target.value
                        });
                    }}
                    variant="outlined"
                    multiline
                    rows={5}
                    maxRows={8} />
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <Typography display="inline" variant={"h5"}>
                {t("Pages.Welcome.FabricProperties.AdditionalNotes")}
            </Typography>
        </Grid>
        <Grid item xs={12}>

            <FormControl fullWidth>
                <TextField
                    value={fabricProps.additionalNotes}
                    onChange={(e) => {
                        setFabricProps({
                            ...fabricProps,
                            additionalNotes: e.target.value
                        });
                    }}
                    variant="outlined"
                    multiline
                    rows={5}
                    maxRows={8} />
            </FormControl>
        </Grid>
    </Grid>
}