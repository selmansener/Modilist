import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, FormControl, Grid, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../../store/store';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import add from 'date-fns/add'
import { AccountDTO } from '../../../services/swagger/api';

export default function Personal() {
    const maxDate = add(new Date(), {
        years: -18
    });
    const { t } = useTranslation();
    const { isBusy: getAccountIsBusy, data: initialAccount, status: getAccountStatus } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: updateAccountIsBusy, data: updateAccount, status: updateAccountStatus } = useSelector((state: RootState) => state.updateAccountModel);
    const [locale] = React.useState<string>('tr');
    const dispatch = useDispatch<Dispatch>();
    const [isBusy] = useState<boolean>(getAccountIsBusy || updateAccountIsBusy);
    const requiredField = t("FormValidation.RequiredField");

    const schema = Yup.object({
        firstName: Yup.string().required(requiredField),
        lastName: Yup.string().required(requiredField),
        birthDate: Yup.date().max(maxDate, requiredField).required(requiredField).typeError(requiredField),
        gender: Yup.string().oneOf(["Male", "Female"], requiredField).required(requiredField),
        phone: Yup.string().required(requiredField),
        instagramUserName: Yup.string().optional(),
        jobTitle: Yup.string().optional()
    });

    const {
        handleChange,
        handleBlur,
        touched,
        errors,
        values: account,
        setFieldValue,
        submitForm,
    } = useFormik({
        enableReinitialize: true,
        initialValues: initialAccount ?? {} as AccountDTO,
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch.updateAccountModel.updateAccount(values);
        },
    });

    useEffect(() => {
        if (initialAccount?.id === "" && !getAccountIsBusy) {
            dispatch.getAccountModel.getAccount();
        }

        dispatch.stepperSubscription.setPersonal(() => {
            submitForm();
        });
    }, []);

    useEffect(() => {
        if (updateAccountStatus === 200) {
            if (updateAccount) {
                dispatch.getAccountModel.HANDLE_RESPONSE(updateAccount, updateAccountStatus);
            }
            
            // dispatch.updateAccountModel.RESET();
        }
    }, [updateAccountStatus]);

    return <>
        <Grid item container spacing={2}>
            <Grid item container xs={12} spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' align='left' sx={{ m: 1 }}>
                        {t("Pages.Welcome.Personal.HeaderPersonalInfo")}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField label={<Typography>{t('Generic.PersonalInfo.FirstName')}</Typography>}
                            name="firstName"
                            disabled={isBusy}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.firstName && errors.firstName}
                            error={touched.firstName && errors.firstName !== undefined}
                            variant="outlined"
                            value={account?.firstName} />
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField label={<Typography>{t('Generic.PersonalInfo.LastName')}</Typography>}
                            name="lastName"
                            disabled={isBusy}
                            helperText={touched.lastName && errors.lastName}
                            error={touched.lastName && errors.lastName !== undefined}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined" value={account?.lastName} />
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
                            <DatePicker
                                label={<Typography>{t('Generic.PersonalInfo.BirthDate')}</Typography>}
                                disabled={isBusy}
                                value={account?.birthDate ?? null}
                                views={["year", "month", "day"]}
                                maxDate={maxDate}
                                inputFormat={"dd/MM/yyyy"}
                                onChange={(newValue) => {
                                    setFieldValue("birthDate", newValue);
                                }}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        ref={params.ref}
                                        disabled={isBusy}
                                        name="birthDate"
                                        helperText={(
                                            touched.birthDate && errors.birthDate
                                        )}
                                        error={touched.birthDate && errors.birthDate !== undefined}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                }
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField label={<Typography>{t('Generic.PersonalInfo.PhoneNumber')}</Typography>}
                            name="phone"
                            error={touched.phone && errors.phone !== undefined}
                            helperText={(touched.phone && errors.phone)}
                            value={account?.phone}
                            disabled={isBusy}
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur} />
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField label={<Typography>{t('Pages.Welcome.Personal.Job')}</Typography>} variant="outlined"
                            disabled={isBusy}
                            onChange={handleChange}
                            value={account?.jobTitle} />
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField label={<Typography>{t('Pages.Welcome.Personal.Instagram')}</Typography>} variant="outlined"
                            disabled={isBusy}
                            onChange={handleChange}
                            value={account?.instagramUserName} />
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    </>
}