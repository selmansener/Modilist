import { Box, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";

enum Color {
    Red = "Red",
    Green = "Green",
    Blue = "Blue",
    Yellow = "Yellow",
    Orange = "Orange",
    Pink = "Pink",
    NavyBlue = "NavyBlue",
    Purple = "Purple",
    Brown = "Brown",
    Grey = "Grey",
    White = "White",
    Black = "Black"
}

interface ColorElement {
    name: string,
    value: string,
    img: string
}

export interface ColorsProps {
    value?: string | null;
    onChange: (values: string) => void;
}

export function Colors(props: ColorsProps) {
    const { t } = useTranslation();
    const { imgBaseHost } = config;
    const { value, onChange } = props;

    const colors: ColorElement[] = Object.keys(Color).map(color => {
        return {
            name: t(`Color.${color}`),
            value: color,
            img: `${imgBaseHost}/colors/${color}.svg`
        }
    });

    return <CustomCheckboxGroup
        sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexWrap: 'wrap',
            columnCount: 4
        }}
        value={value ?? ""}
        label={
            <Box sx={{
                mb: 2
            }}>

                <Trans>
                    <Typography variant={"h5"} display="inline">
                        {t("Pages.Welcome.FabricProperties.ExcludedColors.1")}
                    </Typography>
                    <Typography variant={"h5"} display="inline" color={"error"} >
                        {t("Pages.Welcome.FabricProperties.ExcludedColors.2")}
                    </Typography>
                    <Typography variant={"h5"} display="inline">
                        {t("Pages.Welcome.FabricProperties.ExcludedColors.3")}
                    </Typography>
                </Trans>
            </ Box>
        }
        isNegative
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
            onChange(values.join(','));
        }} />
}