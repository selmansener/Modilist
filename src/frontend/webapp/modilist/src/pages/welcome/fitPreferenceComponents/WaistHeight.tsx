import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";

enum WaistHeight {
    UltraHighWaist = "UltraHighWaist",
    HighWaist = "HighWaist",
    Regular = "Regular",
    Medium = "Medium",
    Low = "Low",
    UltraLow = "UltraLow",
}

interface WaistHeightElement {
    name: string;
    value: string;
    img: string;
}

export interface WaistHeightsProps {
    value?: string | null;
    onChange: (value: string) => void;
}

export function WaistHeights(props: WaistHeightsProps) {
    const { imgBaseHost } = config;
    const { t } = useTranslation();
    const { value, onChange } = props;

    const waistHeights: WaistHeightElement[] = Object.keys(WaistHeight).map(waistHeight => {
        return {
            name: t(`Pages.Welcome.FitPreferences.WaistHeights.${waistHeight}`),
            value: waistHeight,
            img: `${imgBaseHost}/waist-heights/${waistHeight}.svg`
        }
    });

    return <CustomCheckboxGroup
        value={value ?? ""}
        label={
            <Typography variant="h3" sx={{
                mb: 4
            }}>
                {t("Pages.Welcome.FitPreferences.WaistHeightPreference")}
            </Typography>
        }
        contents={
            waistHeights.map(waistHeight => {
                return {
                    value: waistHeight.value,
                    element: <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <ImageComponent src={waistHeight.img} />
                        <Typography variant="h4">{waistHeight.name}</Typography>
                    </Box>
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}