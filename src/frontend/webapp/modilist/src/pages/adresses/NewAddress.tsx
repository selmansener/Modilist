import { Button, Checkbox, FormControl, FormControlLabel, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { Cities } from "../welcome/address/Cities";
import { Districts } from "../welcome/address/Districts";
import * as Yup from "yup";
import React from "react";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";

interface PhoneInputMaskProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
    value?: string;
}

const PhoneInputMask = React.forwardRef<HTMLElement, PhoneInputMaskProps>(
    function PhoneInputMask(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="000 000 0000"
                definitions={{
                    '#': /[1-9]/,
                }}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

export function NewAddress() {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy, status } = useSelector((state: RootState) => state.upsertAddressModel);
    const [selectedCity, setSelectedCity] = useState<string | undefined>();
    const navigate = useNavigate();

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
        isValid,
        values: address,
        submitForm,
        errors } = useFormik({
            enableReinitialize: true,
            initialValues: {
                city: "",
                district: "",
                firstName: "",
                fullAddress: "",
                isDefault: false,
                lastName: "",
                name: "",
                phone: "",
                zipCode: ""
            },
            validationSchema: schema,
            onSubmit: (values) => {
                if (!isBusy && values && values?.name) {
                    dispatch.upsertAddressModel.upsertAddress({
                        name: values.name,
                        body: values
                    });
                }
            },
        });

    useEffect(() => {
        if (!isBusy && status === 200) {
            dispatch.upsertAddressModel.RESET();
            navigate("/addresses");
        }
    }, [status]);

    return (
        <Grid item container xs={12} spacing={2}>
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
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.phone && errors.phone !== undefined}
                        value={address?.phone}
                        helperText={touched.phone && errors?.phone}
                        InputProps={{
                            inputComponent: PhoneInputMask as any,
                        }}
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
                        label={t("Pages.NewAddress.AddressName")}
                        variant="outlined"
                        value={address?.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && errors.name !== undefined}
                        helperText={touched.name && errors?.name}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-between">
                <FormControl >
                    <FormControlLabel control={<Checkbox checked={address.isDefault} onChange={(e, checked) => {
                        setFieldValue("isDefault", checked);
                    }} />} label={
                        t("Pages.NewAddress.SetAsDefault")
                    } />
                </FormControl>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        submitForm();
                    }}
                >
                    {t("Generic.Forms.Submit")}
                </Button>
            </Grid>
        </Grid>
    )
}