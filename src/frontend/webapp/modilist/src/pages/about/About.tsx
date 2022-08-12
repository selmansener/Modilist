import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function About() {
    const { t } = useTranslation();

    return (
        <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" align="center">
                    {t("Pages.About.Title")}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography align="center">
                    {t("Pages.About.Description.1")}
                </Typography>
                <Typography align="center">
                    {t("Pages.About.Description.2")}
                </Typography>
            </Grid>
        </Grid>
    )
}