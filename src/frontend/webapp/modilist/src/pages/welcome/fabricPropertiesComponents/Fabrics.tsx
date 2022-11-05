import { Box, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";
import { Gender } from "../../../services/swagger/api";

enum Fabric {
    Leather = "Leather",
    Wool = "Wool",
    Satin = "Satin",
    FauxFur = "Faux Fur",
    Velvet = "Velvet",
    Lace = "Lace",
    Guipure = "Guipure",
    Jute = "Jute",
    Parachute = "Parachute",
}

interface FabricElement {
    name: string,
    value: string,
    img: string
}

export interface FabricsProps {
    gender: Gender;
    value?: string | null;
    onChange: (value: string) => void;
}

export function Fabrics(props: FabricsProps) {
    const { t } = useTranslation();
    const { cdnImg: imgBaseHost } = config;
    const { gender, value, onChange } = props;

    const fabrics: FabricElement[] = (gender === Gender.Female
        ? Object.keys(Fabric)
        : Object.keys(Fabric).filter(x => x !== Fabric.Lace))
        .map(fabric => {
            return {
                name: t(`Fabric.${fabric}`),
                value: fabric,
                img: `${imgBaseHost}/fabrics/${fabric}.svg`
            }
        })

    return <CustomCheckboxGroup
        value={value ?? ""}
        label={<Box sx={{
            mb: 2
        }} textAlign="center">
            <Trans>
                <Typography variant="h4" display="inline">
                    {t("Pages.Welcome.FabricProperties.ExcludedFabrics.1")}
                </Typography>
                <Typography variant="h4" display="inline" color={"error"} >
                    {t("Pages.Welcome.FabricProperties.ExcludedFabrics.2")}
                </Typography>
                <Typography variant="h4" display="inline">
                    {t("Pages.Welcome.FabricProperties.ExcludedFabrics.3")}
                </Typography>
                <Typography variant="h4" color="secondary" component={"span"}>
                    {t('Pages.Welcome.BodySize.Optional')}
                </Typography>
            </Trans>
        </Box>
        }
        checkboxSx={{
            p: 1,
            mt: 2
        }}
        isNegative
        contents={
            fabrics.map(fabric => {
                return {
                    value: fabric.value,
                    imageSrc: fabric.img,
                    labelText: fabric.name
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}
