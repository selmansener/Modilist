import { Box, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from "@mui/material";
import Rating from '@mui/material/Rating';
import { useEffect, useState } from "react";
import { CustomCheckboxGroup } from "../../components/customCheckbox/CustomCheckbox";
import { useTranslation } from "react-i18next";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { config } from "../../config";
import { AccountDTO, Gender } from "../../services/swagger/api/models";

interface ProductCategory {
    name: string,
    img: string,
}

export default function StylePreferences() {
    const { t } = useTranslation();
    const [selectedChoiseReasons, setSelectedChoiseReasons] = useState<string[]>([]);
    const { data: account } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: getStylePreferencesIsBusy, data: getStylePreferencesResponse } = useSelector((state: RootState) => state.getStylePreferencesModel);
    const { isBusy: updateStylePreferencesIsBusy, data: updateStylePreferencesResponse, errors: validationErrors } = useSelector((state: RootState) => state.updateStylePreferencesModel);
    const dispatch = useDispatch<Dispatch>();
    const { imgBaseHost } = config;
    const { gender } = account as AccountDTO;

    const commonProductCategories: ProductCategory[] = [
        {
            name: "tshirt",
            img: `${imgBaseHost}/product-category-icons/tshirt.svg`,
        },
        {
            name: "shirt",
            img: `${imgBaseHost}/product-category-icons/shirt.svg`,
        }
    ]

    const femaleProductCategories: ProductCategory[] = [
        ...commonProductCategories,
        {
            name: "dress",
            img: `${imgBaseHost}/product-category-icons/dress.svg`,
        },
        {
            name: "blouse",
            img: `${imgBaseHost}/product-category-icons/blouse.svg`,
        }
    ]

    const maleProductCategories: ProductCategory[] = [
        ...commonProductCategories,
    ]

    const productCategories = gender === Gender.Female ? femaleProductCategories : maleProductCategories;

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

    useEffect(() => {
        dispatch.getStylePreferencesModel.getStylePreferences();
    }, []);

    useEffect(() => {
        console.log(getStylePreferencesResponse);
    }, [getStylePreferencesResponse])

    const handleChoiseReasonChange = (event: SelectChangeEvent<typeof choiseReasons>) => {
        const {
            target: { value },
        } = event;
        setSelectedChoiseReasons(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
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
                        value={selectedChoiseReasons}
                        input={<OutlinedInput label="Bizi Tercih Etme Sebebiniz" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        onChange={handleChoiseReasonChange}
                    >
                        {choiseReasons.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={selectedChoiseReasons.indexOf(name) > -1} />
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
                            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={0.5}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
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
                            name="open-to-suggestions"
                            defaultValue={0}
                            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={0.5}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        />
                        <Typography variant='caption'>Açığım</Typography>
                    </div>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <FormControlLabel control={<Checkbox />} label={t("WelcomeSteps.StylePreferences.Hijab")} />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <CustomCheckboxGroup
                        label={(
                            <Typography>{t("WelcomeSteps.StylePreferences.BodyPartsToHighlight")}</Typography>
                        )}
                        contents={
                            [
                                {
                                    value: "arms",
                                    element: (<Typography>{t("WelcomeSteps.StylePreferences.BodyParts.Arms")}</Typography>) // TODO: get image urls from storage
                                },
                                {
                                    value: "shoulders",
                                    element: <Typography>{t("WelcomeSteps.StylePreferences.BodyParts.Shoulders")}</Typography>
                                },
                                {
                                    value: "back",
                                    element: <Typography>{t("WelcomeSteps.StylePreferences.BodyParts.Back")}</Typography>
                                },
                                {
                                    value: "chest",
                                    element: <Typography>{t("WelcomeSteps.StylePreferences.BodyParts.Chest")}</Typography>
                                },
                                {
                                    value: "abdoment",
                                    element: <Typography>{t("WelcomeSteps.StylePreferences.BodyParts.Abdoment")}</Typography>
                                },
                                {
                                    value: "hips",
                                    element: <Typography>{t("WelcomeSteps.StylePreferences.BodyParts.Hips")}</Typography>
                                },
                                {
                                    value: "legs",
                                    element: <Typography>{t("WelcomeSteps.StylePreferences.BodyParts.Legs")}</Typography>
                                }
                            ]
                        }
                        onChange={(values: string[]) => {
                            console.log(values)
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <CustomCheckboxGroup
                        label={(
                            <Typography>{t("WelcomeSteps.StylePreferences.BodyPartsToPrmote")}</Typography>
                        )}
                        contents={
                            [
                                {
                                    value: "arms",
                                    element: (<Typography>{t("WelcomeSteps.StylePreferences.BodyParts.Arms")}</Typography>) // TODO: get image urls from storage
                                },
                                {
                                    value: "shoulders",
                                    element: <Typography>{t("WelcomeSteps.StylePreferences.BodyParts.Shoulders")}</Typography>
                                },
                                {
                                    value: "back",
                                    element: <Typography>{t("WelcomeSteps.StylePreferences.BodyParts.Back")}</Typography>
                                },
                                {
                                    value: "chest",
                                    element: <Typography>{t("WelcomeSteps.StylePreferences.BodyParts.Chest")}</Typography>
                                },
                                {
                                    value: "abdoment",
                                    element: <Typography>{t("WelcomeSteps.StylePreferences.BodyParts.Abdoment")}</Typography>
                                },
                                {
                                    value: "hips",
                                    element: <Typography>{t("WelcomeSteps.StylePreferences.BodyParts.Hips")}</Typography>
                                },
                                {
                                    value: "legs",
                                    element: <Typography>{t("WelcomeSteps.StylePreferences.BodyParts.Legs")}</Typography>
                                }
                            ]
                        }
                        onChange={(values: string[]) => {
                            console.log(values)
                        }}
                    />
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