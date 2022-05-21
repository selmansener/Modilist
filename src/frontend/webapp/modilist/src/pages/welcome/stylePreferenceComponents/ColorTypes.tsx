import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";

enum ColorType {
    Hot = "Hot",
    Cold = "Cold",
    Pastel = "Pastel",
    Nude = "Nude",
    BlackWhite = "BlackWhite",
    Dark = "Dark"
}

interface ColorTypeElement {
    name: string,
    value: ColorType,
    img: string
}

export function ColorTypes() {
    const { t } = useTranslation();
    const { imgBaseHost } = config;

    const colorTypes: ColorTypeElement[] = [
        {
            name: t("ColorType.BlackWhite"),
            value: ColorType.BlackWhite,
            img: `${imgBaseHost}/color-types/red.png`
        },
        {
            name: t("ColorType.Cold"),
            value: ColorType.Cold,
            img: `${imgBaseHost}/color-types/red.png`
        },
        {
            name: t("ColorType.Dark"),
            value: ColorType.Dark,
            img: `${imgBaseHost}/color-types/red.png`
        },
        {
            name: t("ColorType.Hot"),
            value: ColorType.Hot,
            img: `${imgBaseHost}/color-types/red.png`
        },
        {
            name: t("ColorType.Nude"),
            value: ColorType.Nude,
            img: `${imgBaseHost}/color-types/red.png`
        },
        {
            name: t("ColorType.Pastel"),
            value: ColorType.Pastel,
            img: `${imgBaseHost}/color-types/red.png`
        }
    ]

    return <CustomCheckboxGroup
        label={<Box sx={{
            display: 'flex',
            flexDirection: 'row',
            ml: 5,
            mb: 2
        }}>
            <Typography sx={{ mr: 1 }}>
                {t("WelcomeSteps.StylePreferences.ExcludedColorTypes.1")}
            </Typography>
            <Typography color={"error"} sx={{ mr: 1 }}>
                {t("WelcomeSteps.StylePreferences.ExcludedColorTypes.2")}
            </Typography>
            <Typography>
                {t("WelcomeSteps.StylePreferences.ExcludedColorTypes.3")}
            </Typography>
        </Box>
        }
        contents={
            colorTypes.map(colorType => {
                return {
                    value: colorType.value,
                    element: <Box>
                        <ImageComponent src={colorType.img} />
                        <Typography>{colorType.name}</Typography>
                    </Box>
                }
            })
        }
        onChange={(values: string[]) => {
        }} />
}