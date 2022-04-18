import { Grid, styled, TextField, Typography } from '@mui/material';
import { CalendarPicker, LocalizationProvider, PickersDay, PickersDayProps, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import React from 'react';


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
    const minDate = moment().add(2, 'week');
    const [locale, setLocale] = React.useState<string>('tr');
    const [value, setValue] = React.useState<moment.Moment | null>(minDate);

    const renderWeekPickerDay = (
        date: Date,
        selectedDates: Array<Date | null>,
        pickersDayProps: PickersDayProps<Date>,
    ) => {
        if (!value) {
            return <PickersDay {...pickersDayProps} />;
        }

        const start = moment(value).startOf('week');
        const end = moment(value).endOf('week');
        const dayIsBetween = moment(date).isBetween(start, end);
        const isFirstDay = moment(date).isSame(start, 'day');
        const isLastDay = moment(date).isSame(end, 'day');

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
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' align='left' sx={{ m: 1 }}>
                        Abonelik Başlangıç Tarihi
                    </Typography>
                </Grid>

                <Grid item xs={8}>
                    {/* TODO: fix moment issue */}
                    {/* <LocalizationProvider dateAdapter={AdapterMoment} locale={locale}>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            label="Week picker"
                            value={value?.toDate()}
                            onChange={(newValue) => {
                                setValue(newValue ? moment(newValue) : null);
                            }}
                            renderDay={renderWeekPickerDay}
                            renderInput={(params) => <TextField {...params} />}
                            inputFormat="'Week of' MMM d"
                            minDate={minDate.toDate()}
                        />
                    </LocalizationProvider> */}
                </Grid>
            </Grid>

        </>
    )
}