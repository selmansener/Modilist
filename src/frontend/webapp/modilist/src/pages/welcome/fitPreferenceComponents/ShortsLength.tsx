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
    const { imgBaseHost } = config;
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
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexWrap: 'wrap',
            columnCount: 4
        }}
        value={value ?? ""}
        label={
            <Typography variant={"h5"} display="inline">
                {t("Pages.Welcome.FitPreferences.ShortsLengthPreference")}
            </Typography>
        }
        contents={
            shortsLengths.map(shortsLength => {
                return {
                    value: shortsLength.value,
                    element: <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <ImageComponent src={shortsLength.img} />
                        <Typography>{shortsLength.name}</Typography>
                    </Box>
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}