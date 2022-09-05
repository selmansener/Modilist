
import { FormControl, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Dispatch } from "../../../store/store";
import Cards from 'react-credit-cards';
import { Focused } from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css';
import IMask, { MaskedRange } from "imask";
import { config } from "../../../config";

interface InputMaskProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
    value?: string;
}

const CreditCardInputMask = React.forwardRef<HTMLElement, InputMaskProps>(
    function CreditCardInputMask(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="0000 0000 0000 0000"

                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

const ExpireMonthInputMask = React.forwardRef<HTMLElement, InputMaskProps>(
    function ExpireMonthInputMask(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="00"
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
            />
        );
    },
);

const ExpireYearInputMask = React.forwardRef<HTMLElement, InputMaskProps>(
    function ExpireYearInputMask(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="00"
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

const CvcInputMask = React.forwardRef<HTMLElement, InputMaskProps>(
    function CvcInputMask(props,ref) {
        const { onChange, ...other} =props;
        return (
            <IMaskInput 
            {...other}
            mask="000"
            onAccept={(value: any) => onChange({ target: {name: props.name, value}})}
            />
        );
    },

);

export default function PaymentMethod() {
    const dispatch = useDispatch<Dispatch>();
    const { t } = useTranslation();
    const { isProduction } = config;

    const requiredField = t("FormValidation.RequiredField");
    const [cardFocused, setCardFocused] = useState<Focused>();
    const monthTwoDigits = t("Pages.Welcome.PaymentMethod.MonthTwoDigits");
    const monthValidation = t("Pages.Welcome.PaymentMethod.MonthValidation");
    const yearTwoDigits = t("Pages.Welcome.PaymentMethod.YearTwoDigits");
    const yearValidation = t("Pages.Welcome.PaymentMethod.YearValidation");
    const cvcThreeDigit = t("Pages.Welcome.PaymentMethod.CvcThreeDigit");
    const cvcValidation = t("Pages.Welcome.PaymentMethod.CvcValidation");
    const cardHolderNameValidation = t("Pages.Welcome.PaymentMethod.CardHolderNameValidation");
    const mustBeNumber = t("FormValidation.MustBeNumber");
    const schema = Yup.object({
        cardHolderName: Yup.string().test({
            name: "cardHolderNameValidation",
            message: cardHolderNameValidation,
            test: (value) => {
                if (Number(value)) {
                    return false;
                }
                return true
            }
        }).required(requiredField),
        cardNumber: Yup.string().required(requiredField),
        expireMonth: Yup.string().test({
            name: "monthValidation",
            message: monthValidation,
            test: (value) => {
                if (value == undefined) {
                    return false
                }
                const valueAsNumber = parseInt(value);
                return (
                    valueAsNumber >= 1 && valueAsNumber <= 12
                )
            }
        }).length(2, monthTwoDigits).required(requiredField), //i18n ile değiştir
        expireYear: Yup.string().test({
            name: "yearValidation",
            message: yearValidation,
            test: (value) => {
                const now = new Date();
                const yearTwoDigits = now.getFullYear() % 1000;
                if (value == undefined) {
                    return false
                }
                const valueAsNumber = parseInt(value);
                return (
                    valueAsNumber >= yearTwoDigits
                )
            }
        }).length(2, yearTwoDigits).required(requiredField),
        cvc: Yup.string().test({
            name: "cvcValidation",
            message: cvcValidation,
            test: (value) => {
                if (value == undefined) {
                    return false
                }
                const valueAsNumber = parseInt(value);
                return (
                    valueAsNumber >= 1 && valueAsNumber <= 999
                )
            }
        })
        .length(3, cvcThreeDigit)
        .required(requiredField)
    });

    const {
        handleChange,
        handleBlur,
        touched,
        errors,
        isValid,
        values: creditCard,
        setFieldValue,
        submitForm
    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            cardHolderName: "",
            cardNumber: !isProduction ? "5526080000000006" : "",
            expireMonth: "",
            expireYear: "",
            cvc: ""
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch.createPaymentMethodModel.createPaymentMethod({
                ...values,
                isDefault: true
            });
        },
    });

    useEffect(() => {
        dispatch.stepperSubscription.setPaymentMethod(() => {
            submitForm();
            if (!isValid) {
                window.scrollTo(0, 0);
            }
        })
    }, []);

    return (
        <>
            <Grid item container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant='h3' align='left' sx={{ m: 1 }}>
                        {t("Pages.Welcome.PaymentMethod.Title")}
                    </Typography>
                </Grid>

                <Grid item container spacing={4} xs={8}>

                    <Grid item xs={12}>
                        <FormControl fullWidth >
                            <TextField
                                name="cardNumber"
                                error={touched.cardNumber && errors.cardNumber !== undefined}
                                helperText={touched.cardNumber && errors.cardNumber}
                                label={t("Pages.Welcome.PaymentMethod.CardNumber")}
                                value={creditCard.cardNumber}
                                variant="outlined"
                                onChange={handleChange}
                                onFocus={() => {
                                    setCardFocused("number")
                                }}
                                onBlur={handleBlur}
                                InputProps={{
                                    inputComponent: CreditCardInputMask as any,
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth >
                            <TextField
                                name="cardHolderName"
                                error={touched.cardHolderName && errors.cardHolderName !== undefined}
                                helperText={touched.cardHolderName && errors.cardHolderName}
                                label={t("Pages.Welcome.PaymentMethod.CardHolderName")}
                                value={creditCard.cardHolderName}
                                variant="outlined"
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                onFocus={() => {
                                    setCardFocused("name")
                                }}
                                onBlur={handleBlur}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth >
                            <TextField
                                name="expireMonth"
                                error={touched.expireMonth && errors.expireMonth !== undefined}
                                helperText={touched.expireMonth && errors.expireMonth}
                                label={t("Pages.Welcome.PaymentMethod.ExpireMonth")}
                                value={creditCard.expireMonth}
                                variant="outlined"
                                onChange={handleChange}
                                onFocus={() => {
                                    setCardFocused("expiry");
                                }}
                                onBlur={handleBlur}
                                InputProps={{
                                    inputComponent: ExpireMonthInputMask as any,
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth >
                            <TextField
                                name="expireYear"
                                error={touched.expireYear && errors.expireYear !== undefined}
                                helperText={touched.expireYear && errors.expireYear}
                                label={t("Pages.Welcome.PaymentMethod.ExpireYear")}
                                value={creditCard.expireYear}
                                variant="outlined"
                                onChange={handleChange}
                                onFocus={() => {
                                    setCardFocused("expiry")
                                }}
                                onBlur={handleBlur}
                                InputProps={{
                                    inputComponent: ExpireYearInputMask as any,
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth >
                            <TextField
                                name="cvc"
                                error={touched.cvc && errors.cvc !== undefined}
                                helperText={touched.cvc && errors.cvc}
                                label="CVC"
                                value={creditCard.cvc}
                                variant="outlined"
                                onChange={handleChange}
                                onFocus={() => {
                                    setCardFocused("cvc")
                                }}
                                onBlur={handleBlur}
                                InputProps ={{
                                    inputComponent: CvcInputMask as any,
                                }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={4} sx={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Cards
                        cvc={creditCard.cvc}
                        focused={cardFocused}
                        expiry={`${creditCard.expireMonth}/${creditCard.expireYear}`}
                        name={creditCard.cardHolderName}
                        number={creditCard.cardNumber}
                    />
                </Grid>
            </Grid>
        </>
    )
}