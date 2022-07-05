import { Box, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";

enum Color {
    Gold = "Gold",
    Silver = "Silver",
    Copper = "Copper"
}

interface AccessoryColorElement {
    name: string,
    value: string,
    img: string
}

export interface AccessoryColorsProps {
    value?: string | null;
    onChange: (values: string) => void;
}

export function AccessoryColors(props: AccessoryColorsProps) {
    const { t } = useTranslation();
    const { imgBaseHost } = config;
    const { value, onChange } = props;

    const colors: AccessoryColorElement[] = Object.keys(Color).map(color => {
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
                        {t("Pages.Welcome.FabricProperties.ExcludedAccessoryColors.1")}
                    </Typography>
                    <Typography variant="h4" display="inline" color={"error"} >
                        {t("Pages.Welcome.FabricProperties.ExcludedAccessoryColors.2")}
                    </Typography>
                    <Typography variant="h4" display="inline">
                        {t("Pages.Welcome.FabricProperties.ExcludedAccessoryColors.3")}
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