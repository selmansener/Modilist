import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";

enum Fabric {
    Leather = "Leather",
    Wool = "Wool",
    Satin = "Satin",
    FauxFur = "Faux Fur",
    Velvet = "Velvet",
    Lace = "Lace",
}

interface FabricElement {
    name: string,
    value: string,
    img: string
}

export function Fabrics() {
    const { t } = useTranslation();
    const { imgBaseHost } = config;

    const colors: FabricElement[] = [
        { 
            name: t("Fabric.Leather"),
            value: Fabric.Leather,
            img: `${imgBaseHost}/fabrics/ekose.jpg`
        },
        { 
            name: t("Fabric.Wool"),
            value: Fabric.Wool,
            img: `${imgBaseHost}/fabrics/ekose.jpg`
        },
        { 
            name: t("Fabric.Satin"),
            value: Fabric.Satin,
            img: `${imgBaseHost}/fabrics/ekose.jpg`
        },
        { 
            name: t("Fabric.FauxFur"),
            value: Fabric.FauxFur,
            img: `${imgBaseHost}/fabrics/ekose.jpg`
        },
        { 
            name: t("Fabric.Velvet"),
            value: Fabric.Velvet,
            img: `${imgBaseHost}/fabrics/ekose.jpg`
        },
        { 
            name: t("Fabric.Lace"),
            value: Fabric.Lace,
            img: `${imgBaseHost}/fabrics/ekose.jpg`
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
                {t("WelcomeSteps.StylePreferences.ExcludedFabrics.1")}
            </Typography>
            <Typography color={"error"} sx={{ mr: 1 }}>
                {t("WelcomeSteps.StylePreferences.ExcludedFabrics.2")}
            </Typography>
            <Typography>
                {t("WelcomeSteps.StylePreferences.ExcludedFabrics.3")}
            </Typography>
        </Box>
        }
        contents={
            colors.map(colorType => {
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
