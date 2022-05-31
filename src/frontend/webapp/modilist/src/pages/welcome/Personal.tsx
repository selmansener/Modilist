import * as React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../store/store';
import { AccountDTO, Gender, UpdateAccount } from '../../services/swagger/api';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import add from 'date-fns/add'


export default function Personal() {
    const maxDate = add(new Date(), {
        years: -18
    });
    const { t } = useTranslation();
    const { isBusy: getAccountIsBusy, data: initialAccount, status } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: updateAccountIsBusy, data: updateAccount, status: updateAccountStatus } = useSelector((state: RootState) => state.updateAccountModel);
    const { activeStep, skipped } = useSelector((state: RootState) => state.welcomeStepsModel);
    const [account, setAccount] = useState<AccountDTO>({});
    const [isValid, setIsValid] = useState<boolean>(false);
    const [locale] = React.useState<string>('tr');
    const dispatch = useDispatch<Dispatch>();
    const [isBusy] = useState<boolean>(getAccountIsBusy || updateAccountIsBusy);

    const handleGenderChange = (event: SelectChangeEvent) => {
        if (event.target.value) {
            setAccount({
                ...account,
                gender: event.target.value as Gender
            });
        }

        handleChange(event);
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const schema = Yup.object({
        firstName: Yup.string().required("* Gerekli Alan"),
        lastName: Yup.string().required("* Gerekli Alan"),
        birthDate: Yup.date().required("* Gerekli Alan"),
        gender: Yup.string().oneOf(["Male", "Female"], "* Gerekli Alan").required("* Gerekli Alan")
    });

    const {
        handleChange,
        handleBlur,
        touched,
        errors,
        validateForm
    } = useFormik({
        enableReinitialize: true,
        initialValues: account,
        validationSchema: schema,
        onSubmit: (values) => {
        },
    });

    useEffect(() => {
        if (isValid) {
            dispatch.updateAccountModel.updateAccount(account)
        }
    }, [isValid]);

    useEffect(() => {
        if (initialAccount) {
            setAccount(initialAccount);
        }
    }, [initialAccount]);

    useEffect(() => {
        if (updateAccountStatus === 200) {
            if (updateAccount) {
                dispatch.getAccountModel.HANDLE_RESPONSE(updateAccount, updateAccountStatus);
            }

            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            dispatch.welcomeStepsModel.setActiveStep(activeStep + 1);
            dispatch.welcomeStepsModel.setSkipped(newSkipped);
            dispatch.updateAccountModel.RESET();
        }
    }, [updateAccountStatus])

    useEffect(() => {
        dispatch.welcomeStepsModel.setNextCallback(() => {
            validateForm(account).then((errors) => {
                setIsValid(Object.keys(errors).length === 0);
            });
        });

        dispatch.welcomeStepsModel.setBackCallback(() => {
        });
    }, [account]);

    return <>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h6' align='left' sx={{ m: 1 }}>
                    Kişisel Bilgiler
                </Typography>
            </Grid>

            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <TextField label={<Typography>{t('Generic.PersonalInfo.FirstName')}</Typography>}
                        name="firstName"
                        disabled={isBusy}
                        onChange={(e) => {
                            setAccount({
                                ...account,
                                firstName: e.target.value
                            });

                            handleChange(e);
                        }}
                        onBlur={handleBlur}
                        helperText={touched.firstName && errors.firstName}
                        error={touched.firstName && errors.firstName !== undefined}
                        variant="outlined"
                        value={account?.firstName} />
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <TextField label={<Typography>{t('Generic.PersonalInfo.LastName')}</Typography>}
                        name="lastName"
                        disabled={isBusy}
                        helperText={touched.lastName && errors.lastName}
                        error={touched.lastName && errors.lastName !== undefined}
                        onChange={(e) => {
                            setAccount({
                                ...account,
                                lastName: e.target.value
                            });

                            handleChange(e);
                        }}
                        onBlur={handleBlur}
                        variant="outlined" value={account?.lastName} />
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
                        <DatePicker
                            label={<Typography>{t('Generic.PersonalInfo.BirthDate')}</Typography>}
                            disabled={isBusy}
                            value={account?.birthDate}
                            maxDate={maxDate}
                            inputFormat={"dd/MM/yyyy"}
                            onChange={(newValue) => {
                                setAccount({
                                    ...account,
                                    birthDate: newValue
                                });
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
                                    onChange={(e) => {
                                        setAccount({
                                            ...account,
                                            birthDate: new Date(e.target.value)
                                        });

                                        handleChange(e);
                                    }}
                                    onBlur={handleBlur}
                                />
                            }
                        />
                    </LocalizationProvider>
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }} error={touched.gender && errors.gender !== undefined}>
                    <InputLabel id="gender-label">{t('Generic.PersonalInfo.Gender.Gender')}</InputLabel>
                    <Select
                        name="gender"
                        disabled={isBusy}
                        labelId="gender-label"
                        id="gender"
                        value={account?.gender ?? Gender.None}
                        label={<Typography>{t('Generic.PersonalInfo.Gender.Gender')}</Typography>}
                        onBlur={handleBlur}
                        onChange={handleGenderChange}
                    >
                        <MenuItem disabled value={"None"}>
                            <em>{t('Pages.Welcome.Personal.MenuItem')}</em>
                        </MenuItem>
                        <MenuItem value={"Female"}>{t('Generic.PersonalInfo.Gender.Female')}</MenuItem>
                        <MenuItem value={"Male"}>{t('Generic.PersonalInfo.Gender.Male')}</MenuItem>
                    </Select>
                    <FormHelperText>{touched.gender && errors?.gender}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <TextField label={<Typography>{t('Generic.PersonalInfo.PhoneNumber')}</Typography>}
                        value={account?.phone}
                        disabled={isBusy}
                        variant="outlined"
                        onChange={(e) => {
                            setAccount({
                                ...account,
                                phone: e.target.value
                            });

                            handleChange(e);
                        }} />
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <TextField label={<Typography>{t('Pages.Welcome.Personal.Job')}</Typography>} variant="outlined"
                        disabled={isBusy}
                        onChange={(e) => {
                            setAccount({
                                ...account,
                                jobTitle: e.target.value
                            });

                            handleChange(e);
                        }}
                        value={account?.jobTitle} />
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <TextField label={<Typography>{t('Pages.Welcome.Personal.Instagram')}</Typography>} variant="outlined"
                        disabled={isBusy}
                        onChange={(e) => {
                            setAccount({
                                ...account,
                                instagramUserName: e.target.value
                            });

                            handleChange(e);
                        }}
                        value={account?.instagramUserName} />
                </FormControl>
            </Grid>
        </Grid>
    </>
}