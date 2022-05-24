import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";

enum Color {
    Red= "Red",
    Green= "Green",
    Blue= "Blue",
    Yellow= "Yellow",
    Orange= "Orange",
    Pink= "Pink",
    Purple= "Purple",
    Brown= "Brown",

}

interface ColorElement {
    name: string,
    value: string,
    img: string
}

export function Colors() {
    const { t } = useTranslation();
    const { imgBaseHost } = config;

    const colors: ColorElement[] = [
        {
            name: t("Color.Red"),
            value: Color.Red,
            img: `${imgBaseHost}/colors/Red.svg`
        },
        {
            name: t("Color.Green"),
            value: Color.Green,
            img: `${imgBaseHost}/colors/Green.svg`
        },
        {
            name: t("Color.Blue"),
            value: Color.Blue,
            img: `${imgBaseHost}/colors/Blue.svg`
        },
        {
            name: t("Color.Yellow"),
            value: Color.Yellow,
            img: `${imgBaseHost}/colors/Yellow.svg`
        },
        {
            name: t("Color.Orange"),
            value: Color.Orange,
            img: `${imgBaseHost}/colors/Orange.svg`
        },
        {
            name: t("Color.Pink"),
            value: Color.Pink,
            img: `${imgBaseHost}/colors/Pink.svg`
        },
        {
            name: t("Color.Purple"),
            value: Color.Purple,
            img: `${imgBaseHost}/colors/Purple.svg`
        },
        {
            name: t("Color.Brown"),
            value: Color.Brown,
            img: `${imgBaseHost}/colors/Brown.svg`
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
                {t("WelcomeSteps.StylePreferences.ExcludedColors.1")}
            </Typography>
            <Typography color={"error"} sx={{ mr: 1 }}>
                {t("WelcomeSteps.StylePreferences.ExcludedColors.2")}
            </Typography>
            <Typography>
                {t("WelcomeSteps.StylePreferences.ExcludedColors.3")}
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