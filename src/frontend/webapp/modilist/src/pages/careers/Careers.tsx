import { Alert, Button, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FileUpload } from "../../components/fileUpload/FileUpload";
import { config } from "../../config";
import * as Yup from "yup";
import { useFormik } from "formik";
import { IMaskInput } from "react-imask";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";


interface JobApplication {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    department: string;
    jobTitle: string;
    files: File[];
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


export function Careers() {
    const { t } = useTranslation();
    const { cdn } = config;
    const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>();
    const { isBusy, status } = useSelector((state: RootState) => state.sendJobApplicationMailModel);
    const dispatch = useDispatch<Dispatch>();
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const requiredField = t("FormValidation.RequiredField");
    const minCharacters = t("FormValidation.MinCharacters").toString();

    const departments = [
        {
            name: "HumanResources",
            jobTitles: [
                "JuniorTalentAcquisitionSpecialist",
                "SeniorTalentAcquisitionSpecialist"
            ]
        },
        {
            name: "CustomerExcellence",
            jobTitles: [
                "CustomerOperationSpecialist",
                "CustomerSuccessManager"
            ]
        },
        {
            name: "Engineering",
            jobTitles: [
                "JuniorSoftwareTestEngineer",
                "SeniorSoftwareTestEngineer",
                "JuniorSoftwareEngineer",
                "SeniorSoftwareEngineer",
                "JuniorDatabaseAdministrator",
                "SeniorDatabaseAdministrator",
                "DevOpsEngineer",
                "JuniorFrontendDeveloper",
                "SeniorFrontendDeveloper",
                "JuniorBackendDeveloper",
                "SeniorBackendDeveloper",
                "JuniorMobileDeveloper",
                "SeniorMobileDeveloper"
            ]
        },
        {
            name: "Other",
            jobTitles: [
                "GeneralApplication"
            ]
        }
    ];

    const schema = Yup.object({
        firstName: Yup.string().required(requiredField),
        lastName: Yup.string().required(requiredField),
        email: Yup.string().email(requiredField).required(requiredField),
        phone: Yup.string().test({
            name: 'minCharacters',
            message: `${minCharacters}`,
            test: (value) => value?.length == 12
        }).required(requiredField),
        department: Yup.string().required(requiredField),
        jobTitle: Yup.string().required(requiredField),
        message: Yup.string().required(requiredField),
    });

    const {
        handleChange,
        handleBlur,
        touched,
        values: jobApplication,
        errors,
        submitForm,
        resetForm,
        setFieldValue,
    } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            department: "",
            jobTitle: "",
            message: "",
            files: []
        } as JobApplication,
        validationSchema: schema,
        onSubmit: (values) => {
            const { files, ...templateData } = values;
            dispatch.sendJobApplicationMailModel.sendJobApplicationMail({
                templateId: "d-44a1709970894dffa344aa0bdfec99f5",
                senderName: "Modilist Job Application",
                from: "careers@modilist.com",
                to: "careers@modilist.com",
                templateData: JSON.stringify(templateData),
                attachments: values.files
            })
        },
    });

    const handleDepartmentChange = (e: SelectChangeEvent) => {
        setSelectedDepartment(e.target.value);
        setFieldValue("department", e.target.value);
    }

    useEffect(() => {
        if (!isBusy && status !== 0) {
            if (status === 200) {
                setIsSuccess(true);
                resetForm();
            }
            setSnackbarStatus(true);
            dispatch.sendJobApplicationMailModel.RESET();
        }
    }, [status]);

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h1" align="center">
                    {t("Pages.Careers.Title")}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    {t("Pages.Careers.Description.1")}
                </Typography>
                <Typography variant="h6" align="center">
                    {t("Pages.Careers.Description.2")}
                </Typography>
                <Typography variant="h6" align="center">
                    {t("Pages.Careers.Description.3")}
                </Typography>
            </Grid>
            <Grid item container xs={12} spacing={2} mt={4}>
                <Grid item xs={6} display="flex" justifyContent="center">
                    <video src={`${cdn}/videos/careers.mp4`} autoPlay muted loop width="80%" />
                </Grid>
                <Grid item container xs={6} spacing={2} alignContent="flex-start">
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
                                value={jobApplication?.firstName}
                            />
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
                                value={jobApplication?.lastName}
                            />
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
                                value={jobApplication?.email}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField label={t('Generic.PersonalInfo.PhoneNumber')}
                                name="phone"
                                disabled={isBusy}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.phone && errors.phone}
                                error={touched.phone && errors.phone !== undefined}
                                variant="outlined"
                                value={jobApplication?.phone}
                                InputProps={{
                                    inputComponent: PhoneInputMask as any,
                                }} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth error={touched.department && errors?.department !== undefined}>
                            <InputLabel id="departmentLabel">{t(`Generic.PersonalInfo.Department`)}</InputLabel>
                            <Select
                                disabled={isBusy}
                                name="department"
                                labelId="departmentLabel"
                                id="department"
                                value={jobApplication?.department}
                                label={t(`Generic.PersonalInfo.Department`)}
                                onChange={handleDepartmentChange}
                                onBlur={handleBlur}
                            >
                                <MenuItem disabled>
                                    <em>{t('Generic.Forms.Select')}</em>
                                </MenuItem>
                                {departments.map(department => {
                                    return <MenuItem key={department.name} value={department.name}>{t(`Pages.Careers.Departments.${department.name}`)}</MenuItem>
                                })}
                            </Select>
                            <FormHelperText>{touched.department && errors?.department}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth error={touched.jobTitle && errors?.jobTitle !== undefined}>
                            <InputLabel id="jobTitleLabel">{t(`Generic.PersonalInfo.JobTitle`)}</InputLabel>
                            <Select
                                disabled={isBusy}
                                name="jobTitle"
                                labelId="jobTitleLabel"
                                id="jobTitle"
                                value={jobApplication?.jobTitle}
                                label={t(`Generic.PersonalInfo.JobTitle`)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <MenuItem disabled>
                                    <em>{t('Generic.Forms.Select')}</em>
                                </MenuItem>
                                {departments.find(dep => dep.name === selectedDepartment)?.jobTitles.map(jobTitle => {
                                    return <MenuItem key={jobTitle} value={jobTitle}>{t(`Pages.Careers.JobTitles.${jobTitle}`)}</MenuItem>
                                })}
                            </Select>
                            <FormHelperText>{touched.jobTitle && errors?.jobTitle}</FormHelperText>
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
                                value={jobApplication?.message}
                                helperText={touched.message && errors.message}
                                error={touched.message && errors.message !== undefined}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={10}>
                        <FileUpload
                            disabled={isBusy}
                            variant="multi"
                            value={jobApplication.files}
                            onChange={(files) => {
                                setFieldValue("files", files);
                            }} />
                    </Grid>
                    <Grid item xs={2} display="flex" alignItems="flex-start" justifyContent="flex-end">
                        <Button variant="contained" color="primary" onClick={() => { submitForm() }}>
                            {t("Generic.Forms.CareersApply")}
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