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

export function Account() {
    const { t } = useTranslation();
    const [locale, setLocale] = useState<string>('tr');
    const [birthDate, setBirthDate] = useState<moment.Moment | null>(null);
    const maxDate = moment().subtract(18, 'years');
    const { isBusy, response } = useSelector((state: RootState) => state.getAccountModel);
    const dispatch = useDispatch<Dispatch>();
    const account = response?.data;

    const schema = Yup.object({
        firstName: Yup.string().required("* Gerekli Alan"),
        lastName: Yup.string().required("* Gerekli Alan")
    });

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        values,
        errors,
    } = useFormik({
        initialValues: account ?? {
            firstName: "",
            lastName: ""
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (account) {
                dispatch.updateAccountModel.updateAccount(account);
            }
        },
    });

    useEffect(() => {
        if (isBusy == false) {
            dispatch.getAccountModel.getAccount()
                .then(() => {
                    if (account?.birthDate) {
                        setBirthDate(moment(account?.birthDate));
                    }
                });
        }
    }, []);

    return (
        <Paper>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' align='left' sx={{ m: 1 }}>
                        {t('Welcome to React')}
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Ad"
                            name="firstName"
                            helperText={touched.firstName && errors.firstName &&
                                <Typography>
                                    {errors.firstName}
                                </Typography>}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined" error={touched.firstName && errors.firstName !== undefined} value={account?.firstName} />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Soyad"
                            name="lastName"
                            helperText={touched.lastName && errors.lastName &&
                                <Typography>
                                    {errors.lastName}
                                </Typography>}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined" error={touched.lastName && errors.lastName !== undefined} value={account?.lastName} />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <LocalizationProvider dateAdapter={AdapterMoment} locale={locale}>
                            {/* TODO: handle validation */}
                            <DatePicker
                                label="Doğum Tarihi"
                                value={birthDate}
                                maxDate={maxDate}
                                inputFormat={"DD/MM/YYYY"}
                                onChange={(newValue) => {
                                    setBirthDate(newValue);
                                    if (account) {
                                        account.birthDate = newValue?.toDate();
                                    }

                                    // handleChange(newValue?.toDate());
                                }}
                                renderInput={(params) => <TextField {...params} />}
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
                                console.log("test");
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
