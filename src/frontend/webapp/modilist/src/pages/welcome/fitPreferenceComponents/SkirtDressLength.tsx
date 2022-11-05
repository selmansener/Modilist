import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";

enum SkirtDressLength {
    Mini = "Mini",
    Midi = "Midi",
    Long = "Long"
}

interface SkirtDressLengthElement {
    name: string;
    value: string;
    img: string;
}

interface SkirtDressLengthsProps {
    value?: string | null;
    onChange: (value: string) => void;
}

export function SkirtDressLengths(props: SkirtDressLengthsProps) {
    const { cdnImg: imgBaseHost } = config;
    const { t } = useTranslation();
    const { value, onChange } = props;

    const skirtDressLengths: SkirtDressLengthElement[] = Object.keys(SkirtDressLength).map(skirtDressLength => {
        return {
            name: t(`Pages.Welcome.FitPreferences.SkirtDressLengths.${skirtDressLength}`),
            value: skirtDressLength,
            img: `${imgBaseHost}/skirt-dress-fits/${skirtDressLength}.svg`
        }
    });

    return <CustomCheckboxGroup
        sx={{
            justifyContent: 'space-evenly'
        }}
        value={value ?? ""}
        label={
            <Box textAlign="center" sx={{
                mb: 4
            }}>
                <Typography variant="h4" align="center" component={"span"} sx={{
                    mb: 4
                }}>
                    {t("Pages.Welcome.FitPreferences.SkirtDressLengthPreference")}
                </Typography>
                <Typography variant="h4" align="center" color="secondary" component={"span"}>
                    {t('Pages.Welcome.FitPreferences.Optional')}
                </Typography>
            </Box>
        }
        contents={
            skirtDressLengths.map(skirtDressLength => {
                return {
                    value: skirtDressLength.value,
                    imageSrc: skirtDressLength.img,
                    labelText: skirtDressLength.name
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}