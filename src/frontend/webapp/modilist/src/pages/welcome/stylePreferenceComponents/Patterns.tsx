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
    BigFlower = "Big",
    SmallFlower = "Small",
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
    const { imgBaseHost } = config;
    const { gender, value, onChange } = props;

    const patterns: PatternElement[] = (gender === Gender.Female
        ? Object.keys(Pattern) 
        : Object.keys(Pattern).filter(x => x !== Pattern.Shawl 
            && x !== Pattern.BigFlower 
            && x !== Pattern.SmallFlower))
        .map(pattern => {
            return {
                name: t(`Pattern.${pattern}`),
                value: pattern,
                img: `${imgBaseHost}/patterns/${pattern}.svg`
            }
        });

    return <CustomCheckboxGroup
        sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexWrap: 'wrap',
        }}
        value={value ?? ""}
        label={<Box sx={{
            mb: 2
        }}>
            <Typography variant={"h5"} display="inline">
                {t("Pages.Welcome.FabricProperties.ExcludedPatterns.1")}
            </Typography>
            <Typography variant={"h5"} color={"error"} display="inline">
                {t("Pages.Welcome.FabricProperties.ExcludedPatterns.2")}
            </Typography>
            <Typography variant={"h5"} display="inline">
                {t("Pages.Welcome.FabricProperties.ExcludedPatterns.3")}
            </Typography>
        </Box>
        }
        isNegative
        contents={
            patterns.map(colorType => {
                return {
                    value: colorType.value,
                    element: <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 100
                    }}>
                        <ImageComponent src={colorType.img} />
                        <Typography>{colorType.name}</Typography>
                    </Box>
                }
            })
        }
        onChange={(values: string[]) => {
            onChange(values.join(','));
        }} />
}
