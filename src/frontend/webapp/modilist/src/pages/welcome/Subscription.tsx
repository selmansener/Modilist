import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Paper, styled, TextField, Typography, useTheme } from '@mui/material';
import { LocalizationProvider, PickersDay, PickersDayProps, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect } from 'react';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';
import { useTranslation } from 'react-i18next';
import add from 'date-fns/add';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../store/store';

type CustomPickerDayProps = PickersDayProps<Date> & {
    dayIsBetween: boolean;
    isFirstDay: boolean;
    isLastDay: boolean;
};

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
        prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
    ...(dayIsBetween && {
        borderRadius: 0,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.dark,
        },
    }),
    ...(isFirstDay && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
    }),
    ...(isLastDay && {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
    }),
})) as React.ComponentType<CustomPickerDayProps>;

export default function Subscription() {
    const theme = useTheme();
    const { t } = useTranslation();
    const { activeStep, skipped } = useSelector((state: RootState) => state.welcomeStepsModel);
    const dispatch = useDispatch<Dispatch>();
    // TODO: get this from i18n
    const [locale, setLocale] = React.useState<string>('tr');
    const [value, setValue] = React.useState<Date | null>(new Date());
    const [minDate] = React.useState<Date>(add(new Date(), {
        weeks: 2
    }));

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    useEffect(() => {
        dispatch.welcomeStepsModel.setNextCallback(() => {
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            dispatch.welcomeStepsModel.setActiveStep(activeStep + 1);
            dispatch.welcomeStepsModel.setSkipped(newSkipped);
        });

        dispatch.welcomeStepsModel.setBackCallback(() => {
            let newSkipped = skipped;
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);

            const newStep = activeStep - 1;
            dispatch.welcomeStepsModel.setActiveStep(newStep);
            dispatch.welcomeStepsModel.setSkipped(newSkipped);
        });
    }, []);

    const renderWeekPickerDay = (
        date: Date,
        selectedDates: Array<Date | null>,
        pickersDayProps: PickersDayProps<Date>,
    ) => {
        if (!value) {
            return <PickersDay {...pickersDayProps} />;
        }

        const start = startOfWeek(value);
        const end = endOfWeek(value);

        const dayIsBetween = isWithinInterval(date, { start, end });
        const isFirstDay = isSameDay(date, start);
        const isLastDay = isSameDay(date, end);

        return (
            <CustomPickersDay
                {...pickersDayProps}
                disableMargin
                dayIsBetween={dayIsBetween}
                isFirstDay={isFirstDay}
                isLastDay={isLastDay}
            />
        );
    };

    return (

        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h6' align='left' sx={{ m: 1 }}>{t("WelcomeSteps.Subscription.StartDateTitle")}</Typography>
                <Typography variant='subtitle1' align='left' sx={{ m: 1 }}>{t("WelcomeSteps.Subscription.StartDateSubtitle")}</Typography>
            </Grid>
            <Grid item xs={12} sx={{
                display: 'flex',
                flexShrink: 1,
                justifyContent: 'center'
            }}>
                <Paper sx={{}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            label="Week picker"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderDay={renderWeekPickerDay}
                            renderInput={(params) => <TextField {...params} />}
                            inputFormat="'Week of' MMM d"
                            minDate={minDate}
                        />
                    </LocalizationProvider>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6' align='left' sx={{ m: 1 }}>{t("WelcomeSteps.Subscription.Title")}</Typography>
                <Typography variant='subtitle1' align='left' sx={{ m: 1 }}>{t("WelcomeSteps.Subscription.Subtitle")}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Card >
                    <CardActionArea onClick={() => {
                        console.log(1);
                    }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/cards/contemplative-reptile.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {t("WelcomeSteps.Subscription.TwoWeeks")}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {t("WelcomeSteps.Subscription.TwoWeeksDescription")}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {t("WelcomeSteps.Subscription.StyleConsultancyPrice")}
                            </Typography>
                            <Box sx={{
                                display:'flex',
                                width: 100,
                                borderRadius: 2,
                                backgroundColor: theme.palette.grey[100],
                                justifyContent: 'center'
                            }}>
                                <Typography gutterBottom variant="h3" component="div">
                                    <CurrencyLiraIcon />
                                    40
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card >
                    <CardActionArea onClick={() => {
                        console.log(2);
                    }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/cards/contemplative-reptile.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {t("WelcomeSteps.Subscription.Monthly")}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {t("WelcomeSteps.Subscription.MonthlyDescription")}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {t("WelcomeSteps.Subscription.StyleConsultancyPrice")}
                            </Typography>
                            <Box sx={{
                                display:'flex',
                                width: 100,
                                borderRadius: 2,
                                backgroundColor: theme.palette.grey[100],
                                justifyContent: 'center'
                            }}>
                                <Typography gutterBottom variant="h3" component="div">
                                    <CurrencyLiraIcon />
                                    45
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card >
                    <CardActionArea onClick={() => {
                        console.log(3);
                    }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/cards/contemplative-reptile.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {t("WelcomeSteps.Subscription.ThreeMonths")}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {t("WelcomeSteps.Subscription.ThreeMonthsDescription")}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {t("WelcomeSteps.Subscription.StyleConsultancyPrice")}
                            </Typography>
                            <Box sx={{
                                display:'flex',
                                width: 100,
                                borderRadius: 2,
                                backgroundColor: theme.palette.grey[100],
                                justifyContent: 'center'
                            }}>
                                <Typography gutterBottom variant="h3" component="div">
                                    <CurrencyLiraIcon />
                                    65
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    );
}
