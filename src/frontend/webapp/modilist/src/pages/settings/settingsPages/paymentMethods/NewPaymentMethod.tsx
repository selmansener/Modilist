import { Alert, Button, Checkbox, FormControl, FormControlLabel, Grid, Snackbar, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { config } from "../../../../config";
import * as Yup from "yup";
import { IMaskInput } from "react-imask";
import React, { useEffect, useState } from "react";
import { Focused } from "react-credit-cards";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Cards from 'react-credit-cards';
import { Helmet } from "react-helmet";
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

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
type FieldStates = {
    cardHolderName: boolean,
    cardNumber: boolean,
    expireMonth: boolean,
    expireYear: boolean,
    cardName: boolean
}

export default function NewPaymentMethod() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { paymentMethodId } = useParams();
    const { isProduction } = config;
    const { isBusy: isBusyCreateNewPaymentMethod, status: statusCreateNewPaymentMethod, errorType: errorTypeCreateNewPaymentMethod } = useSelector((state: RootState) => state.createNewPaymentMethodModel);
    const { isBusy: isBusyPaymentMethods, data: paymentMethods } = useSelector((state: RootState) => state.getAllPaymentMethodsModel);
    const isBusy = isBusyCreateNewPaymentMethod;
    const navigate = useNavigate();
    const requiredField = t("FormValidation.RequiredField");
    const [cardFocused, setCardFocused] = useState<Focused>();
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const monthTwoDigits = t("Pages.NewPaymentMethod.MonthTwoDigits");
    const monthValidation = t("Pages.NewPaymentMethod.MonthValidation");
    const yearTwoDigits = t("Pages.NewPaymentMethod.YearTwoDigits");
    const yearValidation = t("Pages.NewPaymentMethod.YearValidation");
    const cardHolderNameValidation = t("Pages.NewPaymentMethod.CardHolderNameValidation");
    const cardNameValidation = t("Pages.NewPaymentMethod.CardNameValidation");
    const CardNumber = t("FormValidation.CardNumber");
    const currentDate = new Date();
    const [creditCardNumberShrink, setCreditCardNumberShrink] = useState<boolean>(false);


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
        cardName: Yup.string().required(requiredField)
    });

    const {
        handleChange,
        handleBlur,
        touched,
        errors,
        values: creditCard,
        setFieldValue,
        submitForm,
        resetForm,
        setFieldError
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
            if (!isBusy && values) {
                dispatch.createNewPaymentMethodModel.createNewPaymentMethod({
                    ...values
                });
            }
        },
    });
    useEffect(() => {
        if (!isBusyPaymentMethods) {
            dispatch.getAllPaymentMethodsModel.getAllPaymentMethods();
        }

        if (paymentMethodId && !isBusyCreateNewPaymentMethod) {
            dispatch.createNewPaymentMethodModel.createPayment(parseInt(paymentMethodId));
        }

        return () => {
            dispatch.createNewPaymentMethodModel.RESET();
        }
    }, []);
    useEffect(() => {
        if (!isBusy && statusCreateNewPaymentMethod === 200) {
            dispatch.createNewPaymentMethodModel.RESET();
            navigate("/settings/payment-methods");
        }
    }, [statusCreateNewPaymentMethod]);
    useEffect(() => {
        setCreditCardNumberShrink(creditCard.cardNumber !== undefined && creditCard.cardNumber !== "");
    }, [creditCard]);

    useEffect(() => {
        if (statusCreateNewPaymentMethod !== 0) {
            if (statusCreateNewPaymentMethod === 200) {
                resetForm();
            }

            if (errorTypeCreateNewPaymentMethod === 'CardNameAlreadyExistsException') {
                setFieldError('cardName', cardNameValidation)
            }

            setSnackbarStatus(true);
            dispatch.createNewPaymentMethodModel.RESET();
        }
    }, [statusCreateNewPaymentMethod]);

    return (<Grid item container xs={12} spacing={2}>
        <Helmet>
            <title>{t("Pages.Titles.NewPaymentMethod")} | Modilist</title>
        </Helmet>
        <Grid item xs={12}>
            <IconButton onClick={() => navigate(-1)}>
                <ChevronLeftIcon />
            </IconButton>
            <Typography variant="h4" component="span" sx={{
                verticalAlign: "middle",
                ml: 2
            }}>
                {t("Pages.Titles.NewPaymentMethod")}
            </Typography>
        </Grid>
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
        <Snackbar
            open={snackbarStatus}
            autoHideDuration={6000}
            onClose={() => {
                setSnackbarStatus(false);
            }}>
            <Alert onClose={() => {
                setSnackbarStatus(false);
            }}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}>
                {t(`Generic.Forms.UnexpectedError`)}
            </Alert>
        </Snackbar>
    </Grid>)
}