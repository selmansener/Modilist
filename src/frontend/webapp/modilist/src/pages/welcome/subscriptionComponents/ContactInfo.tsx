import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Cities } from "../address/Cities";
import { Districts } from "../address/Districts";
import { FormControl, Grid, TextField, Typography } from "@mui/material";

export default function ContactInfo() {
    const { t } = useTranslation();
    const { isBusy: getDefaultAddressIsBusy, data: getDefaultAddressResponse } = useSelector((state: RootState) => state.getDefaultAddressModel);
    const dispatch = useDispatch<Dispatch>();
    const [selectedCity, setSelectedCity] = useState<string | undefined>();

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
        setFieldValue,
        setFieldTouched,
        handleChange,
        handleBlur,
        touched,
        values: address,
        submitForm,
        errors } = useFormik({
            enableReinitialize: true,
            initialValues: getDefaultAddressResponse ?? {},
            validationSchema: schema,
            onSubmit: (values) => {
                if (values && values?.name) {
                    dispatch.upsertAddressModel.upsertAddress({
                        name: values.name,
                        body: values
                    });
                }
            },
        });

    useEffect(() => {
        if (!getDefaultAddressIsBusy) {
            dispatch.getDefaultAddressModel.getDefaultAddress();
        }

        dispatch.stepperSubscription.setContactInfo(() => {
            submitForm();
        })
    }, []);

    return (
        <>
            <Grid item container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant='h3' align='left' sx={{ m: 1 }}>
                        {t("Pages.Welcome.ContactInfo.Title")}
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <TextField
                            name={"firstName"}
                            label={t("Generic.Address.FirstName")}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.firstName && errors.firstName !== undefined}
                            value={address?.firstName}
                            helperText={touched.firstName && errors?.firstName}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <TextField
                            name={"lastName"}
                            label={t("Generic.Address.LastName")}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.lastName && errors.lastName !== undefined}
                            value={address?.lastName}
                            helperText={touched.lastName && errors?.lastName}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <TextField
                            name={"phone"}
                            label={t("Generic.Address.Phone")}
                            type="number"
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.phone && errors.phone !== undefined}
                            value={address?.phone}
                            helperText={touched.phone && errors?.phone}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <Cities
                            value={address?.city}
                            error={touched.city && errors.city !== undefined}
                            helperText={touched.city && errors?.city}
                            onChange={(city) => {
                                setSelectedCity(city.code);

                                setFieldValue("city", city.name);
                            }}
                            onBlur={(city) => {
                                setSelectedCity(city.code);

                                setFieldValue("city", city.name);

                                setFieldTouched("city");
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <Districts
                            selectedCity={selectedCity}
                            error={touched.district && errors.district !== undefined}
                            helperText={touched.district && errors?.district}
                            value={address?.district}
                            onChange={(district) => {
                                setFieldValue("district", district.name);
                            }}
                            onBlur={(district) => {
                                setFieldValue("district", district.name);

                                setFieldTouched("district");
                            }}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <TextField label={t("Generic.Address.ZipCode")} type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>


                <Grid item xs={8}>
                    <FormControl fullWidth>
                        <TextField
                            name={"fullAddress"}
                            label={t("Generic.Address.Address")}
                            variant="outlined"
                            multiline
                            rows={4}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={address?.fullAddress}
                            error={touched.fullAddress && errors.fullAddress !== undefined}
                            helperText={touched.fullAddress && errors.fullAddress}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <TextField
                            name={"name"}
                            label={t("WelcomeSteps.ContactInfo.AddressName")}
                            variant="outlined"
                            value={address?.name}
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