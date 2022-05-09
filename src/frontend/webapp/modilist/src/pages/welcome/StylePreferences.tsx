import { Box, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useState } from "react";
import { CustomCheckboxGroup } from "../../components/customCheckbox/CustomCheckbox";
import { useTranslation } from "react-i18next";

export default function StylePreferences() {
    const { t } = useTranslation();


    const [personName, setPersonName] = useState<string[]>([]);
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

    const choiseReasons = [
        'Trendleri Takip Etmek',
        'Alışverişten Zaman Kazanmak',
        'Özel Stil Danışmanım Olması',
        'Yerel ve Butik Markaları Denemek',
        'Süprizlerle Kendimi Şımartmak',
        'Kendime Yeni Bir Stil Oluşturmak'
    ];
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

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h6' align='left' sx={{ m: 1 }}>
                    Stil Tercihleri
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Bizi Tercih Etme Sebebiniz</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
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
                    <Typography>
                        Alışveriş yapmayı seviyor musun?
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Typography variant='caption'>Sevmiyorum</Typography>
                        <Rating
                            name="love-shopping"
                            defaultValue={0}
                            IconContainerComponent={IconContainer}
                            highlightSelectedOnly
                        />
                        <Typography variant='caption'>Seviyorum</Typography>
                    </div>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <Typography>
                        Stilin dışında önerilere ne kadar açıksın?
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Typography variant='caption'>Değilim</Typography>
                        <Rating
                            name="love-shopping"
                            defaultValue={0}
                            IconContainerComponent={IconContainer}
                            highlightSelectedOnly
                        />
                        <Typography variant='caption'>Açığım</Typography>
                    </div>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1 }}>
                    <CustomCheckboxGroup
                        label={(
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                mb: 2
                            }}>
                                <Typography sx={{ mr: 1 }}>
                                    {t("WelcomeSteps.StylePreferences.UnwantedPieces1")}
                                </Typography>
                                <Typography color={"error"} sx={{ mr: 1 }}>
                                    {t("WelcomeSteps.StylePreferences.UnwantedPieces2")}
                                </Typography>
                                <Typography>
                                    {t("WelcomeSteps.StylePreferences.UnwantedPieces3")}
                                </Typography>
                            </Box>
                        )}
                        contents={
                            [
                                {
                                    value: "13",
                                    element: (<img src="13.jpg" />) // TODO: get image urls from storage
                                },
                                {
                                    value: "14",
                                    element: <img src="14.jpg" />
                                },
                                {
                                    value: "15",
                                    element: <img src="15.jpg" />
                                },
                                {
                                    value: "16",
                                    element: <img src="16.jpg" />
                                }
                            ]
                        }
                        isNegative
                        onChange={(values: string[]) => {
                            console.log(values)
                        }}
                    />
                </FormControl>
            </Grid>
        </Grid>
    )
}