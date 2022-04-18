import * as React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import moment from 'moment';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const choiseReasons = [
    'Trendleri Takip Etmek',
    'Alışverişten Zaman Kazanmak',
    'Özel Stil Danışmanım Olması',
    'Yerel ve Butik Markaları Denemek',
    'Süprizlerle Kendimi Şımartmak',
    'Kendime Yeni Bir Stil Oluşturmak'
];

const maxDate = moment().subtract(18, 'years');
console.log(maxDate);

export default function Personal() {
    const [locale, setLocale] = React.useState<string>('tr');
    const [value, setValue] = React.useState<moment.Moment | null>(null);
    const [personName, setPersonName] = React.useState<string[]>([]);
    const [gender, setGender] = React.useState('');

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleGenderChange = (event: SelectChangeEvent) => {
        setGender(event.target.value as string);
    };

    const customIcons: {
        [index: string]: {
            icon: React.ReactElement;
            label: string;
        };
    } = {
        1: {
            icon: <SentimentVeryDissatisfiedIcon />,
            label: 'Very Dissatisfied',
        },
        2: {
            icon: <SentimentDissatisfiedIcon />,
            label: 'Dissatisfied',
        },
        3: {
            icon: <SentimentSatisfiedIcon />,
            label: 'Neutral',
        },
        4: {
            icon: <SentimentSatisfiedAltIcon />,
            label: 'Satisfied',
        },
        5: {
            icon: <SentimentVerySatisfiedIcon />,
            label: 'Very Satisfied',
        },
    };

    function IconContainer(props: IconContainerProps) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
    }

    return <>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h6' align='left' sx={{ m: 1 }}>
                    Kişisel Bilgiler
                </Typography>
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
                    <Typography>
                        Alışveriş yapmayı seviyor musun?
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Rating
                            name="love-shopping"
                            defaultValue={0}
                            IconContainerComponent={IconContainer}
                            highlightSelectedOnly
                        />
                    </div>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <Typography>
                        Stilin dışında önerilere ne kadar açıksın?
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Rating
                            name="love-shopping"
                            defaultValue={0}
                            IconContainerComponent={IconContainer}
                            highlightSelectedOnly
                        />
                    </div>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Bizi Tercih Etme Sebebiniz</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Bizi Tercih Etme Sebebiniz" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {choiseReasons.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={personName.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
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
                    <InputLabel id="gender-label">Cinsiyet</InputLabel>
                    <Select
                        labelId="gender-label"
                        id="gender"
                        value={gender}
                        label="Cinsiyet"
                        onChange={handleGenderChange}
                    >
                        <MenuItem value={"Kadın"}>Kadın</MenuItem>
                        <MenuItem value={"Erkek"}>Erkek</MenuItem>
                    </Select>
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
        </Grid>
    </>
}