import { Button, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Paper, Rating, Select, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { locale } from "moment";
import { useState } from "react";
import moment from "moment";

export function Account() {
    const [locale, setLocale] = useState<string>('tr');
    const [value, setValue] = useState<moment.Moment | null>(null);
    const maxDate = moment().subtract(18, 'years');

    return (
        <Paper>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' align='left' sx={{ m: 1 }}>
                        Kişisel Bilgiler
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Ad" variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Soyad" variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <LocalizationProvider dateAdapter={AdapterMoment} locale={locale}>
                            <DatePicker
                                label="Doğum Tarihi"
                                value={value}
                                maxDate={maxDate}
                                inputFormat={"DD/MM/YYYY"}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Boy" type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Kilo" type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Mesleğin nedir? (Optional)" variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Instagram adresin? (Optional)" variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <TextField label="Telefon" variant="outlined" />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mb:5 }}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <Button variant="contained">
                            <Typography>Kaydet</Typography>
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    )
}