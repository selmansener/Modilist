import { Alert, Button, FormControl, Grid, Link, Snackbar, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { ImageComponent } from "../../components/image/ImageComponent";
import { config } from "../../config";
import { RootState, Dispatch } from "../../store/store";
import * as Yup from "yup";
import { useFormik } from "formik";
import { IMaskInput } from "react-imask";
import React, { useEffect, useState } from "react";

interface PartnershipMessage {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyName: string;
    jobTitle: string;
    message: string;
}

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
                mask="500 000 0000"
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

export default function Partnership() {
    const { isBusy, status } = useSelector((state: RootState) => state.sendPartnershipMailModel);
    const dispatch = useDispatch<Dispatch>();
    const { t } = useTranslation();
    const { cdnImg } = config;
    const requiredField = t("FormValidation.RequiredField");
    const minCharacters = t("FormValidation.MinCharacters").toString();
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const schema = Yup.object({
        firstName: Yup.string().required(requiredField),
        lastName: Yup.string().required(requiredField),
        email: Yup.string().email(requiredField).required(requiredField),
        phone: Yup.string().test({
            name: 'minCharacters',
            message: `${minCharacters}`,
            test: (value) => value?.length == 12
        }).optional(),
        companyName: Yup.string().required(requiredField),
        jobTitle: Yup.string().optional(),
        message: Yup.string().required(requiredField),
    });

    const {
        handleChange,
        handleBlur,
        touched,
        values: partnershipMessage,
        errors,
        submitForm,
        resetForm,
    } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            companyName: "",
            jobTitle: "",
            message: "",
        } as PartnershipMessage,
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch.sendPartnershipMailModel.sendPartnershipMail({
                from: "partnership@modilist.com",
                to: "partnership@modilist.com",
                senderName: "Modilist Partnership",
                templateId: "d-79516bffb1444e77aab8595e2820d195",
                templateData: values as any
            })
        },
    });

    useEffect(() => {
        if (!isBusy && status !== 0) {
            if (status === 200) {
                setIsSuccess(true);
                resetForm();
            }
            setSnackbarStatus(true);
            dispatch.sendPartnershipMailModel.RESET();
        }
    }, [status]);

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h1" align="center">
                    {t("Pages.Partnership.Title")}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    {t("Pages.Partnership.Description.1")}
                </Typography>
                <Typography variant="h6" align="center">
                    {t("Pages.Partnership.Description.2")}
                </Typography>
            </Grid>
            <Grid item container xs={12} spacing={2}>
                <Grid item xs={6}>
                    <ImageComponent src={`${cdnImg}/common/partnership.webp`} width="100%" />
                    <Typography variant="h6" mt={4}>
                        {t("CompanyAddress.FirstLine")}
                    </Typography>
                    <Typography variant="h6">
                        {t("CompanyAddress.SecondLine")}
                    </Typography>
                    <Typography variant="h6" mt={4}>
                        <Link href="mailto:partnership@modilist.com">
                            partnership@modilist.com
                        </Link>
                    </Typography>
                </Grid>
                <Grid item container xs={6} spacing={2} display="flex" alignContent="flex-start">
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField label={t('Generic.PersonalInfo.FirstName')}
                                name="firstName"
                                disabled={isBusy}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.firstName && errors.firstName}
                                error={touched.firstName && errors.firstName !== undefined}
                                variant="outlined"
                                value={partnershipMessage?.firstName} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField label={t('Generic.PersonalInfo.LastName')}
                                name="lastName"
                                disabled={isBusy}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.lastName && errors.lastName}
                                error={touched.lastName && errors.lastName !== undefined}
                                variant="outlined"
                                value={partnershipMessage?.lastName} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField label={t('Generic.PersonalInfo.Email')}
                                name="email"
                                disabled={isBusy}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.email && errors.email}
                                error={touched.email && errors.email !== undefined}
                                variant="outlined"
                                value={partnershipMessage?.email} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField label={t('Generic.PersonalInfo.PhoneNumber')}
                                name="phone"
                                value={partnershipMessage?.phone}
                                disabled={isBusy}
                                variant="outlined"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                InputProps={{
                                    inputComponent: PhoneInputMask as any,
                                }} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField label={t('Pages.Partnership.CompanyName')}
                                name="companyName"
                                disabled={isBusy}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.companyName && errors.companyName}
                                error={touched.companyName && errors.companyName !== undefined}
                                variant="outlined"
                                value={partnershipMessage?.companyName} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField label={t('Pages.Partnership.JobTitle')}
                                name="jobTitle"
                                disabled={isBusy}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="outlined"
                                value={partnershipMessage?.jobTitle} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                disabled={isBusy}
                                name="message"
                                label={t("Generic.Forms.Message")}
                                variant="outlined"
                                multiline
                                rows={12}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={partnershipMessage?.message}
                                error={touched.message && errors.message !== undefined}
                                helperText={touched.message && errors.message}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" onClick={() => {
                            submitForm();
                        }}>
                            {t("Generic.Forms.Send")}
                        </Button>
                    </Grid>
                </Grid>
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
                    severity={isSuccess ? "success" : "error"}
                    variant="filled"
                    sx={{ width: '100%' }}>
                    {t(`Generic.Forms.${isSuccess ? "SentMessageSuccess" : "SentMessageFailed"}`)}
                </Alert>
            </Snackbar>
        </Grid>
    )
}