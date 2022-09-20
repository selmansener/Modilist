import { Button, Checkbox, FormControl, FormControlLabel, Grid, TextField } from "@mui/material";
import { useFormik, validateYupSchema } from "formik";
import { useDispatch } from "react-redux";
import { config } from "../../config";
import * as Yup from "yup";
import { IMaskInput } from "react-imask";
import React, { useEffect, useState } from "react";
import { Focused } from "react-credit-cards";
import { useTranslation } from "react-i18next";
import Cards from 'react-credit-cards';

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

export function NewPaymentMethod() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isProduction } = config;
    const requiredField = t("FormValidation.RequiredField");
    const [cardFocused, setCardFocused] = useState<Focused>();
    const [cardNumValidate, setCardNumberValidate] = useState(false);
    const cardNumberValidation = t("Pages.NewPaymentMethod.CardNumberValidation");
    const monthTwoDigits = t("Pages.NewPaymentMethod.MonthTwoDigits");
    const monthValidation = t("Pages.NewPaymentMethod.MonthValidation");
    const yearTwoDigits = t("Pages.NewPaymentMethod.YearTwoDigits");
    const yearValidation = t("Pages.NewPaymentMethod.YearValidation");
    const cardHolderNameValidation = t("Pages.NewPaymentMethod.CardHolderNameValidation");
    const CardNumber = t("FormValidation.CardNumber").toString();
    const currentDate = new Date();


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
        cardNumber: Yup.string().test({
            name: 'CardNumber',
            message: `${CardNumber}`,
            test: (value) => {
                let valueArr = value?.split(" ");
                let valueFinal = "";
                valueArr?.forEach(value => {
                    valueFinal += value;
                })
                let arr = (valueFinal.trim() + "").split("").reverse().map((x) => parseInt(x));
                let lastDigit = arr.splice(0, 1)[0];
                let sum = arr.reduce(
                    (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
                sum += lastDigit;
                return (sum % 10 === 0) && (value?.length == 19);

            }


        }).required(requiredField),
        expireMonth: Yup.string().when("expireYear", {
            is: (currentDate.getFullYear() % 1000).toString(),
            then: Yup.string().test({
                name: "monthValidation",
                message: monthValidation,
                test: (value) => {
                    if (value == undefined) {
                        return false
                    }
                    const valueAsNumber = parseInt(value);
                    const currentMonth = currentDate.getMonth() + 1;
                    return (
                        (valueAsNumber >= 1 && valueAsNumber <= 12) &&
                        (valueAsNumber > currentMonth)
                    )
                }
            }).length(2, monthTwoDigits).required(requiredField)
        }).test({
            name: "monthValidation",
            message: monthValidation,
            test: (value) => {
                if (value == undefined) {
                    return false
                }
                const valueAsNumber = parseInt(value);
                return (
                    (valueAsNumber >= 1 && valueAsNumber <= 12)
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
        cardName: Yup.string().required(requiredField)
    });

    const {
        handleChange,
        handleBlur,
        touched,
        errors,
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
            cardName: "",
            isDefault: false
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch.createPaymentMethodModel.createPaymentMethod({
                ...values,
                isDefault: true
            });
        },
    });

    return (<Grid item container xs={12} spacing={2}>
        <Grid item container xs={6} spacing={2}>
            <Grid item xs={12}>
                <FormControl fullWidth >
                    <TextField
                        name="cardNumber"
                        error={touched.cardNumber && errors.cardNumber !== undefined}
                        helperText={touched.cardNumber && errors.cardNumber}
                        label={t("Pages.NewPaymentMethod.CardNumber")}
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
                        label={t("Pages.NewPaymentMethod.CardHolderName")}
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
                        label={t("Pages.NewPaymentMethod.ExpireMonth")}
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
                        label={t("Pages.NewPaymentMethod.ExpireYear")}
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
                        name="cardName"
                        error={touched.cardName && errors.cardName !== undefined}
                        helperText={touched.cardName && errors.cardName}
                        label={t("Pages.Welcome.PaymentMethod.CardName")}
                        value={creditCard.cardName}
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-between">
                <FormControl >
                    <FormControlLabel control={<Checkbox checked={creditCard.isDefault} onChange={(e, checked) => {
                        setFieldValue("isDefault", checked);
                    }} />} label={
                        t("Pages.NewPaymentMethod.SetAsDefault")
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
        <Grid item xs={6} sx={{
            display: "flex",
            alignItems: "flex-start"
        }}>
            <Cards
                cvc={""}
                focused={cardFocused}
                expiry={`${creditCard.expireMonth}/${creditCard.expireYear}`}
                name={creditCard.cardHolderName}
                number={creditCard.cardNumber}
            />
        </Grid>
    </Grid>)
}