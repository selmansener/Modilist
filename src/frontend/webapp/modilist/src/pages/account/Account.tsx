import { Button, ClickAwayListener, FormControl, Grid, Paper, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { AccountDTO, Gender, UpdateAccount } from "../../services/swagger/api";
import add from 'date-fns/add'
import React from "react";
import { IMaskInput } from "react-imask";
import trLocale from 'date-fns/locale/tr';

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
                definitions={{
                    '#': /[1-9]/,
                }}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

const localeMap = {
    tr: trLocale
};


export function Account() {
    const { t } = useTranslation();
    const maxDate = add(new Date(), {
        years: -18
    });
    const { isBusy: getAccountIsBusy, data: getAccountResponse } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: updateAccountIsBusy, data: updateAccountResponse, status: updateAccountStatus, errors: validationErrors } = useSelector((state: RootState) => state.updateAccountModel);
    const isBusy = getAccountIsBusy || updateAccountIsBusy;
    const [locale] = React.useState<keyof typeof localeMap>('tr');
    const dispatch = useDispatch<Dispatch>();
    const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
    const [personalNumberShrink, setPersonalNumberShrink] = useState(false);

    const requiredField = t("FormValidation.RequiredField");
    const minCharacters = t("FormValidation.MinCharacters").toString();

    const schema = Yup.object({
        firstName: Yup.string().required(requiredField),
        lastName: Yup.string().required(requiredField),
        birthDate: Yup.date().max(maxDate, requiredField).required(requiredField).typeError(requiredField),
        gender: Yup.string().oneOf(["Male", "Female"], requiredField).required(requiredField),
        phone: Yup.string().test({
            name: 'minCharacters',
            message: `${minCharacters}`,
            test: (value) => value?.length == 12
        }).required(requiredField),
        instagramUserName: Yup.string().optional(),
        jobTitle: Yup.string().optional()
    });

    const {
        setFormikState,
        setFieldValue,
        handleChange,
        handleBlur,
        touched,
        values: account,
        errors,
        submitForm,
    } = useFormik({
        initialValues: getAccountResponse ?? {} as AccountDTO,
        validationSchema: schema,
        onSubmit: (values) => {
            if (values && updateAccountIsBusy == false) {
                dispatch.updateAccountModel.updateAccount(values);
            }
        },
    });

    useEffect(() => {
        if (getAccountResponse === undefined && getAccountIsBusy === false) {
            dispatch.getAccountModel.getAccount();
        }
    }, []);

    useEffect(() => {
        if (updateAccountStatus === 200 && updateAccountResponse) {
            dispatch.getAccountModel.HANDLE_RESPONSE(updateAccountResponse, updateAccountStatus);
            dispatch.updateAccountModel.RESET();
        }
    }, [updateAccountStatus]);
    useEffect(() => {
        setPersonalNumberShrink(account.phone !== undefined && account.phone !== "");
    }, [account]);

    return (
        <Grid container spacing={2}>
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
                <ClickAwayListener onClickAway={() => {
                    setIsDatePickerOpen(false);
                }}>
                    <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
                            <DatePicker
                                open={isDatePickerOpen}
                                label={<Typography>{t('Generic.PersonalInfo.BirthDate')}</Typography>}
                                disabled={isBusy}
                                value={account?.birthDate ?? null}
                                views={["year", "month", "day"]}
                                maxDate={maxDate}
                                inputFormat={"dd/MM/yyyy"}
                                onChange={(newValue) => {
                                    setFieldValue("birthDate", newValue);
                                }}
                                onAccept={() => {
                                    setIsDatePickerOpen(false)
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
                                        inputProps={{
                                            ...params.inputProps,
                                            placeholder: "gg.aa.yyyy"
                                        }}
                                        onChange={handleChange}
                                        onClick={() => {
                                            setIsDatePickerOpen(true);
                                        }}
                                        onBlur={handleBlur}
                                    />
                                }
                            />
                        </LocalizationProvider>
                    </FormControl>
                </ClickAwayListener>
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
                        onBlur={handleBlur}
                        InputProps={{
                            inputComponent: PhoneInputMask as any,
                        }}
                        InputLabelProps={{
                            shrink: personalNumberShrink
                        }} />
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth>
                    <TextField label={<Typography>{t('Pages.Welcome.Personal.Job')}</Typography>} variant="outlined"
                        name="jobTitle"
                        disabled={isBusy}
                        onChange={handleChange}
                        value={account?.jobTitle} />
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth>
                    <TextField label={<Typography>{t('Pages.Welcome.Personal.Instagram')}</Typography>} variant="outlined"
                        name="instagramUserName"
                        disabled={isBusy}
                        onChange={handleChange}
                        value={account?.instagramUserName} />
                </FormControl>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button
                    disabled={isBusy}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        submitForm();
                    }}>
                    {t("Generic.Forms.Submit")}
                </Button>
            </Grid>
        </Grid>
    )
}
