import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";

enum UpperFit {
    Skinny = "Skinny",
    Regular = "Regular",
    Loose = "Loose",
}

interface UpperFitElement {
    name: string;
    value: string;
    img: string;
}

export interface UpperFitsProps {
    value?: string | null;
    onChange: (value: string) => void;
}

export function UpperFits(props: UpperFitsProps) {
    const { imgBaseHost } = config;
    const { t } = useTranslation();
    const { value, onChange } = props;

    const upperFits: UpperFitElement[] = Object.keys(UpperFit).map(upperFit => {
        return {
            name: t(`Pages.Welcome.FitPreferences.UpperFits.${upperFit}`),
            value: upperFit,
            img: `${imgBaseHost}/upper-fits/${upperFit}.svg`
        }
    });

    return <CustomCheckboxGroup
        sx={{
            justifyContent: 'space-evenly'
        }}
        value={value ?? ""}
        label={
            <Typography variant="h3" sx={{
                mb: 4
            }}>
                {t("Pages.Welcome.FitPreferences.UpperFitPreference")}
            </Typography>
        }
        contents={
            upperFits.map(upperFit => {
                return {
                    value: upperFit.value,
                    element: <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <ImageComponent src={upperFit.img} />
                        <Typography variant="h4">{upperFit.name}</Typography>
                    </Box>
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}