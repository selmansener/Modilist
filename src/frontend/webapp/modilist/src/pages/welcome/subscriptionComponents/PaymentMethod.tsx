
import { FormControl, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Dispatch, RootState } from "../../../store/store";
import Cards from 'react-credit-cards';
import { Focused } from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css';
import IMask, { MaskedRange } from "imask";
import { config } from "../../../config";
import { RootModel } from "../../../store/models";

type CreditCardNumber = {
    number: boolean;
}
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



export default function PaymentMethod() {
    const dispatch = useDispatch<Dispatch>();
    const { t } = useTranslation();
    const { isProduction } = config;
    const { isBusy: createPaymentMethodIsBusy, status: createPaymentMethodStatus } = useSelector((state: RootState) => state.createPaymentMethodModel);
    const requiredField = t("FormValidation.RequiredField");
    const [cardFocused, setCardFocused] = useState<Focused>();
    const [creditCardNumberShrink, setCreditCardNumberShrink] = useState(false);
    const cardNumberValidation = t("Pages.Welcome.PaymentMethod.CardNumberValidation");
    const monthTwoDigits = t("Pages.Welcome.PaymentMethod.MonthTwoDigits");
    const monthValidation = t("Pages.Welcome.PaymentMethod.MonthValidation");
    const yearTwoDigits = t("Pages.Welcome.PaymentMethod.YearTwoDigits");
    const yearValidation = t("Pages.Welcome.PaymentMethod.YearValidation");
    const cardHolderNameValidation = t("Pages.Welcome.PaymentMethod.CardHolderNameValidation");
    const mustBeNumber = t("FormValidation.MustBeNumber");
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
                let cardReverse: any = [];
                cardReverse = valueFinal?.split('').reverse().map(num => parseInt(num));
                let cardEvenDigits: number[] = [];
                let cardOddDigits: number[] = [];
                let luhnSum1;
                let luhnSum2;
                let luhnSumFinal;

                for (let i = 0; i < cardReverse.length; i++) {
                    if (i % 2 == 1) {
                        if (cardReverse[i] * 2 < 10) {
                            cardEvenDigits.push(cardReverse[i] * 2);
                        }
                        else {
                            cardEvenDigits.push(cardReverse[i] * 2 % 10 + 1);
                        }
                    }
                    else {
                        cardOddDigits.push(cardReverse[i])
                    }
                }

                luhnSum1 = cardEvenDigits.reduce((prev, curr) => prev + curr);
                luhnSum2 = cardOddDigits.reduce((prev, curr) => prev + curr);
                luhnSumFinal = luhnSum1 + luhnSum2;

                return (luhnSumFinal % 10 == 0) && (value?.length == 19)
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
        cardName: Yup.string().required(requiredField),

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
            cardName: "",
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

    useEffect(() => {

        setCreditCardNumberShrink(creditCard.cardNumber !== undefined && creditCard.cardNumber !== '');

    }, [creditCard])

    useEffect(() => {
        if (createPaymentMethodStatus !== 0) {
            dispatch.createPaymentMethodModel.RESET();
        }
    }, [createPaymentMethodStatus])

    return (
        <>
            <Grid item container spacing={{ xs: 2, md: 4 }}>
                <Grid item xs={12}>
                    <Typography variant='h3' align='left' sx={{ m: 1 }}>
                        {t("Pages.Welcome.PaymentMethod.Title")}
                    </Typography>
                </Grid>

                <Grid item container xs={12} md={8}>
                    <Grid item container spacing={{ xs: 2, md: 4 }}>

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
                                    InputLabelProps={{
                                        shrink: creditCardNumberShrink
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

                        <Grid item xs={6} md={4}>
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

                        <Grid item xs={6} md={4}>
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

                        <Grid item xs={12} md={4}>
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
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4} sx={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Cards
                        cvc={""}
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