import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";
import { Gender } from "../../../services/swagger/api";

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
    gender: Gender;
    value?: string | null;
    onChange: (value: string) => void;
}

export function LowerFits(props: LowerFitsProps) {
    const { cdnImg: imgBaseHost } = config;
    const { t } = useTranslation();
    const { gender, value, onChange } = props;

    const lowerFits: LowerFitElement[] = Object.keys(LowerFit).map(lowerFit => {
        return {
            name: t(`Pages.Welcome.FitPreferences.LowerFits.${lowerFit}`),
            value: lowerFit,
            img: `${imgBaseHost}/lower-fits/${lowerFit}${gender}.svg`
        }
    });

    return <CustomCheckboxGroup
        value={value ?? ""}
        label={
            <Box textAlign="center" sx={{
                mb: 4
            }}>
                <Typography variant="h4" align="center" component={"span"} sx={{
                    mb: 4
                }}>
                    {t("Pages.Welcome.FitPreferences.LowerFitPreference")}
                </Typography>
                <Typography variant="h4" align="center" color="secondary" component={"span"}>
                    {t('Pages.Welcome.FitPreferences.Optional')}
                </Typography>
            </Box>
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
                        <Typography variant="subtitle1" align="center">{lowerFit.name}</Typography>
                    </Box>
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}