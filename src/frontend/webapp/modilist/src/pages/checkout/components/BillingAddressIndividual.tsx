import React, { useEffect, useState } from "react";
import { Grid, Typography, FormControl, TextField, InputAdornment, Box, InputLabel, Select, MenuItem, useTheme, Tooltip } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { Cities } from "../../welcome/address/Cities";
import { Districts } from "../../welcome/address/Districts";
import { config } from "../../../config";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store/store";
import { IMaskInput } from "react-imask";
import { validateIdNumber } from "../../../utils/validators";


export interface BillingAddressIndividualProps {
    onComplete: (isValid: boolean, formData: IndividualBillingAddress) => void;
}

interface NumberInputMaskProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
    value?: string;
}

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

export interface IndividualBillingAddress {
    fullName?: string;
    idNumber?: string;
    addressName?: string;
    zipCode?: string;
    city?: string;
    district?: string;
    fullAddress?: string;
}

export default function BillingAddressIndividual(props: BillingAddressIndividualProps) {
    const { onComplete } = props;
    const { t } = useTranslation();
    const { cdnImg } = config;
    const requiredField = t("FormValidation.RequiredField");
    const [selectedCity, setSelectedCity] = useState<string | undefined>();
    const dispatch = useDispatch<Dispatch>();
    const { isBusy: isBusyDefaultAddress, data: defaultAddress, status: defaultAddressStatus } = useSelector((state: RootState) => state.getDefaultAddressModel);
    const { isBusy: isBusyGetAllAddresses, data: getAllAddresses, status: getAllAddressesStatus } = useSelector((state: RootState) => state.getAllAddressesModel);
    const { data: cities } = useSelector((state: RootState) => state.citiesModel);
    const [selectedAddress, setSelectedAddress] = useState<string>("None");
    const theme = useTheme();

    const schema = Yup.object({
        fullName: Yup.string().required(requiredField),
        idNumber: Yup.string().required(requiredField).test({
            test: (value) => {
                return validateIdNumber(value);
            },
            message: t("Generic.Forms.InvalidIdNumber")
        }),
        addressName: Yup.string().optional(),
        city: Yup.string().required(requiredField),
        district: Yup.string().required(requiredField),
        fullAddress: Yup.string().required(requiredField),
        zipCode: Yup.string().optional(),
    });

    const {
        setFieldValue,
        setFieldTouched,
        handleChange,
        handleBlur,
        resetForm,
        touched,
        isValid,
        values: billingAddress,
        errors } = useFormik({
            enableReinitialize: true,
            initialValues: {
                fullName: `${defaultAddress?.firstName} ${defaultAddress?.lastName}`,
                idNumber: "",
                addressName: defaultAddress?.name,
                city: defaultAddress?.city,
                district: defaultAddress?.district,
                fullAddress: defaultAddress?.fullAddress,
                zipCode: defaultAddress?.zipCode,
            },
            validateOnMount: true,
            validationSchema: schema,
            onSubmit: (values) => {
            },
        });

    useEffect(() => {
        if (cities && defaultAddress && defaultAddressStatus === 200) {
            const city = cities.find(x => x.name === defaultAddress.city);
            setSelectedCity(city?.code);
            setSelectedAddress(defaultAddress?.name ?? "None");
        }
    }, [cities, defaultAddressStatus]);

    useEffect(() => {
        if (!isBusyGetAllAddresses) {
            dispatch.getDefaultAddressModel.getDefaultAddress();
        }

        if (!isBusyDefaultAddress) {
            dispatch.getDefaultAddressModel.getDefaultAddress();
        }
    }, []);

    useEffect(() => {
        onComplete(isValid, billingAddress);
    }, [isValid]);

    return (
        <Grid item container xs={12} spacing={4}>
            <Grid item container spacing={4} xs={6}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" align="center" mt={2}>{t("Pages.Checkout.PersonalInfo")}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField
                            name={"fullName"}
                            label={t("Generic.PersonalInfo.FullName")}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.fullName && errors.fullName !== undefined}
                            value={billingAddress?.fullName}
                            helperText={touched.fullName && errors.fullName}
                        >
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField
                            name={"idNumber"}
                            label={t("Generic.PersonalInfo.IdNumber")}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.idNumber && errors.idNumber !== undefined}
                            value={billingAddress?.idNumber}
                            helperText={touched.idNumber && errors.idNumber}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <Tooltip
                                        title={
                                            <Box sx={{ p: 2 }}>
                                                <Typography variant="h5" color={theme.palette.primary.contrastText}>
                                                    {t("Pages.Checkout.IdNumberTitle")}
                                                </Typography>
                                                <Typography variant="body1" color={theme.palette.primary.contrastText}>
                                                    {t("Pages.Checkout.IdNumberDescription")}
                                                </Typography>
                                            </Box>
                                        } arrow>
                                        <InfoOutlinedIcon sx={{ cursor: "pointer" }} />
                                    </Tooltip>
                                </InputAdornment>
                            }}
                        >
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" align="center">{t("Generic.PersonalInfo.Address")}</Typography>
                </Grid>
                <Grid item xs={6}>
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
                                        setFieldValue("fullName", `${address?.firstName} ${address?.lastName}`);
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
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField
                            name={"zipCode"}
                            label={t("Generic.Address.ZipCode")}
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
                        <Cities
                            value={billingAddress?.city}
                            error={touched.city && errors.city !== undefined}
                            helperText={touched.city && errors.city}
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
                            helperText={touched.district && errors.district}
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
                            label={t("Generic.Checkour.FullAddress")}
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
            <Grid item xs={6} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <ImageComponent src={`${cdnImg}/checkout/billing-individual.svg`} />
            </Grid>

        </Grid>
    )
}
