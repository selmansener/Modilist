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
import { ImageComponent } from "../../components/image/ImageComponent";
import { ColorTypes } from "./stylePreferenceComponents/ColorTypes";
import { Colors } from "./stylePreferenceComponents/Colors";
import { Patterns } from "./stylePreferenceComponents/Patterns";
import { Fabrics } from "./stylePreferenceComponents/Fabrics";

enum MainCategory {
    Upper = "Upper",
    Lower = "Lower",
    Accessories = "Accessories",
    Underwear = "Underwear",
    Bags = "Bags",
    Beach = "Beach",
    SportOutdoor = "SportOutdoor",
    Footwear = "Footwear"
}

interface ProductCategory {
    name: string,
    value: string,
    img: string,
    mainCategory: MainCategory
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
            name: t("ProductCategories.Tshirt"),
            value: "Tshirt",
            img: `${imgBaseHost}/product-category-icons/Tshirt.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Shirt"),
            value: "Shirt",
            img: `${imgBaseHost}/product-category-icons/shirt.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Sweatshirt"),
            value: "Sweatshirt",
            img: `${imgBaseHost}/product-category-icons/Sweatshirt.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Sweater"),
            value: "Sweater",
            img: `${imgBaseHost}/product-category-icons/Sweater.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Blazer"),
            value: "Blazer",
            img: `${imgBaseHost}/product-category-icons/Blazer.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Jacket"),
            value: "Jacket",
            img: `${imgBaseHost}/product-category-icons/Jacket.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Coats"),
            value: "Coats",
            img: `${imgBaseHost}/product-category-icons/Coats.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.TrenchCoat"),
            value: "TrenchCoat",
            img: `${imgBaseHost}/product-category-icons/TrenchCoat.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Pyjamas"),
            value: "Pyjamas",
            img: `${imgBaseHost}/product-category-icons/Pyjamas.svg`,
            mainCategory: MainCategory.Underwear
        },
        {
            name: t("ProductCategories.Socks"),
            value: "Socks",
            img: `${imgBaseHost}/product-category-icons/Socks.svg`,
            mainCategory: MainCategory.Underwear
        },
        {
            name: t("ProductCategories.Pants"),
            value: "Pants",
            img: `${imgBaseHost}/product-category-icons/Pants.svg`,
            mainCategory: MainCategory.Lower
        },
        {
            name: t("ProductCategories.Jeans"),
            value: "Jeans",
            img: `${imgBaseHost}/product-category-icons/Jeans.svg`,
            mainCategory: MainCategory.Lower
        },
        {
            name: t("ProductCategories.Shorts"),
            value: "Shorts",
            img: `${imgBaseHost}/product-category-icons/Shorts.svg`,
            mainCategory: MainCategory.Lower
        },
        {
            name: t("ProductCategories.Sweatpants"),
            value: "Sweatpants",
            img: `${imgBaseHost}/product-category-icons/Sweatpants.svg`,
            mainCategory: MainCategory.SportOutdoor
        },
        {
            name: t("ProductCategories.SportBag"),
            value: "SportBag",
            img: `${imgBaseHost}/product-category-icons/SportBag.svg`,
            mainCategory: MainCategory.SportOutdoor
        },
        {
            name: t("ProductCategories.RunningShoes"),
            value: "RunningShoes",
            img: `${imgBaseHost}/product-category-icons/RunningShoes.svg`,
            mainCategory: MainCategory.SportOutdoor
        },
        {
            name: t("ProductCategories.Satchel"),
            value: "Satchel",
            img: `${imgBaseHost}/product-category-icons/Satchel.svg`,
            mainCategory: MainCategory.Bags
        },
        {
            name: t("ProductCategories.HandBags"),
            value: "HandBags",
            img: `${imgBaseHost}/product-category-icons/HandBags.svg`,
            mainCategory: MainCategory.Bags
        },
        {
            name: t("ProductCategories.Wallet"),
            value: "Wallet",
            img: `${imgBaseHost}/product-category-icons/Wallet.svg`,
            mainCategory: MainCategory.Bags
        },
        {
            name: t("ProductCategories.Backpack"),
            value: "Backpack",
            img: `${imgBaseHost}/product-category-icons/Backpack.svg`,
            mainCategory: MainCategory.Bags
        },
        {
            name: t("ProductCategories.CasualShoes"),
            value: "CasualShoes",
            img: `${imgBaseHost}/product-category-icons/CasualShoes.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.Sandals"),
            value: "Sandals",
            img: `${imgBaseHost}/product-category-icons/Sandals.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.Boots"),
            value: "Boots",
            img: `${imgBaseHost}/product-category-icons/Boots.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.Watch"),
            value: "Watch",
            img: `${imgBaseHost}/product-category-icons/Watch.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Sunglasses"),
            value: "Sunglasses",
            img: `${imgBaseHost}/product-category-icons/Sunglasses.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Belt"),
            value: "Sunglasses",
            img: `${imgBaseHost}/product-category-icons/Belt.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Beanie"),
            value: "Beanie",
            img: `${imgBaseHost}/product-category-icons/Beanie.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Scarf"),
            value: "Scarf",
            img: `${imgBaseHost}/product-category-icons/Scarf.svg`,
            mainCategory: MainCategory.Accessories
        }
    ]

    const femaleProductCategories: ProductCategory[] = [
        ...commonProductCategories,
        {
            name: t("ProductCategories.Dress"),
            value: "Dress",
            img: `${imgBaseHost}/product-category-icons/Dress.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Blouse"),
            value: "Blouse",
            img: `${imgBaseHost}/product-category-icons/Blouse.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Bra"),
            value: "Bra",
            img: `${imgBaseHost}/product-category-icons/Bra.svg`,
            mainCategory: MainCategory.Underwear
        },
        {
            name: t("ProductCategories.Panties"),
            value: "Panties",
            img: `${imgBaseHost}/product-category-icons/Panties.svg`,
            mainCategory: MainCategory.Underwear
        },
        {
            name: t("ProductCategories.HighHeels"),
            value: "HighHeels",
            img: `${imgBaseHost}/product-category-icons/HighHeels.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.FlatShoes"),
            value: "FlatShoes",
            img: `${imgBaseHost}/product-category-icons/FlatShoes.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.Hat"),
            value: "Hat",
            img: `${imgBaseHost}/product-category-icons/Hat-Women.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Jewelery"),
            value: "Jewelery",
            img: `${imgBaseHost}/product-category-icons/Jewelry-Women.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Swimsuit"),
            value: "Swimsuit",
            img: `${imgBaseHost}/product-category-icons/Swimsuit-Women.svg`,
            mainCategory: MainCategory.Beach
        },
    ]

    const maleProductCategories: ProductCategory[] = [
        ...commonProductCategories,
        {
            name: t("ProductCategories.Boxer"),
            value: "Boxer",
            img: `${imgBaseHost}/product-category-icons/Boxer.svg`,
            mainCategory: MainCategory.Underwear
        },
        {
            name: t("ProductCategories.Hat"),
            value: "Hat",
            img: `${imgBaseHost}/product-category-icons/Hat-Man.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Jewelery"),
            value: "Jewelery",
            img: `${imgBaseHost}/product-category-icons/Jewelry-Man.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Swimsuit"),
            value: "Swimsuit",
            img: `${imgBaseHost}/product-category-icons/Swimsuit-Man.svg`,
            mainCategory: MainCategory.Beach
        },
    ]

    const productCategories = gender === Gender.Female ? femaleProductCategories : maleProductCategories;

    const UpperGroup = () => {
        const upperCategories = productCategories.filter(x => x.mainCategory === MainCategory.Upper).map(category => {
            return {
                value: category.value,
                element: <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 100
                }}>
                    <ImageComponent src={category.img} />
                    <Typography sx={{ mt: 2 }}>{category.name}</Typography>
                </Box>
            }
        });

        return <CustomCheckboxGroup
            label={<Typography variant="h6" sx={{ mb: 3 }}>{t("MainCategories.Upper")}</Typography>}
            contents={upperCategories}
            isNegative
            onChange={(values: string[]) => {
            }}
        />
    };

    const LowerGroup = () => {
        const lowerCategories = productCategories.filter(x => x.mainCategory === MainCategory.Lower).map(category => {
            return {
                value: category.value,
                element: <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 100
                }}>
                    <ImageComponent src={category.img} />
                    <Typography sx={{ mt: 2 }}>{category.name}</Typography>
                </Box>
            }
        });

        return <CustomCheckboxGroup
            label={<Typography variant="h6" sx={{ mb: 3 }}>{t("MainCategories.Lower")}</Typography>}
            contents={lowerCategories}
            isNegative
            onChange={(values: string[]) => {
            }}
        />
    }

    const AccessoriesGroup = () => {
        const accessoriesCategories = productCategories.filter(x => x.mainCategory === MainCategory.Accessories).map(category => {
            return {
                value: category.value,
                element: <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 100
                }}>
                    <ImageComponent src={category.img} />
                    <Typography sx={{ mt: 2 }}>{category.name}</Typography>
                </Box>
            }
        });

        return <CustomCheckboxGroup
            label={<Typography variant="h6" sx={{ mb: 3 }}>{t("MainCategories.Accessories")}</Typography>}
            contents={accessoriesCategories}
            isNegative
            onChange={(values: string[]) => {
            }}
        />
    }

    const UnderwearGroup = () => {
        const underwearCategories = productCategories.filter(x => x.mainCategory === MainCategory.Underwear).map(category => {
            return {
                value: category.value,
                element: <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 100
                }}>
                    <ImageComponent src={category.img} />
                    <Typography sx={{ mt: 2 }}>{category.name}</Typography>
                </Box>
            }
        });

        return <CustomCheckboxGroup
            label={<Typography variant="h6" sx={{ mb: 3 }}>{t("MainCategories.Underwear")}</Typography>}
            contents={underwearCategories}
            isNegative
            onChange={(values: string[]) => {
            }}
        />
    }

    const BagsGroup = () => {
        const bagsCategories = productCategories.filter(x => x.mainCategory === MainCategory.Bags).map(category => {
            return {
                value: category.value,
                element: <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 100
                }}>
                    <ImageComponent src={category.img} />
                    <Typography sx={{ mt: 2 }}>{category.name}</Typography>
                </Box>
            }
        });

        return <CustomCheckboxGroup
            label={<Typography variant="h6" sx={{ mb: 3 }}>{t("MainCategories.Bags")}</Typography>}
            contents={bagsCategories}
            isNegative
            onChange={(values: string[]) => {
            }}
        />
    }

    const BeachGroup = () => {
        const categories = productCategories.filter(x => x.mainCategory === MainCategory.Beach).map(category => {
            return {
                value: category.value,
                element: <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 100
                }}>
                    <ImageComponent src={category.img} />
                    <Typography sx={{ mt: 2 }}>{category.name}</Typography>
                </Box>
            }
        });

        return <CustomCheckboxGroup
            label={<Typography variant="h6" sx={{ mb: 3 }}>{t("MainCategories.Beach")}</Typography>}
            contents={categories}
            isNegative
            onChange={(values: string[]) => {
            }}
        />
    }

    const FootwearGroup = () => {
        const categories = productCategories.filter(x => x.mainCategory === MainCategory.Footwear).map(category => {
            return {
                value: category.value,
                element: <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 100
                }}>
                    <ImageComponent src={category.img} />
                    <Typography sx={{ mt: 2 }}>{category.name}</Typography>
                </Box>
            }
        });

        return <CustomCheckboxGroup
            label={<Typography variant="h6" sx={{ mb: 3 }}>{t("MainCategories.Footwear")}</Typography>}
            contents={categories}
            isNegative
            onChange={(values: string[]) => {
            }}
        />
    }

    const SportOutdoorGroup = () => {
        const categories = productCategories.filter(x => x.mainCategory === MainCategory.SportOutdoor).map(category => {
            return {
                value: category.value,
                element: <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 100
                }}>
                    <ImageComponent src={category.img} />
                    <Typography sx={{ mt: 2 }}>{category.name}</Typography>
                </Box>
            }
        });

        return <CustomCheckboxGroup
            label={<Typography variant="h6" sx={{ mb: 3 }}>{t("MainCategories.SportOutdoor")}</Typography>}
            contents={categories}
            isNegative
            onChange={(values: string[]) => {
            }}
        />
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

    useEffect(() => {
        dispatch.getStylePreferencesModel.getStylePreferences();
    }, []);

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
                        label={
                            <Typography>{t("WelcomeSteps.StylePreferences.BodyPartsToHighlight")}</Typography>
                        }
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
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <CustomCheckboxGroup
                        label={
                            <Typography>{t("WelcomeSteps.StylePreferences.BodyPartsToHide")}</Typography>
                        }
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
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    ml: 5,
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
                <FormControl sx={{ m: 1 }}>
                    <UpperGroup />
                </FormControl>
                <FormControl sx={{ m: 1 }}>
                    <LowerGroup />
                </FormControl>
                <FormControl>
                    <AccessoriesGroup />
                </FormControl>
                <FormControl>
                    <UnderwearGroup />
                </FormControl>
                <FormControl>
                    <BagsGroup />
                </FormControl>
                <FormControl>
                    <BeachGroup />
                </FormControl>
                <FormControl>
                    <SportOutdoorGroup />
                </FormControl>
                <FormControl>
                    <FootwearGroup />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <ColorTypes />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <Colors />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <Patterns />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <Fabrics />
                </FormControl>
            </Grid>
        </Grid>
    )
}