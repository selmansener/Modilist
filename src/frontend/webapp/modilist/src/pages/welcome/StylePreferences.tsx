import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Typography, Button, CircularProgress, FormHelperText, useTheme, Snackbar, Alert, Paper } from "@mui/material";
import Rating from '@mui/material/Rating';
import React, { useEffect, useState } from "react";
import { CustomCheckboxGroup } from "../../components/customCheckbox/CustomCheckbox";
import { Trans, useTranslation } from "react-i18next";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { config } from "../../config";
import { AccountDTO, AccountState, Gender } from "../../services/swagger/api/models";
import { ImageComponent } from "../../components/image/ImageComponent";
import { useFormik } from "formik";
import * as Yup from "yup";
import SkipFormPaper from "./components/SkipFormPaper";
import { useNavigate } from "react-router-dom";

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

export interface StylePreferencesProps {
    layout?: string;
}

export default function StylePreferences(props: StylePreferencesProps) {
    const { layout } = props;
    const { t } = useTranslation();
    const { isBusy: getAccountIsBusy, data: account, status } = useSelector((state: RootState) => state.getAccountModel);
    const { isBusy: getStylePreferencesIsBusy, data: getStylePreferences, status: getStylePreferencesStatus } = useSelector((state: RootState) => state.getStylePreferencesModel);
    const { isBusy: upsertStylePreferencesIsBusy, data: upsertStylePreferences, status: upsertStylePreferencesStatus } = useSelector((state: RootState) => state.upsertStylePreferencesModel);
    const isBusy = getAccountIsBusy || getStylePreferencesIsBusy || upsertStylePreferencesIsBusy;
    const dispatch = useDispatch<Dispatch>();
    const { cdnImg: imgBaseHost } = config;
    const { gender } = account as AccountDTO;
    const theme = useTheme();
    const [snackbarStatus, setSnackbarStatus] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    useEffect(() => {
        if (!getStylePreferencesIsBusy) {
            dispatch.getStylePreferencesModel.getStylePreferences();
        }
    }, []);

    useEffect(() => {
        if (upsertStylePreferencesStatus === 200 && upsertStylePreferences) {
            dispatch.getStylePreferencesModel.HANDLE_RESPONSE(upsertStylePreferences, upsertStylePreferencesStatus);

            if (layout !== "dashboard") {
                navigate("/style-form/step/fit-preferences");
            }
        }
        else if (upsertStylePreferencesStatus !== 200 && upsertStylePreferencesStatus !== 0) {
            setSnackbarStatus(true);
        }

        if (upsertStylePreferencesStatus !== 0) {
            dispatch.upsertStylePreferencesModel.RESET();
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
        isValid,
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
        validateOnMount: true
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
            img: `${imgBaseHost}/product-category-icons/Jeans.svg`,
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
            name: t("ProductCategories.Cargo"),
            value: "Cargo",
            img: `${imgBaseHost}/product-category-icons/CargoTrousers.svg`,
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
            value: "Sweater",
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
            name: t("ProductCategories.Overalls"),
            value: "Overalls",
            img: `${imgBaseHost}/product-category-icons/Overalls${gender}.svg`,
            mainCategory: MainCategory.Upper
        },
        {
            name: t("ProductCategories.Blazer"),
            value: "Blazer",
            img: `${imgBaseHost}/product-category-icons/Blazer.svg`,
            mainCategory: MainCategory.Outer
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
            name: t("ProductCategories.Swimsuit"),
            value: "Swimsuit",
            img: `${imgBaseHost}/product-category-icons/Swimsuit${gender}.svg`,
            mainCategory: MainCategory.UnderwearPyjamasBeach
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
            value: "Belt",
            img: `${imgBaseHost}/product-category-icons/Belt.svg`,
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
            name: t("ProductCategories.Bracelet"),
            value: "Bracelet",
            img: `${imgBaseHost}/product-category-icons/Bracelet.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Earring"),
            value: "Earring",
            img: `${imgBaseHost}/product-category-icons/Earring${gender}.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Ring"),
            value: "Ring",
            img: `${imgBaseHost}/product-category-icons/Ring${gender}.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.Necklace"),
            value: "Necklace",
            img: `${imgBaseHost}/product-category-icons/Necklace${gender}.svg`,
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
            value: "Sneakers",
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
            name: t("ProductCategories.Classic"),
            value: "Classic",
            img: `${imgBaseHost}/product-category-icons/Classic${gender}.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.Boots"),
            value: "Boots",
            img: `${imgBaseHost}/product-category-icons/Boots.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.TopBoots"),
            value: "TopBoots",
            img: `${imgBaseHost}/product-category-icons/TopBoots${gender}.svg`,
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
            name: t("ProductCategories.SportBag"),
            value: "SportBag",
            img: `${imgBaseHost}/product-category-icons/SportBag.svg`,
            mainCategory: MainCategory.Bags
        },
        {
            name: t("ProductCategories.Portfolio"),
            value: "Portfolio",
            img: `${imgBaseHost}/product-category-icons/Portfolio${gender}.svg`,
            mainCategory: MainCategory.Bags
        },
        {
            name: t("ProductCategories.Satchel"),
            value: "Satchel",
            img: `${imgBaseHost}/product-category-icons/Satchel${gender}.svg`,
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
            name: t("ProductCategories.Underwear"),
            value: "Underwear",
            img: `${imgBaseHost}/product-category-icons/Underwear.svg`,
            mainCategory: MainCategory.UnderwearPyjamasBeach
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
            name: t("ProductCategories.ShawlScarf"),
            value: "ShawlScarf",
            img: `${imgBaseHost}/product-category-icons/ShawlScarf.svg`,
            mainCategory: MainCategory.Accessories
        },
        {
            name: t("ProductCategories.FlatShoes"),
            value: "FlatShoes",
            img: `${imgBaseHost}/product-category-icons/FlatShoes.svg`,
            mainCategory: MainCategory.Footwear
        },
        {
            name: t("ProductCategories.HighHeels"),
            value: "HighHeels",
            img: `${imgBaseHost}/product-category-icons/HighHeels.svg`,
            mainCategory: MainCategory.Footwear
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
    ]

    const productCategories = gender === Gender.Female ? femaleProductCategories : maleProductCategories;

    const UpperGroup = (productCategories: ProductCategory[]) => {
        const upperCategories = productCategories.filter(x => x.mainCategory === MainCategory.Upper).map(category => {
            return {
                value: category.value,
                imageSrc: category.img,
                labelText: category.name
            }
        });

        return <CustomCheckboxGroup
            sx={{
                justifyContent: 'flex-start'
            }}
            checkboxSx={{
                p: 1,
                mt: 2
            }}
            value={stylePreferences?.excludedUpperCategories ?? ""}
            label={
                <Box>
                    <Typography variant="h4" component={"span"}>{t("MainCategories.Upper")}</Typography>
                    <Typography variant="h4" color="secondary" component={"span"}>{t("MainCategories.Optional")}</Typography>
                </Box>}
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
                imageSrc: category.img,
                labelText: category.name,
            }
        });

        return <CustomCheckboxGroup
            sx={{
                justifyContent: 'flex-start'
            }}
            checkboxSx={{
                p: 1,
                mt: 2
            }}
            value={stylePreferences?.excludedLowerCategories ?? ""}
            label={
                <Box>
                    <Typography variant="h5" component={"span"}>{t("MainCategories.Lower")}</Typography>
                    <Typography variant="h5" color="secondary" component={"span"}>{t("MainCategories.Optional")}</Typography>
                </Box>}
            contents={lowerCategories}
            isNegative
            onChange={(values: string[]) => {
                setFieldValue("excludedLowerCategories", values.length > 0 ? values.join(',') : "");
            }}
        />
    }

    const OuterGroup = (productCategories: ProductCategory[]) => {
        const outerCategories = productCategories.filter(x => x.mainCategory === MainCategory.Outer).map(category => {
            return {
                value: category.value,
                imageSrc: category.img,
                labelText: category.name
            }
        });

        return <CustomCheckboxGroup
            sx={{
                justifyContent: 'flex-start'
            }}
            checkboxSx={{
                p: 1,
                mt: 2
            }}
            value={stylePreferences?.excludedOuterCategories ?? ""}
            label={
                <Box>
                    <Typography variant="h5" component={"span"}>{t("MainCategories.Outer")}</Typography>
                    <Typography variant="h5" color="secondary" component={"span"}>{t("MainCategories.Optional")}</Typography>
                </Box>}
            contents={outerCategories}
            isNegative
            onChange={(values: string[]) => {
                setFieldValue("excludedOuterCategories", values.length > 0 ? values.join(',') : "");
            }}
        />
    }
    const UnderwearPyjamasBeachGroup = (productCategories: ProductCategory[]) => {
        const accessoriesCategories = productCategories.filter(x => x.mainCategory === MainCategory.UnderwearPyjamasBeach).map(category => {
            return {
                value: category.value,
                imageSrc: category.img,
                labelText: category.name
            }
        });

        return <CustomCheckboxGroup
            sx={{
                justifyContent: 'flex-start'
            }}
            checkboxSx={{
                p: 1,
                mt: 2
            }}
            value={stylePreferences?.excludedUnderwearCategories ?? ""}
            label={
                <Box>
                    <Typography variant="h5" component={"span"}>{t("MainCategories.UnderwearPyjamasBeach")}</Typography>
                    <Typography variant="h5" color="secondary" component={"span"}>{t("MainCategories.Optional")}</Typography>
                </Box>}
            contents={accessoriesCategories}
            isNegative
            onChange={(values: string[]) => {
                setFieldValue("excludedUnderwearCategories", values.length > 0 ? values.join(',') : "");
            }}
        />
    }

    const AccessoriesGroup = (productCategories: ProductCategory[]) => {
        const accessoriesCategories = productCategories.filter(x => x.mainCategory === MainCategory.Accessories).map(category => {
            return {
                value: category.value,
                imageSrc: category.img,
                labelText: category.name
            }
        });

        return <CustomCheckboxGroup
            sx={{
                justifyContent: 'flex-start'
            }}
            checkboxSx={{
                p: 1,
                mt: 2
            }}
            value={stylePreferences?.excludedAccessoryCategories ?? ""}
            label={
                <Box>
                    <Typography variant="h5" component={"span"}>{t("MainCategories.Accessories")}</Typography>
                    <Typography variant="h5" color="secondary" component={"span"}>{t("MainCategories.Optional")}</Typography>
                </Box>}
            contents={accessoriesCategories}
            isNegative
            onChange={(values: string[]) => {
                setFieldValue("excludedAccessoryCategories", values.length > 0 ? values.join(',') : "");
            }}
        />
    }

    const BagsGroup = (productCategories: ProductCategory[]) => {
        const bagsCategories = productCategories.filter(x => x.mainCategory === MainCategory.Bags).map(category => {
            return {
                value: category.value,
                imageSrc: category.img,
                labelText: category.name
            }
        });

        return <CustomCheckboxGroup
            sx={{
                justifyContent: 'flex-start'
            }}
            checkboxSx={{
                p: 1,
                mt: 2
            }}
            value={stylePreferences?.excludedBagCategories ?? ""}
            label={
                <Box>
                    <Typography variant="h5" component={"span"}>{t("MainCategories.Bags")}</Typography>
                    <Typography variant="h5" color="secondary" component={"span"}>{t("MainCategories.Optional")}</Typography>
                </Box>}
            contents={bagsCategories}
            isNegative
            onChange={(values: string[]) => {
                setFieldValue("excludedBagCategories", values.length > 0 ? values.join(',') : "");
            }}
        />
    }

    const FootwearGroup = (productCategories: ProductCategory[]) => {
        const categories = productCategories.filter(x => x.mainCategory === MainCategory.Footwear).map(category => {
            return {
                value: category.value,
                imageSrc: category.img,
                labelText: category.name
            }
        });

        return <CustomCheckboxGroup
            sx={{
                justifyContent: 'flex-start'
            }}
            checkboxSx={{
                p: 1,
                mt: 2
            }}
            value={stylePreferences?.excludedFootwearCategories ?? ""}
            label={
                <Box>
                    <Typography variant="h5" component={"span"}>{t("MainCategories.Footwear")}</Typography>
                    <Typography variant="h5" color="secondary" component={"span"}>{t("MainCategories.Optional")}</Typography>
                </Box>
            }
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
                label={
                    <Box>
                        <Typography variant="h4" component={"span"} sx={{
                            mb: 4
                        }}>{t("Pages.Welcome.StylePreferences.BodyPartsToHighlight")}</Typography>
                        <Typography color="secondary" variant="h4" component={"span"}
                        >{t("Pages.Welcome.StylePreferences.Optional")}</Typography>
                    </Box>
                }
                checkboxSx={{
                    p: 1,
                    mt: 2
                }}
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
                label={
                    <Box>
                        <Typography variant="h4" component={"span"} sx={{
                            mb: 4
                        }}>{t("Pages.Welcome.StylePreferences.BodyPartsToHide")}</Typography>
                        <Typography color="secondary" variant="h4" component={"span"}
                        >{t("Pages.Welcome.StylePreferences.Optional")}</Typography>
                    </Box>
                }
                checkboxSx={{
                    p: 1,
                    mt: 2
                }}
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
            imageSrc: `${imgBaseHost}/body-parts/${bodyPart}.svg`,
            labelText: t(`Pages.Welcome.StylePreferences.BodyParts.${bodyPart}`)
        }
    });

    return (
        <Grid item container xs={12} spacing={4}>
            {(layout !== "dashboard") && <SkipFormPaper />}
            <Grid item xs={6} display={{ xs: 'none', md: 'block' }}>
                <ImageComponent src={`${imgBaseHost}/style-preferences-general/ShoppingIllustration.svg`}></ImageComponent>
            </Grid>
            <Grid item container xs={12} md={6}>
                <Grid item xs={12} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <FormControl error={touched.lovesShopping && errors.lovesShopping !== undefined}>
                        <Typography variant="h4" align="center" >
                            {t(`Pages.Welcome.StylePreferences.LikesShoping`)}
                        </Typography>
                        <Typography variant="body1" mt={{ xs: 1, md: 2 }} align="center" fontWeight={800} color={theme.palette.error.main}>
                            {touched.lovesShopping && errors.lovesShopping}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            mt: { xs: 1, md: 2 }
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
                                    color="error"
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
                        <FormHelperText>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <FormControl error={touched.openToSuggestions && errors.openToSuggestions !== undefined}>
                        <Typography variant="h4" mt={{ xs: 1, md: 2 }} align="center">
                            {t(`Pages.Welcome.StylePreferences.OpenToSuggestions`)}
                        </Typography>
                        <Typography variant="body1" mt={{ xs: 1, md: 2 }} align="center" fontWeight={800} color={theme.palette.error.main}>
                            {touched.openToSuggestions && errors.openToSuggestions}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            mt: { xs: 1, md: 2 }
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
                                    color="error"
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
                        <FormHelperText>
                        </FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid item container xs={12} md={6}>
                <Grid item xs={0} md={4}></Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" align="left">
                        {t(`Pages.Welcome.StylePreferences.ChoiceReasonsQuestion`)}
                    </Typography>
                    <Typography variant="body1" mt={2} align="left" fontWeight={800} color={theme.palette.error.main}>
                        {touched.choiceReasons && errors.choiceReasons}
                    </Typography>
                </Grid>
                <Grid item xs={0} md={4}></Grid>
                <Grid item xs={12} md={8}>
                    <FormControl fullWidth error={touched.choiceReasons && errors.choiceReasons !== undefined}>
                        <FormGroup>
                            {choiseReasons.map(reason => (
                                <FormControlLabel key={reason} control={
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
                        <FormHelperText>
                        </FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item xs={6} display={{ xs: 'none', md: 'block' }}>
                <ImageComponent src={`${imgBaseHost}/style-preferences-general/WhyModilist1.svg`}></ImageComponent>
            </Grid>
            {account?.gender === Gender.Female &&
                <>
                    <Grid item xs={12}>
                        <BodyPartsToHighlight />
                    </Grid>
                    <Grid item xs={12}>
                        <BodyPartsToHide />

                        <FormControl fullWidth sx={{
                            mt: 4
                        }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="prefersHijabClothing"
                                        onChange={handleChange}
                                        checked={stylePreferences.prefersHijabClothing}
                                    />
                                }
                                label={<Typography variant="subtitle1">{t("Pages.Welcome.StylePreferences.Hijab")}</Typography>} />
                        </FormControl>
                    </Grid>
                </>
            }

            <Grid item xs={12}>
                <Box>
                    <Typography variant="h4" component={"span"} sx={{
                        mb: 4
                    }}>{t("Pages.Welcome.StylePreferences.ExcludedCategoriesTitle")}</Typography><Typography color="secondary" variant="h4" component={"span"}>{t("Pages.Welcome.StylePreferences.Optional")}</Typography>

                </Box>
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
                    {UpperGroup(productCategories)}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    {OuterGroup(productCategories)}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    {UnderwearPyjamasBeachGroup(productCategories)}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    {AccessoriesGroup(productCategories)}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    {FootwearGroup(productCategories)}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    {BagsGroup(productCategories)}
                </FormControl>
            </Grid>
            {
                layout && layout === "dashboard" ? <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Button
                        disabled={isBusy}
                        onClick={() => {
                            submitForm();
                            if (!isValid) {
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth'
                                });
                            }
                        }}
                        color="secondary"
                        variant="contained">
                        {isBusy && <CircularProgress sx={{
                            width: "18px !important",
                            height: "18px !important",
                            mr: 2
                        }} />}
                        {t('Generic.Forms.Submit')}
                    </Button>
                </Grid>
                    : <React.Fragment>
                        <Grid item container xs={6} justifyContent="flex-start">
                            <Button
                                disabled={isBusy}
                                variant="outlined"
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                {t('Layouts.Welcome.WelcomeSteps.Buttons.Back')}
                            </Button>
                        </Grid>
                        <Grid item container xs={6} justifyContent="flex-end">
                            <Button
                                disabled={isBusy}
                                color="secondary"
                                onClick={() => {
                                    submitForm();
                                    if (!isValid) {
                                        window.scrollTo({
                                            top: 0,
                                            left: 0,
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                                variant="contained">
                                {isBusy && <CircularProgress sx={{
                                    width: "18px !important",
                                    height: "18px !important",
                                    mr: 2
                                }} />}
                                {t('Layouts.Welcome.WelcomeSteps.Buttons.Next')}
                            </Button>
                        </Grid>
                    </React.Fragment>
            }
            <Snackbar
                open={snackbarStatus}
                autoHideDuration={6000}
                onClose={() => {
                    setSnackbarStatus(false);
                }}>
                <Alert onClose={() => {
                    setSnackbarStatus(false);
                }}
                    severity="error"
                    variant="filled">
                    {t(`Generic.Forms.UnexpectedError`)}
                </Alert>
            </Snackbar>
        </Grid >
    )
}