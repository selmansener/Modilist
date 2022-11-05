import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";
import { Gender } from "../../../services/swagger/api";

enum FootType {
    Narrow = "Narrow",
    Wide = "Wide"
}

interface FootTypeElement {
    name: string;
    value: string;
    img: string;
}

interface FootTypesProps {
    gender: Gender;
    value?: string | null;
    onChange: (value: string) => void;
}

export function FootTypes(props: FootTypesProps) {
    const { cdnImg: imgBaseHost } = config;
    const { t } = useTranslation();
    const { gender, value, onChange } = props;

    const footTypes: FootTypeElement[] = Object.keys(FootType).map(footType => {
        return {
            name: t(`Pages.Welcome.FitPreferences.FootTypes.${footType}`),
            value: footType,
            img: `${imgBaseHost}/foot-types/${footType}${gender}.svg`
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
                    {t("Pages.Welcome.FitPreferences.FootTypePreference")}
                </Typography>
                <Typography variant="h4" align="center" color="secondary" component={"span"}>
                    {t('Pages.Welcome.FitPreferences.Optional')}
                </Typography>
            </Box>
        }
        contents={
            footTypes.map(footType => {
                return {
                    value: footType.value,
                    imageSrc: footType.img,
                    labelText: footType.name
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}