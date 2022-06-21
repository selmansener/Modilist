import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";

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
    value?: string | null;
    onChange: (value: string) => void;
}

export function FootTypes(props: FootTypesProps) {
    const { imgBaseHost } = config;
    const { t } = useTranslation();
    const { value, onChange } = props;

    const footTypes: FootTypeElement[] = Object.keys(FootType).map(footType => {
        return {
            name: t(`Pages.Welcome.FitPreferences.FootTypes.${footType}`),
            value: footType,
            img: `${imgBaseHost}/foot-types/${footType}.svg`
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
                {t("Pages.Welcome.FitPreferences.FootTypePreference")}
            </Typography>
        }
        contents={
            footTypes.map(footType => {
                return {
                    value: footType.value,
                    element: <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <ImageComponent src={footType.img} />
                        <Typography>{footType.name}</Typography>
                    </Box>
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}