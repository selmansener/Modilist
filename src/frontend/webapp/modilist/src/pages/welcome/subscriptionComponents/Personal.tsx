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
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { IMaskInput } from 'react-imask';
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
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

const localeMap = {
    tr: trLocale
};

export default function Personal() {
    const maxDate = add(new Date(), {
        years: -18
    });
    const { t } = useTranslation();
    const { isBusy: getAccountIsBusy, data: initialAccount, status: getAccountStatus } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: updateAccountIsBusy, data: updateAccount, status: updateAccountStatus } = useSelector((state: RootState) => state.updateAccountModel);
    const [locale] = React.useState<keyof typeof localeMap>('tr');
    const dispatch = useDispatch<Dispatch>();
    const [isBusy] = useState<boolean>(getAccountIsBusy || updateAccountIsBusy);
    const requiredField = t("FormValidation.RequiredField");
    const minCharacters = t("FormValidation.MinCharacters").toString();
    const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);
    const [personalNumberShrink, setpersonalNumberShrink] = useState(false);
    const schema = Yup.object({
        firstName: Yup.string().required(requiredField),
        lastName: Yup.string().required(requiredField),
        birthDate: Yup.date().max(maxDate, requiredField).required(requiredField).typeError(requiredField),
        gender: Yup.string().oneOf(["Male", "Female"], requiredField).required(requiredField),
        phone: Yup.string().test({
            name: 'minCharacters',
            message: `${minCharacters}`,
            test: (value) =>              
                    value?.length == 12 
            }).required(requiredField),
        instagramUserName: Yup.string().optional(),
        jobTitle: Yup.string().optional()
    });

    const {
        handleChange,
        handleBlur,
        touched,
        errors,
        isValid,
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
            if (!isValid) {
                window.scrollTo(0, 0);
            }
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

    useEffect(() => {
        setpersonalNumberShrink(account.phone !== undefined && account.phone !== "");
    }, [account]);

    return <Grid item container xs={12} spacing={4}>
        <Grid item xs={12}>
            <Typography variant='h3' align='left' sx={{ m: 1 }}>
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
    </Grid>
}