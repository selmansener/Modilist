import { Box, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";

enum ColorType {
    Pastel = "Pastel",
    Vivid = "Vivid",
    Neon = "Neon",
    Light = "Light",
    Dark = "Dark",
    Nude = "Nude",
    Hot = "Hot",
    Cold = "Cold",
    BlackAndWhite = "BlackAndWhite",
}

interface ColorTypeElement {
    name: string,
    value: string,
    img: string
}

export interface ColorTypesProps {
    value?: string | null;
    onChange: (values: string) => void;
}

export function ColorTypes(props: ColorTypesProps) {
    const { t } = useTranslation();
    const { cdnImg: imgBaseHost } = config;
    const { value, onChange } = props;

    const colorTypes: ColorTypeElement[] = Object.keys(ColorType).map(colorType => {
        return {
            name: t(`ColorType.${colorType}`),
            value: colorType,
            img: `${imgBaseHost}/color-types/${colorType}.svg`
        }
    });

    return <CustomCheckboxGroup
        value={value ? value : ""}
        label={
            <Box sx={{
                mb: 2
            }} textAlign="center">
                <Trans>
                    <Typography variant="h4" display="inline" >
                        {t("Pages.Welcome.FabricProperties.ExcludedColorTypes.1")}
                    </Typography>
                    <Typography variant="h4" display="inline" color={"error"} >
                        {t("Pages.Welcome.FabricProperties.ExcludedColorTypes.2")}
                    </Typography>
                    <Typography variant="h4" display="inline">
                        {t("Pages.Welcome.FabricProperties.ExcludedColorTypes.3")}
                    </Typography>
                    <Typography variant="h4" color="secondary" component={"span"}>
                        {t('Pages.Welcome.BodySize.Optional')}
                    </Typography>
                </Trans>
            </Box>
        }
        isNegative
        contents={
            colorTypes.map(colorType => {
                return {
                    value: colorType.value,
                    element: <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <ImageComponent src={colorType.img} />
                        <Typography  variant="h4" align="center">{colorType.name}</Typography>
                    </Box>
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}