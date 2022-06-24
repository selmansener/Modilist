import { Box, Stack, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography, Button, CircularProgress, FormHelperText } from "@mui/material";
import Rating from '@mui/material/Rating';
import { useEffect, useState } from "react";
import { CustomCheckboxGroup } from "../../components/customCheckbox/CustomCheckbox";
import { Trans, useTranslation } from "react-i18next";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { config } from "../../config";
import { AccountDTO, Gender } from "../../services/swagger/api/models";
import { ImageComponent } from "../../components/image/ImageComponent";
import { useFormik } from "formik";
import * as Yup from "yup";

enum MainCategory {
    Upper = "Upper",
    Lower = "Lower",
    Outer = "Outer",
    Accessories = "Accessories",
    UnderwearPyjamasBeach = "UnderwearPyjamasBeach",
    Bags = "Bags",
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
    const { data: account } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: getStylePreferencesIsBusy, data: getStylePreferences, status: getStylePreferencesStatus } = useSelector((state: RootState) => state.getStylePreferencesModel);
    const { isBusy: upsertStylePreferencesIsBusy, data: upsertStylePreferences, status: upsertStylePreferencesStatus } = useSelector((state: RootState) => state.upsertStylePreferencesModel);
    const isBusy = getStylePreferencesIsBusy || upsertStylePreferencesIsBusy;
    const dispatch = useDispatch<Dispatch>();
    const { imgBaseHost } = config;
    const { gender } = account as AccountDTO;

    useEffect(() => {
        if (!getStylePreferencesIsBusy) {
            dispatch.getStylePreferencesModel.getStylePreferences();
        }
    }, []);

    useEffect(() => {
        if (upsertStylePreferencesStatus === 200 && upsertStylePreferences) {
            dispatch.getStylePreferencesModel.HANDLE_RESPONSE(upsertStylePreferences, upsertStylePreferencesStatus);

            dispatch.upsertStylePreferencesModel.RESET();

            dispatch.welcomePageStepper.next();
        }
    }, [upsertStylePreferencesStatus]);

    const requiredField = t("FormValidation.RequiredField");
    const schema = Yup.object({
        choiceReasons: Yup.string().required(requiredField),
        lovesShopping: Yup.number().moreThan(0, requiredField).required(requiredField),
        openToSuggestions: Yup.number().moreThan(0, requiredField).required(requiredField),
        prefersHijabClothing: Yup.boolean().optional(),
        bodyPartsToHighlight: Yup.string().optional(),
        bodyPartsToHide: Yup.string().optional(),
        excludedUpperCategories: Yup.string().optional(),
        excludedLowerCategories: Yup.string().optional(),
        excludedOuterCategories: Yup.string().optional(),
        excludedUnderwearCategories: Yup.string().optional(),
        excludedAccessoryCategories: Yup.string().optional(),
        excludedFootwearCategories: Yup.string().optional(),
        excludedBagCategories: Yup.string().optional(),
    });

    const {
        handleChange,
        touched,
        errors,
        values: stylePreferences,
        setFieldValue,
        submitForm,
    } = useFormik({
        enableReinitialize: true,
        initialValues: getStylePreferences ?? {},
        validationSchema: schema,
        onSubmit: (values) => {
            if (!upsertStylePreferencesIsBusy) {
                dispatch.upsertStylePreferencesModel.upsertStylePreferences(values);
            }
        },
    });

    const commonProductCategories: ProductCategory[] = [
        {
            name: t("ProductCategories.Shorts"),
            value: "Shorts",
            img: `${imgBaseHost}/product-category-icons/Shorts.svg`,
            mainCategory: MainCategory.Lower
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
            img: `${imgBaseHost}/product-category-icons/Jeans.svg`, //SAYFADA GÖZÜKMÜYO
            mainCategory: MainCategory.Lower
        },
        {
            name: t("ProductCategories.Sweatpants"),
            value: "Sweatpants",
            img: `${imgBaseHost}/product-category-icons/Sweatpants.svg`,
            mainCategory: MainCategory.Lower
        },
        {
            name: t("ProductCategories.Capri"),
            value: "Capri",
            img: `${imgBaseHost}/product-category-icons/Capri.svg`,
            mainCategory: MainCategory.Lower
        },
        {
            name: t("ProductCategories.Tshirt"),
            value: "Tshirt",
            img: `${imgBaseHost}/product-category-icons/Tshirt.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Sweater"),
            value: "Sweater",                       //HALA ESKİ KAZAK RESMİ VAR
            img: `${imgBaseHost}/product-category-icons/Sweater.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Shirt"),
            value: "Shirt",
            img: `${imgBaseHost}/product-category-icons/Shirt.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Sweatshirt"),
            value: "Sweatshirt",
            img: `${imgBaseHost}/product-category-icons/Sweatshirt.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Cardigan"),
            value: "Cardigan",
            img: `${imgBaseHost}/product-category-icons/Cardigan.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Jersey"),
            value: "Jersey",
            img: `${imgBaseHost}/product-category-icons/Jersey.svg`,
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
            mainCategory: MainCategory.Outer
        },
        {
            name: t("ProductCategories.Poncho"),
            value: "Poncho",
            img: `${imgBaseHost}/product-category-icons/Poncho.svg`,
            mainCategory: MainCategory.Outer
        },
        {
            name: t("ProductCategories.TrenchCoat"),
            value: "TrenchCoat",
            img: `${imgBaseHost}/product-category-icons/TrenchCoat.svg`,
            mainCategory: MainCategory.Outer
        },
        {
            name: t("ProductCategories.Raincoat"),
            value: "Raincoat",
            img: `${imgBaseHost}/product-category-icons/Raincoat.svg`,
            mainCategory: MainCategory.Outer
        },
        {
            name: t("ProductCategories.Coat"),
            value: "Coat",
            img: `${imgBaseHost}/product-category-icons/Coat.svg`,
            mainCategory: MainCategory.Outer
        },
        {
            name: t("ProductCategories.Parka"),
            value: "Parka",
            img: `${imgBaseHost}/product-category-icons/Parka.svg`,
            mainCategory: MainCategory.Outer
        },
        {
            name: t("ProductCategories.Coats"),
            value: "Coats",
            img: `${imgBaseHost}/product-category-icons/Coats.svg`,
            mainCategory: MainCategory.Outer
        },
        {
            name: t("ProductCategories.Pyjamas"),
            value: "Pyjamas",
            img: `${imgBaseHost}/product-category-icons/Pyjamas.svg`,
            mainCategory: MainCategory.UnderwearPyjamasBeach
        },
        {
            name: t("ProductCategories.Underwear"),
            value: "Underwear",
            img: `${imgBaseHost}/product-category-icons/Underwear.svg`,
            mainCategory: MainCategory.UnderwearPyjamasBeach
        },
        {
            name: t("ProductCategories.SleevelessUndershirt"),
            value: "SleevelessUndershirt",
            img: `${imgBaseHost}/product-category-icons/SleevelessUndershirt.svg`,
            mainCategory: MainCategory.UnderwearPyjamasBeach
        },
        {
            name: t("ProductCategories.Socks"),
            value: "Socks",
            img: `${imgBaseHost}/product-category-icons/Socks.svg`,
            mainCategory: MainCategory.UnderwearPyjamasBeach
        },
        {
            name: t("ProductCategories.Clasp"),
            value: "Clasp",
            img: `${imgBaseHost}/product-category-icons/Clasp.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.HairBand"),
            value: "HairBand",
            img: `${imgBaseHost}/product-category-icons/HairBand.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Headband"),
            value: "Headband",
            img: `${imgBaseHost}/product-category-icons/Headband.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Cap"),
            value: "Cap",
            img: `${imgBaseHost}/product-category-icons/Cap.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Hat"),
            value: "Hat",
            img: `${imgBaseHost}/product-category-icons/Hat.svg`,
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
        },
        {
            name: t("ProductCategories.Glove"),
            value: "Glove",
            img: `${imgBaseHost}/product-category-icons/Glove.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Foulard"),
            value: "Foulard",
            img: `${imgBaseHost}/product-category-icons/Foulard.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Belt"),
            value: "Watch",
            img: `${imgBaseHost}/product-category-icons/Watch.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Glasses"),
            value: "Glasses",
            img: `${imgBaseHost}/product-category-icons/Glasses.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Watch"),
            value: "Watch",
            img: `${imgBaseHost}/product-category-icons/Watch.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Wallet"),
            value: "Wallet",
            img: `${imgBaseHost}/product-category-icons/Wallet.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.CardHolder"),
            value: "CardHolder",
            img: `${imgBaseHost}/product-category-icons/CardHolder.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Earring"),
            value: "Earring",
            img: `${imgBaseHost}/product-category-icons/Earring.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Necklace"),
            value: "Necklace",
            img: `${imgBaseHost}/product-category-icons/Necklace.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Ring"),
            value: "Ring",
            img: `${imgBaseHost}/product-category-icons/Ring.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Sandals"),
            value: "Sandals",
            img: `${imgBaseHost}/product-category-icons/Sandals.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.Slippers"),
            value: "Slippers",
            img: `${imgBaseHost}/product-category-icons/Slipper.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.Sneakers"),
            value: "Sandals",
            img: `${imgBaseHost}/product-category-icons/Sneakers.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.CasualShoes"),
            value: "CasualShoes",
            img: `${imgBaseHost}/product-category-icons/CasualShoes.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.Loafer"),
            value: "Loafer",
            img: `${imgBaseHost}/product-category-icons/Loafer.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.Oxford"),
            value: "Oxford",
            img: `${imgBaseHost}/product-category-icons/Oxford.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.Espadrilles"),
            value: "Espadrilles",
            img: `${imgBaseHost}/product-category-icons/Espadrilles.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.FlatShoes"),
            value: "FlatShoes",
            img: `${imgBaseHost}/product-category-icons/FlatShoes.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.Boots"),
            value: "Boots",
            img: `${imgBaseHost}/product-category-icons/Boots.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.Backpack"),
            value: "Backpack",
            img: `${imgBaseHost}/product-category-icons/Backpack.svg`,
            mainCategory: MainCategory.Bags
        },
        {
            name: t("ProductCategories.WaistBag"),
            value: "WaistBag",
            img: `${imgBaseHost}/product-category-icons/WaistBag.svg`,
            mainCategory: MainCategory.Bags
        },
        {
            name: t("ProductCategories.PostmanBag"),
            value: "PostmanBag",
            img: `${imgBaseHost}/product-category-icons/PostmanBag.svg`,
            mainCategory: MainCategory.Bags
        },
        {
            name: t("ProductCategories.Portfolio"),
            value: "Portfolio",
            img: `${imgBaseHost}/product-category-icons/Portfolio.svg`,
            mainCategory: MainCategory.Bags
        },
        {
            name: t("ProductCategories.SportBag"),
            value: "SportBag",
            img: `${imgBaseHost}/product-category-icons/SportBag.svg`,
            mainCategory: MainCategory.Bags
        },
    ]

    const femaleProductCategories: ProductCategory[] = [
        ...commonProductCategories,
        {
            name: t("ProductCategories.Leggings"),
            value: "Leggings",
            img: `${imgBaseHost}/product-category-icons/Leggings.svg`,
            mainCategory: MainCategory.Lower
        },
        {
            name: t("ProductCategories.Skirt"),
            value: "Skirt",
            img: `${imgBaseHost}/product-category-icons/Skirt.svg`,
            mainCategory: MainCategory.Lower
        },
        {
            name: t("ProductCategories.Blouse"),
            value: "Blouse",
            img: `${imgBaseHost}/product-category-icons/Blouse.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Tunic"),
            value: "Tunic",
            img: `${imgBaseHost}/product-category-icons/Tunic.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Bustier"),
            value: "Bustier",
            img: `${imgBaseHost}/product-category-icons/Bustier.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Crop"),
            value: "Crop",
            img: `${imgBaseHost}/product-category-icons/Crop.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Dress"),
            value: "Dress",
            img: `${imgBaseHost}/product-category-icons/Dress.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Overalls"),
            value: "Overalls",
            img: `${imgBaseHost}/product-category-icons/Overalls.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Nightwear"),
            value: "Nightwear",
            img: `${imgBaseHost}/product-category-icons/Nightwear.svg`,
            mainCategory: MainCategory.UnderwearPyjamasBeach
        },
        {
            name: t("ProductCategories.Bikini"),
            value: "Bikini",
            img: `${imgBaseHost}/product-category-icons/Bikini.svg`,
            mainCategory: MainCategory.UnderwearPyjamasBeach
        },
        {
            name: t("ProductCategories.ShawlScarf"),
            value: "ShawlScarf",
            img: `${imgBaseHost}/product-category-icons/ShawlScarf.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.ShortHeels"),
            value: "ShortHeels",
            img: `${imgBaseHost}/product-category-icons/ShortHeels.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.HighHeels"),
            value: "HighHeels",
            img: `${imgBaseHost}/product-category-icons/HighHeels.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.TopBoots"),
            value: "TopBoots",
            img: `${imgBaseHost}/product-category-icons/TopBoots.svg`,
            mainCategory: MainCategory.Footwear
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
    ]

    const maleProductCategories: ProductCategory[] = [
        ...commonProductCategories,
        {
            name: t("ProductCategories.Waistcoat"),
            value: "Waistcoat",
            img: `${imgBaseHost}/product-category-icons/Waistcoat.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Tie"),
            value: "Tie",
            img: `${imgBaseHost}/product-category-icons/Tie.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.BowTie"),
            value: "BowTie",
            img: `${imgBaseHost}/product-category-icons/BowTie.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Swimsuit"),
            value: "Swimsuit",
            img: `${imgBaseHost}/product-category-icons/Swimsuit-Man.svg`,
            mainCategory: MainCategory.UnderwearPyjamasBeach
        },
    ]

    const productCategories = gender === Gender.Female ? femaleProductCategories : maleProductCategories;

    const UpperGroup = () => {
        const upperCategories = productCategories.filter(x => x.mainCategory === MainCategory.Upper).map(category => {
            return {
                value: category.value,
                element: <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <ImageComponent src={category.img} />
                    <Typography sx={{ mt: 2 }} align="center">{category.name}</Typography>
                </Box>
            }
        });

        return <CustomCheckboxGroup
            sx={{
                justifyContent: 'flex-start'
            }}
            value={stylePreferences?.excludedUpperCategories ?? ""}
            label={<Typography variant="h4">{t("MainCategories.Upper")}</Typography>}
            contents={upperCategories}
            isNegative
            onChange={(values: string[]) => {
                setFieldValue("excludedUpperCategories", values.length > 0 ? values.join(',') : "");
            }}
        />
    };

    const LowerGroup = () => {
        const lowerCategories = productCategories.filter(x => x.mainCategory === MainCategory.Lower).map(category => {
            return {
                value: category.value,
                element: <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <ImageComponent src={category.img} />
                    <Typography sx={{ mt: 2 }} align="center">{category.name}</Typography>
                </Box>
            }
        });

        return <CustomCheckboxGroup
            sx={{
                justifyContent: 'flex-start'
            }}
            value={stylePreferences?.excludedLowerCategories ?? ""}
            label={<Typography variant="h4">{t("MainCategories.Lower")}</Typography>}
            contents={lowerCategories}
            isNegative
            onChange={(values: string[]) => {
                setFieldValue("excludedLowerCategories", values.length > 0 ? values.join(',') : "");
            }}
        />
    }

    const OuterGroup = () => {
        const outerCategories = productCategories.filter(x => x.mainCategory === MainCategory.Outer).map(category => {
            return {
                value: category.value,
                element: <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <ImageComponent src={category.img} />
                    <Typography sx={{ mt: 2 }} align="center">{category.name}</Typography>
                </Box>
            }
        });

        return <CustomCheckboxGroup
            sx={{
                justifyContent: 'flex-start'
            }}
            value={stylePreferences?.excludedOuterCategories ?? ""}
            label={<Typography variant="h4">{t("MainCategories.Outer")}</Typography>}
            contents={outerCategories}
            isNegative
            onChange={(values: string[]) => {
                setFieldValue("excludedOuterCategories", values.length > 0 ? values.join(',') : "");
            }}
        />
    }
    const UnderwearPyjamasBeachGroup = () => {
        const accessoriesCategories = productCategories.filter(x => x.mainCategory === MainCategory.UnderwearPyjamasBeach).map(category => {
            return {
                value: category.value,
                element: <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <ImageComponent src={category.img} />
                    <Typography sx={{ mt: 2 }} align="center">{category.name}</Typography>
                </Box>
            }
        });

        return <CustomCheckboxGroup
            sx={{
                justifyContent: 'flex-start'
            }}
            value={stylePreferences?.excludedUnderwearCategories ?? ""}
            label={<Typography variant="h4">{t("MainCategories.UnderwearPyjamasBeach")}</Typography>}
            contents={accessoriesCategories}
            isNegative
            onChange={(values: string[]) => {
                setFieldValue("excludedUnderwearCategories", values.length > 0 ? values.join(',') : "");
            }}
        />
    }

    const AccessoriesGroup = () => {
        const accessoriesCategories = productCategories.filter(x => x.mainCategory === MainCategory.Accessories).map(category => {
            return {
                value: category.value,
                element: <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <ImageComponent src={category.img} />
                    <Typography sx={{ mt: 2 }} align="center">{category.name}</Typography>
                </Box>
            }
        });

        return <CustomCheckboxGroup
            sx={{
                justifyContent: 'flex-start'
            }}
            value={stylePreferences?.excludedAccessoryCategories ?? ""}
            label={<Typography variant="h4">{t("MainCategories.Accessories")}</Typography>}
            contents={accessoriesCategories}
            isNegative
            onChange={(values: string[]) => {
                setFieldValue("excludedAccessoryCategories", values.length > 0 ? values.join(',') : "");
            }}
        />
    }

    const BagsGroup = () => {
        const bagsCategories = productCategories.filter(x => x.mainCategory === MainCategory.Bags).map(category => {
            return {
                value: category.value,
                element: <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <ImageComponent src={category.img} />
                    <Typography sx={{ mt: 2 }} align="center">{category.name}</Typography>
                </Box>
            }
        });

        return <CustomCheckboxGroup
            sx={{
                justifyContent: 'flex-start'
            }}
            value={stylePreferences?.excludedBagCategories ?? ""}
            label={<Typography variant="h4">{t("MainCategories.Bags")}</Typography>}
            contents={bagsCategories}
            isNegative
            onChange={(values: string[]) => {
                setFieldValue("excludedBagCategories", values.length > 0 ? values.join(',') : "");
            }}
        />
    }

    const FootwearGroup = () => {
        const categories = productCategories.filter(x => x.mainCategory === MainCategory.Footwear).map(category => {
            return {
                value: category.value,
                element: <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <ImageComponent src={category.img} />
                    <Typography sx={{ mt: 2 }} align="center">{category.name}</Typography>
                </Box>
            }
        });

        return <CustomCheckboxGroup
            sx={{
                justifyContent: 'flex-start'
            }}
            value={stylePreferences?.excludedFootwearCategories ?? ""}
            label={<Typography variant="h4">{t("MainCategories.Footwear")}</Typography>}
            contents={categories}
            isNegative
            onChange={(values: string[]) => {
                setFieldValue("excludedFootwearCategories", values.length > 0 ? values.join(',') : "");
            }}
        />
    }

    const choiseReasons = [
        "FollowingTrends",
        "TimeProblem",
        "HavingPersonalStyleAdvisor",
        "TryingLocalBrands",
        "LikesSurprizes",
        "MakingNewStyle",
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

    const handleChoiseReasonChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (checked) {
            if (stylePreferences?.choiceReasons !== undefined) {
                const oldValues = stylePreferences.choiceReasons === "" ? [] : stylePreferences.choiceReasons.split(',');
                oldValues.push(e.target.value);
                setFieldValue("choiceReasons", oldValues.join(','));
            }
        }
        else {
            if (stylePreferences?.choiceReasons !== undefined) {
                const oldValues = stylePreferences.choiceReasons.split(',');
                const newValues = oldValues.filter(x => x !== e.target.value);
                setFieldValue("choiceReasons", newValues.length > 0 ? newValues.join(',') : "");
            }
        }
    };

    const BodyPartsToHighlight = () => {
        return <FormControl fullWidth>
            <CustomCheckboxGroup
                value={stylePreferences?.bodyPartsToHighlight ?? ""}
                label={<Typography variant="h3" sx={{
                    mb: 4
                }}>{t("Pages.Welcome.StylePreferences.BodyPartsToHighlight")}</Typography>}
                contents={bodyParts}
                onChange={(values: string[]) => {
                    setFieldValue("bodyPartsToHighlight", values.length > 0 ? values.join(',') : "");
                }}
            />
        </FormControl>
    }

    const BodyPartsToHide = () => {
        return <FormControl fullWidth>
            <CustomCheckboxGroup
                value={stylePreferences?.bodyPartsToHide ?? ""}
                label={<Typography variant="h3" sx={{
                    mb: 4
                }}>{t("Pages.Welcome.StylePreferences.BodyPartsToHide")}</Typography>}
                isNegative
                contents={bodyParts}
                onChange={(values: string[]) => {
                    setFieldValue("bodyPartsToHide", values.length > 0 ? values.join(',') : "");
                }}
            />
        </FormControl>
    }

    const _bodyParts = [
        "Arms",
        "Shoulders",
        "Back",
        "Chest",
        "Abdoment",
        "Hips",
        "Legs"
    ]

    const bodyParts = _bodyParts.map(bodyPart => {
        return {
            value: bodyPart,
            element: <Box sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <ImageComponent src={`${imgBaseHost}/body-parts/${bodyPart}.svg`} />
                <Typography>{t(`Pages.Welcome.StylePreferences.BodyParts.${bodyPart}`)}</Typography>
            </Box>
        }
    });

    return (
        <Grid item container xs={12} spacing={12}>
            <Grid item xs={6}>
                <ImageComponent src={`${imgBaseHost}/style-preferences-general/ShoppingIllustration.svg`}></ImageComponent>
            </Grid>
            <Grid item container xs={6}>
                <Grid item xs={12} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <FormControl error={touched.lovesShopping && errors.lovesShopping !== undefined}>
                        <Typography variant="h3" align="center">
                            {t(`Pages.Welcome.StylePreferences.LikesShoping`)}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            mt: 2
                        }}>
                            <Rating
                                disabled={isBusy}
                                name="lovesShopping"
                                value={stylePreferences.lovesShopping}
                                onChange={handleChange}
                                getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                precision={0.5}
                                size="large"
                                icon={<FavoriteIcon
                                    color="secondary"
                                    fontSize="inherit"
                                    sx={{
                                        width: '48px',
                                        height: '48px'
                                    }} />}
                                emptyIcon={<FavoriteBorderIcon fontSize="inherit"
                                    sx={{
                                        width: '48px',
                                        height: '48px'
                                    }}
                                />}
                            />
                        </Box>
                        <FormHelperText>{touched.lovesShopping && errors.lovesShopping}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <FormControl error={touched.openToSuggestions && errors.openToSuggestions !== undefined}>
                        <Typography variant="h3" align="center">
                            {t(`Pages.Welcome.StylePreferences.OpenToSuggestions`)}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            mt: 2
                        }}>
                            <Rating
                                disabled={isBusy}
                                name="openToSuggestions"
                                value={stylePreferences.openToSuggestions}
                                onChange={handleChange}
                                getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                precision={0.5}
                                size="large"
                                icon={<FavoriteIcon
                                    color="secondary"
                                    fontSize="inherit"
                                    sx={{
                                        width: '48px',
                                        height: '48px'
                                    }} />}
                                emptyIcon={<FavoriteBorderIcon
                                    fontSize="inherit"
                                    sx={{
                                        width: '48px',
                                        height: '48px'
                                    }} />}
                            />
                        </Box>
                        <FormHelperText>{touched.openToSuggestions && errors.openToSuggestions}</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid item container xs={6}>
                <Grid item xs={4}></Grid>
                <Grid item xs={8}>
                    <Typography variant="h3" align="left">
                        {t(`Pages.Welcome.StylePreferences.ChoiceReasonsQuestion`)}
                    </Typography>
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={8}>
                    <FormControl fullWidth error={touched.choiceReasons && errors.choiceReasons !== undefined}>
                        <FormGroup>
                            {choiseReasons.map(reason => (
                                <FormControlLabel control={
                                    <Checkbox
                                        disabled={isBusy}
                                        value={reason}
                                        checked={stylePreferences?.choiceReasons !== undefined && stylePreferences?.choiceReasons?.split(',').indexOf(reason) > -1}
                                        onChange={handleChoiseReasonChange}
                                    />} label={
                                        <Typography variant="subtitle1">
                                            {t(`Pages.Welcome.StylePreferences.ChoiceReasons.${reason}`)}
                                        </Typography>

                                    } />
                            ))}
                        </FormGroup>
                        <FormHelperText>{touched.choiceReasons && errors.choiceReasons}</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <ImageComponent src={`${imgBaseHost}/style-preferences-general/WhyModilist1.svg`}></ImageComponent>
            </Grid>
            <Grid item xs={12}>
                <BodyPartsToHighlight />
            </Grid>
            <Grid item xs={12}>
                <BodyPartsToHide />
                {account?.gender === Gender.Female &&
                    <FormControl fullWidth sx={{
                        mt:4
                    }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handleChange}
                                    checked={stylePreferences.prefersHijabClothing}
                                />
                            }
                            label={<Typography variant="subtitle1">{t("Pages.Welcome.StylePreferences.Hijab")}</Typography>} />
                    </FormControl>}
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h3" sx={{
                    mb: 4
                }}>{t("Pages.Welcome.StylePreferences.ExcludedCategoriesTitle")}</Typography>
                <Trans>
                    <Typography variant="subtitle1" display="inline">
                        {t("Pages.Welcome.StylePreferences.UnwantedPieces1")}
                    </Typography>
                    <Typography variant="subtitle1" display="inline" color={"error"}>
                        {t("Pages.Welcome.StylePreferences.UnwantedPieces2")}
                    </Typography>
                    <Typography variant="subtitle1" display="inline">
                        {t("Pages.Welcome.StylePreferences.UnwantedPieces3")}
                    </Typography>
                </Trans>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <LowerGroup />
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <UpperGroup />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <OuterGroup />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <UnderwearPyjamasBeachGroup />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <AccessoriesGroup />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <FootwearGroup />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <BagsGroup />
                </FormControl>
            </Grid>
            <Grid item container xs={6} justifyContent="flex-start">
                <Button
                    disabled={isBusy}
                    onClick={() => {
                        dispatch.welcomePageStepper.back();
                    }}
                >
                    {t('Layouts.Welcome.WelcomeSteps.Buttons.Back')}
                </Button>
            </Grid>
            <Grid item container xs={6} justifyContent="flex-end">
                <Button
                    disabled={isBusy}
                    onClick={() => {
                        submitForm();
                    }}
                    variant="outlined">
                    {isBusy && <CircularProgress sx={{
                        width: "18px !important",
                        height: "18px !important",
                        mr: 2
                    }} />}
                    {t('Layouts.Welcome.WelcomeSteps.Buttons.Next')}
                </Button>
            </Grid>
        </Grid>
    )
}