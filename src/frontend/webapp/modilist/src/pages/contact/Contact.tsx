import { FormControl, Grid, Link, Typography, TextField, Button, Snackbar, Alert, Box, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, Slide } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { config } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../store/store';
import { useFormik } from 'formik';
import { AccountDTO } from '../../services/swagger/api';
import * as Yup from "yup";
import { ImageComponent } from '../../components/image/ImageComponent';
import { IMaskInput } from 'react-imask';


interface ContactForm {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    complaint?: string;
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
                mask="000 000 0000"
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);



export default function Contact() {
    const { t } = useTranslation();
    const { instagram, facebook, twitter, linkedIn } = config.socialMediaLinks;
    const dispatch = useDispatch<Dispatch>();
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { isBusy, status } = useSelector((state: RootState) => state.sendContactFormModel);
    const { cdnImg } = config;
    const requiredField = t("FormValidation.RequiredField");
    const minCharacters = t("FormValidation.MinCharacters");
    const containerRef = React.useRef(null);

    const schema = Yup.object({
        fullName: Yup.string().required(requiredField),
        email: Yup.string().required(requiredField),
        message: Yup.string().required(requiredField),
        phone: Yup.string().test({
            name: 'minCharacters',
            message: `${minCharacters}`,
            test: (value) => value?.length == 12
        }).optional(),
        subject: Yup.string().required(requiredField),
        complaint: Yup.string().when("subject", {
            is: "Complaint",
            then: Yup.string().required(requiredField)
        })
    });

    const {
        handleChange,
        handleBlur,
        touched,
        errors,
        values: contactForm,
        submitForm,
        setFieldValue,
        resetForm
    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: "",
            email: "",
            phone: "",
            subject: "",
            complaint: "",
            message: ""
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch.sendContactFormModel.sendContactFormMail({
                from: "destek@modilist.com",
                to: "destek@modilist.com",
                senderName: "Modilist Destek",
                templateId: "d-fad96cb02cfd43018ecc6273d2ed27f2",
                templateData: values as any
            })
        },
    });

    const subjects = [
        {
            name: "Question"
        },
        {
            name: "Suggestion"
        },
        {
            name: "Opinion"
        },
        {
            name: "Complaint",
            complaints: [
                "PaymentIssues",
                "RefundIssues",
                "CargoIssues",
            ]
        },
        {
            name: "Other"
        }
    ]

    const complaints = [
        {
            name: "PaymentIssue"
        },
        {
            name: "RefundIssue"
        },
        {
            name: "CargoIssue"
        },
        {
            name: "OtherIssue"
        }
    ]

    const complaintSelect = (
        <Grid item xs={contactForm.subject === "Complaint" ? 12 : 0} sx={{
            transition: 'all 3s linear'
        }}>
            <FormControl fullWidth error={touched.complaint && errors?.complaint !== undefined}>
                <InputLabel id="complaintLabel">{t(`Pages.Contact.Complaint`)}</InputLabel>
                <Select
                    disabled={isBusy}
                    name="complaint"
                    labelId="complaintLabel"
                    id="complaint"
                    value={contactForm.complaint}
                    label={t(`Pages.Contact.Complaint`)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    <MenuItem disabled>
                        <em>{t('Generic.Forms.Select')}</em>
                    </MenuItem>
                    {complaints.map(complaint => {
                        return <MenuItem key={complaint.name} value={complaint.name}>{t(`Pages.Contact.Complaints.${complaint.name}`)}</MenuItem>
                    })}
                </Select>
                <FormHelperText>{touched.complaint && errors?.complaint}</FormHelperText>
            </FormControl>
        </Grid>
    )

    useEffect(() => {
        if (!isBusy && status !== 0) {
            if (status === 200) {
                setIsSuccess(true);
                resetForm();
            }
            setSnackbarStatus(true);
            dispatch.sendContactFormModel.RESET();
        }
    }, [status]);

    return (
        <Grid item container xs={12}>
            <Grid item xs={12} >
                <Typography variant="h1" textAlign="center">
                    {t("Pages.Contact.Title")}
                </Typography>
            </Grid>
            <Grid item xs={12} marginTop={2}>
                <Typography variant="body1" textAlign="center">
                    {t("Pages.Contact.Description1")}
                </Typography>
                <Typography variant="body1" textAlign="center">
                    {t("Pages.Contact.Description2")}
                </Typography>
                <Typography variant="body1" textAlign="center">
                    {t("Pages.Contact.Description3")}
                </Typography>
            </Grid>
            <Grid item container xs={12} spacing={6} mb={2}>
                <Grid item xs={5} mt={4}>
                    <ImageComponent src={`${cdnImg}/common/contact-us.svg`} width="100%" />
                </Grid>
                <Grid item container xs={7} mt={4} spacing={2}>
                    <Grid item xs={12} >
                        <FormControl fullWidth>
                            <TextField
                                label={t('Generic.PersonalInfo.FullName')}
                                name="fullName"
                                disabled={isBusy}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.fullName && errors.fullName}
                                error={touched.fullName && errors.fullName !== undefined}
                                variant="outlined"
                                value={contactForm.fullName}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                        <FormControl fullWidth>
                            <TextField
                                label={t('Generic.PersonalInfo.Email')}
                                name="email"
                                disabled={isBusy}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.email && errors.email}
                                error={touched.email && errors.email !== undefined}
                                variant="outlined"
                                value={contactForm.email}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                        <FormControl fullWidth>
                            <TextField
                                label={t('Generic.PersonalInfo.PhoneNumber')}
                                name="phone"
                                disabled={isBusy}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.phone && errors.phone}
                                error={touched.phone && errors.phone !== undefined}
                                variant="outlined"
                                value={contactForm.phone}
                                InputProps={{
                                    inputComponent: PhoneInputMask as any,
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item container xs={12} spacing={4}>
                        <Grid item xs={12} ref={containerRef}>
                            <FormControl fullWidth error={touched.subject && errors?.subject !== undefined}>
                                <InputLabel id="subjectLabel">{t(`Pages.Contact.Subject`)}</InputLabel>
                                <Select
                                    disabled={isBusy}
                                    name="subject"
                                    labelId="subjectLabel"
                                    id="subject"
                                    value={contactForm.subject}
                                    label={t(`Pages.Contact.Subject`)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <MenuItem disabled>
                                        <em>{t('Generic.Forms.Select')}</em>
                                    </MenuItem>
                                    {subjects.map(subject => {
                                        return <MenuItem key={subject.name} value={subject.name}>{t(`Pages.Contact.Subjects.${subject.name}`)}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{touched.subject && errors?.subject}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {contactForm.subject === "Complaint" && <Slide
                        direction='left'
                        in={contactForm.subject === "Complaint"}
                        container={containerRef.current}
                        mountOnEnter
                    >{complaintSelect}</Slide>}

                    <Grid item xs={12} >
                        <FormControl fullWidth>
                            <TextField
                                label={t('Generic.Forms.Message')}
                                multiline
                                minRows={8}
                                maxRows={8}
                                name="message"
                                disabled={isBusy}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.message && errors.message}
                                error={touched.message && errors.message !== undefined}
                                variant="outlined"
                                value={contactForm.message}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} textAlign="right">
                        <Button variant="contained" color="secondary" onClick={() => {
                            submitForm();
                        }}>
                            {t("Generic.Forms.Send")}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container xs={12} marginTop={4}>
                <Grid item container xs={6} justifyContent="flex-start">
                    <LocationOnIcon />
                    <Typography>
                        Kızılırmak Mah. Dumlupınar Blv. No:3C-1-160 Çankaya/Ankara
                    </Typography>
                </Grid>

                <Grid item container xs={6} textAlign="right">
                    <Grid item xs={12} mb={1}>
                        <EmailIcon sx={{
                            marginRight: 1,
                            verticalAlign: "bottom"
                        }} />
                        <Typography component="span">
                            destek@modilist.com
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Link href={instagram} target="_blank" sx={{
                            pr: [1]
                        }}>
                            <InstagramIcon />
                        </Link>
                        <Link href={facebook} target="_blank" sx={{
                            px: [1]
                        }}>
                            <FacebookIcon />
                        </Link>
                        <Link href={twitter} target="_blank" sx={{
                            px: [1]
                        }}>
                            <TwitterIcon />
                        </Link>
                        <Link href={linkedIn} target="_blank" sx={{
                            px: [1]
                        }}>
                            <LinkedInIcon />
                        </Link>
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