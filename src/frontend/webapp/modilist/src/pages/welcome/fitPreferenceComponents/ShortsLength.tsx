import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";
import { Gender } from "../../../services/swagger/api";

enum ShortsLength {
    SuperMini = "SuperMini",
    Mini = "Mini",
    Short = "Short",
    Midi = "Midi",
    Long = "Long",
}

interface ShortsLengthElement {
    name: string;
    value: string;
    img: string;
}

interface ShortsLengthsProps {
    gender: Gender;
    value?: string | null;
    onChange: (value: string) => void;
}

export function ShortsLengths(props: ShortsLengthsProps) {
    const { cdnImg: imgBaseHost } = config;
    const { t } = useTranslation();
    const { gender, value, onChange } = props;

    const shortsLengths: ShortsLengthElement[] = (gender === Gender.Female
        ? Object.keys(ShortsLength).filter(x => x !== ShortsLength.Short)
        : Object.keys(ShortsLength).filter(x => x !== ShortsLength.SuperMini && x !== ShortsLength.Mini))
        .map(shortsLength => {
            return {
                name: t(`Pages.Welcome.FitPreferences.ShortsLengths.${shortsLength}`),
                value: shortsLength,
                img: `${imgBaseHost}/shorts-lengths/${shortsLength}.svg`
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
                    {t("Pages.Welcome.FitPreferences.ShortsLengthPreference")}
                </Typography>
                <Typography variant="h4" align="center" color="secondary" component={"span"}>
                    {t('Pages.Welcome.FitPreferences.Optional')}
                </Typography>
            </Box>
        }
        contents={
            shortsLengths.map(shortsLength => {
                return {
                    value: shortsLength.value,
                    imageSrc: shortsLength.img,
                    labelText: shortsLength.name
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}