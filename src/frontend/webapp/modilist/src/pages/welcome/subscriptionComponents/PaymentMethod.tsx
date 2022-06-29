
import { FormControl, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Dispatch } from "../../../store/store";

export default function PaymentMethod() {
    const dispatch = useDispatch<Dispatch>();
    const { t } = useTranslation();

    const requiredField = t("FormValidation.RequiredField");

    const schema = Yup.object({
        cardHolderName: Yup.string().required(requiredField),
        cardNumber: Yup.string().required(requiredField),
        expireMonth: Yup.string().required(requiredField),
        expireYear: Yup.string().required(requiredField),
    });

    const {
        handleChange,
        handleBlur,
        touched,
        errors,
        isValid,
        values: creditCard,
        submitForm
    } = useFormik({
        initialValues: {
            cardHolderName: "",
            cardNumber: "",
            expireMonth: "",
            expireYear: "",
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
            if(!isValid){
                window.scrollTo(0,0);
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

                {/* TODO: formatter implementation */}
                {/* https://mui.com/material-ui/react-text-field/#integration-with-3rd-party-input-libraries */}
                <Grid item xs={12}>
                    <FormControl fullWidth >
                        <TextField
                            name="cardNumber"
                            error={touched.cardNumber && errors.cardNumber !== undefined}
                            helperText={touched.cardNumber && errors.cardNumber}
                            label={t("Pages.Welcome.PaymentMethod.CardNumber")}
                            type="number"
                            value={creditCard.cardNumber}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                            onChange={handleChange}
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
                            onBlur={handleBlur}
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
                            onBlur={handleBlur}
                        />
                    </FormControl>
                </Grid>

            </Grid>
        </>
    )
}