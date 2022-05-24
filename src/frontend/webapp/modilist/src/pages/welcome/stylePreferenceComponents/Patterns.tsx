import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";

enum Pattern {
    Plaid = "Plaid",
    Striped = "Striped",
    PolkaDot = "PolkaDot",
    Shawl = "Shawl",
    Camouflage = "Camouflage",
    AnimalPattern = "Animal",
    Squared = "Squared",
    AnimalFigured = "Animal",
    BigFlower = "Big",
    SmallFlower = "Small",
    Printed = "Printed",
}

interface PatternElement {
    name: string,
    value: string,
    img: string
}

export function Patterns() {
    const { t } = useTranslation();
    const { imgBaseHost } = config;

    const colors: PatternElement[] = [
        {
            name: t("Pattern.Plaid"),
            value: Pattern.Plaid,
            img: `${imgBaseHost}/patterns/Plaid.svg`
        },
        {
            name: t("Pattern.Striped"),
            value: Pattern.Striped,
            img: `${imgBaseHost}/patterns/Striped.svg`
        },
        {
            name: t("Pattern.PolkaDot"),
            value: Pattern.PolkaDot,
            img: `${imgBaseHost}/patterns/PolkaDot.svg`
        },
        {
            name: t("Pattern.Shawl"),
            value: Pattern.Shawl,
            img: `${imgBaseHost}/patterns/Shawl.svg`
        },
        {
            name: t("Pattern.Camouflage"),
            value: Pattern.Camouflage,
            img: `${imgBaseHost}/patterns/Camouflage.svg`
        },
        {
            name: t("Pattern.AnimalPattern"),
            value: Pattern.AnimalPattern,
            img: `${imgBaseHost}/patterns/AnimalPattern.svg`
        },
        {
            name: t("Pattern.Squared"),
            value: Pattern.Squared,
            img: `${imgBaseHost}/patterns/Squared.svg`
        },
        {
            name: t("Pattern.AnimalFigured"),
            value: Pattern.AnimalFigured,
            img: `${imgBaseHost}/patterns/AnimalFigured.svg`
        },
        {
            name: t("Pattern.BigFlower"),
            value: Pattern.BigFlower,
            img: `${imgBaseHost}/patterns/BigFlower.svg`
        },
        {
            name: t("Pattern.SmallFlower"),
            value: Pattern.SmallFlower,
            img: `${imgBaseHost}/patterns/SmallFlower.svg`
        },
        {
            name: t("Pattern.Printed"),
            value: Pattern.Printed,
            img: `${imgBaseHost}/patterns/Printed.svg`
        },
    ]

    return <CustomCheckboxGroup
        label={<Box sx={{
            display: 'flex',
            flexDirection: 'row',
            ml: 5,
            mb: 2
        }}>
            <Typography sx={{ mr: 1 }}>
                {t("WelcomeSteps.StylePreferences.ExcludedPatterns.1")}
            </Typography>
            <Typography color={"error"} sx={{ mr: 1 }}>
                {t("WelcomeSteps.StylePreferences.ExcludedPatterns.2")}
            </Typography>
            <Typography>
                {t("WelcomeSteps.StylePreferences.ExcludedPatterns.3")}
            </Typography>
        </Box>
        }
        contents={
            colors.map(colorType => {
                return {
                    value: colorType.value,
                    element: <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 100
                    }}>
                        <ImageComponent src={colorType.img} />
                        <Typography>{colorType.name}</Typography>
                    </Box>
                }
            })
        }
        onChange={(values: string[]) => {
        }} />
}
