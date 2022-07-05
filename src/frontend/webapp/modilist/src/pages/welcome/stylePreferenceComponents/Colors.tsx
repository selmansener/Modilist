import { Box, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";

enum Color {
    Red = "Red",
    Orange = "Orange",
    Yellow = "Yellow",
    Green = "Green",
    Blue = "Blue",
    NavyBlue = "NavyBlue",
    Purple = "Purple",
    Pink = "Pink",
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
        value={value ?? ""}
        label={
            <Box sx={{
                mb: 2
            }} textAlign="center">
                <Trans>
                    <Typography variant="h4" display="inline">
                        {t("Pages.Welcome.FabricProperties.ExcludedColors.1")}
                    </Typography>
                    <Typography variant="h4" display="inline" color={"error"} >
                        {t("Pages.Welcome.FabricProperties.ExcludedColors.2")}
                    </Typography>
                    <Typography variant="h4" display="inline">
                        {t("Pages.Welcome.FabricProperties.ExcludedColors.3")}
                    </Typography>
                    <Typography variant="h4" color="secondary" component={"span"}>
                        {t('Pages.Welcome.BodySize.Optional')}
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
                    }}>
                        <ImageComponent src={colorType.img} />
                        <Typography variant="h4" align="center">{colorType.name}</Typography>
                    </Box>
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}