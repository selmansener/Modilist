import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";
import { Gender } from "../../../services/swagger/api";


enum LegFitFemale {
    Spanish = "Spanish",
    Straight = "Straight",
    Wide = "Wide",
    Loose = "Loose",
    Slim = "Slim"
}
enum LegFitMale {
    Spanish = "Spanish",
    Straight = "Straight",
    Loose = "Loose",
    Slim = "Slim"
}

interface LegFitElement {
    name: string;
    value: string;
    img: string;
}

interface LegFitsProps {
    gender: Gender;
    value?: string | null;
    onChange: (value: string) => void;
}

export function LegFits(props: LegFitsProps) {
    const { cdnImg: imgBaseHost } = config;
    const { t } = useTranslation();
    const { gender, value, onChange } = props;

    const legFits: LegFitElement[] = gender === Gender.Female ?
        Object.keys(LegFitFemale).map(legFit => {
            return {
                name: t(`Pages.Welcome.FitPreferences.LegFits.${legFit}`),
                value: legFit,
                img: `${imgBaseHost}/leg-fits/${legFit}${gender}.svg`
            }
        }) :
        Object.keys(LegFitMale).map(legFit => {
            return {
                name: t(`Pages.Welcome.FitPreferences.LegFits.${legFit}`),
                value: legFit,
                img: `${imgBaseHost}/leg-fits/${legFit}${gender}.svg`
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
                    {t("Pages.Welcome.FitPreferences.LegFitPreference")}
                </Typography>
                <Typography variant="h4" align="center" color="secondary" component={"span"}>
                    {t('Pages.Welcome.FitPreferences.Optional')}
                </Typography>
            </Box>
        }
        contents={
            legFits.map(legFit => {
                return {
                    value: legFit.value,
                    element: <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <ImageComponent src={legFit.img} />
                        <Typography variant="subtitle1" align="center">{legFit.name}</Typography>
                    </Box>
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}