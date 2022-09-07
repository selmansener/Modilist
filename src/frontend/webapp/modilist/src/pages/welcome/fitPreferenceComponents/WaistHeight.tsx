import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";
import { Gender } from "../../../services/swagger/api";

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
    gender: Gender;
    value?: string | null;
    onChange: (value: string) => void;
}

export function WaistHeights(props: WaistHeightsProps) {
    const { cdnImg: imgBaseHost } = config;
    const { t } = useTranslation();
    const { gender, value, onChange } = props;

    const waistHeights: WaistHeightElement[] = Object.keys(WaistHeight).map(waistHeight => {
        return {
            name: t(`Pages.Welcome.FitPreferences.WaistHeights.${waistHeight}`),
            value: waistHeight,
            img: `${imgBaseHost}/waist-heights/${waistHeight}${gender}.svg`
        }
    });

    return <CustomCheckboxGroup
        value={value ?? ""}
        label={
            <Box textAlign="center" sx={{
                mb: 4
            }}>
                <Typography variant="h3" align="center" component={"span"} sx={{
                    mb: 4
                }}>
                    {t("Pages.Welcome.FitPreferences.WaistHeightPreference")}
                </Typography>
                <Typography variant="h3" align="center" color="secondary" component={"span"}>
                    {t('Pages.Welcome.FitPreferences.Optional')}
                </Typography>
            </Box>
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
                        <Typography variant="h4" align="center">{waistHeight.name}</Typography>
                    </Box>
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}