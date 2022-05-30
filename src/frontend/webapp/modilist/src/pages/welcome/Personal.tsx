import * as React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../store/store';
import { Gender, UpdateAccount } from '../../services/swagger/api';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import i18n, { t } from "i18next";
import { useTranslation } from "react-i18next";
import add from 'date-fns/add'


export default function Personal() {
    const maxDate = add(new Date(), {
        years: -18
    });
    const {t} = useTranslation();
    const { account } = useSelector((state: RootState) => state.welcomePageModel);
    const [locale, setLocale] = React.useState<string>('tr');
    const { isBusy: updateAccountIsBusy, data: updateAccountResponse } = useSelector((state: RootState) => state.updateAccountModel);
    const dispatch = useDispatch<Dispatch>();

    const handleGenderChange = (event: SelectChangeEvent) => {

        if (event.target.value) {
            dispatch.welcomePageModel.setAccount({
                ...account,
                gender: event.target.value as Gender
            });
        }

        handleChange(event);
    };
    
    const schema = Yup.object({
        gender: Yup.string().oneOf(["Male", "Female"], "* Gerekli Alan").required("* Gerekli Alan")
    });

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        errors,
        isValid
    } = useFormik({
        initialValues: {
            gender: undefined
        } as {
            gender: Gender | undefined
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (account && updateAccountIsBusy == false) {
                dispatch.updateAccountModel.updateAccount(account).then((response) => {
                    dispatch.welcomePageModel.setAccount(response);
                }).catch((er) => console.log(er));
            }
        },
    });

    useEffect(() => {
        dispatch.welcomeStepsModel.setOnSubmit(handleSubmit);
        dispatch.getAccountModel.getAccount();
    }, []);

    useEffect(() => {
        dispatch.welcomeStepsModel.setValidator(() => {
            return errors.gender === undefined || errors.gender === "None";
        });
    }, [errors]);
    
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
                        onChange={(e) => {
                            dispatch.welcomePageModel.setAccount({
                                ...account,
                                firstName: e.target.value
                            });
                        }}
                        variant="outlined" value={account?.firstName} />
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <TextField label={<Typography>{t('Generic.PersonalInfo.LastName')}</Typography>}
                        name="lastName"
                        onChange={(e) => {
                            dispatch.welcomePageModel.setAccount({
                                ...account,
                                lastName: e.target.value
                            });
                        }}
                        variant="outlined" value={account?.lastName} />
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
                        <DatePicker
                            label={<Typography>{t('Generic.PersonalInfo.BirthDate')}</Typography>}
                            value={account?.birthDate}
                            maxDate={maxDate}
                            inputFormat={"dd/MM/yyyy"}
                            onChange={(newValue) => {
                                dispatch.welcomePageModel.setAccount({
                                    ...account,
                                    birthDate: newValue
                                });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }} error={touched.gender && errors.gender !== undefined}>
                    <InputLabel id="gender-label">{t('Generic.PersonalInfo.Gender.Gender')}</InputLabel>
                    <Select
                        name="gender"
                        labelId="gender-label"
                        id="gender"
                        value={account?.gender}
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
                    <TextField label={<Typography>{t('Generic.PersonalInfo.PhoneNumber')}</Typography>} value={account?.phone}
                        variant="outlined"
                        onChange={(e) => {
                            dispatch.welcomePageModel.setAccount({
                                ...account,
                                phone: e.target.value
                            });
                        }}/>
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <TextField label={<Typography>{t('Pages.Welcome.Personal.Job')}</Typography>} variant="outlined"
                        onChange={(e) => {
                            dispatch.welcomePageModel.setAccount({
                                ...account,
                                jobTitle: e.target.value
                            });
                        }}
                        value={account.jobTitle} />
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <TextField label={<Typography>{t('Pages.Welcome.Personal.Instagram')}</Typography>} variant="outlined"
                        onChange={(e) => {
                            dispatch.welcomePageModel.setAccount({
                                ...account,
                                instagramUserName: e.target.value
                            });
                        }}
                        value={account.instagramUserName} />
                </FormControl>
            </Grid>
        </Grid>
    </>
}