import { Box, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
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
    value: string,
    img: string
}

export interface ColorTypesProps {
    value?: string | null;
    onChange: (values: string) => void;
}

export function ColorTypes(props: ColorTypesProps) {
    const { t } = useTranslation();
    const { imgBaseHost } = config;
    const { value, onChange } = props;

    const colorTypes: ColorTypeElement[] = Object.keys(ColorType).map(colorType => {
        return {
            name: t(`ColorType.${colorType}`),
            value: colorType,
            img: `${imgBaseHost}/color-types/${colorType}.svg`
        }
    });

    return <CustomCheckboxGroup
        sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexWrap: 'wrap',
        }}
        value={value ? value : ""}
        label={
            <Box sx={{
                mb: 2
            }}>
                <Trans>
                    <Typography variant={"h5"} display="inline" >
                        {t("Pages.Welcome.FabricProperties.ExcludedColorTypes.1")}
                    </Typography>
                    <Typography variant={"h5"} display="inline" color={"error"} >
                        {t("Pages.Welcome.FabricProperties.ExcludedColorTypes.2")}
                    </Typography>
                    <Typography variant={"h5"} display="inline">
                        {t("Pages.Welcome.FabricProperties.ExcludedColorTypes.3")}
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