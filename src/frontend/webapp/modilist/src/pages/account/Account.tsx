import { Button, FormControl, Grid, Paper, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { AccountDTO, Gender, UpdateAccount } from "../../services/swagger/api";
import add from 'date-fns/add'

export function Account() {
    const { t } = useTranslation();
    const [locale, setLocale] = useState<string>('tr');
    const maxDate = add(new Date(), {
        years: -18
    });
    const { isBusy: getAccountIsBusy, data: getAccountResponse } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: updateAccountIsBusy, data: updateAccountResponse, errors: validationErrors } = useSelector((state: RootState) => state.updateAccountModel);
    const dispatch = useDispatch<Dispatch>();
    const [account, setAccount] = useState<AccountDTO>({
        firstName: '',
        lastName: '',
        birthDate: new Date(),
        email: '',
        gender: Gender.None,
        id: '',
        instagramUserName: '',
        jobTitle: '',
        phone: ''
    });

    const schema = Yup.object({
        firstName: Yup.string().required("* Gerekli Alan"),
        lastName: Yup.string().required("* Gerekli Alan"),
        birthDate: Yup.date().required("* Gerekli Alan")
    });

    useEffect(() => {
        if (getAccountResponse) {
            setAccount({
                ...account,
                gender: getAccountResponse.gender
            });
        }
    }, [getAccountResponse])

    useEffect(() => {
        console.log(validationErrors);
    }, [validationErrors])

    const {
        setFormikState,
        setFieldValue,
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        values,
        errors,
    } = useFormik({
        initialValues: account,
        validationSchema: schema,
        onSubmit: (values) => {
            if (account && updateAccountIsBusy == false) {
                dispatch.updateAccountModel.updateAccount(account);
            }
        },
    });

    useEffect(() => {
        if (getAccountResponse) {
            setAccount({
                ...account,
                ...getAccountResponse
            });
            setFormikState(state => {
                for (const key in state.values) {
                    if ((getAccountResponse as AccountDTO)[key as keyof typeof getAccountResponse]) {
                        setFieldValue(key, (getAccountResponse as AccountDTO)[key as keyof typeof getAccountResponse]);
                    }
                }

                return state;
            });
        }
    }, [getAccountResponse]);

    useEffect(() => {
        if (getAccountIsBusy == false) {
            dispatch.getAccountModel.getAccount();
        }
    }, []);

    return (
        <Paper>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' align='left' sx={{ m: 1 }}>
                        {t('Pages.Account.PersonalInfo')}
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label={t('Generic.PersonalInfo.FirstName')}
                            name="firstName"
                            helperText={touched.firstName && errors.firstName && errors.firstName}
                            onChange={(e) => {
                                if (account) {
                                    setAccount({
                                        ...account,
                                        firstName: e.target.value
                                    });
                                }

                                handleChange(e);
                            }}
                            onBlur={handleBlur}
                            variant="outlined" error={touched.firstName && errors.firstName !== undefined} value={account?.firstName} />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label={t('Generic.PersonalInfo.LastName')}
                            name="lastName"
                            helperText={touched.lastName && errors.lastName && errors.lastName}
                            onChange={(e) => {
                                if (account) {
                                    setAccount({
                                        ...account,
                                        lastName: e.target.value
                                    });
                                }

                                handleChange(e);
                            }}
                            onBlur={handleBlur}
                            variant="outlined" error={touched.lastName && errors.lastName !== undefined} value={account?.lastName} />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
                            <DatePicker
                                label={t('Generic.PersonalInfo.BirthDate')}
                                value={account?.birthDate}
                                maxDate={maxDate}
                                inputFormat={"dd/MM/yyyy"}
                                onChange={(newValue) => {


                                    if (account) {
                                        //account.birthDate = newValue?.toDate();
                                        // setFieldValue("birthDate", newValue?.toString());
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        ref={params.ref}
                                        {...params}
                                        color="primary"
                                        label={t('Generic.PersonalInfo.BirthDate')}
                                        name="birthDate"
                                        value={account?.birthDate?.toString()}
                                        helperText={(
                                            touched.birthDate && errors.birthDate && errors.birthDate
                                        )}
                                        onChange={(e) => {
                                            if (account) {
                                                setAccount({
                                                    ...account,
                                                    birthDate: new Date(e.target.value)
                                                });
                                                // setFieldValue("birthDate", e.target.value?.toString());
                                            }

                                            handleChange(e);
                                        }}
                                        onBlur={(e) => {
                                            handleBlur(e);
                                        }}
                                        variant="outlined" error={touched.birthDate && errors.birthDate !== undefined} />
                                )}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label= {t('Pages.Account.Job')} value={account?.jobTitle} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label={t('Pages.Account.Instagram')}  value={account?.instagramUserName} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label={t('Generic.PersonalInfo.PhoneNumber')} value={account?.phone} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mb: 5 }}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <Button variant="contained"
                            onClick={() => {
                                handleSubmit();
                            }}
                            color="secondary"> 
                            <Typography>{t('Pages.Account.Button.Save')}</Typography> 
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    )
}
