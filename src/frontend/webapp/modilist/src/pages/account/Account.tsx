import { Button, FormControl, Grid, Paper, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Gender, GetAccountOutputDTO, GetAccountOutputDTOCommonResponse, UpdateAccount } from "../../services/swagger/api";

export function Account() {
    const { t } = useTranslation();
    const [locale, setLocale] = useState<string>('tr');
    const maxDate = moment().subtract(18, 'years');
    const { isBusy: getAccountIsBusy, response: getAccountResponse } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: updateAccountIsBusy, response: updateAccountResponse } = useSelector((state: RootState) => state.updateAccountModel);
    const dispatch = useDispatch<Dispatch>();
    const [account, setAccount] = useState<GetAccountOutputDTO>({
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

    function parseDateString(value: Date, originalValue: Date) {
        return moment(value).toDate();
    }

    const schema = Yup.object({
        firstName: Yup.string().required("* Gerekli Alan"),
        lastName: Yup.string().required("* Gerekli Alan"),
        birthDate: Yup.date().transform(parseDateString).required("* Gerekli Alan")
    });

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
                dispatch.updateAccountModel.updateAccount(account).then(() => {
                    if (updateAccountResponse?.data) {
                        setAccount({
                            ...account,
                            ...updateAccountResponse?.data
                        });
                    }
                });
            }
        },
    });

    useEffect(() => {
        if (getAccountResponse?.data) {
            setAccount({
                ...account,
                ...getAccountResponse.data
            });
            setFormikState(state => {
                for (const key in state.values) {
                    if ((getAccountResponse.data as GetAccountOutputDTO)[key as keyof typeof getAccountResponse.data]) {
                        setFieldValue(key, (getAccountResponse.data as GetAccountOutputDTO)[key as keyof typeof getAccountResponse.data]);
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
                        <TextField label="Ad"
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
                        <TextField label="Soyad"
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
                        <LocalizationProvider dateAdapter={AdapterMoment} locale={locale}>
                            <DatePicker
                                label="Doğum Tarihi"
                                value={account?.birthDate ? moment(account?.birthDate) : null}
                                maxDate={maxDate}
                                inputFormat={"DD/MM/YYYY"}
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
                                        label="Doğum Tarihi"
                                        name="birthDate"
                                        value={account?.birthDate?.toString()}
                                        helperText={(
                                            touched.birthDate && errors.birthDate && errors.birthDate
                                        )}
                                        onChange={(e) => {
                                            if (account) {
                                                setAccount({
                                                    ...account,
                                                    birthDate: moment(e.target.value).toDate()
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
                        <TextField label="Boy"
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Kilo" type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Mesleğin nedir? (Optional)" value={account?.jobTitle} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Instagram adresin? (Optional)" value={account?.instagramUserName} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Telefon" value={account?.phone} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mb: 5 }}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <Button variant="contained"
                            onClick={() => {
                                handleSubmit();
                            }}
                            color="secondary">
                            <Typography>Kaydet</Typography>
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    )
}
