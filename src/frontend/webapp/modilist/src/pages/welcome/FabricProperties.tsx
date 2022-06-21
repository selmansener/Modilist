import { Button, CircularProgress, FormControl, Grid, TextField, Typography } from "@mui/material";
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
    const isBusy = getAccountIsBusy || getPreferedFabricPropertiesIsBusy || upsertPreferedFabricPropertiesIsBusy;
    const [fabricProps, setFabricProps] = useState<PreferedFabricPropertiesDTO>({
        excludedColors: "",
        excludedColorCategories: "",
        excludedPatterns: "",
        excludedFabrics: "",
        allergens: "",
        additionalNotes: ""
    });

    useEffect(() => {
        if (upsertStatus === 200) {
            if (upsertPreferedFabricProperties) {
                dispatch.getPreferedFabricPropertiesModel.HANDLE_RESPONSE(upsertPreferedFabricProperties, upsertStatus);
            }

            dispatch.upsertPreferedFabricPropertiesModel.RESET();

            dispatch.welcomePageStepper.next();
        }
    }, [upsertStatus]);

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

    const Color = () => {
        return <Colors
            value={fabricProps?.excludedColors}
            onChange={(value) => {
                setFabricProps({
                    ...fabricProps,
                    excludedColors: value
                });
            }}
        />
    }

    const ColorType = () => {
        return <ColorTypes
            value={fabricProps?.excludedColorCategories}
            onChange={(value) => {
                setFabricProps({
                    ...fabricProps,
                    excludedColorCategories: value
                });
            }}
        />
    }

    const Pattern = () => {
        return <Patterns
            value={fabricProps?.excludedPatterns}
            gender={account?.gender ?? Gender.None}
            onChange={(value) => {
                setFabricProps({
                    ...fabricProps,
                    excludedPatterns: value
                });
            }}
        />
    }

    const Fabric = () => {
        return <Fabrics
            value={fabricProps?.excludedFabrics}
            gender={account?.gender ?? Gender.None}
            onChange={(value) => {
                setFabricProps({
                    ...fabricProps,
                    excludedFabrics: value
                });
            }}
        />
    }

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <Color />
        </Grid>
        <Grid item xs={12}>
            <ColorType />
        </Grid>
        <Grid item xs={12}>
            <Pattern />
        </Grid>
        <Grid item xs={12}>
            <Fabric />
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
                    if (!upsertPreferedFabricPropertiesIsBusy) {
                        dispatch.upsertPreferedFabricPropertiesModel.upsertPreferedFabricProperties(fabricProps);
                    }
                }}
                variant="outlined">
                {isBusy && <CircularProgress sx={{
                    width: "18px !important",
                    height: "18px !important",
                    mr: 2
                }} />}
                {t('Layouts.Welcome.WelcomeSteps.Buttons.Next')}
            </Button>
        </Grid>
    </Grid>
}