import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { AddressDTO, City } from "../../services/swagger/api";
import { Cities } from "./address/Cities";
import { Districts } from "./address/Districts";
import { FormControl, Grid, InputLabel, TextField, Typography, FormHelperText } from "@mui/material";

export default function ContactInfo() {
    const { t } = useTranslation();
    const { data: cities } = useSelector((state: RootState) => state.citiesModel);
    const { data: districts } = useSelector((state: RootState) => state.districtsModel);
    const { isBusy: getDefaultAddressIsBusy, data: getDefaultAddressResponse } = useSelector((state: RootState) => state.getDefaultAddressModel);
    const { isBusy: upsertAddressIsBusy, data: upsertAddressResponse } = useSelector((state: RootState) => state.upsertAddressModel);
    const { activeStep, skipped } = useSelector((state: RootState) => state.welcomeStepsModel);
    const dispatch = useDispatch<Dispatch>();
    const [selectedCity, setSelectedCity] = useState<City | undefined>({});

    const requiredField = t("FormValidation.RequiredField");

    const schema = Yup.object({
        name: Yup.string().required(requiredField),
        firstName: Yup.string().required(requiredField),
        lastName: Yup.string().required(requiredField),
        phone: Yup.string().required(requiredField),
        city: Yup.string().required(requiredField),
        district: Yup.string().required(requiredField),
        fullAddress: Yup.string().required(requiredField)
    });

    const {
        setFormikState,
        setFieldValue,
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        values,
        errors } = useFormik({
            initialValues: getDefaultAddressResponse ?? {
                firstName: "",
                lastName: "",
                name: "",
                phone: "",
                city: "",
                district: "",
                fullAddress: ""
            },
            validationSchema: schema,
            onSubmit: (values) => {
                if (getDefaultAddressResponse && getDefaultAddressResponse?.name) {
                    dispatch.upsertAddressModel.upsertAddress({
                        name: getDefaultAddressResponse.name,
                        body: getDefaultAddressResponse
                    });
                }
            },
        });


    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    useEffect(() => {
        dispatch.welcomeStepsModel.setNextCallback(() => {
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            dispatch.welcomeStepsModel.setActiveStep(activeStep + 1);
            dispatch.welcomeStepsModel.setSkipped(newSkipped);
        });

        dispatch.welcomeStepsModel.setBackCallback(() => {
            let newSkipped = skipped;
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);

            const newStep = activeStep - 1;
            dispatch.welcomeStepsModel.setActiveStep(newStep);
            dispatch.welcomeStepsModel.setSkipped(newSkipped);
        });
    }, []);

    useEffect(() => {
        if (getDefaultAddressResponse) {
            setFormikState(state => {
                for (const key in state.values) {
                    if ((getDefaultAddressResponse as AddressDTO)[key as keyof typeof getDefaultAddressResponse]) {
                        setFieldValue(key, (getDefaultAddressResponse as AddressDTO)[key as keyof typeof getDefaultAddressResponse]);
                    }
                }

                return state;
            });
        }
    }, [getDefaultAddressResponse]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' align='left' sx={{ m: 1 }}>
                        Teslimat Adresi
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField
                            name={"firstName"}
                            label={t("Generic.FirstName")}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.firstName && errors.firstName !== undefined}
                            value={getDefaultAddressResponse?.firstName}
                            helperText={touched.firstName && errors?.firstName}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField
                            name={"lastName"}
                            label={t("Generic.LastName")}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.lastName && errors.lastName !== undefined}
                            value={getDefaultAddressResponse?.lastName}
                            helperText={touched.lastName && errors?.lastName}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField
                            name={"phone"}
                            label={t("Generic.Phone")}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.phone && errors.phone !== undefined}
                            value={getDefaultAddressResponse?.phone}
                            helperText={touched.phone && errors?.phone}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl
                        sx={{ m: 1, width: 300 }}
                        error={touched.city && errors.city !== undefined}>
                        <InputLabel id="city-label">{t("Generic.City")}</InputLabel>
                        <Cities
                            value={getDefaultAddressResponse?.city}
                            onChange={(e) => {
                                const selectedCity = cities?.filter(x => x.code == e.target.value)[0];
                                setSelectedCity(selectedCity);

                                handleChange(e);
                            }}
                            onBlur={handleBlur}
                        />
                        <FormHelperText>{touched.city && errors?.city}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl
                        sx={{ m: 1, width: 300 }}
                        error={touched.district && errors.district !== undefined}>
                        <InputLabel id="district-label">{t("Generic.District")}</InputLabel>
                        <Districts
                            selectedCity={selectedCity?.code}
                            value={getDefaultAddressResponse?.district}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <FormHelperText>{touched.district && errors?.district}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Posta Kodu" type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>


                <Grid item xs={8}>
                    <FormControl sx={{ m: 1, width: 680 }}>
                        <TextField
                            name={"fullAddress"}
                            label={t("Generic.Address")}
                            variant="outlined"
                            multiline
                            rows={4}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={getDefaultAddressResponse?.fullAddress}
                            error={touched.fullAddress && errors.fullAddress !== undefined}
                            helperText={touched.fullAddress && errors.fullAddress}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField
                            name={"name"}
                            label={t("WelcomeSteps.ContactInfo.AddressName")}
                            variant="outlined"
                            value={getDefaultAddressResponse?.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && errors.name !== undefined}
                            helperText={touched.name && errors?.name}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </>
    )
}