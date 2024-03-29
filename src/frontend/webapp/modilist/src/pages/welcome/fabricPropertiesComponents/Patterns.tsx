import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CustomCheckboxGroup } from "../../../components/customCheckbox/CustomCheckbox";
import { ImageComponent } from "../../../components/image/ImageComponent";
import { config } from "../../../config";
import { Gender } from "../../../services/swagger/api";

enum Pattern {
    Plaid = "Plaid",
    Striped = "Striped",
    PolkaDot = "PolkaDot",
    Shawl = "Shawl",
    Camouflage = "Camouflage",
    AnimalPattern = "Animal",
    Squared = "Squared",
    AnimalFigured = "Animal",
    GooseFoot = "GooseFoot",
    BigFlowers = "Big",
    SmallFlowers = "Small",
    Printed = "Printed",
}

interface PatternElement {
    name: string,
    value: string,
    img: string
}

export interface PatternsProps {
    gender: Gender;
    value?: string | null;
    onChange: (value: string) => void;
}

export function Patterns(props: PatternsProps) {
    const { t } = useTranslation();
    const { cdnImg: imgBaseHost } = config;
    const { gender, value, onChange } = props;

    const patterns: PatternElement[] = (gender === Gender.Female
        ? Object.keys(Pattern)
        : Object.keys(Pattern).filter(x => x !== Pattern.Shawl
            && x !== Pattern.BigFlowers
            && x !== Pattern.SmallFlowers))
        .map(pattern => {
            return {
                name: t(`Pattern.${pattern}`),
                value: pattern,
                img: `${imgBaseHost}/patterns/${pattern}.svg`
            }
        });

    return <CustomCheckboxGroup
        value={value ?? ""}
        label={<Box sx={{
            mb: 2
        }} textAlign="center">
            <Typography variant="h4" display="inline">
                {t("Pages.Welcome.FabricProperties.ExcludedPatterns.1")}
            </Typography>
            <Typography color={"error"} variant="h4" display="inline">
                {t("Pages.Welcome.FabricProperties.ExcludedPatterns.2")}
            </Typography>
            <Typography variant="h4" display="inline">
                {t("Pages.Welcome.FabricProperties.ExcludedPatterns.3")}
            </Typography>
            <Typography variant="h4" color="secondary" component={"span"}>
                {t('Pages.Welcome.BodySize.Optional')}
            </Typography>
        </Box>
        }
        checkboxSx={{
            p: 1,
            mt: 2
        }}
        isNegative
        contents={
            patterns.map(colorType => {
                return {
                    value: colorType.value,
                    imageSrc: colorType.img,
                    labelText: colorType.name
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}
