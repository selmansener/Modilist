import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";

enum LegFit {
    Spanish = "Spanish",
    Straight = "Straight",
    Loose = "Loose",
    Skinny = "Skinny"
}

interface LegFitElement {
    name: string;
    value: string;
    img: string;
}

interface LegFitsProps {
    value?: string | null;
    onChange: (value: string) => void;
}

export function LegFits(props: LegFitsProps) {
    const { imgBaseHost } = config;
    const { t } = useTranslation();
    const { value, onChange } = props;

    const legFits: LegFitElement[] = Object.keys(LegFit).map(legFit => {
        return {
            name: t(`Pages.Welcome.FitPreferences.LegFits.${legFit}`),
            value: legFit,
            img: `${imgBaseHost}/leg-fits/${legFit}.svg`
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
                {t("Pages.Welcome.FitPreferences.LegFitPreference")}
            </Typography>
        }
        contents={
            legFits.map(legFit => {
                return {
                    value: legFit.value,
                    element: <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 100
                    }}>
                        <ImageComponent src={legFit.img} />
                        <Typography>{legFit.name}</Typography>
                    </Box>
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}