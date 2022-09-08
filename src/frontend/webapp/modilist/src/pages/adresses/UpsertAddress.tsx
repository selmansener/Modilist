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
import { useNavigate, useParams } from "react-router-dom";
import { AddressDTO } from "../../services/swagger/api";

interface NumberInputMaskProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
    value?: string;
}

const PhoneInputMask = React.forwardRef<HTMLElement, NumberInputMaskProps>(
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

const ZipCodeInputMask = React.forwardRef<HTMLElement, NumberInputMaskProps>(
    function ZipCodeInputMask(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="00000"
                definitions={{
                    '#': /[1-9]/,
                }}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

type FieldStates = {
    name: boolean;
    firstName: boolean;
    lastName: boolean;
    phone: boolean;
    city: boolean;
    district: boolean;
    fullAddress: boolean;
    zipCode: boolean;
}

export function UpsertAddress() {
    const { t } = useTranslation();
    const dispatch = useDispatch<Dispatch>();
    const { addressId } = useParams();
    const { isBusy: isBusyGetAddress, data: initialAddress, status: statusGetAddress } = useSelector((state: RootState) => state.getAddressModel);
    const { isBusy: isBusyUpsertAddress, status: statusUpsertAddress } = useSelector((state: RootState) => state.upsertAddressModel);
    const { data: cities } = useSelector((state: RootState) => state.citiesModel);
    const isBusy = isBusyGetAddress || isBusyUpsertAddress;
    const [selectedCity, setSelectedCity] = useState<string | undefined>();
    const navigate = useNavigate();
    const [fieldStates, setFieldStates] = useState<FieldStates>({
        name: false,
        firstName: false,
        lastName: false,
        phone: false,
        city: false,
        district: false,
        fullAddress: false,
        zipCode: false,
    });

    const requiredField = t("FormValidation.RequiredField");

    const schema = Yup.object({
        name: Yup.string().required(requiredField),
        firstName: Yup.string().required(requiredField),
        lastName: Yup.string().required(requiredField),
        phone: Yup.string().required(requiredField),
        city: Yup.string().required(requiredField),
        district: Yup.string().required(requiredField),
        fullAddress: Yup.string().required(requiredField),
        zipCode: Yup.string().optional()
    });

    useEffect(() => {
        if (addressId && !isBusyGetAddress) {
            dispatch.getAddressModel.getAddress(parseInt(addressId));
        }

        return () => {
            dispatch.getAddressModel.RESET();
        }
    }, []);

    useEffect(() => {
        if (!isBusyGetAddress && statusGetAddress === 200 && initialAddress) {
            setFieldStates({
                name: initialAddress.name !== undefined && initialAddress.name !== "",
                firstName: initialAddress.firstName !== undefined && initialAddress.firstName !== "",
                lastName: initialAddress.lastName !== undefined && initialAddress.lastName !== "",
                phone: initialAddress.phone !== undefined && initialAddress.phone !== "",
                city: initialAddress.city !== undefined && initialAddress.city !== "",
                district: initialAddress.district !== undefined && initialAddress.district !== "",
                fullAddress: initialAddress.fullAddress !== undefined && initialAddress.fullAddress !== "",
                zipCode: initialAddress.zipCode !== undefined && initialAddress.zipCode !== "",
            });
        }
    }, [statusGetAddress]);

    useEffect(() => {
        if (statusGetAddress === 200 && cities && initialAddress) {
            const city = cities.find(x => x.name === initialAddress.city);
            setSelectedCity(city?.code);
        }
    }, [cities, initialAddress, statusGetAddress]);

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
            initialValues: initialAddress ?? {
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
        if (!isBusy && statusUpsertAddress === 200) {
            dispatch.upsertAddressModel.RESET();
            navigate("/addresses");
        }
    }, [statusUpsertAddress]);

    useEffect(() => {
        setFieldStates({
            name: address.name !== undefined && address.name !== "",
            firstName: address.firstName !== undefined && address.firstName !== "",
            lastName: address.lastName !== undefined && address.lastName !== "",
            phone: address.phone !== undefined && address.phone !== "",
            city: address.city !== undefined && address.city !== "",
            district: address.district !== undefined && address.district !== "",
            fullAddress: address.fullAddress !== undefined && address.fullAddress !== "",
            zipCode: address.zipCode !== undefined && address.zipCode !== "",
        });
    }, [address]);

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
                        InputLabelProps={{
                            shrink: fieldStates.firstName
                        }}
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
                        InputLabelProps={{
                            shrink: fieldStates.lastName
                        }}
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
                        InputLabelProps={{
                            shrink: fieldStates.phone
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
                    <TextField
                        name="zipCode"
                        label={t("Generic.Address.ZipCode")}
                        value={address?.zipCode}
                        onChange={handleChange}
                        InputProps={{
                            inputComponent: ZipCodeInputMask as any,
                        }}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: fieldStates.zipCode
                        }} />
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
                        InputLabelProps={{
                            shrink: fieldStates.fullAddress
                        }}
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
                        InputLabelProps={{
                            shrink: fieldStates.name
                        }}
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
                    disabled={isBusy}
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