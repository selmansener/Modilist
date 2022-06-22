import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";

enum LowerFit {
    Straight = "Straight",
    Skinny = "Skinny",
    Slim = "Slim",
    Regular = "Regular",
    Relaxed = "Relaxed",
    Loose = "Loose",
}

interface LowerFitElement {
    name: string;
    value: string;
    img: string;
}

export interface LowerFitsProps {
    value?: string | null;
    onChange: (value: string) => void;
}

export function LowerFits(props: LowerFitsProps) {
    const { imgBaseHost } = config;
    const { t } = useTranslation();
    const { value, onChange } = props;

    const lowerFits: LowerFitElement[] = Object.keys(LowerFit).map(lowerFit => {
        return {
            name: t(`Pages.Welcome.FitPreferences.LowerFits.${lowerFit}`),
            value: lowerFit,
            img: `${imgBaseHost}/lower-fits/${lowerFit}.svg`
        }
    });

    return <CustomCheckboxGroup
        value={value ?? ""}
        label={
            <Typography variant="h3" sx={{
                mb: 4
            }}>
                {t("Pages.Welcome.FitPreferences.LowerFitPreference")}
            </Typography>
        }
        contents={
            lowerFits.map(lowerFit => {
                return {
                    value: lowerFit.value,
                    element: <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <ImageComponent src={lowerFit.img} />
                        <Typography variant="h4">{lowerFit.name}</Typography>
                    </Box>
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}