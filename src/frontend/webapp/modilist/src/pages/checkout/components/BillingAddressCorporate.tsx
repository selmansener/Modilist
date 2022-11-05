import React, { useEffect, useState } from "react";
import { Grid, Typography, FormControl, TextField, InputLabel, Select, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { Cities } from "../../welcome/address/Cities";
import { Districts } from "../../welcome/address/Districts";
import { config } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store/store";
import { IMaskInput } from "react-imask";
import { validateTaxNumber } from "../../../utils/validators";

export interface BillingAddressCorporateProps {
    onComplete: (isValid: boolean, formData: CorporateBillingAddress) => void

}

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
                mask="500 000 0000"
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

export interface CorporateBillingAddress {
    addressName?: string;
    phone?: string;
    zipCode?: string;
    city?: string;
    district?: string;
    fullAddress?: string;
    companyName?: string;
    email?: string;
    taxNumber?: string;
}

export default function BillingAddressCorporate(props: BillingAddressCorporateProps) {
    const { t } = useTranslation();
    const { cdnImg } = config;
    const requiredField = t("FormValidation.RequiredField");
    const minCharacters = t("FormValidation.MinCharacters").toString();
    const [selectedCity, setSelectedCity] = useState<string | undefined>();
    const [selectedAddress, setSelectedAddress] = useState<string>("None");
    const { onComplete } = props;

    const dispatch = useDispatch<Dispatch>();
    const { isBusy: isBusyDefaultAddress, data: defaultAddress, status: defaultAddressStatus } = useSelector((state: RootState) => state.getDefaultAddressModel);
    const { isBusy: isBusyGetAllAddresses, data: getAllAddresses, status: getAllAddressesStatus } = useSelector((state: RootState) => state.getAllAddressesModel);
    const { data: cities } = useSelector((state: RootState) => state.citiesModel);

    const schema = Yup.object({
        companyName: Yup.string().required(requiredField),
        email: Yup.string().email().required(requiredField),
        taxNumber: Yup.string().required(requiredField).test({
            test: (value) => {
                return validateTaxNumber(value);
            },
            message: t("Generic.Forms.InvalidTaxNumber")
        }),
        phone: Yup.string().test({
            name: 'minCharacters',
            message: `${minCharacters}`,
            test: (value) =>
                value?.length == 12
        }).required(requiredField),
        zipCode: Yup.string().optional(),
        addressName: Yup.string().optional(),
        city: Yup.string().required(requiredField),
        district: Yup.string().required(requiredField),
        fullAddress: Yup.string().required(requiredField),
        taxOffice: Yup.string().required(requiredField)
    });

    const {
        setFieldValue,
        setFieldTouched,
        handleChange,
        handleBlur,
        touched,
        resetForm,
        isValid,
        values: billingAddress,
        errors } = useFormik({
            enableReinitialize: true,
            initialValues: {
                companyName: "",
                email: "",
                taxNumber: "",
                phone: "",
                addressName: defaultAddress?.name,
                city: defaultAddress?.city,
                district: defaultAddress?.district,
                fullAddress: defaultAddress?.fullAddress,
                zipCode: defaultAddress?.zipCode,
                taxOffice: ""
            },
            validateOnMount: true,
            validationSchema: schema,
            onSubmit: (values) => {
            },
        });

        console.log(errors);

    useEffect(() => {
        if (cities && defaultAddress && defaultAddressStatus === 200) {
            const city = cities.find(x => x.name === defaultAddress.city);
            setSelectedCity(city?.code);
            setSelectedAddress(defaultAddress?.name ?? "None");
        }
    }, [cities, defaultAddressStatus]);

    useEffect(() => {
        if (!isBusyGetAllAddresses && !getAllAddresses) {
            dispatch.getDefaultAddressModel.getDefaultAddress();
            dispatch.getAllAddressesModel.getAllAddresses();
        }
    }, []);

    useEffect(() => {
        onComplete(isValid, billingAddress);
    }, [isValid]);

    return (
        <Grid item container xs={12} spacing={4}>
            <Grid item xs={6} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <ImageComponent src={`${cdnImg}/checkout/billing-corporate.svg`} />
            </Grid>
            <Grid item container spacing={4} xs={6} >
                <Grid item xs={6}>
                    <Typography variant="subtitle1" align="center" mt={2}>{t("Pages.Checkout.CorporateInfo")}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1" align="center" mt={2}>{t("Pages.Checkout.ContactInfo")}</Typography>
                </Grid>
                <Grid item xs={6} >
                    <FormControl fullWidth>
                        <TextField
                            name={"companyName"}
                            label={t("Pages.Checkout.CompanyName")}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.companyName && errors.companyName !== undefined}
                            value={billingAddress?.companyName}
                            helperText={touched.companyName && errors?.companyName}
                        >
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={6} >
                    <FormControl fullWidth>
                        <TextField
                            name={"email"}
                            label={t("Pages.Checkout.Email")}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && errors.email !== undefined}
                            value={billingAddress?.email}
                            helperText={touched.email && errors?.email}
                        >
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={6} >
                    <FormControl fullWidth>
                        <TextField
                            name={"taxNumber"}
                            label={t("Pages.Checkout.TaxNumber")}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.taxNumber && errors.taxNumber !== undefined}
                            value={billingAddress?.taxNumber}
                            helperText={touched.taxNumber && errors?.taxNumber}
                        >
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={6} >
                    <FormControl fullWidth>
                        <TextField
                            name={"taxOffice"}
                            label={t("Pages.Checkout.TaxOffice")}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.taxOffice && errors.taxOffice !== undefined}
                            value={billingAddress?.taxOffice}
                            helperText={touched.taxOffice && errors?.taxOffice}
                        >
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={6} >
                    <FormControl fullWidth>
                        <TextField
                            name={"phone"}
                            label={t("Pages.Checkout.Phone")}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.phone && errors.phone !== undefined}
                            value={billingAddress?.phone}
                            helperText={touched.phone && errors?.phone}
                            InputProps={{
                                inputComponent: PhoneInputMask as any,
                            }}
                        >
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" align="center">{t("Generic.PersonalInfo.Address")}</Typography>
                </Grid>
                <Grid item xs={6} >
                    <FormControl fullWidth>
                        <TextField
                            name={"zipCode"}
                            label={t("Pages.Checkout.ZipCode")}
                            variant="outlined"
                            onChange={handleChange}
                            value={billingAddress?.zipCode}
                            InputProps={{
                                inputComponent: ZipCodeInputMask as any,
                            }}
                        >
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={6} >
                    <FormControl fullWidth>
                        <InputLabel id={`label-address`}>{t("Pages.Checkout.AddressName")}</InputLabel>
                        <Select
                            labelId={`label-address`}
                            label={t("Pages.Checkout.AddressName")}
                            name={"addressName"}
                            id={"addressName"}
                            value={selectedAddress}
                            onChange={(e) => {
                                if (e.target.value) {
                                    const newSelectedAddress = e.target.value;
                                    setSelectedAddress(newSelectedAddress);

                                    if (newSelectedAddress === "None") {
                                        resetForm();
                                    }
                                    else {
                                        const address = getAllAddresses?.find(x => x.name === newSelectedAddress);

                                        setFieldValue("fullAddress", address?.fullAddress);
                                        setFieldValue("city", address?.city);
                                        setFieldValue("district", address?.district);
                                        setFieldValue("zipCode", address?.zipCode);
                                        setFieldValue("phone", address?.phone);

                                        const city = cities?.find(x => x.name === address?.city);
                                        setSelectedCity(city?.code);
                                    }
                                }
                            }}
                        >
                            <MenuItem disabled value={"None"}>
                                <em>{t('Pages.Checkout.MenuItem')}</em>
                            </MenuItem>
                            {getAllAddresses?.map(x => {
                                return <MenuItem key={x.name} value={x.name}>{x.name}</MenuItem>
                            })}
                            <MenuItem value={"Other"}>{t("Generic.Forms.Other")}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} >
                    <FormControl fullWidth>
                        <Cities
                            value={billingAddress?.city}
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
                <Grid item xs={6} >
                    <FormControl fullWidth>
                        <Districts
                            selectedCity={selectedCity}
                            error={touched.district && errors.district !== undefined}
                            helperText={touched.district && errors?.district}
                            value={billingAddress?.district}
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
                <Grid item xs={12} >
                    <FormControl fullWidth>
                        <TextField
                            name={"fullAddress"}
                            label={t("Generic.Address.Address")}
                            variant="outlined"
                            multiline
                            rows={4}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={billingAddress?.fullAddress}
                            error={touched.fullAddress && errors.fullAddress !== undefined}
                            helperText={touched.fullAddress && errors.fullAddress}
                        />
                    </FormControl>
                </Grid>

            </Grid>

        </Grid>
    )
}